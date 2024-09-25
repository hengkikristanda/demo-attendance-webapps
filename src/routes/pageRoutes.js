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

module.exports = router;
