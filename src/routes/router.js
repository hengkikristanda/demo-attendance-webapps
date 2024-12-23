const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const siteMenuServices = require("../services/siteMenuServices");
const { LANGUAGE_CODE } = require("../utils/Constants");

// Middleware to parse the body of POST requests
router.use(express.urlencoded({ extended: true }));

// router.get("/", (req, res) => {
// 	let selectedLanguage = req.query.lang;
// 	if (selectedLanguage == undefined) {
// 		selectedLanguage = "id";
// 	}

// 	if (!["en", "id", "zh", "ja", "ko"].includes(selectedLanguage.toLowerCase()))
// 		selectedLanguage = "id";

// 	const translations = JSON.parse(
// 		fs.readFileSync(
// 			path.join(__dirname, "../translations/navbar/", `${selectedLanguage}.json`),
// 			"utf8"
// 		)
// 	);

// 	const welcomeTranslation = JSON.parse(
// 		fs.readFileSync(
// 			path.join(__dirname, "../translations/home/welcome/", `${selectedLanguage}.json`),
// 			"utf8"
// 		)
// 	);

// 	const footerTranslation = JSON.parse(
// 		fs.readFileSync(
// 			path.join(__dirname, "../translations/footer/", `${selectedLanguage}.json`),
// 			"utf8"
// 		)
// 	);

// 	const alumnies = JSON.parse(
// 		fs.readFileSync(path.join(__dirname, "../translations/alumnies.json"), "utf8")
// 	);

// 	const lecturers = JSON.parse(
// 		fs.readFileSync(path.join(__dirname, "../translations/lecturers.json"), "utf8")
// 	);

// 	const news = JSON.parse(
// 		fs.readFileSync(
// 			path.join(__dirname, "../translations/berita/", `${selectedLanguage}.json`),
// 			"utf8"
// 		)
// 	);

// 	const hero = JSON.parse(
// 		fs.readFileSync(path.join(__dirname, "../translations/home-hero/", `homeHero.json`), "utf8")
// 	);

// 	res.locals.hero = hero[selectedLanguage];
// 	res.locals.translations = translations;
// 	res.locals.footerTranslation = footerTranslation;
// 	res.locals.alumnies = alumnies;
// 	res.locals.lecturers = lecturers;
// 	res.locals.news = news;

// 	res.render("index", {
// 		title: "Attendance System - Home",
// 		selectedLanguage,
// 		welcome: welcomeTranslation,
// 	});
// });

router.get("//post-graduate/marketing-innovation-technologyi", (req, res) => {
	let selectedLanguage = req.query.lang;
	if (selectedLanguage == undefined) {
		selectedLanguage = "id";
	}

	if (!["en", "id", "zh", "ja", "ko"].includes(selectedLanguage.toLowerCase()))
		selectedLanguage = "id";

	// req.session.selectedLanguage = selectedLanguage;

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

	const news = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, "../translations/berita/", `${selectedLanguage}.json`),
			"utf8"
		)
	);

	const hero = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../translations/home-hero/", `homeHero.json`), "utf8")
	);

	res.locals.hero = hero[selectedLanguage];
	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;
	res.locals.alumnies = alumnies;
	res.locals.lecturers = lecturers;
	res.locals.news = news;

	const department = translations.menus[1].label;
	const level = translations.menus[1].subMenus[1].label;
	const study = translations.menus[1].subMenus[1].subMenus[1].label;
	const pageTitle = `${department} - ${study}`;

	res.render("akademik//post-graduate/marketing-innovation-technologyi", {
		title: pageTitle,
		study,
		selectedLanguage,
		department,
		level,
	});
});

router.get("/comments", (req, res) => {
	let selectedLanguage = req.query.lang;
	let pageNumber = req.query.page;
	if (selectedLanguage == undefined) {
		selectedLanguage = "id";
	}

	if (pageNumber == undefined) {
		pageNumber = 1;
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

	res.render("comments", {
		title: "PTDI STTD - Public Comment",
		selectedLanguage,
		pageNumber,
	});
});

/* 
router.get("/alumni", (req, res) => {
	let selectedLanguage = req.query.lang;
	let pageNumber = req.query.page;
	if (selectedLanguage == undefined) {
		selectedLanguage = "id";
	}

	if (pageNumber == undefined) {
		pageNumber = 1;
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

	const detailAlumni = JSON.parse(
		fs.readFileSync(path.join(__dirname, "../translations/alumni/detailAlumni.json"), "utf8")
	);

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;
	res.locals.detailAlumni = detailAlumni;

	res.render("alumni", {
		title: "PTDI STTD - Alumni",
		selectedLanguage,
		pageNumber,
	});
}); */

router.get("/berita/:newsId?", (req, res) => {
	let selectedLanguage = req.query.lang;

	let newsId = req.params.newsId;

	if (selectedLanguage == undefined) {
		selectedLanguage = "id";
	}

	if (!LANGUAGE_CODE.includes(selectedLanguage.toLowerCase())) selectedLanguage = "id";

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

	const newsJson = JSON.parse(
		fs.readFileSync(
			path.join(__dirname, "../translations/berita/", `${selectedLanguage}.json`),
			"utf8"
		)
	);

	let news;
	if (newsId !== undefined) {
		news = searchById(newsJson.data, newsId);
	}

	res.locals.translations = translations;
	res.locals.footerTranslation = footerTranslation;
	res.locals.section = newsJson.section;
	res.locals.allNews = newsJson;
	res.locals.news = news;

	res.render("berita-terbaru", {
		title: `PTDI STTD - ${newsJson.section.title}`,
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

function searchById(data, id) {
	console.log("Search JSON by id: ", id);

	return data.find((item) => item.id === id);
}

module.exports = router;
