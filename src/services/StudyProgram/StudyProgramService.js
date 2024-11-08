const { sequelize, StudyProgram } = require("../../model/StudyProgram/StudyProgram");
const { StudyProgramTranslation } = require("../../model/StudyProgram/StudyProgramTranslation");
const StudyProgramView = require("../../model/StudyProgram/StudyProgramView");
const StudyProgramTranslationView = require("../../model/StudyProgram/StudyProgramTranslationView");
const PublicDocument = require("../../model/PublicDocument");
const path = require("path");
const fs = require("fs-extra"); // Import fs-extra for file handling
const CommonUtils = require("../../utils/CommonUtils");
const TranslationService = require("../../services/translationService");
const { where } = require("sequelize");
const { duration } = require("moment-timezone");

const findById = async (id) => {
	try {
		return await StudyProgram.findByPk(id, { raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching StudyProgram with id: " + id);
	}
};

const findInViewById = async (id) => {
	try {
		return await StudyProgramView.findByPk(id, { raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching StudyProgram with id: " + id);
	}
};

const findTranslationByLang = async (studyProgramId, lang) => {
	try {
		return await StudyProgramTranslationView.findOne(
			{
				where: {
					study_programs_id: studyProgramId,
					lang,
				},
				raw: true,
			},
			{ raw: true }
		);
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching StudyProgramTranslation with id: " + studyProgramId);
	}
};

const findInViewByWebPageId = async (webPageId) => {
	try {
		return await StudyProgramView.findOne({
			where: { web_page_id: webPageId },
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching StudyProgramView with id: " + id);
	}
};

const updateStudyProgram = async (studyProgramData, accreditationDocument) => {
	const transaction = await sequelize.transaction();
	try {
		const existingData = await StudyProgram.findByPk(studyProgramData.id);

		if (!existingData) {
			throw new Error("Study Program not found");
		}

		if (accreditationDocument.uploadedDocumentPath) {
			// Define the target directory and generate a new unique file name
			const targetDir = path.join(__dirname, "../../../public/docs/postgraduate/accreditations");
			const newFileName = path
				.basename(accreditationDocument.uploadedDocumentPath)
				.replace("documentFile-", "");
			const targetPath = path.join(targetDir, newFileName);

			// Ensure target directory exists and move (rename) the file to the target folder with a new name
			await fs.ensureDir(targetDir); // Ensure the target directory exists
			await fs.copy(accreditationDocument.uploadedDocumentPath, targetPath); // Copy file to the target folder

			console.log("File copied and renamed to:", targetPath);

			// Update the image path to the new location
			// data.imagePath = `/img/alumnies/${fileName}`;

			const extFileName = path.extname(newFileName);
			const publicDocumentId = newFileName.replace(extFileName, "");

			const publicDocumentOriginalFileName = CommonUtils.formatDocumentName(
				accreditationDocument.originalDocumentName.split(".")[0]
			);

			const newPublicDocument = await PublicDocument.create({
				id: publicDocumentId,
				original_filename: publicDocumentOriginalFileName,
				mime_type: `application/${path.extname(newFileName).replace(".", "")}`,
			});

			studyProgramData.accreditation_document = publicDocumentId;
		}

		const updatedStudyProgram = await StudyProgram.update(studyProgramData, {
			where: { id: studyProgramData.id },
			transaction,
		});

		const result = await StudyProgram.findByPk(studyProgramData.id, { transaction });

		let englishTranslation = await createTranslation(result, transaction, "EN");
		console.log("englishTranslation: " + englishTranslation);

		let japaneseTranslation = await createTranslation(result, transaction, "JA");
		console.log("japaneseTranslation: " + japaneseTranslation);

		let koreanTranslation = await createTranslation(result, transaction, "KO");
		console.log("koreanTranslation: " + koreanTranslation);

		let chineseTranslation = await createTranslation(result, transaction, "ZH");
		console.log("chineseTranslation: " + chineseTranslation);

		await transaction.commit();

		return updatedStudyProgram;
	} catch (error) {
		await transaction.rollback();
		console.error("Error updating Study Program:", error);
		throw error;
	}
};

async function createTranslation(updateStudyProgram, transaction, lang) {
	const translatedDegree = await TranslationService.translateHtmlContent(
		updateStudyProgram.degree,
		lang
	);

	const translatedDuration = await TranslationService.translateHtmlContent(
		updateStudyProgram.duration,
		lang
	);

	const translatedAccreditation = await TranslationService.translateHtmlContent(
		updateStudyProgram.accreditation,
		lang
	);

	const existingStudyProgramTranslation = await StudyProgramTranslation.findOne({
		where: { study_programs_id: updateStudyProgram.id, lang },
	});

	if (!existingStudyProgramTranslation) {
		return await StudyProgramTranslation.create(
			{
				duration: translatedDuration,
				degree: translatedDegree,
				accreditation: translatedAccreditation,
				study_programs_id: updateStudyProgram.id,
				lang,
			},
			{ transaction }
		);
	}

	return await StudyProgramTranslation.update(
		{
			duration: translatedDuration,
			degree: translatedDegree,
			accreditation: translatedAccreditation,
			lang,
		},
		{
			where: { study_programs_id: updateStudyProgram.id, lang },
			transaction,
		}
	);
}

module.exports = {
	findById,
	findInViewByWebPageId,
	updateStudyProgram,
	findTranslationByLang,
	findInViewById,
};
