const NewsView = require("../model/News/NewsView");
const { sequelize, News } = require("../model/News/News");
const NewsDetail = require("../model/News/NewsDetail");
const PublicImage = require("../model/PublicImages");
const fs = require("fs-extra"); // Import fs-extra for file handling
const path = require("path");
const TranslationService = require("../services/translationService");
const PublishedNews = require("../model/News/PublishedNews");
const PublishedNewsTranslation = require("../model/News/PublishedNewsTranslation");
const { where } = require("sequelize");

const findAllNewsView = async () => {
	try {
		return NewsView.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find News");
	}
};

const findPublishedNewsById = async (newsId, lang = "id") => {
	try {
		if (lang.toLowerCase() === "id") {
			return PublishedNews.findOne({ where: { id: newsId } }, { raw: true });
		} else {
			return PublishedNewsTranslation.findOne({ where: { id: newsId, lang } }, { raw: true });
		}
	} catch (error) {
		console.log(error);
		throw new Error("Error Find News");
	}
};

const findAllNewsViewByLanguageCode = async (languageCode) => {
	try {
		return NewsView.findAll({
			where: {
				lang: languageCode,
			},
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find News");
	}
};

const createNews = async (news) => {
	const transaction = await sequelize.transaction();
	try {
		if (news.uploadedImagePath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../public/img/news");
			const newFileName = path.basename(news.uploadedImagePath).replace("displayImage-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(news.uploadedImagePath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			// Update the image path to the new location
			// data.imagePath = `/img/alumnies/${fileName}`;

			const extFileName = path.extname(newFileName);
			const publicImageId = newFileName.replace(extFileName, "");

			const publicImageOriginalFileName = formatDisplayImageName(news.originalDisplayImageName);

			const newPublicImage = await PublicImage.create({
				id: publicImageId,
				original_filename: publicImageOriginalFileName,
				mime_type: `image/${path.extname(newFileName).replace(".", "")}`,
			});

			news.display_image_id = newPublicImage.id;

			const createdNews = await News.create(news, { transaction });

			const englishTranslation = await createTranslation(createdNews, transaction, "EN");
			console.log("englishTranslation: " + englishTranslation);

			const japaneseTranslation = await createTranslation(createdNews, transaction, "JA");
			console.log("japaneseTranslation: " + japaneseTranslation);

			const koreanTranslation = await createTranslation(createdNews, transaction, "KO");
			console.log("koreanTranslation: " + koreanTranslation);

			const chineseTranslation = await createTranslation(createdNews, transaction, "ZH");
			console.log("chineseTranslation: " + chineseTranslation);

			await transaction.commit();
			return createdNews;
		}
		throw error("Something went wrong");
	} catch (error) {
		await transaction.rollback();
		console.error("Error saving news data:", error);
		throw error; // Handle errors properly in your application
	}
};

const findAllNews = async () => {
	try {
		return News.findAll({ raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Find News");
	}
};

const deleteNews = async (newsId) => {
	try {
		const deletedNews = await News.findByPk(newsId);

		if (!deletedNews) {
			return null;
		}
		await News.destroy({
			where: { id: newsId },
		});
		return deletedNews; // Return the deleted alumni record
	} catch (error) {
		console.error("Error deleting news:", error);
		throw error;
	}
};

const findAllPublishedNews = async (lang = "id") => {
	try {
		if (lang.toLowerCase() === "id") {
			return PublishedNews.findAll({ raw: true });
		} else {
			return PublishedNewsTranslation.findAll({ where: { lang } }, { raw: true });
		}
	} catch (error) {
		console.log(error);
		throw new Error("Error Find News");
	}
};

async function createTranslation(createdNews, transaction, lang) {
	const translatedTitle = await TranslationService.translateHtmlContent(createdNews.title, lang);
	const translatedContent = await TranslationService.translateHtmlContent(
		createdNews.content,
		lang
	);

	return await NewsDetail.create(
		{
			title: translatedTitle,
			content: translatedContent,
			lang: lang,
			news_id: createdNews.id,
		},
		{ transaction }
	);
}

function formatDisplayImageName(name) {
	// Replace all non-alphanumeric characters and separators (dot, comma, spaces, etc.) with a hyphen
	return name.replace(/[.,\s]+/g, "-").toLowerCase();
}

module.exports = {
	findAllNewsView,
	findAllNewsViewByLanguageCode,
	createNews,
	findAllNews,
	deleteNews,
	findAllPublishedNews,
	findPublishedNewsById
};
