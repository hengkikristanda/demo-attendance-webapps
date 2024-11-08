const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const siteMenuServices = require("../services/siteMenuServices");
const CommonComponentServices = require("../services/commonComponentServices");
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

const pageTitle = "PTDI STTD - ";

const getAssociateRoadTransportationManagement = async (req, res) => {
	const currentPage = {
		id: "D-III Manajemen Transportasi Jalan",
		en: "D-III Road Transportation Management",
		ja: "D-III 道路輸送管理",
		ko: "D-III 도로 운송 관리",
		zh: "D-III 公路运输管理",
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
	res.render("academics/underGraduate/associateRoadTransportationManagement", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

const getAssociateRailwayTransportationManagement = async (req, res) => {
	const currentPage = {
		id: "D-III Manajemen Transportasi Perkeretaapian",
		en: "D-III Railway Transportation Management",
		ja: "D-III 鉄道輸送管理",
		ko: "D-III 철도운송관리",
		zh: "D-III 铁路运输管理",
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
	res.render("academics/underGraduate/associateRailwayTransportationManagement", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

const getAppliedBachelorLandTransportationManagement = async (req, res) => {
	const currentPage = {
		id: "Sarjana Terapan Manajemen Transportasi Darat",
		en: "Bachelor of Applied Land Transportation Management",
		ja: "応用陸上輸送管理学士",
		ko: "응용 육상 운송 관리 학사",
		zh: "应用陆路运输管理学士",
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
	res.render("academics/underGraduate/appliedBachelorLandTransportationManagement", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

const getAppliedBachelorAutomotiveEngineeringTechnology = async (req, res) => {
	const currentPage = {
		id: "Sarjana Terapan Teknologi Rekayasa Otomotif",
		en: "Bachelor of Applied Automotive Engineering Technology",
		ja: "応用自動車工学技術学士",
		ko: "응용 자동차 공학 기술 학사",
		zh: "应用汽车工程技术学士",
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
	res.render("academics/underGraduate/appliedBachelorAutomotiveEngineeringTechnology", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

module.exports = {
    getAssociateRoadTransportationManagement,
    getAssociateRailwayTransportationManagement,
    getAppliedBachelorLandTransportationManagement,
    getAppliedBachelorAutomotiveEngineeringTechnology
};
