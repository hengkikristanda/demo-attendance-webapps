const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer();
const LecturerService = require("../../services/Lecturer/LecturerService");
const LecturerDetailService = require("../../services/Lecturer/LecturerDetailService");
const CommonUtils = require("../../utils/CommonUtils");
const TranslationService = require("../../services/translationService");
const ContactInfoService = require("../../services/ContactInfoService");
const CompanyProfileService = require("../../services/CompanyProfileService");
const sanitizeHtml = require("sanitize-html");
const NewsService = require("../../services/NewsService");
const SectionContentService = require("../../services/SectionContent/SectionContentService");

const StudyProgramService = require("../../services/StudyProgram/StudyProgramService");

const { title } = require("process");

const classList = {
	200: "success",
	201: "success",
	202: "success",
	400: "danger",
	401: "danger",
	402: "danger",
};

const messageList = {
	200: "Successfully Create Study",
	201: "Successfully Update Study Program",
	202: "Successfully Delete News",
	400: "Failed to create news",
	401: "Failed to update Study Program",
	402: "Failed to delete news",
};

const POST_GRADUATE_PROGRAMS = [
	{
		id: "e69c8961-9cda-11ef-b867-9e406641108e", // web page id
		name: "Magister Pemasaran, Inovasi, dan Teknologi",
	},
	{
		id: "25d7a4c4-9d12-11ef-b867-9e406641108e", // web page id
		name: "Magister Teknik Keselamatan dan Resiko",
	},
];

const getPostgraduate = async (req, res) => {
	const passedData = req.query.res;

	if (passedData) {
		res.locals.responseMessage = messageList[passedData];
		res.locals.responseMessageClass = classList[passedData];
	}

	res.render("memberArea/web/postgraduate/list", {
		title: "PTDI STTD - Post Graduate",
		programs: POST_GRADUATE_PROGRAMS,
	});
};

const getPostgraduateProgram = async (req, res) => {
	const passedData = req.query.res;

	if (passedData) {
		res.locals.responseMessage = messageList[passedData];
		res.locals.responseMessageClass = classList[passedData];
	}

	const webPageId = req.params.webPageId;

	const studyProgramData = await StudyProgramService.findInViewByWebPageId(webPageId);

	if (studyProgramData) {
		studyProgramData.docUrl = `/docs/postgraduate/accreditations/${
			studyProgramData["accreditation_document"]
		}.${studyProgramData["mime_type"].split("/")[1]}`;
		studyProgramData.originalFileName = `${studyProgramData["original_filename"]}.${
			studyProgramData["mime_type"].split("/")[1]
		}`;
	}

	const studyProgramName = POST_GRADUATE_PROGRAMS.find((program) => program.id === webPageId).name;

	let sectionList = await SectionContentService.findAllInViewByWebPageId(webPageId);

	for (let item of sectionList) {
		const fileExtension = item.mime_type ? item.mime_type.split("/")[1] : null;
		item.originalFileName = item.original_filename && fileExtension ? `${item.original_filename}.${fileExtension}` : null;
	}

	res.render("memberArea/web/postgraduate/programs", {
		title: `PTDI STTD - Post Graduate ${studyProgramName}`,
		studyProgramData,
		studyProgramName,
		sectionList,
	});
};

const putUpdatePostgraduateProgram = async (req, res) => {
	// Get form data
	const { studyProgramId, duration, degree, accreditation } = req.body;

	const studyProgramData = {
		id: studyProgramId,
		duration,
		degree,
		accreditation,
	};

	let accreditationDocument = {};

	let uploadedDocumentPath = null;
	if (req.file) {
		uploadedDocumentPath = req.file.path; // Get the uploaded file path

		accreditationDocument = {
			uploadedDocumentPath,
			originalDocumentName: req.file.originalname,
		};
	}

	const updatedStudyProgram = await StudyProgramService.updateStudyProgram(
		studyProgramData,
		accreditationDocument
	);

	if (updatedStudyProgram) {
		return res.redirect("/member/web/postgraduate?res=201");
	} else {
		return res.redirect("/member/web/postgraduate?res=401");
	}
};

const putUpdatePostgraduateProgramSection = async (req, res) => {
	try {
		// Get form data
		const { sectionId, sectionTitle, description, displayImage } = req.body;

		const sectionData = {
			id: sectionId,
			title: sectionTitle,
			content: description,
		};

		const displayImageData = {};
		let uploadedImagePath = null;
		if (req.file) {
			displayImageData.uploadedImagePath = req.file.path;
			displayImageData.originalFileName = req.file.originalname;
		}

		const updatedSectionContent = await SectionContentService.updateSectionContent(
			sectionData,
			displayImageData
		);
		if (updatedSectionContent) {
			return res.redirect("/member/web/postgraduate?res=201");
		} else {
			return res.redirect("/member/web/postgraduate?res=401");
		}
	} catch (error) {
		console.log(error);
		return res.redirect("/member/web/postgraduate?res=401");
	}
};

module.exports = {
	getPostgraduate,
	getPostgraduateProgram,
	putUpdatePostgraduateProgram,
	putUpdatePostgraduateProgramSection,
};
