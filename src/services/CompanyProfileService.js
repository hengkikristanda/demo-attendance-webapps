const CompanyProfile = require("../model/CompanyProfile");

const findAll = async () => {
	try {
		return CompanyProfile.findAll({ raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Contact Info");
	}
};

const findOne = async () => {
	try {
		return CompanyProfile.findOne({ raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Contact Info");
	}
};

const findById = async (id) => {
	try {
		return CompanyProfile.findByPk(id);
	} catch (error) {
		console.log(error);
		throw new Error("Error find company profile");
	}
};

const update = async (profileData, uploadedFile) => {
	try {
		if (uploadedFile) {
			const uploadedSectionImage = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"logoImageFile-",
				"public/img"
			);

			profileData.image_id = uploadedSectionImage.id;
			profileData.mime_type = uploadedSectionImage.mime_type;
			profileData.original_filename = uploadedSectionImage.original_filename;
		}
		return await profileData.save();
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error Updating Profile");
	}
};

module.exports = {
	findAll,
	findOne,
	findById,
	update,
};
