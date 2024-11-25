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
const GallerySectionsController = require("../controllers/webAdmin/GallerySectionsController");
const AccordionSectionsController = require("../controllers/webAdmin/AccordionSectionsController");
const CtaSectionsController = require("../controllers/webAdmin/CtaSectionsController");
const OrganizationProfileController = require("../controllers/settings/OrganizationProfileController");

router.use(express.urlencoded({ extended: true }));

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
router.get(
	"/member/components/section-cta",
	verifyToken,
	CtaSectionsController.getSections
);
router.get(
	"/member/components/section-cta/add",
	verifyToken,
	CtaSectionsController.getSectionsAdd
);
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

module.exports = router;
