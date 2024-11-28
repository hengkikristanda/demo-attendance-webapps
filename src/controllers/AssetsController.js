const express = require("express");
const path = require("path");

const getImage = async (req, res) => {
	try {
		const { id } = req.params;
		const filePath = path.join(__dirname, "../../uploads/user-profile-picture", id);
		return res.sendFile(filePath);
	} catch (error) {
		console.log(error);
		return res.sendFile("https://placehold.co/600x400?text=No+Image+Available");
	}
};

module.exports = {
	getImage,
};
