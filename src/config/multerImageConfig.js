// config/multerImageConfig.js
const multer = require("multer");
const createStorage = require("./multerStorageHelper");

const imageStorage = createStorage("images");

const imageUpload = multer({
	storage: imageStorage,
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("image/")) {
			cb(null, true);
		} else {
			cb(new Error("Only image files are allowed!"), false);
		}
	},
	limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});


module.exports = imageUpload;
