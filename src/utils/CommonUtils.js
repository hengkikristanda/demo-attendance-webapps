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

function formatDocumentName(name) {
	// Replace all non-alphanumeric characters and separators (dot, comma, spaces, etc.) with a hyphen
	return name.replace(/[.,\s-]+/g, "-").toLowerCase();
}

function logWithTime(message) {
	const timestamp = new Date().toLocaleString();

	// Get the caller function name from the stack trace
	const stack = new Error().stack;
	const caller = stack.split("\n")[2].trim(); // Get the caller line
	const functionName = caller.match(/at (.+) \(/)?.[1] || "Anonymous";

	console.log(`[${timestamp}] [${functionName}] ${message}`);
}

module.exports = {
	logWithTime,
	formatDateToLongString,
	getMonthName,
	getOriginalFileNameWithExt,
	formatDateTimeToLongString,
	formatDocumentName,
};
