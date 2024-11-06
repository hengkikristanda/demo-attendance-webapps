// config/multerDocumentConfig.js
const multer = require("multer");
const createStorage = require("./multerStorageHelper");

const documentStorage = createStorage("documents");

const documentUpload = multer({
	storage: documentStorage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype === "application/pdf" || file.mimetype.startsWith("application/")) {
			cb(null, true);
		} else {
			cb(new Error("Only document files are allowed!"), false);
		}
	},
	limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
});

module.exports = documentUpload;
