const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const LeadersService = require("../../services/Leaders/LeadersService");
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

const getLeader = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		const leaderList = await LeadersService.findAll("pos", true);

		const leaderListData = leaderList.map((leader) => {
			return {
				id: leader.id,
				fullName: leader.full_name,
				jobPosition: leader.job_position,
				pos: leader.pos,
				imageUrl: CommonUtils.getImageUrlPath(
					leader,
					"/img/leaders",
					"/img/profile-picture-placeholder.jpeg"
				),
			};
		});

		res.locals.leaderList = leaderListData;

		const alertMessage = req.flash("alertMessage");
		return res.render("memberArea/web/leader/list", {
			title: "PTDI STTD - Leader",
			alertMessage: alertMessage[0],
			pageHeader: { heading: "Leader", subheading: "Our Leader" },
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

const getCreateLeader = async (req, res) => {
	try {
		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		const alertMessage = req.flash("alertMessage");
		return res.render("memberArea/web/leader/create", {
			title: "PTDI STTD - Leader",
			alertMessage: alertMessage[0],
			pageHeader: { heading: "Leader", subheading: "Add New Leader" },
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: error.message,
			className: "danger",
		});
		return res.redirect("/member/web/leader");
	}
};

const getUpdateLeader = async (req, res) => {
	try {
		const leaderId = req.params.leaderId;

		const existingLeader = await LeadersService.findLeaderById(leaderId, true);
		if (!existingLeader) {
			throw new Error("Unable to update Leader data. Data not found!");
		}

		const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
		res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

		existingLeader.imageUrl = CommonUtils.getImageUrlPath(
			existingLeader,
			`/img/leaders`,
			"/img/profile-picture-placeholder.jpeg"
		);

		res.locals.leaderProfile = {
			id: existingLeader.id,
			fullName: existingLeader.full_name,
			jobPosition: existingLeader.job_position,
			displayOrder: existingLeader.pos,
			imageUrl: existingLeader.imageUrl,
		};

		const alertMessage = req.flash("alertMessage");

		return res.render("memberArea/web/leader/update", {
			title: "PTDI STTD - Leader",
			alertMessage: alertMessage[0],
			pageHeader: { heading: "Leader", subheading: "Update Leader" },
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: error.message,
			className: "danger",
		});
		return res.redirect("/member/web/leader");
	}
};

const postCreateLeader = async (req, res) => {
	try {
		const { fullName, jobPosition, displayOrder } = req.body;

		const createdLeader = await LeadersService.createLeader(
			{
				full_name: fullName,
				job_position: jobPosition,
				pos: displayOrder,
			},
			req.file
		);

		if (!createdLeader) throw new Error("Failed to Create Leader");

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Add Leader",
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
	return res.redirect("/member/web/leader");
};

const putUpdateLeader = async (req, res) => {
	try {
		const leaderId = req.params.leaderId;
		const existingLeader = await LeadersService.findLeaderById(leaderId);
		if (!existingLeader) {
			throw new Error("Failed to update Leader. No Leader found for the provided id: " + leaderId);
		}

		const { fullName, jobPosition, displayOrder } = req.body;

		existingLeader.full_name = fullName;
		existingLeader.job_position = jobPosition;
		existingLeader.pos = displayOrder;

		const updatedLeaderData = await LeadersService.updateLeader(existingLeader, req.file);

		if (!updatedLeaderData) throw new Error("Failed to Update Leader");

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Update Leader",
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
	return res.redirect("/member/web/leader");
};

const deleteLeader = async (req, res) => {
	try {
		const leaderId = req.params.leaderId;

		const deletedLecturer = await LeadersService.deleteLeader(leaderId);
		if (!deletedLecturer) {
			throw new Error("Failed to delete Leader. Please try again later");
		}
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Successfully Delete Leader",
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
	return res.redirect("/member/web/leader");
};

module.exports = {
	getLeader,
	getUpdateLeader,
	getCreateLeader,
	putUpdateLeader,
	postCreateLeader,
	deleteLeader,
};
