const { SectionImages } = require("../../model/SectionImages/SectionImages");
const { SectionImagesMapping } = require("../../model/SectionImages/SectionImagesMapping");
const path = require("path");
const fs = require("fs-extra"); // Import fs-extra for file handling
const { v4: uuidv4 } = require("uuid"); // Import uuidv4
const CommonUtils = require("../../utils/CommonUtils");
const { where } = require("sequelize");

const TranslationService = require("../../services/translationService");

const findById = async (sectionImagesId, isRaw = true) => {
	try {
		return await SectionImages.findByPk(sectionImagesId, { raw: isRaw });
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching Section Images for sectionImagesId: " + sectionImagesId);
	}
};

const findMappingBySectionImagesId = async (sectionImagesId) => {
	try {
		return await SectionImagesMapping.findAll({
			where: {
				section_images_id: sectionImagesId,
			},
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error(
			"Error Fetching Section Images Mapping for sectionImagesId: " + sectionImagesId
		);
	}
};

const findAll = async () => {
	try {
		return SectionImages.findAll({ raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching Sections Images");
	}
};

const createSection = async (sectionData, uploadedFile) => {
	try {
		sectionData.title_en = await TranslationService.translateHtmlContent(
			sectionData.title_id,
			"EN"
		);
		sectionData.title_ko = await TranslationService.translateHtmlContent(
			sectionData.title_id,
			"KO"
		);
		sectionData.title_ja = await TranslationService.translateHtmlContent(
			sectionData.title_id,
			"JA"
		);
		sectionData.title_zh = await TranslationService.translateHtmlContent(
			sectionData.title_id,
			"ZH"
		);

		const createdSectionImage = await SectionImages.create(sectionData);

		if (uploadedFile) {
			const uploadedSectionImage = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"sectionDisplayImageFile-",
				"public/img/sections"
			);

			const sectionImageMapping = {
				section_images_id: createdSectionImage.id,
				image_id: uploadedSectionImage.id,
				original_filename: uploadedSectionImage.original_filename,
				mime_type: uploadedSectionImage.mime_type,
			};

			await SectionImagesMapping.create(sectionImageMapping);
		}

		return createdSectionImage;
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error Creating Section Images");
	}
};

const updateSection = async (sectionData, sectionHeading, removedImageId, uploadedFile) => {
	try {
		if (sectionData.title_id.toLowerCase().localeCompare(sectionHeading.toLowerCase()) != 0) {
			sectionData.title_en = await TranslationService.translateHtmlContent(
				sectionData.title_id,
				"EN"
			);
			sectionData.title_ko = await TranslationService.translateHtmlContent(
				sectionData.title_id,
				"KO"
			);
			sectionData.title_ja = await TranslationService.translateHtmlContent(
				sectionData.title_id,
				"JA"
			);
			sectionData.title_zh = await TranslationService.translateHtmlContent(
				sectionData.title_id,
				"ZH"
			);
		}

		sectionData.title_id = sectionHeading;

		const updatedSectionImage = await sectionData.save();

		if (uploadedFile) {
			const uploadedSectionImage = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"sectionDisplayImageFile-",
				"public/img/sections"
			);

			const sectionImageMapping = {
				section_images_id: updatedSectionImage.id,
				image_id: uploadedSectionImage.id,
				original_filename: uploadedSectionImage.original_filename,
				mime_type: uploadedSectionImage.mime_type,
			};

			await SectionImagesMapping.create(sectionImageMapping);
		}

		if (removedImageId) {
			const removedImageIds = removedImageId.split(",");
			for (const id of removedImageIds) {
				const existingImageMapping = await SectionImagesMapping.findByPk(id);
				if (existingImageMapping) {
					await existingImageMapping.destroy();
				}
			}
		}

		return updatedSectionImage;
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error Updating Section Images");
	}
};

const deleteSection = async (sectionId) => {
	try {
		const existingSection = await SectionImages.findByPk(sectionId);
		if (!existingSection) {
			throw new Error("No Section found for the provided section id: " + sectionId);
		}
		return await existingSection.destroy();
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error Deleting Section");
	}
};

module.exports = {
	findMappingBySectionImagesId,
	findById,
	createSection,
	findAll,
	deleteSection,
	updateSection,
};
