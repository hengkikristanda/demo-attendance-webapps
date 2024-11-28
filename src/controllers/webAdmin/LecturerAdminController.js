const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const LecturerService = require("../../services/Lecturer/LecturerService");
const LecturerDetailService = require("../../services/Lecturer/LecturerDetailService");
const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService");
const CommonUtils = require("../../utils/CommonUtils");
const { Lecturer } = require("../../model/Lecturer/Lecturer");

const classList = {
	200: "success",
	201: "success",
	202: "success",
	400: "danger",
	401: "danger",
	402: "danger",
	403: "danger",
};

const messageList = {
	200: "Successfully Delete Lecturer Data",
	201: "Successfully Create Lecturer Data",
	202: "Successfully Update Lecturer Data",
	400: "Failed to delete Lecturer data",
	401: "Failed to Create Lecturer data",
	402: "Failed to Update Lecturer data",
	403: "Unable to Update Lecturer. Please try again later",
};

const getLecturer = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		let lecturerList = await LecturerService.findAll("pos", true);

		// Map the desired attribute (e.g., name) to a new object
		lecturerList = lecturerList.map((lecturer) => {
			return {
				id: lecturer.id,
				fullName: lecturer.full_name,
				emailAddress: lecturer.email_address,
				pos: lecturer.pos,
				imageUrl: CommonUtils.getImageUrlPath(lecturer, "/img/lecturer"),
			};
		});

		res.locals.lecturerList = lecturerList;

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/web/lecturer/list", {
			title: "PTDI STTD - Lecturer",
			alertMessage: alertMessage[0],
			pageHeader: { heading: "Lecturer", subheading: "Our Lecturer" },
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
			actionLink: "/users/login",
			actionLinkLabel: "Back to login page",
		});
		return res.redirect("/error");
	}
};

const getCreateLecturer = async (req, res) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const startYear = 1965;
	const currentYear = new Date().getFullYear();

	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		const alertMessage = req.flash("alertMessage");
		return res.render("memberArea/web/lecturer/create", {
			title: "PTDI STTD - Lecturer",
			alertMessage: alertMessage[0],
			pageHeader: { heading: "Lecturer", subheading: "Add New Lecturer" },
			monthNames,
			startYear,
			currentYear,
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: error.message,
			className: "danger",
		});
		return res.redirect("/member/web/lecturer");
	}
};

const getUpdateLecturer = async (req, res) => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const startYear = 1965;
	const currentYear = new Date().getFullYear();

	const lecturerId = req.params.lecturerId;

	const lecturer = await LecturerService.findLecturerView(lecturerId);
	if (!lecturer) {
		return res.redirect(`/member/web/lecturer?res=403`);
	}
	const lecturerDetail = await LecturerDetailService.findDetailByLecturerId(lecturerId);
	if (!lecturerDetail) {
		return res.redirect(`/member/web/lecturer?res=403`);
	}

	const lecturerData = lecturer.toJSON();

	const originalDocFileName = CommonUtils.getOriginalFileNameWithExt(
		lecturerData.doc_filename,
		lecturerData.doc_type
	);

	if (originalDocFileName != undefined) {
		lecturerData.doc_filename = originalDocFileName;
	}

	const originalImageFileName = CommonUtils.getOriginalFileNameWithExt(
		lecturerData.image_id,
		lecturerData.image_type
	);

	if (originalImageFileName != undefined) {
		lecturerData.image_filename = `/img/lecturer/${originalImageFileName}`;
	}

	lecturerData.profesionalExperience = [];
	const profesionalExperience = lecturerDetail
		.filter((item) => item.type === "work") // Filter items with type "work"
		.map((item) => {
			const profExp = {
				id: item.id,
				jobTitle: item.job_title,
				organizationName: item.organization_name,
				lecturer_id: item.lecturer_id,
				type: "profExpContainer",
				isCurrentlyWorking: item.present.toLowerCase() === "y",
				startMonth: item.start_month,
				startYear: item.start_year,
				endMonth: item.end_month,
				endYear: item.end_year,
				start_date: `${CommonUtils.getMonthName(item.start_month)} ${item.start_year}`,
				end_date:
					item.present.toLowerCase() === "y"
						? "Present"
						: `${CommonUtils.getMonthName(item.end_month)} ${item.end_year}`,
			};

			return profExp;
		});

	if (profesionalExperience) {
		lecturerData.profesionalExperience = profesionalExperience;
	}

	lecturerData.educationBackground = [];
	const educationBackground = lecturerDetail
		.filter((item) => item.type === "education") // Filter items with type "education"
		.map((item) => {
			const eduBg = {
				id: item.id,
				jobTitle: item.job_title,
				organizationName: item.organization_name,
				lecturer_id: item.lecturer_id,
				type: "eduBgContainer",
				startMonth: item.start_month,
				startYear: item.start_year,
				endMonth: item.end_month,
				endYear: item.end_year,
				start_date: `${CommonUtils.getMonthName(item.start_month)} ${item.start_year}`,
				end_date: `${CommonUtils.getMonthName(item.end_month)} ${item.end_year}`,
			};
			return eduBg;
		});

	if (educationBackground) {
		lecturerData.educationBackground = educationBackground;
	}

	lecturerData.researchActivity = [];
	const researchActivity = lecturerDetail
		.filter((item) => item.type === "research") // Filter items with type "education"
		.map((item) => {
			const research = {
				id: item.id,
				jobTitle: item.job_title,
				type: "researchActivitiesContainer",
			};
			return research;
		});
	if (researchActivity) {
		lecturerData.researchActivity = researchActivity;
	}

	res.render("memberArea/web/lecturer/update", {
		title: "PTDI STTD - Update Lecturer",
		monthNames,
		startYear,
		currentYear,
		lecturerData,
	});
};

const postCreateLecturer = async (req, res) => {
	/* try {
		// Get form data
		const fullName = req.body.fullName;
		const emailAddress = req.body.emailAddress;
		const pos = req.body.displayOrder;
		const profesionalExperienceItems = JSON.parse(req.body.profesionalExperienceItems);
		const educationBackgroundItems = JSON.parse(req.body.educationBackgroundItems);
		const researchActivityItems = JSON.parse(req.body.researchActivityItems);

		const imageFile = req.files["profilePictureFile"] ? req.files["profilePictureFile"][0] : null;

		// Check if image was uploaded
		let uploadedImagePath = null;
		if (imageFile) {
			uploadedImagePath = imageFile.path; // Get the uploaded file path
		}

		const documentFile = req.files["documentFile"] ? req.files["documentFile"][0] : null;
		// Check if image was uploaded
		let uploadedDocumentPath = null;
		if (documentFile) {
			uploadedDocumentPath = documentFile.path; // Get the uploaded file path
		}

		const newLecturer = {
			full_name: fullName,
			email_address: emailAddress,
			pos,
			uploadedImagePath,
			uploadedDocumentPath,
			originalDocumentName: documentFile.originalname,
			profesionalExperienceItems,
			educationBackgroundItems,
			researchActivityItems,
		};

		const createdLecturer = await LecturerService.createLecturer(newLecturer);

		if (createdLecturer) {
			res.redirect(`/member/web/lecturer?res=201`);
		} else {
			res.redirect(`/member/web/lecturer?res=401`);
		}
	} catch (error) {
		console.error("Error handling form:", error);
		res.redirect(`/member/web/lecturer?res=401`);
	} */

	try {
		const { fullName, emailAddress, displayOrder } = req.body;

		const lecturerData = {
			full_name: fullName,
			email_address: emailAddress,
			pos: displayOrder,
		};

		const profesionalExperienceItems = JSON.parse(req.body.profesionalExperienceItems);
		const educationBackgroundItems = JSON.parse(req.body.educationBackgroundItems);
		const researchActivityItems = JSON.parse(req.body.researchActivityItems);

		const imageFile = req.files["profilePictureFile"] ? req.files["profilePictureFile"][0] : null;

		if (imageFile) {
			const uploadedImage = await CommonUtils.handleUploadedFile(
				imageFile,
				"profilePictureFile-",
				"public/img/lecturer/"
			);
			lecturerData.image_id = uploadedImage.id;
			lecturerData.image_mime_type = uploadedImage.mime_type;
			lecturerData.image_original_filename = uploadedImage.original_filename;
		}

		const documentFile = req.files["documentFile"] ? req.files["documentFile"][0] : null;

		if (documentFile) {
			const uploadedDocument = await CommonUtils.handleUploadedFile(
				documentFile,
				"documentFile-",
				"public/docs/lecturer-cv/"
			);
			lecturerData.cv_docs = uploadedDocument.id;
			lecturerData.cv_docs_mime_type = uploadedDocument.mime_type;
			lecturerData.cv_docs_original_filename = uploadedDocument.original_filename;
		}

		const createdLecturer = await LecturerService.createLecturer(lecturerData, {
			profesionalExperienceItems,
			educationBackgroundItems,
			researchActivityItems,
		});

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Add Lecturer",
			className: "success",
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: error.message,
			className: "danger",
		});
	}
	return res.redirect("/member/web/lecturer");
};

const putUpdateLecturer = async (req, res) => {
	try {
		// Get form data
		const lecturerId = req.body.lecturerId;

		const existingLecturer = await LecturerService.findLecturerById(lecturerId);
		if (!existingLecturer) {
			console.log(`No Lecturer found for the provided lecturer id: ${lecturerId}`);
			return res.redirect(`/member/web/lecturer?res=402`);
		}

		const fullName = req.body.fullName;
		const emailAddress = req.body.emailAddress;
		const pos = req.body.displayOrder;
		const profesionalExperienceItems = JSON.parse(req.body.profesionalExperienceItems);
		const educationBackgroundItems = JSON.parse(req.body.educationBackgroundItems);
		const researchActivityItems = JSON.parse(req.body.researchActivityItems);

		const newLecturer = {
			full_name: fullName,
			email_address: emailAddress,
			pos,
			profesionalExperienceItems,
			educationBackgroundItems,
			researchActivityItems,
		};

		const imageFile = req.files["profilePictureFile"] ? req.files["profilePictureFile"][0] : null;

		// Check if image was uploaded
		let uploadedImagePath = null;
		if (imageFile) {
			uploadedImagePath = imageFile.path; // Get the uploaded file path
			newLecturer.uploadedImagePath = uploadedImagePath;
		}

		const documentFile = req.files["documentFile"] ? req.files["documentFile"][0] : null;
		// Check if image was uploaded
		let uploadedDocumentPath = null;
		if (documentFile) {
			uploadedDocumentPath = documentFile.path; // Get the uploaded file path
			newLecturer.uploadedDocumentPath = uploadedDocumentPath;
			newLecturer.originalDocumentName = documentFile.originalname;
		}

		const updatedLecturer = await LecturerService.updateLecturer(lecturerId, newLecturer);

		if (updatedLecturer) {
			res.redirect(`/member/web/lecturer?res=202`);
		} else {
			res.redirect(`/member/web/lecturer?res=402`);
		}
	} catch (error) {
		console.error("Error handling form:", error);
		res.redirect(`/member/web/lecturer?res=402`);
	}
};

const deleteLecturer = async (req, res) => {
	try {
		const lecturerId = req.params.lecturerId;

		const deletedLecturer = await LecturerService.deleteLecturer(lecturerId);
		if (!deletedLecturer) {
			throw new Error("Failed to delete lecturer. Please try again later");
		}
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Delete Lecturer",
			className: "success",
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: error.message,
			className: "danger",
		});
	}
	return res.redirect("/member/web/lecturer");
};

module.exports = {
	getLecturer,
	getUpdateLecturer,
	getCreateLecturer,
	putUpdateLecturer,
	postCreateLecturer,
	deleteLecturer,
};
