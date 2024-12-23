const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const siteMenuServices = require("../services/siteMenuServices");
const CommonComponentServices = require("../services/CommonsComponentServices");
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
const SectionContentService = require("../services/SectionContent/SectionContentService");
const CONSTANT = require("../utils/Constants");

const responseMessage = {
	id: "Terima kasih atas komentar Anda! Kami menghargai masukan Anda dan akan segera meninjaunya.",
	en: "Thank you for your comment! We appreciate your feedback and will review it shortly.",
	ja: "コメントをいただき、ありがとうございます！ ご意見を感謝し、すぐに確認いたします。",
	ko: "댓글을 남겨주셔서 감사합니다! 귀하의 의견을 소중히 여기며, 곧 검토하겠습니다.",
	zh: "感谢您的评论！我们非常重视您的反馈，并会尽快审阅。",
};

let pageTitle = "PTDI STTD - ";

const getErrorPage = async (req, res) => {
	let responseCode = req.params.responseCode;
	let httpStatusMessage = "Something went wrong";
	if (responseCode) {
		if (responseCode == "404") {
			httpStatusMessage = "Page Not Found";
		} else if (responseCode == "504") {
			httpStatusMessage = "Website under maintenance";
		} else {
			responseCode = "500";
		}
	} else {
		responseCode = "500";
	}

	res.render("error", {
		title: "PTDI STTD",
		httpStatusMessage,
		responseCode,
	});
};

const getErrorPage2 = async (req, res) => {
	const alertMessage = req.flash("alertMessage");
	res.render("error", {
		title: "PTDI STTD",
		alertMessage: alertMessage[0], // Pass the message to the view
	});
};

const getAlumni = async (req, res) => {
	const currentPage = {
		id: "Alumni",
		en: "Alumni",
		ja: "卒業生",
		ko: "동문",
		zh: "我们的领导",
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
	const detailAlumniTranslation = TranslationService.getTranslation("alumni", selectedLanguage);

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

	let alumniList = await AlumniService.findAllAlumniView();

	// Map the desired attribute (e.g., name) to a new object
	alumniList = alumniList.map((alumni) => {
		return {
			id: alumni.id,
			fullName: alumni["full_name"],
			generation: alumni.generation,
			job: alumni["job_position"],
			pos: alumni.pos,
			imageUrl: `/img/alumnies/${alumni["image_id"]}.${alumni["mime_type"].split("/")[1]}`,
			mimeType: alumni["mime_type"],
		};
	});

	res.locals.navBarTranslation = navBarTranslation;
	res.locals.footerTranslation = footerTranslation;

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;
	res.locals.alumniList = alumniList;
	res.locals.detailAlumniTranslation = detailAlumniTranslation;

	// Render the index page
	res.render("alumni/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

const getOurLeaders = async (req, res) => {
	const currentPage = {
		id: "Pemimpin Kami",
		en: "Our Leaders",
		ja: "私たちのリーダー",
		ko: "우리의 지도자들",
		zh: "我们的领导",
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

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;

	// Render the index page
	res.render("aboutUs/ourLeaders/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

const getTraining = async (req, res) => {
	const currentPage = {
		id: "Diklat",
		en: "Education and Training",
		ja: "教育と訓練",
		ko: "教育と訓練",
		zh: "教育与培训",
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

	const trainingTranslation = TranslationService.getTranslation(
		"academics/training",
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

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;
	res.locals.trainingTranslation = trainingTranslation;

	// Render the index page
	res.render("academics/training/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

const getTrainingRegistration = async (req, res) => {
	const currentPage = {
		id: "Diklat",
		en: "Education and Training",
		ja: "教育と訓練",
		ko: "教育と訓練",
		zh: "教育与培训",
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

	const trainingTranslation = TranslationService.getTranslation(
		"academics/training",
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

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;
	res.locals.trainingTranslation = trainingTranslation;

	// Render the index page
	res.render("academics/training/registration/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

const getPostGraduateMarketingInnovationTechnology = async (req, res) => {
	const currentPage = {
		id: "Magister Pemasaran, Inovasi, dan Teknologi",
		en: "Master in Marketing, Innovation and Technology",
		ja: "マーケティング、イノベーション、テクノロジーの修士号",
		ko: "마케팅, 혁신 및 기술 석사",
		zh: "市场营销、创新和技术硕士",
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
	res.render("academics/postGraduate/marketingInnovationTechnology", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
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
	});
};

const getPublicComments = async (req, res) => {
	const currentPage = {
		id: "Komentar Publik",
		en: "Public Comment",
		ja: "公共のコメント",
		ko: "공개 의견",
		zh: "公众评论",
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
	const publicCommentsTranslation = TranslationService.getTranslation(
		"publicComments",
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

	let commentsData = [];
	const publicCommentList = await PublicCommentsService.findAll();
	for (let n = 0; n < publicCommentList.length; n++) {
		commentsData.push({
			id: publicCommentList[n].id,
			fullName: publicCommentList[n].fullname,
			commentText: publicCommentList[n].comments,
			createdDate: CommonUtils.formatDateToLongString(
				publicCommentList[n]["created_date"],
				selectedLanguage
			),
		});
	}

	res.locals.navBarTranslation = navBarTranslation;
	res.locals.footerTranslation = footerTranslation;

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;
	res.locals.publicCommentsTranslation = publicCommentsTranslation;
	res.locals.commentsData = commentsData;

	if (req.session.error == undefined) {
		res.locals.responseMessage = "";
	} else if (req.session.error) {
		res.locals.responseMessage = "Failed submit comment. Please try again later.";
	} else {
		res.locals.responseMessage = responseMessage[selectedLanguage];
	}

	// Render the index page
	res.render("public-comments/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

const submitComment = async (req, res) => {
	const { fullName, emailAddress, phoneNumber, comment } = req.body;

	try {
		// Save the comment to the database
		await PublicCommentsService.create({
			fullName,
			emailAddress,
			phoneNumber,
			comment,
		});

		// Set session error status to false if successful
		req.session.error = false;

		// Redirect to /public-comments after success
		return res.redirect("/public-comments"); // Use return to stop further execution
	} catch (error) {
		console.error("Error saving comment:", error);

		// Set session error status to true if there's an error
		req.session.error = true;

		// Redirect to /public-comments after failure
		return res.redirect("/public-comments"); // Use return to stop further execution
	}
};

const getHistory = async (req, res) => {
	const currentPage = {
		id: "Sejarah Kami",
		en: "Our History",
		ja: "私たちの歴史",
		ko: "우리의 역사",
		zh: "我们的历史",
	};

	// Determine selected language, with fallback to cookie or default
	let selectedLanguage = req.query.lang
		? LanguageService.getUserPreferredLanguage(req.query.lang)
		: req.cookies.language || "en";

	// Set selected language in the cookie and session if not already set
	res.cookie("language", selectedLanguage, { maxAge: 900000, httpOnly: true });

	// Load translations
	const navBarTranslation = TranslationService.getTranslation("navbar", selectedLanguage);
	const footerTranslation = TranslationService.getTranslation("footer", selectedLanguage);

	// Redirect only if `lang` query parameter is present
	if (req.query.lang) {
		const cleanUrl = req.originalUrl.split("?")[0]; // Remove query parameters
		return res.redirect(cleanUrl); // Redirect to the clean URL
	}

	const ourHistoryTranslation = TranslationService.getTranslation(
		"aboutUs/history",
		selectedLanguage
	);

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

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;

	res.locals.ourHistoryTranslation = ourHistoryTranslation;

	// Render the index page
	res.render("aboutUs/history/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		selectedLanguage,
	});
};

const getFacilities = async (req, res) => {
	const currentPage = {
		id: "Fasilitas",
		en: "Facilities",
		ja: "施設",
		ko: "시설",
		zh: "设施",
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

	const facilitiesTranslation = TranslationService.getTranslation(
		"aboutUs/facilities",
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

	let facilitiesTranslationContent = await FacilitiesTranslationService.findAllByLanguageCode(
		selectedLanguage
	);

	facilitiesTranslationContent = facilitiesTranslationContent.map((item) => {
		return {
			id: item.id,
			name: item.name,
			description: item.description,
		};
	});

	let facilitiesImagesList = await FacilitiesImagesService.findAllInView();
	facilitiesImagesList = facilitiesImagesList.map((item) => {
		return {
			imageUrl: `/img/facilities/${item["image_id"]}.${item["mime_type"].split("/")[1]}`,
		};
	});

	if (facilitiesTranslationContent.length === 0) {
		facilitiesTranslationContent = await FacilitiesTranslationService.findAllByDefaultLanguage();
		facilitiesTranslationContent = facilitiesTranslationContent.map((item) => {
			return {
				id: item.id,
				name: item.name,
				description: item.description,
			};
		});
	}

	res.locals.navBarTranslation = navBarTranslation;
	res.locals.footerTranslation = footerTranslation;

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;

	res.locals.facilitiesTranslation = facilitiesTranslation;
	res.locals.facilitiesTranslationContent = facilitiesTranslationContent;
	res.locals.facilitiesImagesList = facilitiesImagesList;

	// Render the index page
	res.render("aboutUs/facilities/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		selectedLanguage,
		currentPage: currentPage[selectedLanguage],
	});
};

const getLecturers = async (req, res) => {
	const currentPage = {
		id: "Dosen",
		en: "Lecturer",
		ja: "講師",
		ko: "교수",
		zh: "讲师",
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
	const lecturerTranslation = TranslationService.getTranslation(
		"academics/lecturers",
		selectedLanguage
	);

	// Redirect only if `lang` query parameter is present

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

	let lecturerList = await LecturerService.findAllLecturerView();
	lecturerList = lecturerList.map((lecturer) => ({
		id: lecturer.id,
		fullName: lecturer["full_name"],
		emailAddress: lecturer["email_address"],
		docUrl: `/docs/lecturer-cv/${lecturer["doc_id"]}.${lecturer["doc_type"].split("/")[1]}`,
		imageUrl: `/img/lecturer/${lecturer["image_id"]}.${lecturer["image_type"].split("/")[1]}`,
	}));

	// Use Promise.all to wait for all the details to resolve
	lecturerList = await Promise.all(
		lecturerList.map(async (lecturer) => {
			let lectureDetail = await LecturerDetailService.findDetailByLecturerId(lecturer.id);

			// Wait for all detail items to resolve
			lectureDetail = await Promise.all(
				lectureDetail.map(async (item) => {
					let detail = {
						id: item.id,
						organizationName: item["organization_name"],
						startMonth: CommonUtils.getMonthName(item["start_month"]),
						endMonth: CommonUtils.getMonthName(item["end_month"]),
						startYear: item["start_year"],
						endYear: item["end_year"],
						isPresent: item.present,
						jobTitle: item["job_title"],
						type: item.type,
					};

					if (detail.isPresent.toUpperCase() == "Y") {
						detail.endYear = "Present";
					}

					return detail;
				})
			);

			lectureDetail.sort((a, b) => b.startYear - a.startYear);

			// Add lectureDetail to the lecturer object
			return {
				...lecturer,
				detail: lectureDetail,
			};
		})
	);

	res.locals.navBarTranslation = navBarTranslation;
	res.locals.footerTranslation = footerTranslation;

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;
	res.locals.lecturerTranslation = lecturerTranslation;
	res.locals.lecturerList = lecturerList;

	// Render the index page
	res.render("academics/lecturers/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		selectedLanguage,
		currentPage: currentPage[selectedLanguage],
	});
};

module.exports = {
	getAlumni,
	getOurLeaders,
	getTraining,
	getTrainingRegistration,
	getPublicComments,
	submitComment,
	getHistory,
	getFacilities,
	getLecturers,
	getPostGraduateMarketingInnovationTechnology,
	getSafetyRiskEngineering,
	getErrorPage,
	getErrorPage2,
};
