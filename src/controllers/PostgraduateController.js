const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const siteMenuServices = require("../services/siteMenuServices");
const CommonsComponentServices = require("../services/CommonsComponentServices");
const LanguageService = require("../services/languageService");
const TranslationService = require("../services/translationService");
const ContactInfoService = require("../services/ContactInfoService");
const CompanyProfileService = require("../services/CompanyProfileService");
const PublicImagesService = require("../services/PublicImagesService");
const AlumniService = require("../services/AlumniService");
const LecturerService = require("../services/Lecturer/LecturerService");
const NewsService = require("../services/NewsService");
const CommonUtils = require("../utils/CommonUtils");
const PublicCommentsService = require("../services/PublicCommentsService");
const FacilitiesTranslationService = require("../services/FacilitiesTranslationService");
const FacilitiesImagesService = require("../services/FacilitiesImagesService");
const LecturerDetailService = require("../services/Lecturer/LecturerDetailService");
const StudyProgramService = require("../services/StudyProgram/StudyProgramService");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const currentPage = {
	id: "Magister Pemasaran, Inovasi, dan Teknologi",
	en: "Master in Marketing, Innovation and Technology",
	ja: "マーケティング、イノベーション、テクノロジーの修士号",
	ko: "마케팅, 혁신 및 기술 석사",
	zh: "市场营销、创新和技术硕士",
};

const getPostGraduateMarketingInnovationTechnology = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonsComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonsComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonsComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonsComponentServices.getCompanyInfo();

		const heroSection = await CommonsComponentServices.getMarketingInnovationTechnologyHeroSection(
			req
		);

		res.locals.heroSection = heroSection;

		const groupSection =
			await CommonsComponentServices.getMarketingInnovationTechnologyGroupSection(req);

		res.locals.groupSection = groupSection;

		const summarySection =
			await CommonsComponentServices.getMarketingInnovationTechnologySummarySection(req);

		res.locals.summarySection = summarySection;

		const overviewSection =
			await CommonsComponentServices.getMarketingInnovationTechnologyOverviewSection(req);

		res.locals.overviewSection = overviewSection;

		const studentActivitiesSection =
			await CommonsComponentServices.getMarketingInnovationTechnologyStudentActivitiesSection(req);

		res.locals.studentActivitiesSection = studentActivitiesSection;

		const careerImpactSection =
			await CommonsComponentServices.getMarketingInnovationTechnologyCareerImpactSection(req);

		res.locals.careerImpactSection = careerImpactSection;

		// const studyTranslation = TranslationService.getTranslation(
		// 	"academics/postGraduate/marketingInnovationTechnology",
		// 	selectedLanguage
		// );

		// let studyProgramData = await StudyProgramService.findTranslationByLang(
		// 	"7097127d-9d0c-11ef-b867-9e406641108e",
		// 	selectedLanguage
		// );

		// if (!studyProgramData) {
		// 	studyProgramData = await StudyProgramService.findInViewById(
		// 		"7097127d-9d0c-11ef-b867-9e406641108e"
		// 	);
		// }

		// studyProgramData.documentUrl = `/docs/postgraduate/accreditations/${
		// 	studyProgramData.accreditation_document
		// }.${studyProgramData.mime_type.split("/")[1]}`;

		// let sectionContentTranslationList;
		// if (selectedLanguage.toLowerCase() != "id") {
		// 	sectionContentTranslationList = await SectionContentService.findAllTranslationInViewByWebPageId(
		// 		"e69c8961-9cda-11ef-b867-9e406641108e",
		// 		selectedLanguage
		// 	);
		// }

		// Render the index page
		return res.render("academics/postGraduate/marketingInnovationTechnology/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

const getSafetyRiskEngineering = async (req, res) => {
	const currentPage = {
		id: "Magister Teknik Keselamatan dan Resiko",
		en: "Master in Safety and Risk Engineering",
		ja: "安全およびリスク工学の修士号",
		ko: "안전 및 위험 공학 석사",
		zh: "安全与风险工程硕士",
	};

	// Get the language from the query parameter or use the language from the cookie if it exists
	let selectedLanguage = req.query.lang
		? LanguageService.getUserPreferredLanguage(req.query.lang)
		: req.cookies.language || "en"; // Default to 'en' if no cookie or query param

	// Set the language preference in a cookie
	res.cookie("language", selectedLanguage, { maxAge: 900000, httpOnly: true });

	// Load translations
	const navBarTranslation = TranslationService.getTranslation("navbar", selectedLanguage);
	const footerTranslation = TranslationService.getTranslation("footer", selectedLanguage);

	const studyTranslation = TranslationService.getTranslation(
		"academics/postGraduate/marketingInnovationTechnology",
		selectedLanguage
	);

	// Redirect only if `lang` query parameter is present
	if (req.query.lang) {
		const cleanUrl = req.originalUrl.split("?")[0]; // Remove query parameters
		return res.redirect(cleanUrl); // Redirect to the clean URL
	}

	const emails = [];
	const phoneNo = [];
	const instagram = [];
	const youtube = [];
	const facebook = [];
	const whatsapp = [];

	const contactInfo = await ContactInfoService.findAll();
	for (let n = 0; n < contactInfo.length; n++) {
		if (contactInfo[n].channel.toLowerCase() === "email") {
			emails.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "phone") {
			phoneNo.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "instagram") {
			instagram.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "youtube") {
			youtube.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "facebook") {
			facebook.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "whatsapp") {
			whatsapp.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		}
	}

	let companyInfo = {};

	const companyProfile = await CompanyProfileService.findAll();
	for (let n = 0; n < companyProfile.length; n++) {
		companyInfo = {
			address: companyProfile[n].address,
		};
	}

	let studyProgramData = await StudyProgramService.findTranslationByLang(
		"7097127d-9d0c-11ef-b867-9e406641108e",
		selectedLanguage
	);

	if (!studyProgramData) {
		studyProgramData = await StudyProgramService.findInViewById(
			"7097127d-9d0c-11ef-b867-9e406641108e"
		);
	}

	studyProgramData.documentUrl = `/docs/postgraduate/accreditations/${
		studyProgramData.accreditation_document
	}.${studyProgramData.mime_type.split("/")[1]}`;

	let sectionContentTranslationList;
	if (selectedLanguage.toLowerCase() != "id") {
		sectionContentTranslationList = await SectionContentService.findAllTranslationInViewByWebPageId(
			"25d7a4c4-9d12-11ef-b867-9e406641108e",
			selectedLanguage
		);
	}

	if (!sectionContentTranslationList) {
		sectionContentTranslationList = await SectionContentService.findAllInViewByWebPageId(
			"25d7a4c4-9d12-11ef-b867-9e406641108e"
		);
	}

	const sectionData = {};

	sectionContentTranslationList.forEach((item) => {
		const fileExtension = item.mime_type ? item.mime_type.split("/")[1] : null;
		const imageUrl = item.image_id && fileExtension ? `${item.image_id}.${fileExtension}` : null;

		sectionData[item.type] = {
			...item,
			imageUrl: `/img/sections/${imageUrl}`, // Add the imageUrl key to each item
		};
	});

	res.locals.navBarTranslation = navBarTranslation;
	res.locals.footerTranslation = footerTranslation;
	res.locals.studyTranslation = studyTranslation;

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;

	// Render the index page
	res.render("academics/postGraduate/safetyRiskEngineering", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
		studyProgramData,
		sectionContentTranslationList,
		sectionData,
	});
};

module.exports = {
	getPostGraduateMarketingInnovationTechnology,
	getSafetyRiskEngineering,
};
