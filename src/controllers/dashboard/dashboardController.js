const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const getDashboard = async (req, res) => {
	res.render("memberArea/dashboard/home/index", {
		title: "PTDI STTD - Dashboard",
	});
};

const getHome = async (req, res) => {
	res.render("memberArea/dashboard/inbox/index", {
		title: "PTDI STTD - Inbox",
	});
};

module.exports = {
	getDashboard,
	getHome,
};
