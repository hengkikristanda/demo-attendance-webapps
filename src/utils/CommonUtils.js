const sanitizeHtml = require("sanitize-html");
const fs = require("fs-extra"); // Import fs-extra for file handling
const path = require("path");

const projectRoot = path.resolve(__dirname, "../../");

function formatDateToLongString(date, langCode) {
	const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

	// Map language codes to locale strings
	const locales = {
		EN: "en-GB", // English
		KO: "ko-KR", // Korean
		JA: "ja-JP", // Japanese
		ID: "id-ID", // Indonesian
		ZH: "zh-CN", // Chinese
	};

	// Get the locale string based on the language code
	const locale = locales[langCode.toUpperCase()] || "en-GB"; // Default to 'en-GB'

	return date.toLocaleDateString(locale, options);
}

function formatDateTimeToLongString(date, langCode) {
	const dateOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const timeOptions = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false, // 24-hour format
		formatMatcher: "basic", // Ensures no "at" is included
	};
	const locales = {
		EN: "en-GB", // English
		KO: "ko-KR", // Korean
		JA: "ja-JP", // Japanese
		ID: "id-ID", // Indonesian
		ZH: "zh-CN", // Chinese
	};

	// Ensure langCode is a string and handle null/undefined cases
	const locale = locales[String(langCode).toUpperCase()] || "en-GB"; // Default to 'en-GB'

	// Return formatted date and time string
	return (
		date.toLocaleDateString(locale, dateOptions) +
		" " +
		date.toLocaleTimeString(locale, timeOptions).replaceAll(".", ":")
	);
}

function getMonthName(monthNumber) {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	// Ensure the input is a valid month number (1-12)
	if (monthNumber < 1 || monthNumber > 12) {
		return "";
	}

	// Subtract 1 to match array index (since arrays are 0-based)
	return monthNames[monthNumber - 1];
}

function getOriginalFileNameWithExt(fileName, mimeType) {
	if (fileName != undefined && fileName != null && mimeType != undefined && mimeType != null) {
		// imageUrl: `/img/lecturer/${lecturer["image_id"]}.${lecturer["image_type"].split("/")[1]}`,

		const fileExtension = mimeType.split("/")[1];

		return `${fileName}.${fileExtension}`;
	}
}

function getFileNameWithoutExtension(filename) {
	return filename.replace(/\.[^/.]+$/, "");
}

function formatDocumentName(name) {
	// Replace all non-alphanumeric characters and separators (dot, comma, spaces, etc.) with a hyphen
	return name.replace(/[.,\s-]+/g, "-").toLowerCase();
}

async function logWithTime(message) {
	const now = new Date();
	const timestampWithMs = `${now.toLocaleString()}.${now.getMilliseconds()}`;

	// Get the caller function name from the stack trace
	const stack = new Error().stack;
	const caller = stack.split("\n")[2].trim(); // Get the caller line
	const functionName = caller.match(/at (.+) \(/)?.[1] || "Anonymous";

	console.log(`[${timestampWithMs}] [${functionName}] ${message}`);
}

function sanitizeContent(content) {
	return sanitizeHtml(content, {
		allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2"]), // Add extra tags if needed
		allowedAttributes: {
			a: ["href", "name", "target"],
			img: ["src", "alt"],
		},
		allowedIframeHostnames: ["www.youtube.com"], // Allow YouTube iframes if needed
	});
}

function getImageUrl(data, filePath) {
	if (data.image_id) {
		data.imageUrl = `${filePath}/${data.image_id}.${data["mime_type"].split("/")[1]}`;
	} else {
		data.imageUrl = `https://placehold.co/600x400?text=No+Image+Available`;
	}
	return data;
}

async function handleUploadedFile(uploadedFile, prefix, uploadedDir) {
	// 1. Get the file name
	const fileNameWithoutExt = path.parse(uploadedFile.path).name;

	// 2. Get the uuid
	const id = path.basename(fileNameWithoutExt).replace(prefix, "");

	// 3. Format original filename
	const originalFileNameWithoutExt = getFileNameWithoutExtension(uploadedFile.originalname);
	const fileExtension = uploadedFile.originalname.split(".").pop();

	const formattedOriginalFileName =
		formatDocumentName(originalFileNameWithoutExt) + "." + fileExtension;

	const newFileName = path.basename(uploadedFile.path).replace(prefix, "");
	const targetDir = path.join(projectRoot, uploadedDir);
	const targetPath = path.join(targetDir, newFileName);

	// Ensure target directory exists and move (rename) the file to the target folder with a new name
	await fs.ensureDir(targetDir); // Ensure the target directory exists
	await fs.copy(uploadedFile.path, targetPath); // Copy file to the target folder

	console.log("File copied and renamed to:", targetPath);

	return {
		id,
		original_filename: formattedOriginalFileName,
		mime_type: `image/${path.extname(newFileName).replace(".", "")}`,
	};
}

module.exports = {
	logWithTime,
	formatDateToLongString,
	getMonthName,
	getOriginalFileNameWithExt,
	formatDateTimeToLongString,
	formatDocumentName,
	sanitizeContent,
	getImageUrl,
	handleUploadedFile,
};
