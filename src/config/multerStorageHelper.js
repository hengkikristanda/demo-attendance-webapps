const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const createStorage = (folderName) =>
	multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, `uploads/${folderName}/`); // Specify the folder to save the images
		},
		filename: function (req, file, cb) {
			cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname)); // Append extension
		},
	});

module.exports = createStorage;
