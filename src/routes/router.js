const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();

const siteMenuServices = require("../services/siteMenuServices");

// Middleware to parse the body of POST requests
router.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
	res.render("index", {
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

router.post("/absensi", (req, res) => {
});

router.post("/login", (req, res) => {
	res.redirect("/home-employee");
});

module.exports = router;
