const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const UserService = require("../services/UserService");
const EmailService = require("../services/EmailService/EmailService");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "1h"; // Token expiration time (e.g., 1 hour)F

const User = require("../model/Users/Users");

const getLogin = async (req, res) => {
	const alertMessage = req.flash("alertMessage");

	res.render("memberArea/auth/login", {
		title: `${WEB_PAGE_TITLE} - Login`,
		alertMessage: alertMessage[0],
	});
};

const getResetPassword = async (req, res) => {
	try {
		const alertMessage = req.flash("alertMessage");
		return res.render("memberArea/auth/forgotPassword", {
			title: `${WEB_PAGE_TITLE} - Reset Password`,
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		req.flash("alertMessage");
		return res.redirect("/error");
	}
};

const postRegisterUser = async (req, res) => {
	const { username, password, full_name, phone_number, email, role } = req.body;

	try {
		// Check if username or email already exists

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "Email already in use." });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = await User.create({
			id: require("uuid").v4(), // Generates a unique UUID for the user
			username,
			encoded_password: hashedPassword,
			full_name,
			phone_number,
			email,
			role: role || "Employee", // Default role is 'Employee' if not provided
			is_active: 1,
		});

		// Respond with the created user (excluding the password)
		res.status(201).json({
			message: "User registered successfully",
			user: {
				id: newUser.id,
				username: newUser.username,
				full_name: newUser.full_name,
				phone_number: newUser.phone_number,
				email: newUser.email,
				role: newUser.role,
				is_active: newUser.is_active,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const postLogin = async (req, res) => {
	let message = "Unable to login. Please try again later.";

	try {
		req.flash("alertMessage");

		const { userName, password } = req.body;

		if (!userName || !password) {
			message = "Please enter both username and password";
			throw new Error("Invalid Input");
		}

		// Find the user by username
		const user = await User.findOne({ where: { userName } });
		if (!user) {
			message = "Invalid Username/password";
			throw new Error("Invalid Credential");
		}

		if (user.is_active == 0) {
			message = "Your account has been locked!";
			throw new Error("Invalid Credential");
		}

		const isMatch = user ? await bcrypt.compare(password, user.encoded_password) : false;
		if (!isMatch) {
			message = "Invalid Username/password";

			let failedLoginAttempt = user.failed_login_attempt + 1;
			if (failedLoginAttempt >= 3) {
				user.is_active = 0;
				message = "Your account has been locked!";
			}
			user.failed_login_attempt = failedLoginAttempt;
			await UserService.updateLoginAttempt(user);

			throw new Error("Invalid Credential");
		}

		user.failed_login_attempt = 0;
		user.is_active = 1;
		await UserService.updateLoginAttempt(user);

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user.id, userName: user.userName, userRole: user.role }, // Payload
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRES_IN }
		);

		res.cookie("auth", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Set secure flag in production
			maxAge: 3600000, // 1 hour in milliseconds
		});

		return res.redirect("/member/dashboard");
	} catch (error) {
		console.error(error);
		req.flash("alertMessage", {
			message,
			className: "danger",
		});
		return res.redirect("/users/login");
	}
};

const postRequestResetPassword = async (req, res) => {
	let message = "Unable to reset your password. Please try again later.";

	try {
		const { userName } = req.body;

		if (!userName) {
			message = "Please enter username";
			throw new Error("Invalid Input");
		}

		// Find the user by username
		const user = await User.findOne({ where: { userName } });
		if (user) {
			const newPassword = UserService.generateRandomPassword();
			console.log("New Password: " + newPassword);
			const result = resetPassword(user, newPassword);
			if (!result) {
				throw new Error("Failed to reset password");
			}
			await EmailService.sendNewPasswordEmail(user.email, newPassword);
		}

		message =
			"Check your email! If your account exists, you’ll receive instructions on how to reset your password shortly.";

		req.flash("alertMessage", {
			message,
			className: "success",
		});

		return res.redirect("/users/login");
	} catch (error) {
		console.error(error);
		req.flash("alertMessage", {
			message,
			className: "danger",
		});
		return res.redirect("/users/forgot-password");
	}
};

const logout = async (req, res) => {
	try {
		res.clearCookie("auth"); // Clear JWT token from cookie
		req.flash("alertMessage", {
			message: "You have successfully logged out",
			className: "success",
		});
		return res.redirect("/users/login");
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Logout Failed, please try again in a few minutes.",
			className: "danger",
			actionLink: "/member/dashboard",
		});
		return res.redirect("/error");
	}
};

async function resetPassword(user, newPassword) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword, salt);

		user.encoded_password = hashedPassword;
		await user.save();

		console.log("Password reset successfully");
		return true;
	} catch (error) {
		console.error("Error resetting password:", error);
	}
	return false;
}

module.exports = {
	getLogin,
	getResetPassword,
	postRequestResetPassword,
	postRegisterUser,
	postLogin,
	logout,
};
