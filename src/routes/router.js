const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const siteMenuServices = require("../services/siteMenuServices");

// Middleware to parse the body of POST requests
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
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

	const alumnies = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../translations/alumnies.json"), "utf8")
	);

	const lecturers = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../translations/lecturers.json"), "utf8")
	);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;
	res.locals.alumnies = alumnies;
	res.locals.lecturers = lecturers;

	res.render("index", {
		title: "Attendance System - Home",
		selectedLanguage,
	});
});

router.get("/dosen", (req, res) => {
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

	const detailDosen = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../translations/dosen/detailDosen.json"), "utf8")
	);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;
	res.locals.detailDosen = detailDosen;

	res.render("dosen", {
		title: "Attendance System - Dosen",
		selectedLanguage,
	});
});

router.get("/login", (req, res) => {
	res.render("login", {
		title: "Attendance System - Login",
	});
});

router.get("/home-employee", (req, res) => {
	const sideBarMenu = siteMenuServices.getSideBarMenu();
	res.render("homeEmployee", {
		id: "homeDashboard",
		title: "Attendance System - Login",
		sidebar: sideBarMenu,
	});
});

router.get("/absensi", (req, res) => {
	const sideBarMenu = siteMenuServices.getSideBarMenu();
	res.render("absensi", {
		id: "applicationsAbsensi",
		title: "Attendance System - Absensi",
		user: {
			firstName: "Admin",
			lastName: "CMS",
			email: "admin@iLimits.id",
			phoneNo: "1122334455",
		},
		sidebar: sideBarMenu,
	});
});

router.post("/absensi", (req, res) => {});

router.post("/login", (req, res) => {
	res.redirect("/home-employee");
});

module.exports = router;
