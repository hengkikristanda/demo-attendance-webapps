const express = require("express");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "1h"; // Token expiration time (e.g., 1 hour)F

const User = require("../model/Users/Users");

const getLogin = async (req, res) => {
	const error = req.query.error;

	if (error === "forbidden") {
		res.locals.errorMessage = "Your session has expired. Please log in again to continue.";
		res.locals.responseMessageClass = "danger";
	}

	res.render("memberArea/auth/login", {
		title: "PTDI STTD Account",
	});
};

const getResetPassword = async (req, res) => {
	res.render("memberArea/auth/forgotPassword", {
		title: "PTDI STTD - Reset Password",
	});
};

const postRegisterUser = async (req, res) => {
	const { username, password, full_name, phone_number, email, role } = req.body;

	try {
		// Check if username or email already exists

		console.log(username);

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "Email already in use." });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = await User.create({
			id: require("uuid").v4(), // Generates a unique UUID for the user
			username,
			encoded_password: hashedPassword,
			full_name,
			phone_number,
			email,
			role: role || "Employee", // Default role is 'Employee' if not provided
			is_active: 1,
		});

		// Respond with the created user (excluding the password)
		res.status(201).json({
			message: "User registered successfully",
			user: {
				id: newUser.id,
				username: newUser.username,
				full_name: newUser.full_name,
				phone_number: newUser.phone_number,
				email: newUser.email,
				role: newUser.role,
				is_active: newUser.is_active,
			},
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

const postLogin = async (req, res) => {
	const { userName, password } = req.body;

	if (!userName || !password) {
		return res.status(400).render("memberArea/auth/login", {
			title: "PTDI STTD Account",
			errorMessage: "Please enter both username and password",
		});
	}

	try {
		// Find the user by username
		const user = await User.findOne({ where: { userName } });
		const isMatch = user ? await bcrypt.compare(password, user.encoded_password) : false;

		// If user doesn't exist or password doesn't match, send an error
		if (!user || !isMatch) {
			return res.status(400).render("memberArea/auth/login", {
				title: "PTDI STTD Account",
				errorMessage: "Invalid username or password",
			});
		}

		// Generate JWT token
		const token = jwt.sign(
			{ userId: user.id, userName: user.userName }, // Payload
			JWT_SECRET,
			{ expiresIn: JWT_EXPIRES_IN }
		);

		res.cookie("auth", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Set secure flag in production
			maxAge: 3600000, // 1 hour in milliseconds
		});

		return res.redirect("/member/dashboard");
	} catch (error) {
		console.error(error);
		return res.status(500).render("memberArea/auth/login", {
			title: "PTDI STTD Account",
			errorMessage: "An unexpected error occurred. Please try again later.",
		});
	}
};

const logout = async (req, res) => {
	res.clearCookie("auth"); // Clear JWT token from cookie
	const errorMessage = "You have successfully logged out";
	const responseMessageClass = "success";

	res.render("memberArea/auth/login", {
		title: "PTDI STTD Account",
		errorMessage,
		responseMessageClass,
	});
};

module.exports = {
	getLogin,
	getResetPassword,
	postRegisterUser,
	postLogin,
	logout,
};
