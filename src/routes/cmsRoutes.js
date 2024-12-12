const express = require("express");
const axios = require("axios");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const combinedUpload = require("../config/multerCombinedConfig");
const documentUpload = require("../config/multerDocumentConfig");
const docImageUpload = require("../config/multerDocImageConfig");
const imageUpload = require("../config/multerImageConfig");
const verifyToken = require("../middlewares/verifyToken");
const uploadErrorHandler = require("../middlewares/uploadErrorHandler");

const { body, validationResult } = require("express-validator");
// const CommonUtils = require("../utils/commonUtils");

const FacilitiesController = require("../controllers/webAdmin/FacilitiesAdminController");
const SectionsController = require("../controllers/webAdmin/SectionsController");
const SimpleSectionsController = require("../controllers/webAdmin/SimpleSectionsController");
const CircleIconSectionsController = require("../controllers/webAdmin/CircleIconSectionsController");
const GallerySectionsController = require("../controllers/webAdmin/GallerySectionsController");
const AccordionSectionsController = require("../controllers/webAdmin/AccordionSectionsController");
const CtaSectionsController = require("../controllers/webAdmin/CtaSectionsController");
const OrganizationProfileController = require("../controllers/settings/OrganizationProfileController");
const UserProfileController = require("../controllers/settings/UserProfileController");
const AttendanceController = require("../controllers/employee/attendanceController");
const AssetsController = require("../controllers/AssetsController");
const LecturerAdminController = require("../controllers/webAdmin/LecturerAdminController");
const LeaderAdminController = require("../controllers/webAdmin/LeaderAdminController");

router.use(express.urlencoded({ extended: true }));

// Employee
// Live Attendance
router.get("/member/live-attendance", verifyToken, AttendanceController.getLiveAttendance);
router.post("/member/live-attendance", verifyToken, AttendanceController.postLiveAttendance);
router.get("/member/log-attendance", verifyToken, AttendanceController.getLogAttendance);
router.get("/member/report-attendance", verifyToken, AttendanceController.getReportAttendance);
router.get("/member/generate-report-attendance", verifyToken, AttendanceController.generateReport);

// Web Admin
// Lecturer
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

// Leaders
router.get("/member/web/leader", verifyToken, LeaderAdminController.getLeader);
router.get(
	"/member/web/leader/:leaderId/update",
	verifyToken,
	uploadErrorHandler,
	LeaderAdminController.getUpdateLeader
);
router.get("/member/web/leader/:leaderId/delete", verifyToken, LeaderAdminController.deleteLeader);
router.get("/member/web/leader/add", verifyToken, LeaderAdminController.getCreateLeader);
router.post(
	"/member/web/leader/add",
	imageUpload.single("profilePictureFile"),
	LeaderAdminController.postCreateLeader
);
router.post(
	"/member/web/leader/:leaderId/update",
	imageUpload.single("profilePictureFile"),
	uploadErrorHandler,
	LeaderAdminController.putUpdateLeader
);

// Facilities
router.get("/member/web/facilities", verifyToken, FacilitiesController.getFacilities);
router.get(
	"/member/web/facilities/header",
	verifyToken,
	FacilitiesController.getUpdateFacilitiesHeader
);
router.post(
	"/member/web/facilities/header",
	verifyToken,
	imageUpload.single("pageHeaderImageFile"),
	uploadErrorHandler,
	FacilitiesController.putUpdateFacilitiesHeader
);

router.post(
	"/member/web/facilities/facility-section",
	verifyToken,
	FacilitiesController.putUpdateFacilitiesSection
);

// Components
// Sections
router.get("/member/components/section", verifyToken, SectionsController.getSections);
router.get("/member/components/section/add", verifyToken, SectionsController.getSectionsAdd);
router.post(
	"/member/components/section/add",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	SectionsController.postSectionsAdd
);

router.get(
	"/member/components/section/:sectionId/delete",
	verifyToken,
	SectionsController.deleteSection
);

router.get(
	"/member/components/section/:sectionId/update",
	verifyToken,
	SectionsController.getSectionsUpdate
);
router.post(
	"/member/components/section/:sectionId/update",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	SectionsController.putSectionsUpdate
);

// Simple Section
// Sections
router.get("/member/components/section-simple", verifyToken, SimpleSectionsController.getSections);
router.get(
	"/member/components/section-simple/add",
	verifyToken,
	SimpleSectionsController.getSectionsAdd
);
router.post(
	"/member/components/section-simple/add",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	SimpleSectionsController.postSectionsAdd
);

router.get(
	"/member/components/section-simple/:sectionId/delete",
	verifyToken,
	SimpleSectionsController.deleteSection
);

router.get(
	"/member/components/section-simple/:sectionId/update",
	verifyToken,
	SimpleSectionsController.getSectionsUpdate
);
router.post(
	"/member/components/section-simple/:sectionId/update",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	SimpleSectionsController.putSectionsUpdate
);

// Gallery Section
// Sections
router.get(
	"/member/components/section-gallery",
	verifyToken,
	GallerySectionsController.getSections
);
router.get(
	"/member/components/section-gallery/add",
	verifyToken,
	GallerySectionsController.getSectionsAdd
);
router.post(
	"/member/components/section-gallery/add",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	GallerySectionsController.postSectionsAdd
);

router.get(
	"/member/components/section-gallery/:sectionId/delete",
	verifyToken,
	GallerySectionsController.deleteSection
);

router.get(
	"/member/components/section-gallery/:sectionId/update",
	verifyToken,
	GallerySectionsController.getSectionsUpdate
);

router.post(
	"/member/components/section-gallery/:sectionId/update",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	GallerySectionsController.putSectionsUpdate
);

// Accordion Section
// Sections
router.get(
	"/member/components/section-accordion",
	verifyToken,
	AccordionSectionsController.getSections
);
router.get(
	"/member/components/section-accordion/add",
	verifyToken,
	AccordionSectionsController.getSectionsAdd
);
router.post(
	"/member/components/section-accordion/add",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	AccordionSectionsController.postSectionsAdd
);

router.get(
	"/member/components/section-accordion/:sectionId/delete",
	verifyToken,
	AccordionSectionsController.deleteSection
);

router.get(
	"/member/components/section-accordion/:sectionId/update",
	verifyToken,
	AccordionSectionsController.getSectionsUpdate
);

router.post(
	"/member/components/section-accordion/:sectionId/update",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	AccordionSectionsController.putSectionsUpdate
);

// Section CTA
// Sections
router.get("/member/components/section-cta", verifyToken, CtaSectionsController.getSections);
router.get("/member/components/section-cta/add", verifyToken, CtaSectionsController.getSectionsAdd);
router.post(
	"/member/components/section-cta/add",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	CtaSectionsController.postSectionsAdd
);

router.get(
	"/member/components/section-cta/:sectionId/delete",
	verifyToken,
	CtaSectionsController.deleteSection
);

router.get(
	"/member/components/section-cta/:sectionId/update",
	verifyToken,
	CtaSectionsController.getSectionsUpdate
);

router.post(
	"/member/components/section-cta/:sectionId/update",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	CtaSectionsController.putSectionsUpdate
);

// Circle Icon Section
router.get(
	"/member/components/section-circle-image",
	verifyToken,
	CircleIconSectionsController.getSections
);
router.get(
	"/member/components/section-circle-image/add",
	verifyToken,
	CircleIconSectionsController.getSectionsAdd
);
router.post(
	"/member/components/section-circle-image/add",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	CircleIconSectionsController.postSectionsAdd
);

router.get(
	"/member/components/section-simple/:sectionId/delete",
	verifyToken,
	SimpleSectionsController.deleteSection
);

router.get(
	"/member/components/section-simple/:sectionId/update",
	verifyToken,
	SimpleSectionsController.getSectionsUpdate
);
router.post(
	"/member/components/section-simple/:sectionId/update",
	verifyToken,
	imageUpload.single("sectionDisplayImageFile"),
	uploadErrorHandler,
	SimpleSectionsController.putSectionsUpdate
);

// ===== Settings
// Organization Profile
router.get(
	"/member/settings/organization-profile",
	verifyToken,
	OrganizationProfileController.getOrganizationProfile
);
router.post(
	"/member/settings/organization-profile/:id/update",
	verifyToken,
	imageUpload.single("logoImageFile"),
	uploadErrorHandler,
	OrganizationProfileController.putOrganizationUpdate
);

router.get("/member/settings/user-profile", verifyToken, UserProfileController.getUserProfile);
router.post(
	"/member/settings/user-profile/:id/update",
	verifyToken,
	imageUpload.single("profilePictureFile"),
	uploadErrorHandler,
	UserProfileController.putUserProfile
);

router.get("/member/assets/images/:id", verifyToken, AssetsController.getImage);

module.exports = router;
