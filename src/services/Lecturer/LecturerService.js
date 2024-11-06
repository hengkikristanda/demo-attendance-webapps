const LecturerView = require("../../model/views/LecturerView");
const { sequelize, Lecturer } = require("../../model/Lecturer/Lecturer");
const LecturerDetail = require("../../model/Lecturer/LecturerDetail");
const PublicImage = require("../../model/PublicImages");
const PublicDocument = require("../../model/PublicDocument");
const path = require("path");
const fs = require("fs-extra"); // Import fs-extra for file handling

const findAllLecturerView = async (orderValue = "full_name") => {
	try {
		return LecturerView.findAll({
			order: [orderValue],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Lecturer");
	}
};

const findLecturerView = async (lecturerId) => {
	try {
		return LecturerView.findOne({
			where: {
				id: lecturerId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Lecturer");
	}
};

const findLecturerById = async (lecturerId) => {
	try {
		return Lecturer.findOne({
			where: {
				id: lecturerId,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Lecturer");
	}
};

const createLecturer = async (lecturerData) => {
	const transaction = await sequelize.transaction();
	try {
		const {
			profesionalExperienceItems,
			educationBackgroundItems,
			researchActivityItems,
			uploadedImagePath,
			uploadedDocumentPath,
		} = lecturerData;

		if (uploadedImagePath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../../public/img/lecturer");
			const newFileName = path.basename(uploadedImagePath).replace("profilePictureFile-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(uploadedImagePath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			const extFileName = path.extname(newFileName);
			const publicImageId = newFileName.replace(extFileName, "");

			const publicImageOriginalFileName = formatLecturerName(lecturerData.full_name);

			const newPublicImage = await PublicImage.create({
				id: publicImageId,
				original_filename: publicImageOriginalFileName,
				mime_type: `image/${path.extname(newFileName).replace(".", "")}`,
			});

			lecturerData.image_id = newPublicImage.id;
		}

		if (uploadedDocumentPath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../../public/docs/lecturer-cv");
			const newFileName = path.basename(uploadedDocumentPath).replace("documentFile-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(uploadedDocumentPath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			const extFileName = path.extname(newFileName);
			const publicDocumentId = newFileName.replace(extFileName, "");

			const publicDocumentOriginalFileName = formatLecturerName(lecturerData.originalDocumentName.replace(extFileName, ""));

			console.log(`publicDocumentId: ${publicDocumentId}`);

			const newPublicDocument = await PublicDocument.create({
				id: publicDocumentId,
				original_filename: publicDocumentOriginalFileName,
				mime_type: `application/${path.extname(newFileName).replace(".", "")}`,
			});

			lecturerData.cv_docs = newPublicDocument.id;
		}

		const newLecturer = await Lecturer.create(lecturerData, { transaction });

		Array.from(profesionalExperienceItems).forEach(async (item) => {
			const detail = {
				lecturer_id: newLecturer.id,
				job_title: item.jobTitle,
				organization_name: item.organizationName,
				start_month: item.startMonth,
				start_year: item.startYear,
				end_month: item.endMonth,
				end_year: item.endYear,
				type: "work",
			};

			if (item.isCurrentlyWorking) {
				detail.end_month = null;
				detail.end_year = null;
				detail.present = "Y";
			}
			await LecturerDetail.create(detail);
		});

		Array.from(educationBackgroundItems).forEach(async (item) => {
			const detail = {
				lecturer_id: newLecturer.id,
				job_title: item.jobTitle,
				organization_name: item.organizationName,
				start_month: item.startMonth,
				start_year: item.startYear,
				end_month: item.endMonth,
				end_year: item.endYear,
				present: "N",
				type: "education",
			};
			await LecturerDetail.create(detail);
		});

		Array.from(researchActivityItems).forEach(async (item) => {
			const detail = {
				lecturer_id: newLecturer.id,
				job_title: item.jobTitle,
				organization_name: null,
				start_month: null,
				start_year: null,
				end_month: null,
				end_year: null,
				present: "N",
				type: "research",
			};
			await LecturerDetail.create(detail);
		});

		await transaction.commit();

		return newLecturer;
	} catch (error) {
		await transaction.rollback();
		console.error("Error saving Lecturer data:", error);
		throw error; // Handle errors properly in your application
	}
};

const updateLecturer = async (lecturerId, lecturerData) => {
	const transaction = await sequelize.transaction();
	try {
		const {
			profesionalExperienceItems,
			educationBackgroundItems,
			researchActivityItems,
			uploadedImagePath,
			uploadedDocumentPath,
		} = lecturerData;

		if (uploadedImagePath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../../public/img/lecturer");
			const newFileName = path.basename(uploadedImagePath).replace("profilePictureFile-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(uploadedImagePath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			const extFileName = path.extname(newFileName);
			const publicImageId = newFileName.replace(extFileName, "");

			const publicImageOriginalFileName = formatLecturerName(lecturerData.full_name);

			const newPublicImage = await PublicImage.create({
				id: publicImageId,
				original_filename: publicImageOriginalFileName,
				mime_type: `image/${path.extname(newFileName).replace(".", "")}`,
			});

			lecturerData.image_id = newPublicImage.id;
		}

		if (uploadedDocumentPath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../../public/docs/lecturer-cv");
			const newFileName = path.basename(uploadedDocumentPath).replace("documentFile-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(uploadedDocumentPath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			const extFileName = path.extname(newFileName);
			const publicDocumentId = newFileName.replace(extFileName, "");

			const publicDocumentOriginalFileName = formatLecturerName(lecturerData.originalDocumentName.replace(extFileName, ""));

			console.log(`publicDocumentId: ${publicDocumentId}`);

			const newPublicDocument = await PublicDocument.create({
				id: publicDocumentId,
				original_filename: publicDocumentOriginalFileName,
				mime_type: `application/${path.extname(newFileName).replace(".", "")}`,
			});

			lecturerData.cv_docs = newPublicDocument.id;
		}

		const updatedLecturer = await Lecturer.update(
			lecturerData,
			{
				where: { id: lecturerId },
			},
			{ transaction }
		);

		const deleteDetail = await LecturerDetail.destroy({
			where: { lecturer_id: lecturerId },
		});

		Array.from(profesionalExperienceItems).forEach(async (item) => {
			const detail = {
				lecturer_id: lecturerId,
				job_title: item.jobTitle,
				organization_name: item.organizationName,
				start_month: item.startMonth,
				start_year: item.startYear,
				end_month: item.endMonth,
				end_year: item.endYear,
				type: "work",
			};

			if (item.isCurrentlyWorking) {
				detail.end_month = null;
				detail.end_year = null;
				detail.present = "Y";
			}
			await LecturerDetail.create(detail);
		});

		Array.from(educationBackgroundItems).forEach(async (item) => {
			const detail = {
				lecturer_id: lecturerId,
				job_title: item.jobTitle,
				organization_name: item.organizationName,
				start_month: item.startMonth,
				start_year: item.startYear,
				end_month: item.endMonth,
				end_year: item.endYear,
				present: "N",
				type: "education",
			};
			await LecturerDetail.create(detail);
		});

		Array.from(researchActivityItems).forEach(async (item) => {
			const detail = {
				lecturer_id: lecturerId,
				job_title: item.jobTitle,
				organization_name: null,
				start_month: null,
				start_year: null,
				end_month: null,
				end_year: null,
				present: "N",
				type: "research",
			};
			await LecturerDetail.create(detail);
		});

		await transaction.commit();

		return updatedLecturer;
	} catch (error) {
		await transaction.rollback();
		console.error("Error saving Lecturer data:", error);
		throw error; // Handle errors properly in your application
	}
};

const deleteLecturer = async (lecturerId) => {
	try {
		const lecturer = await Lecturer.findByPk(lecturerId);

		if (!lecturer) {
			return null;
		}

		// Get the image path before deleting the alumni record
		// const imagePath = alumni.image_id ? path.join(__dirname, "../public", alumni.image_id) : null;

		// Delete the alumni record from the database
		await Lecturer.destroy({
			where: { id: lecturerId },
		});

		// If an image exists, delete it from the file system
		// if (imagePath && (await fs.pathExists(imagePath))) {
		// 	await fs.remove(imagePath);
		// 	console.log("Image file deleted:", imagePath);
		// }

		return lecturer; // Return the deleted alumni record
	} catch (error) {
		console.error("Error deleting Lecturer:", error);
		throw error;
	}
};

function formatLecturerName(name) {
	// Replace all non-alphanumeric characters and separators (dot, comma, spaces, etc.) with a hyphen
	return name.replace(/[.,\s]+/g, "-").toLowerCase();
}

module.exports = {
	findAllLecturerView,
	createLecturer,
	updateLecturer,
	deleteLecturer,
	findLecturerView,
	findLecturerById,
};
