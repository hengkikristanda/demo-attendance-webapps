const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const siteMenuServices = require("../services/siteMenuServices");
const CommonComponentServices = require("../services/commonComponentServices");

const getOrganizationalStructure = (req, res) => {
	let selectedLanguage = req.query.lang;

	const { translations, footerTranslation } =
		CommonComponentServices.getCommonComponent(selectedLanguage);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;

	res.render("organizationalStructure/index", {
		title: "PTDI STTD - Struktur Organisasi",
		selectedLanguage,
	});
};

const getOurLeaders = (req, res) => {
	let selectedLanguage = req.query.lang;

	const { translations, footerTranslation } =
		CommonComponentServices.getCommonComponent(selectedLanguage);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;

	res.render("ourLeaders/index", {
		title: "PTDI STTD - Our Leaders",
		selectedLanguage,
	});
};

const getTraining = (req, res) => {
	let selectedLanguage = req.query.lang;

	const { translations, footerTranslation } =
		CommonComponentServices.getCommonComponent(selectedLanguage);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;

	res.render("training/index", {
		title: "PTDI STTD - Diklat",
		selectedLanguage,
	});
};

const getDetailTraining = (req, res) => {
	let selectedLanguage = req.query.lang;

	const { translations, footerTranslation } =
		CommonComponentServices.getCommonComponent(selectedLanguage);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;

	res.render("training/details/index", {
		title: "PTDI STTD - Diklat",
		selectedLanguage,
	});
};

const getTrainingRegistration = (req, res) => {
	let selectedLanguage = req.query.lang;

	const { translations, footerTranslation } =
		CommonComponentServices.getCommonComponent(selectedLanguage);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;

	res.render("training/registration/index", {
		title: "PTDI STTD - Diklat",
		selectedLanguage,
	});
};

module.exports = {
	getOrganizationalStructure,
	getOurLeaders,
	getTraining,
	getDetailTraining,
	getTrainingRegistration,
};
