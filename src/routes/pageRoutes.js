const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const combinedUpload = require("../config/multerCombinedConfig");
const documentUpload = require("../config/multerDocumentConfig");
const imageUpload = require("../config/multerImageConfig");
const verifyToken = require("../middlewares/verifyToken");

const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const Dispatcher = require("../controllers/dispatcherController");
const AccountDispatcher = require("../controllers/accountDispatcher");

const DashboardController = require("../controllers/dashboard/dashboardController");
const AttendanceController = require("../controllers/employee/attendanceController");
const AlumniAdminController = require("../controllers/webAdmin/AlumniAdminController");
const LecturerAdminController = require("../controllers/webAdmin/LecturerAdminController");
const NewsAdminController = require("../controllers/webAdmin/NewsAdminController");
const PostGraduateAdminController = require("../controllers/webAdmin/PostGraduateAdminController");

const Undergraduate = require("../controllers/UndergraduateController");
const Postgraduate = require("../controllers/PostgraduateController");

const NewsController = require("../controllers/web/news/newsController");

const { body, validationResult } = require("express-validator");
// const CommonUtils = require("../utils/commonUtils");

const sanitizeCommentInput = [
	// Trim spaces and escape special characters to prevent XSS
	body("fullName").trim().escape(),
	body("emailAddress").normalizeEmail(),
	body("phoneNumber").trim().escape(),
	body("comment").trim().escape(),
];

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "uploads/"); // Specify the folder to save the images
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname)); // Append extension
	},
});
const upload = multer({ storage: storage });

router.use(express.urlencoded({ extended: true }));

// Home Page / Index
router.get("/", Dispatcher.getHome);

router.get("/alumni", Dispatcher.getAlumni);
router.get("/public-comments", Dispatcher.getPublicComments);
router.post(
	"/public-comments",
	sanitizeCommentInput,
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.redirect("/");
		}
		next();
	},
	Dispatcher.submitComment
);

router.get("/complaints", Dispatcher.getComplaints);

// News
router.get("/news/:newsId?", NewsController.getNews);

// About Us
router.get("/history", Dispatcher.getHistory);
router.get("/duties", Dispatcher.getDuties);
router.get("/our-purpose", Dispatcher.getOurPurpose);
router.get("/organizational-structure", Dispatcher.getOrganizationalStructure);
router.get("/our-leaders", Dispatcher.getOurLeaders);
router.get("/facilities", Dispatcher.getFacilities);

//Academics
router.get("/lecturers", Dispatcher.getLecturers);

router.get("/training", Dispatcher.getTraining);
router.get("/training/registration", Dispatcher.getTrainingRegistration);

//Academics Under Graduate
router.get(
	"/undergraduate/associate-road-transportation-management",
	Undergraduate.getAssociateRoadTransportationManagement
);

router.get(
	"/undergraduate/associate-railway-transportation-management",
	Undergraduate.getAssociateRailwayTransportationManagement
);

router.get(
	"/undergraduate/applied-bachelor-land-transportation-management",
	Undergraduate.getAppliedBachelorLandTransportationManagement
);

router.get(
	"/undergraduate/applied-bachelor-automotive-engineering-technology",
	Undergraduate.getAppliedBachelorAutomotiveEngineeringTechnology
);

//Academics Post Graduate
router.get(
	"/postgraduate/marketing-innovation-technology",
	Postgraduate.getPostGraduateMarketingInnovationTechnology
);

router.get("/postgraduate/safety-risk-engineering", Postgraduate.getSafetyRiskEngineering);

//Member Login
router.get("/users/login", AccountDispatcher.getLogin);
router.post("/users/login", AccountDispatcher.postLogin);
router.get("/users/forgot-password", AccountDispatcher.getResetPassword);
router.post("/users/register", AccountDispatcher.postRegisterUser);
router.get("/users/logout", verifyToken, AccountDispatcher.logout);

//Member area Dashboard
router.get("/member/dashboard", verifyToken, DashboardController.getDashboard);
router.get("/member/inbox", verifyToken, DashboardController.getHome);

//Employee
router.get("/member/live-attendance", verifyToken, AttendanceController.getLiveAttendance);
router.get("/member/log-attendance", verifyToken, AttendanceController.getLogAttendance);
router.post("/member/live-attendance", verifyToken, AttendanceController.postLiveAttendance);
router.get("/member/report-attendance", verifyToken, AttendanceController.getReportAttendance);
router.get("/member/generate-report-attendance", verifyToken, AttendanceController.generateReport);

// CMS Alumni
router.get("/member/web/alumni", verifyToken, AlumniAdminController.getAlumni);
router.get(
	"/member/web/alumni/:alumniId/update",
	verifyToken,
	AlumniAdminController.getUpdateAlumni
);
router.get("/member/web/alumni/:alumniId/delete", verifyToken, AlumniAdminController.deleteAlumni);
router.get("/member/web/alumni/add", verifyToken, AlumniAdminController.getCreateAlumni);
router.post(
	"/member/web/alumni/add",
	upload.single("profilePictureFile"),
	AlumniAdminController.postCreateAlumni
);

router.post(
	"/member/web/alumni/update",
	upload.single("profilePictureFile"),
	AlumniAdminController.putUpdateAlumni
);

// CMS Lecturer
router.get("/member/web/lecturer", verifyToken, LecturerAdminController.getLecturer);
router.get(
	"/member/web/lecturer/:lecturerId/update",
	verifyToken,
	LecturerAdminController.getUpdateLecturer
);
router.get(
	"/member/web/lecturer/:lecturerId/delete",
	verifyToken,
	LecturerAdminController.deleteLecturer
);
router.get("/member/web/lecturer/add", verifyToken, LecturerAdminController.getCreateLecturer);
router.post("/member/web/lecturer/add", combinedUpload, LecturerAdminController.postCreateLecturer);
router.post(
	"/member/web/lecturer/update",
	combinedUpload,
	LecturerAdminController.putUpdateLecturer
);

// News
router.get("/member/web/news", verifyToken, NewsAdminController.getNews);
router.get("/member/web/news/add", verifyToken, NewsAdminController.getCreateNews);
router.post(
	"/member/web/news/preview",
	upload.none(),
	verifyToken,
	NewsAdminController.previewNews
);

router.post(
	"/member/web/news/add",
	upload.single("displayImage"),
	verifyToken,
	NewsAdminController.postCreateNews
);
router.get("/member/web/news/:newsId/delete", verifyToken, NewsAdminController.deleteNews);

// Post Graduate
router.get("/member/web/postgraduate", verifyToken, PostGraduateAdminController.getPostgraduate);
router.get(
	"/member/web/postgraduate/:webPageId",
	verifyToken,
	PostGraduateAdminController.getPostgraduateProgram
);
router.post(
	"/member/web/postgraduate/studyProgram/update",
	verifyToken,
	documentUpload.single("documentFile"),
	PostGraduateAdminController.putUpdatePostgraduateProgram
);

router.post(
	"/member/web/postgraduate/section/update",
	verifyToken,
	imageUpload.single("displayImage"),
	PostGraduateAdminController.putUpdatePostgraduateProgramSection
);

module.exports = router;
