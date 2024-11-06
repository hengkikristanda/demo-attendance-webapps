const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const AlumniService = require("../../services/AlumniService");

const classList = {
	200: "success",
	201: "success",
	202: "success",
	400: "danger",
	401: "danger",
	402: "danger",
};

const messageList = {
	200: "Successfully Delete Alumni Data",
	201: "Successfully Create Alumni Data",
	202: "Successfully Update Alumni Data",
	400: "Failed to delete alumni data",
	401: "Failed to Create alumni data",
	402: "Failed to Update alumni data",
};

const getAlumni = async (req, res) => {
	res.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
	res.set("Pragma", "no-cache");
	res.set("Expires", "0");

	let alumniList = await AlumniService.findAllAlumniView({ raw: true });

	// Map the desired attribute (e.g., name) to a new object
	alumniList = alumniList.map((alumni) => {
		return {
			id: alumni.id,
			fullName: alumni["full_name"],
			generation: alumni.generation,
			job: alumni["job_position"],
			pos: alumni.pos,
			imageUrl: `/img/alumnies/${alumni["image_id"]}.${alumni["mime_type"].split("/")[1]}`,
			mimeType: alumni["mime_type"],
		};
	});

	const passedData = req.query.res;

	res.locals.responseMessage = messageList[passedData];
	res.locals.responseMessageClass = classList[passedData];

	res.render("memberArea/web/alumni/list", {
		title: "PTDI STTD - Our Alumni",
		alumniList,
	});
};

const getCreateAlumni = async (req, res) => {
	res.render("memberArea/web/alumni/create", {
		title: "PTDI STTD - Add New Alumni Data",
	});
};

const getUpdateAlumni = async (req, res) => {
	const alumniId = req.params.alumniId;

	let alumniData = await AlumniService.findAlumniViewById(alumniId);
	alumniData = alumniData.toJSON();

	alumniData = {
		id: alumniData.id,
		fullName: alumniData["full_name"],
		generation: alumniData.generation,
		job: alumniData["job_position"],
		pos: alumniData.pos,
		imageUrl: `/img/alumnies/${alumniData["image_id"]}.${alumniData["mime_type"].split("/")[1]}`,
		mimeType: alumniData["mime_type"],
	};

	res.locals.alumni = alumniData;

	res.render("memberArea/web/alumni/update", {
		title: "PTDI STTD - Update Alumni Data",
	});
};

const postCreateAlumni = async (req, res) => {
	try {
		// Get form data
		const fullName = req.body.fullName;
		const generation = req.body.generation;
		const jobPosition = req.body.jobPosition;
		const pos = req.body.displayOrder;

		// Check if file was uploaded
		let uploadedImagePath = null;
		if (req.file) {
			uploadedImagePath = req.file.path; // Get the uploaded file path
		}

		// Log data for debugging (in a real app, you'd save this to a database)
		console.log("Full Name:", fullName);
		console.log("Generation:", generation);
		console.log("Job Position:", jobPosition);
		console.log("Uploaded Image Path:", uploadedImagePath);

		const newAlumni = {
			full_name: fullName,
			generation,
			job_position: jobPosition,
			pos,
		};

		const createdAlumni = await AlumniService.createAlumni(newAlumni, uploadedImagePath);

		if (createdAlumni) {
			res.redirect(`/member/web/alumni?res=201`);
		} else {
			res.redirect(`/member/web/alumni?res=401`);
		}
	} catch (error) {
		console.error("Error handling form:", error);
		res.redirect(`/member/web/alumni?res=401`);
	}
};

const putUpdateAlumni = async (req, res) => {
	try {
		// Get form data
		const id = req.body.id;
		const fullName = req.body.fullName;
		const generation = req.body.generation;
		const jobPosition = req.body.jobPosition;
		const pos = req.body.displayOrder;

		// Check if file was uploaded
		let uploadedImagePath = null;
		if (req.file) {
			uploadedImagePath = req.file.path; // Get the uploaded file path
		}

		// Log data for debugging (in a real app, you'd save this to a database)
		console.log("Id:", id);
		console.log("Full Name:", fullName);
		console.log("Generation:", generation);
		console.log("Job Position:", jobPosition);
		console.log("Uploaded Image Path:", uploadedImagePath);

		const updatedAlumni = {
			full_name: fullName,
			generation,
			job_position: jobPosition,
			pos,
		};

		const updatedAlumniData = await AlumniService.updateAlumni(
			id,
			updatedAlumni,
			uploadedImagePath
		);

		if (updatedAlumniData) {
			res.redirect(`/member/web/alumni?res=202`);
		} else {
			res.redirect(`/member/web/alumni?res=402`);
		}
	} catch (error) {
		console.error("Error handling form:", error);
		res.redirect(`/member/web/alumni?res=402`);
	}
};

const deleteAlumni = async (req, res) => {
	const alumniId = req.params.alumniId;

	const deletedAlumni = await AlumniService.deleteAlumni(alumniId);
	if (deletedAlumni) {
		res.redirect(`/member/web/alumni?res=200`);
	} else {
		res.redirect(`/member/web/alumni?res=400`);
	}
};

module.exports = {
	getAlumni,
	getUpdateAlumni,
	getCreateAlumni,
	putUpdateAlumni,
	postCreateAlumni,
	deleteAlumni,
};
