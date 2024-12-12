const Users = require("../model/Users/Users");
const UsersCmsMenuView = require("../model/Users/UsersCmsMenuView");
const CommonUtils = require("../utils/CommonUtils");
const bcrypt = require("bcryptjs");

const findById = async (userId, isRaw = false) => {
	try {
		return Users.findByPk(userId, { raw: isRaw });
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

const updateUserProfile = async (existingUserProfileData, newPassword, uploadedFile) => {
	try {

		const id = req.params.id;

		const existingUser = await UserService.findById(id);
		if (!existingUser) {
			throw new Error("No User found for the provided id: " + id);
		}

		if (uploadedFile) {
			const uploadedSectionImage = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"profilePictureFile-",
				"uploads/user-profile-picture/"
			);
			existingUserProfileData.image_id = uploadedSectionImage.id;
			existingUserProfileData.mime_type = uploadedSectionImage.mime_type;
			existingUserProfileData.original_filename = uploadedSectionImage.original_filename;
		}

		if (newPassword)
			existingUserProfileData.encoded_password = await bcrypt.hash(newPassword, 10);

		return await existingUserProfileData.save();
	} catch (error) {
		console.log(error);
		throw new Error("Error Updating User Profile");
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
	updateUserProfile,
};
