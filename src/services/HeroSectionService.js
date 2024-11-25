const { raw } = require("body-parser");
const { HeroSection, sequelize } = require("../model/HeroSection/HeroSection");
const { HeroSectionView } = require("../model/HeroSection/HeroSectionView");
const CommonUtils = require("../utils/CommonUtils");
const { where } = require("sequelize");

const findById = async (id, isRaw = true) => {
	try {
		return await HeroSection.findByPk(id, { raw: isRaw });
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error finding HeroSection");
	}
};

const findInViewById = async (id) => {
	try {
		return await HeroSectionView.findByPk(id, { raw: true });
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error finding HeroSectionView");
	}
};

const updateHeroSection = async (heroSectionData, uploadedFile) => {
	try {
		if (uploadedFile) {
			const uploadedHeroImage = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"pageHeaderImageFile-",
				"public/img/sections"
			);

			heroSectionData.image_id = uploadedHeroImage.id;
			heroSectionData.mime_type = uploadedHeroImage.mime_type;
			heroSectionData.original_filename = uploadedHeroImage.original_filename;
		}

		return await heroSectionData.save();
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error Updating Hero Section");
	}
};

module.exports = {
	findById,
	findInViewById,
	updateHeroSection,
};
