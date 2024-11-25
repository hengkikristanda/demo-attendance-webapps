const Users = require("../model/Users/Users");
const UsersCmsMenuView = require("../model/Users/UsersCmsMenuView");

const findById = async (userId) => {
	try {
		return Users.findByPk(userId);
	} catch (error) {
		console.log(error);
		throw new Error("Error Find User");
	}
};

const updateLoginAttempt = async (user) => {
	try {
		return await user.save();
	} catch (error) {
		console.log(error);
		throw new Error("Error Updating Login Attempt");
	}
};

const findMappedMenuByUserRoleId = async (userRole) => {
	try {
		return await UsersCmsMenuView.findAll({ where: { user_role: userRole }, raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Mapped menu for user role: " + userRole);
	}
};

function generateRandomPassword() {
	const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	// const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

	// Ensuring at least one character from each required set
	const passwordChars = [
		upperCaseChars[Math.floor(Math.random() * upperCaseChars.length)],
		lowerCaseChars[Math.floor(Math.random() * lowerCaseChars.length)],
		numbers[Math.floor(Math.random() * numbers.length)],
		// symbols[Math.floor(Math.random() * symbols.length)],
	];

	// Fill the rest of the password length with random characters
	const allChars = upperCaseChars + lowerCaseChars + numbers;
	for (let i = 4; i < 12; i++) {
		passwordChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
	}

	// Shuffle the array to randomize character positions
	for (let i = passwordChars.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]];
	}

	// Join and return the array as a string
	return passwordChars.join("");
}

module.exports = {
	findById,
	updateLoginAttempt,
	findMappedMenuByUserRoleId,
	generateRandomPassword,
};
