const { Complaint, sequelize } = require("../model/Complaint");
const fs = require("fs-extra"); // Import fs-extra for file handling
const path = require("path");
const { allowedDocumentFileFormat, allowedImageFileFormat } = require("../utils/Constants");
const CommonUtils = require("../utils/CommonUtils");
const PublicImage = require("../model/PublicImages");
const PublicDocument = require("../model/PublicDocument");

const createComplaint = async (data, fileMetaData) => {
	const transaction = await sequelize.transaction();
	try {
		const { uploadedFilePath, originalFileName, mimeType } = fileMetaData;

		if (uploadedFilePath) {
			const fileNameWithoutExt = path.parse(uploadedFilePath).name;
			const id = path.basename(fileNameWithoutExt).replace("complaintFile-", "");
			const formattedOriginalFileName = CommonUtils.formatDocumentName(originalFileName);
			const extFileName = path.extname(uploadedFilePath);

			console.log("ID: " + id);

			const complaintFileData = {
				id,
				original_filename: formattedOriginalFileName,
				mime_type: mimeType,
			};

			if (allowedDocumentFileFormat.includes(extFileName)) {
				const newPublicDocument = await PublicDocument.create(complaintFileData);
				data.document_id = newPublicDocument.id;
			} else if (allowedImageFileFormat.includes(extFileName)) {
				const newPublicImage = await PublicImage.create(complaintFileData);
				data.image_id = newPublicImage.id;
			}
		}

		const newComplaint = await Complaint.create(data);

		await transaction.commit();

		return newComplaint;
	} catch (error) {
		await transaction.rollback();
		console.error("Error saving complaint data:", error);
		throw error; // Handle errors properly in your application
	}
};

module.exports = {
	createComplaint,
};
