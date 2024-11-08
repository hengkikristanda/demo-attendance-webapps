const { logWithTime } = require("../utils/CommonUtils");

const getUserPreferredLanguage = (selectedLanguage) => {
	logWithTime("Changing User Preferred Language to: " + selectedLanguage);

	if (selectedLanguage == undefined) {
		selectedLanguage = "id";
	}

	if (!["en", "id", "zh", "ja", "ko"].includes(selectedLanguage.toLowerCase()))
		selectedLanguage = "id";

	return selectedLanguage;
};

module.exports = {
	getUserPreferredLanguage,
};
