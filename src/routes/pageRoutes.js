const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

// const CommonUtils = require("../utils/commonUtils");

const Dispatcher = require("../controllers/dispatcherController");

router.use(express.urlencoded({ extended: true }));

router.get("/organizational-structure", Dispatcher.getOrganizationalStructure);
router.get("/our-leaders", Dispatcher.getOurLeaders);
router.get("/training", Dispatcher.getTraining);
router.get("/training/details", Dispatcher.getDetailTraining);
router.get("/training/registration", Dispatcher.getTrainingRegistration);

module.exports = router;
