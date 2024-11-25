const { sequelize, Sections } = require("../../model/Sections/Sections");
const path = require("path");
const fs = require("fs-extra"); // Import fs-extra for file handling
const CommonUtils = require("../../utils/CommonUtils");
const { AccordionContent } = require("../../model/AccordionContent");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4
const AccordionContentService = require("../../services/AccordionContentService");

const findAll = async () => {
	try {
		return Sections.findAll({ raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching Sections");
	}
};

const findByTemplateId = async (templateId) => {
	try {
		return Sections.findAll({ where: { template_id: templateId }, raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching Sections");
	}
};

const findById = async (sectionId, raw = true) => {
	try {
		return Sections.findOne({ where: { id: sectionId }, raw });
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching Sections");
	}
};

const createSection = async (sectionData, uploadedFile, accordionSectionData) => {
	const transaction = await sequelize.transaction();
	try {
		sectionData.id = uuidv4();

		if (uploadedFile) {
			const uploadedSectionImage = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"sectionDisplayImageFile-",
				"public/img/sections"
			);

			sectionData.image_id = uploadedSectionImage.id;
			sectionData.mime_type = uploadedSectionImage.mime_type;
			sectionData.original_filename = uploadedSectionImage.original_filename;
		}

		const createdSection = await Sections.create(sectionData, { transaction });

		if (accordionSectionData) {
			const accordionSection = accordionSectionData.map((item) => {
				return { ...item, section_id: sectionData.id, id: uuidv4() };
			});
			await AccordionContent.bulkCreate(accordionSection, { transaction });
		}

		await transaction.commit();

		return createdSection;
	} catch (error) {
		await transaction.rollback();
		console.error("Error details:", error);
		throw new Error("Error Creating Section");
	}
};

const updateSection = async (sectionData, uploadedFile, accordionSectionData) => {
	const transaction = await sequelize.transaction();
	try {
		if (uploadedFile) {
			const uploadedSectionImage = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"sectionDisplayImageFile-",
				"public/img/sections"
			);

			sectionData.image_id = uploadedSectionImage.id;
			sectionData.mime_type = uploadedSectionImage.mime_type;
			sectionData.original_filename = uploadedSectionImage.original_filename;
		}

		const updatedData = await sectionData.save({ transaction });

		if (accordionSectionData) {
			const resultDeleted = await AccordionContentService.deleteAll({ transaction });

			const accordionSection = accordionSectionData.map((item) => {
				return { ...item, section_id: sectionData.id, id: uuidv4() };
			});

			await AccordionContent.bulkCreate(accordionSection, { transaction });
		}

		await transaction.commit();

		return updatedData;
	} catch (error) {
		await transaction.rollback();
		console.error("Error details:", error);
		throw new Error("Error Updating Section");
	}
};

const deleteSection = async (sectionId) => {
	try {
		const existingSection = await Sections.findByPk(sectionId);
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
	findAll,
	findByTemplateId,
	createSection,
	deleteSection,
	findById,
	updateSection,
};
