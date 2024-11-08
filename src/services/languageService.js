const { logWithTime } = require("../utils/CommonUtils");

const getUserPreferredLanguage = async (selectedLanguage) => {
	await logWithTime("Changing User Preferred Language to: " + selectedLanguage);

	if (
		!selectedLanguage ||
		!["en", "id", "zh", "ja", "ko"].includes(selectedLanguage.toLowerCase())
	) {
		selectedLanguage = "id"; // Default to "id" if invalid
	}

	return selectedLanguage;
};

module.exports = {
	getUserPreferredLanguage,
};
