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

const classList = {
	200: "success",
	201: "success",
	202: "success",
	400: "danger",
	401: "danger",
	402: "danger",
};

const messageList = {
	200: "Successfully Create News",
	201: "Successfully Update News",
	202: "Successfully Delete News",
	400: "Failed to create news",
	401: "Failed to update news",
	402: "Failed to delete news",
};

const getNews = async (req, res) => {
	const passedData = req.query.res;

	if (passedData) {
		res.locals.responseMessage = messageList[passedData];
		res.locals.responseMessageClass = classList[passedData];
	}

	let selectedLanguage = req.query.lang
		? LanguageService.getUserPreferredLanguage(req.query.lang)
		: req.cookies.language || "en"; // Default to 'en' if no cookie or query param

	// Set the language preference in a cookie
	res.cookie("language", selectedLanguage, { maxAge: 900000, httpOnly: true });

	let newsList = await NewsService.findAllNews();

	newsList = newsList.map((news) => {
		news.lastModified = CommonUtils.formatDateToLongString(news.last_modified, "ID");
		return news;
	});

	res.render("memberArea/web/news/list", {
		title: "PTDI STTD - News",
		newsList,
	});
};

const getCreateNews = async (req, res) => {
	const passedData = req.query.res;
	res.locals.responseMessage = messageList[passedData];
	res.locals.responseMessageClass = classList[passedData];

	res.render("memberArea/web/news/create", {
		title: "PTDI STTD - Create News",
	});
};

const previewNews = async (req, res) => {
	const { title, content, status, imageDataUrl } = req.body;

	let selectedLanguage = req.query.lang
		? LanguageService.getUserPreferredLanguage(req.query.lang)
		: req.cookies.language || "en"; // Default to 'en' if no cookie or query param

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
			officialName: companyProfile[n].officialName,
			shortName: companyProfile[n].shortName,
			address: companyProfile[n].address,
		};
	}

	// Store variables in `res.locals`
	res.locals.navBarTranslation = navBarTranslation;
	res.locals.footerTranslation = footerTranslation;

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;

	const now = new Date();
	const formattedDate = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(now);

	console.log("Image Data URL:", imageDataUrl ? "Image Uploaded" : "No Image Uploaded");

	// Render the preview page with the form data
	res.render("memberArea/web/news/preview", {
		title,
		content,
		status,
		imageDataUrl,
		selectedLanguage,
		formattedDate,
	});
};

const postCreateNews = async (req, res) => {
	try {
		const { newsTitle, content, newsStatus } = req.body;

		// Sanitize the content from TinyMCE
		const sanitizedContent = sanitizeHtml(content, {
			allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]), // Add extra tags if needed
			allowedAttributes: {
				a: ["href", "name", "target"],
				img: ["src", "alt"],
			},
			allowedIframeHostnames: ["www.youtube.com"], // Allow YouTube iframes if needed
		});

		// Get the current timestamp for modifiedDate
		const modifiedDate = new Date();

		// Store the sanitized content in the database
		const newNews = {
			title: newsTitle,
			content: sanitizedContent, // Store the sanitized content
			status: "Published",
			last_modified: modifiedDate,
		};

		let uploadedImagePath = null;
		if (req.file) {
			uploadedImagePath = req.file.path; // Get the uploaded file path
			newNews.originalDisplayImageName = req.file.originalname;
			newNews.uploadedImagePath = uploadedImagePath;
		}

		await NewsService.createNews(newNews);

		// Send a response or redirect
		res.redirect(`/member/web/news?res=200`);
	} catch (error) {
		console.error("Error creating news:", error);
		res.redirect(`/member/web/news?res=400`);
	}
};

const deleteNews = async (req, res) => {
	const newsId = req.params.newsId;

	const deletedNews = await NewsService.deleteNews(newsId);

	if (deletedNews) {
		res.redirect(`/member/web/news?res=202`);
	} else {
		res.redirect(`/member/web/news?res=402`);
	}
};

module.exports = {
	previewNews,
	getNews,
	getCreateNews,
	postCreateNews,
	deleteNews,
};
