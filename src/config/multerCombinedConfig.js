// config/multerCombinedConfig.js
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

// Create dynamic storage based on the field name
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (file.fieldname === "profilePictureFile") {
			cb(null, path.join(__dirname, "../..", "uploads", "images"));
		} else if (file.fieldname === "documentFile") {
			cb(null, path.join(__dirname, "../..", "uploads", "documents"));
		} else {
			cb(new Error("Unexpected field"), false);
		}
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname)); // Append extension
	},
});

// Set up file filter to validate file types based on field name
const fileFilter = (req, file, cb) => {
	if (file.fieldname === "profilePictureFile" && !file.mimetype.startsWith("image/")) {
		return cb(new Error("Only image files are allowed for profilePictureFile"), false);
	}
	if (
		file.fieldname === "documentFile" &&
		file.mimetype !== "application/pdf" &&
		!file.mimetype.startsWith("application/")
	) {
		return cb(new Error("Only document files are allowed for documentFile"), false);
	}
	cb(null, true);
};

// Initialize multer with the storage and file filter
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit for each file
});

// Define fields expected in the request
const uploadFields = [
	{ name: "profilePictureFile", maxCount: 1 },
	{ name: "documentFile", maxCount: 1 },
];

// Combined upload middleware
const combinedUpload = upload.fields(uploadFields);

module.exports = combinedUpload;
