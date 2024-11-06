const { error } = require("console");
const Alumni = require("../model/Alumni");
const PublicImage = require("../model/PublicImages");
const AlumniView = require("../model/views/AlumniView");
const fs = require("fs-extra"); // Import fs-extra for file handling
const path = require("path");

const findAll = async () => {
	try {
		return Alumni.findAll({
			order: ["pos"],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Alumni");
	}
};

const findAllAlumniView = async () => {
	try {
		return AlumniView.findAll({
			order: ["pos"],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Alumni");
	}
};

const findAlumniViewById = async (id) => {
	try {
		return AlumniView.findOne({
			where: {
				id,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Alumni");
	}
};

const createAlumni = async (data, uploadedImagePath) => {
	try {
		if (uploadedImagePath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../public/img/alumnies");
			const newFileName = path.basename(uploadedImagePath).replace("profilePictureFile-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(uploadedImagePath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			// Update the image path to the new location
			// data.imagePath = `/img/alumnies/${fileName}`;

			const extFileName = path.extname(newFileName);
			const publicImageId = newFileName.replace(extFileName, "");

			const publicImageOriginalFileName = formatAlumniName(data.full_name);

			const newPublicImage = await PublicImage.create({
				id: publicImageId,
				original_filename: publicImageOriginalFileName,
				mime_type: `image/${path.extname(newFileName).replace(".", "")}`,
			});

			data.image_id = newPublicImage.id;

			const newAlumni = await Alumni.create(data);
			return newAlumni;
		}
		throw error("Something went wrong");
	} catch (error) {
		console.error("Error saving alumni data:", error);
		throw error; // Handle errors properly in your application
	}
};

const updateAlumni = async (alumniId, updatedAlumniData, uploadedImagePath) => {
	try {
		// Find the existing alumni by ID
		const alumni = await Alumni.findByPk(alumniId);

		if (!alumni) {
			throw new Error("Alumni not found");
		}

		if (uploadedImagePath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../public/img/alumnies");
			const newFileName = path.basename(uploadedImagePath).replace("profilePictureFile-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(uploadedImagePath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			// Update the image path to the new location
			// data.imagePath = `/img/alumnies/${fileName}`;

			const extFileName = path.extname(newFileName);
			const publicImageId = newFileName.replace(extFileName, "");

			const publicImageOriginalFileName = formatAlumniName(updatedAlumniData.full_name);

			const newPublicImage = await PublicImage.create({
				id: publicImageId,
				original_filename: publicImageOriginalFileName,
				mime_type: `image/${path.extname(newFileName).replace(".", "")}`,
			});

			updatedAlumniData.image_id = newPublicImage.id;
		}

		const updatedAlumni = await Alumni.update(updatedAlumniData, {
			where: { id: alumniId },
		});

		return updatedAlumni;
	} catch (error) {
		console.error("Error updating alumni:", error);
		throw error;
	}
};

const deleteAlumni = async (alumniId) => {
	try {
		// Find the alumni record by ID
		const alumni = await Alumni.findByPk(alumniId);

		if (!alumni) {
			return null; // Alumni not found
		}

		// Get the image path before deleting the alumni record
		// const imagePath = alumni.image_id ? path.join(__dirname, "../public", alumni.image_id) : null;

		// Delete the alumni record from the database
		await Alumni.destroy({
			where: { id: alumniId },
		});

		// If an image exists, delete it from the file system
		// if (imagePath && (await fs.pathExists(imagePath))) {
		// 	await fs.remove(imagePath);
		// 	console.log("Image file deleted:", imagePath);
		// }

		return alumni; // Return the deleted alumni record
	} catch (error) {
		console.error("Error deleting alumni:", error);
		throw error;
	}
};

function formatAlumniName(name) {
	// Replace all non-alphanumeric characters and separators (dot, comma, spaces, etc.) with a hyphen
	return name.replace(/[.,\s]+/g, "-").toLowerCase();
}

module.exports = {
	findAll,
	findAllAlumniView,
	findAlumniViewById,
	createAlumni,
	updateAlumni,
	deleteAlumni,
};
