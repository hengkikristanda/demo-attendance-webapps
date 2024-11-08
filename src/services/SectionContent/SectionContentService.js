const { sequelize, SectionContent } = require("../../model/SectionContent/SectionContent");
const path = require("path");
const fs = require("fs-extra"); // Import fs-extra for file handling
const PublicImages = require("../../model/PublicImages");
const CommonUtils = require("../../utils/CommonUtils");
const SectionContentView = require("../../model/SectionContent/SectionContentView");
const TranslationService = require("../../services/translationService");
const {
	SectionContentTranslation,
} = require("../../model/SectionContent/SectionContentTranslation");

const SectionContentTranslationView = require("../../model/SectionContent/SectionContentTranslationView");

const findAllByWebPageId = async (webPageId) => {
	try {
		return SectionContent.findAll({
			where: { web_page_id: webPageId },
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching Section for webPageId: " + webPageId);
	}
};

const updateSectionContent = async (sectionContentData, sectionImageFile) => {
	const transaction = await sequelize.transaction();
	try {
		const existingData = await SectionContent.findByPk(sectionContentData.id);

		if (!existingData) {
			throw new Error("Section Content not found");
		}

		if (sectionImageFile.uploadedImagePath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../../public/img/sections");
			const newFileName = path
				.basename(sectionImageFile.uploadedImagePath)
				.replace("displayImage-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(sectionImageFile.uploadedImagePath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			// Update the image path to the new location
			// data.imagePath = `/img/alumnies/${fileName}`;

			const extFileName = path.extname(newFileName);
			const displayImageId = newFileName.replace(extFileName, "");

			const displayImageOriginalFileName = CommonUtils.formatDocumentName(
				sectionImageFile.originalFileName.split(".")[0]
			);

			const newPublicImage = await PublicImages.create({
				id: displayImageId,
				original_filename: displayImageOriginalFileName,
				mime_type: `image/${path.extname(newFileName).replace(".", "")}`,
			});

			sectionContentData.image_id = displayImageId;
		}

		const updatedSectionContent = await SectionContent.update(sectionContentData, {
			where: { id: sectionContentData.id },
			transaction,
		});

		const result = await SectionContent.findByPk(sectionContentData.id, { transaction });

		console.log("result: " + result);

		let englishTranslation = await createTranslation(result, transaction, "EN");
		console.log("englishTranslation: " + englishTranslation);

		let japaneseTranslation = await createTranslation(result, transaction, "JA");
		console.log("japaneseTranslation: " + japaneseTranslation);

		let koreanTranslation = await createTranslation(result, transaction, "KO");
		console.log("koreanTranslation: " + koreanTranslation);

		let chineseTranslation = await createTranslation(result, transaction, "ZH");
		console.log("chineseTranslation: " + chineseTranslation);

		await transaction.commit();

		return updatedSectionContent;
	} catch (error) {
		await transaction.rollback();
		console.error("Error updating Section Content:", error);
		throw error;
	}
};

const findAllInViewByWebPageId = async (webPageId) => {
	try {
		return SectionContentView.findAll({
			where: { web_page_id: webPageId },
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching Section for webPageId: " + webPageId);
	}
};

const findAllTranslationInViewByWebPageId = async (webPageId, lang) => {
	try {
		return SectionContentTranslationView.findAll({
			where: { web_page_id: webPageId, lang },
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching Section for webPageId: " + webPageId);
	}
};

async function createTranslation(updateSectionContent, transaction, lang) {
	let translatedTitle;
	if (updateSectionContent.title) {
		translatedTitle = await TranslationService.translateHtmlContent(
			updateSectionContent.title,
			lang
		);
	}

	let translatedSubTitle;
	if (updateSectionContent.subtitle) {
		translatedSubTitle = await TranslationService.translateHtmlContent(
			updateSectionContent.subtitle,
			lang
		);
	}

	let translatedContent;
	if (updateSectionContent.content) {
		translatedContent = await TranslationService.translateHtmlContent(
			updateSectionContent.content,
			lang
		);
	}

	const existingSectionContentTranslation = await SectionContentTranslation.findOne({
		where: { section_content_id: updateSectionContent.id, lang },
	});

	if (!existingSectionContentTranslation) {
		return await SectionContentTranslation.create(
			{
				title: translatedTitle,
				subtitle: translatedSubTitle,
				content: translatedContent,
				section_content_id: updateSectionContent.id,
				lang,
			},
			{ transaction }
		);
	}

	return await SectionContentTranslation.update(
		{
			title: translatedTitle,
			subtitle: translatedSubTitle,
			content: translatedContent,
			section_content_id: updateSectionContent.id,
			lang,
		},
		{
			where: { section_content_id: updateSectionContent.id, lang },
			transaction,
		}
	);
}

module.exports = {
	findAllInViewByWebPageId,
	updateSectionContent,
	findAllTranslationInViewByWebPageId,
	findAllByWebPageId,
};
