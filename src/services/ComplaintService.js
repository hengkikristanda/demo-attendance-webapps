const { Complaint, sequelize } = require("../model/Complaint");
const fs = require("fs-extra"); // Import fs-extra for file handling
const path = require("path");
const { allowedDocumentFileFormat, allowedImageFileFormat } = require("../utils/Constants");
const CommonUtils = require("../utils/CommonUtils");
const PublicImage = require("../model/PublicImages");
const PublicDocument = require("../model/PublicDocument");

const createComplaint = async (complaintData, uploadedFile) => {
	const transaction = await sequelize.transaction();
	try {

		if (uploadedFile) {
			const uploadedComplaintImage = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"complaintFile-",
				"uploads/complaint-documents"
			);

			complaintData.image_id = uploadedComplaintImage.id;
			complaintData.mime_type = uploadedComplaintImage.mime_type;
			complaintData.original_filename = uploadedComplaintImage.original_filename;
		}

		const newComplaint = await Complaint.create(complaintData);

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
