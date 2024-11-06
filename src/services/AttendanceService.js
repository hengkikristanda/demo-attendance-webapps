const { error } = require("console");
const { Op } = require("sequelize");
const Attendance = require("../model/Attendance");
const fs = require("fs-extra"); // Import fs-extra for file handling
const path = require("path");

const createAttendance = async (attendanceData) => {
	try {
		return await Attendance.create(attendanceData);
	} catch (error) {
		console.error("Error saving attendance data:", error);
		throw error; // Handle errors properly in your application
	}
};

const updateAttendance = async (attendanceData) => {
	try {
		return await Attendance.update(attendanceData, {
			where: { id: attendanceData.id },
		});
	} catch (error) {
		console.error("Error saving attendance data:", error);
		throw error; // Handle errors properly in your application
	}
};

async function hasClockedInToday(userId) {
	try {
		// Get today's date in YYYY-MM-DD format
		const today = new Date();
		const startOfDay = new Date(today.setHours(0, 0, 0, 0));
		const endOfDay = new Date(today.setHours(23, 59, 59, 999));

		// Query the database to check if there's a clocked_in record for today
		const attendanceRecord = await Attendance.findOne({
			where: {
				user_id: userId,
				clocked_in: {
					[Op.between]: [startOfDay, endOfDay],
				},
			},
		});

		// Return true if a record exists, false otherwise
		return attendanceRecord !== null;
	} catch (error) {
		console.error("Error checking clocked_in status:", error);
		throw error;
	}
}

async function hasClockedOutToday(userId) {
	try {
		// Get today's date in YYYY-MM-DD format
		const today = new Date();
		const startOfDay = new Date(today.setHours(0, 0, 0, 0));
		const endOfDay = new Date(today.setHours(23, 59, 59, 999));

		// Query the database to check if there's a clocked_in record for today
		const attendanceRecord = await Attendance.findOne({
			where: {
				user_id: userId,
				clocked_out: {
					[Op.between]: [startOfDay, endOfDay],
				},
			},
		});

		// Return true if a record exists, false otherwise
		return attendanceRecord !== null;
	} catch (error) {
		console.error("Error checking clocked_out status:", error);
		throw error;
	}
}

async function todayClockedIn(userId) {
	try {
		// Get today's date in YYYY-MM-DD format
		const today = new Date();
		const startOfDay = new Date(today.setHours(0, 0, 0, 0));
		const endOfDay = new Date(today.setHours(23, 59, 59, 999));

		// Query the database to check if there's a clocked_in record for today
		const attendanceRecord = await Attendance.findOne({
			where: {
				user_id: userId,
				clocked_in: {
					[Op.between]: [startOfDay, endOfDay],
				},
			},
			raw: true,
		});

		// Return true if a record exists, false otherwise
		return attendanceRecord;
	} catch (error) {
		console.error("Error checking clocked_in status:", error);
		throw error;
	}
}

const findAll = async () => {
	try {
		return await Attendance.findAll({
			raw: true,
		});
	} catch (error) {
		console.error("Error fetching Attendance data:", error);
		throw error;
	}
};

module.exports = {
	findAll,
	createAttendance,
	todayClockedIn,
	hasClockedInToday,
	hasClockedOutToday,
	updateAttendance,
};
