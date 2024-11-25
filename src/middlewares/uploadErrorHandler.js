const multer = require("multer");

function uploadErrorHandler(err, req, res, next) {
	// console.log("Error object:", err); // Log the entire error object for debugging

	const redirectPath = req.originalUrl || "/error";
	console.log(`Upload error occurred on URL: ${req.originalUrl}`); // Logs the full URL
	console.log(`Route path: ${req.path}`); // Logs the specific route path

	let errorCode;
	if (err instanceof multer.MulterError) {
		if (err.code === "LIMIT_FILE_SIZE") {
			req.flash("alertMessage", {
				message: "Image too large (Max 5mb)",
				className: "danger",
			});
		} else {
			errorCode = 400; // General Multer error
		}
		console.log(err);
	} else if (err.code === "INVALID_FILE_TYPE") {
		errorCode = 422; // Invalid file type
	} else {
		errorCode = 400; // Unknown error
	}

	return res.redirect(`${redirectPath}?error=${errorCode}`);
}

module.exports = uploadErrorHandler;
