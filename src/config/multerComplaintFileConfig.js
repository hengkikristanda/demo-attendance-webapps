// config/multerImageConfig.js
const multer = require("multer");
const createStorage = require("./multerStorageHelper");
const { LIMIT_FILE_SIZE } = require("../utils/Constants");

const complaintFileStorage = createStorage("complaint-documents");

const complaintFileUpload = multer({
	storage: complaintFileStorage,
	limits: { fileSize: LIMIT_FILE_SIZE },
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
			cb(null, true);
		} else {
			const error = new Error("Only image files and PDF documents are allowed!");
			error.code = "INVALID_FILE_TYPE"; // Set a custom error code
			cb(error, false);
		}
	},
});

module.exports = complaintFileUpload;
