const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const siteMenuServices = require("../services/siteMenuServices");

const getOrganizationalStructure = (req, res) => {
	let selectedLanguage = req.query.lang;
	if (selectedLanguage == undefined) {
		selectedLanguage = "id";
	}

	if (!["en", "id", "zh", "ja", "ko"].includes(selectedLanguage.toLowerCase()))
		selectedLanguage = "id";

	const translations = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, "../translations/navbar/", `${selectedLanguage}.json`),
			"utf8"
		)
	);

	const footerTranslation = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, "../translations/footer/", `${selectedLanguage}.json`),
			"utf8"
		)
	);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;

	res.render("organizationalStructure/index", {
		title: "PTDI STTD - Struktur Organisasi",
		selectedLanguage,
	});
};

module.exports = {
	getOrganizationalStructure,
};
