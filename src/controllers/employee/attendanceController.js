const express = require("express");
const ExcelJS = require("exceljs");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const moment = require("moment-timezone");
const AttendanceService = require("../../services/AttendanceService");
const UserService = require("../../services/UserService");
const CmsMenuService = require("../../services/CmsMenuService")

const classList = {
	200: "success",
	201: "success",
	400: "danger",
	401: "danger",
};

const messageList = {
	200: "Successfully Clocked In",
	201: "Successfully Clocked Out",
	400: "Failed to Clocked In. Please try again later",
	401: "Failed to Clocked Out. Please try again later",
};

const getLiveAttendance = async (req, res) => {
	const loggedInUserId = req.user.userId;

	const existingUser = await UserService.findById(loggedInUserId);
	if (!existingUser) {
		throw new Error("No user found for the provided userId: " + loggedInUserId);
	}

	const hasClockedIn = await AttendanceService.hasClockedInToday(loggedInUserId);
	if (hasClockedIn) {
		console.log("User has already clocked in today.");
	}
	const hasClockedOut = await AttendanceService.hasClockedOutToday(loggedInUserId);
	if (hasClockedOut) {
		console.log("User has already clocked out today.");
	}

	const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
	res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

	const responseCode = req.query.res;

	res.locals.responseMessage = messageList[responseCode];
	res.locals.responseMessageClass = classList[responseCode];
	res.locals.hasClockedIn = hasClockedIn;
	res.locals.hasClockedOut = hasClockedOut;

	res.render("memberArea/employee/liveAttendance/index", {
		title: "PTDI STTD - Live Attendance",
		loggedInUserId: req.user.userId,
	});
};

const postLiveAttendance = async (req, res) => {
	try {
		const loggedInUserId = req.user.userId;

		const existingUser = UserService.findById(loggedInUserId);
		if (!existingUser) {
			throw new Error("No user found for the provided userId: " + loggedInUserId);
		}

		const clockedTime = req.body.clockedTime;
		const mysqlDatetime = moment(clockedTime, "MM/DD/YYYY, hh:mm:ss A").format(
			"YYYY-MM-DD HH:mm:ss"
		);

		const clockedLocation = req.body.clockedLocation;
		const [latitudeStr, longitudeStr] = clockedLocation.split(";");
		const latitude = parseFloat(latitudeStr);
		const longitude = parseFloat(longitudeStr);

		if (!isNaN(latitude) && !isNaN(longitude)) {
			const clockedType = req.body.clockedType;

			if (clockedType && clockedType == "clockedIn") {
				const attendanceResult = await AttendanceService.createAttendance({
					user_id: loggedInUserId,
					latitude: latitude,
					longitude: longitude,
					clocked_in: mysqlDatetime, // or any other Date value as needed
				});

				if (!attendanceResult) {
					return res.redirect("/member/live-attendance?res=400");
				}

				return res.redirect("/member/live-attendance?res=200");
			} else if (clockedType && clockedType == "clockedOut") {
				const todayAttendance = await AttendanceService.todayClockedIn(loggedInUserId);

				if (todayAttendance) {
					todayAttendance.clocked_out = mysqlDatetime;
					const attendanceResult = await AttendanceService.updateAttendance(todayAttendance);
					if (!attendanceResult) {
						return res.redirect("/member/live-attendance?res=401");
					}
					return res.redirect("/member/live-attendance?res=201");
				}
			}
		}

		return res.redirect("/member/live-attendance?res=201");
		// res.render("memberArea/employee/liveAttendance/index", {
		// 	title: "PTDI STTD - Live Attendance",
		// 	loggedInUserId: req.user.userId,
		// });
	} catch (error) {
		console.error(error);
	}
};

const getReportAttendance = async (req, res) => {
	const loggedInUserId = req.user.userId;

	const existingUser = await UserService.findById(loggedInUserId);
	if (!existingUser) {
		throw new Error("No user found for the provided userId: " + loggedInUserId);
	}

	const hasClockedIn = await AttendanceService.hasClockedInToday(loggedInUserId);
	if (hasClockedIn) {
		console.log("User has already clocked in today.");
	}
	const hasClockedOut = await AttendanceService.hasClockedOutToday(loggedInUserId);
	if (hasClockedOut) {
		console.log("User has already clocked out today.");
	}

	const responseCode = req.query.res;

	res.locals.responseMessage = messageList[responseCode];
	res.locals.responseMessageClass = classList[responseCode];
	res.locals.hasClockedIn = hasClockedIn;
	res.locals.hasClockedOut = hasClockedOut;

	const mappedMenuList = await UserService.findMappedMenuByUserRoleId(req.user.userRole);
	res.locals.cmsMenuList = await CmsMenuService.groupingMenus(mappedMenuList);

	res.render("memberArea/employee/reportAttendance/index", {
		title: "PTDI STTD - Live Attendance",
		loggedInUserId: req.user.userId,
	});
};

const generateReport = async (req, res) => {
	try {
		// Fetch attendance data using AttendanceService
		const rows = await AttendanceService.findAll();

		// Create a new workbook and worksheet
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet("Oktober 2024");

		const borderFull = {
			top: { style: "thin" },
			left: { style: "thin" },
			bottom: { style: "thin" },
			right: { style: "thin" },
		};

		// Add a title and merge cells
		worksheet.mergeCells("A2:AF2"); // Merges cells from A1 to F3
		worksheet.getCell("A2").value = "POLITEKNIK TRANSPORTASI DARAT INDONESIA - STTD";
		worksheet.getCell("A2").font = { size: 16, bold: true }; // Set font size and bold
		worksheet.getCell("A2").alignment = { vertical: "middle", horizontal: "center" }; // Center alignment

		worksheet.mergeCells("A4:AF4"); // Merges cells from A1 to F3
		worksheet.getCell("A4").value = "Rekapitulasi Daftar Hadir";
		worksheet.getCell("A4").font = { size: 16, bold: true }; // Set font size and bold
		worksheet.getCell("A4").alignment = { vertical: "middle", horizontal: "center" }; // Center alignment

		worksheet.mergeCells("A5:AF5"); // Merges cells from A1 to F3
		worksheet.getCell("A5").value = "Bulan Oktober 2024";
		worksheet.getCell("A5").font = { size: 12 }; // Set font size and bold
		worksheet.getCell("A5").alignment = { vertical: "middle", horizontal: "center" }; // Center alignment

		worksheet.mergeCells("A7:A11"); // Merges cells from A1 to F3
		worksheet.getCell("A7").value = "No";
		worksheet.getCell("A7").font = { size: 12, bold: true }; // Set font size and bold
		worksheet.getCell("A7").alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
		worksheet.getCell("A7").border = borderFull;

		worksheet.mergeCells("B7:B11"); // Merges cells from A1 to F3
		worksheet.getCell("B7").value = "Nama/NIP";
		worksheet.getCell("B7").font = { size: 12, bold: true }; // Set font size and bold
		worksheet.getCell("B7").alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
		worksheet.getCell("B7").border = borderFull;

		worksheet.mergeCells("C7:R7"); // Merges cells from A1 to F3
		worksheet.getCell("C7").value = "Tanggal";
		worksheet.getCell("C7").font = { size: 12, bold: true }; // Set font size and bold
		worksheet.getCell("C7").alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
		worksheet.getCell("C7").border = borderFull;

		worksheet.mergeCells("S7:AF7"); // Merges cells from A1 to F3
		worksheet.getCell("S7").value = "Jumlah";
		worksheet.getCell("S7").font = { size: 12, bold: true }; // Set font size and bold
		worksheet.getCell("S7").alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
		worksheet.getCell("S7").border = borderFull;

		let columnIndex = 3; // Column C is the 3rd column
		let currentRow = 8;
		for (let i = 1; i <= 31; i++) {
			// 16 cells from C to R
			worksheet.getCell(currentRow, columnIndex).font = { size: 12, bold: true }; // Set font size and bold
			worksheet.getCell(currentRow, columnIndex).value = i; // Set row 8, current column
			worksheet.getColumn(columnIndex).width = 5;
			worksheet.getColumn(columnIndex).alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
			worksheet.getCell(currentRow, columnIndex).border = borderFull;
			columnIndex++;
			if (i == 16) {
				currentRow++;
				columnIndex = 3;
			}
		}

		columnIndex = 3; // Column C is the 3rd column
		currentRow = 10;
		for (let i = 1; i <= 16; i++) {
			// 16 cells from C to R
			worksheet.getCell(currentRow, columnIndex).font = { size: 12, bold: true }; // Set font size and bold
			worksheet.getCell(currentRow, columnIndex).value = "TM"; // Set row 8, current column
			worksheet.getColumn(columnIndex).width = 5;
			worksheet.getColumn(columnIndex).alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
			worksheet.getCell(currentRow, columnIndex).border = borderFull;
			columnIndex++;
		}

		columnIndex = 3; // Column C is the 3rd column
		currentRow = 11;
		for (let i = 1; i <= 16; i++) {
			// 16 cells from C to R
			worksheet.getCell(currentRow, columnIndex).font = { size: 12, bold: true }; // Set font size and bold
			worksheet.getCell(currentRow, columnIndex).value = "PC"; // Set row 8, current column
			worksheet.getColumn(columnIndex).width = 5;
			worksheet.getColumn(columnIndex).alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
			worksheet.getCell(currentRow, columnIndex).border = borderFull;
			columnIndex++;
		}

		const attendanceCode = [
			"H",
			"M",
			"CA",
			"CB",
			"CT",
			"CBS",
			"DL",
			"IP",
			"PSN",
			"S",
			"TB",
			"CS",
			"TERLAMBAT MASUK",
			"CEPAT PULANG",
		];

		columnIndex = 19; // Column S
		currentRow = 8;
		attendanceCode.forEach((code) => {
			worksheet.mergeCells(currentRow, columnIndex, currentRow + 3, columnIndex);
			worksheet.getCell(currentRow, columnIndex).value = code; // Set row 8, current column
			worksheet.getCell(currentRow, columnIndex).font = { size: 12, bold: true }; // Set font size and bold
			worksheet.getColumn(columnIndex).width = 5;
			worksheet.getColumn(columnIndex).alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
			worksheet.getCell(currentRow, columnIndex).border = borderFull;
			columnIndex++;
		});

		// Define columns in the worksheet (start headers from row 5 to avoid overlap with the title)
		// worksheet.getRow(5).values = ["User ID", "Clocked In", "Clocked Out"];
		// worksheet.columns = [
		// 	{ key: "id", width: 36 },
		// 	{ key: "user_id", width: 36 },
		// 	{ key: "latitude", width: 15 },
		// 	{ key: "longitude", width: 15 },
		// 	{ key: "clocked_in", width: 20 },
		// 	{ key: "clocked_out", width: 20 },
		// ];

		// Style the header row
		// worksheet.getRow(5).font = { bold: true };
		// worksheet.getRow(5).alignment = { horizontal: "center" };

		// Add rows to the worksheet (start adding data from row 6)

		worksheet.columns = [
			{ key: "no", width: 36 },
			{ key: "user_id", width: 36 },
			{ key: "latitude", width: 15 },
			{ key: "longitude", width: 15 },
			{ key: "clocked_in", width: 20 },
			{ key: "clocked_out", width: 20 },
		];

		let startRow = 12;
		rows.forEach((row, index) => {
			worksheet.getRow(startRow).font = { bold: true };
			worksheet.getRow(startRow).alignment = { horizontal: "center" };
			worksheet.addRow({
				no: index + 1,
				user_id: row.user_id,
				latitude: row.latitude,
				longitude: row.longitude,
				clocked_in: row.clocked_in,
				clocked_out: row.clocked_out,
			});
		});

		// Set response headers for file download
		res.setHeader(
			"Content-Type",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
		);
		res.setHeader("Content-Disposition", "attachment; filename=Attendance_Report.xlsx");

		// Send the workbook as a .xlsx file
		await workbook.xlsx.write(res);
		res.end();
	} catch (error) {
		console.error("Error generating report:", error);
		res.status(500).send("Error generating report");
	}
};

const getLogAttendance = async (req, res) => {
	res.render("memberArea/employee/logAttendance/index", {
		title: "PTDI STTD - Attendance Log",
	});
};

module.exports = {
	getLiveAttendance,
	getLogAttendance,
	postLiveAttendance,
	getReportAttendance,
	generateReport,
	getLogAttendance,
};
