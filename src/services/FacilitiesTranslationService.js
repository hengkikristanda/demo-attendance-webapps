const FacilitiesTranslation = require("../model/Facilities/FacilitiesTranslation");
const Facilities = require("../model/Facilities/Facilities");

const findAllByLanguageCode = async (languageCode) => {
	try {
		return FacilitiesTranslation.findAll({
			where: {
				language_code: languageCode,
			},
			order: ["name"],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Alumni");
	}
};

const findAllByDefaultLanguage = async () => {
	try {
		return Facilities.findAll({
			order: ["name"],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Alumni");
	}
};

module.exports = {
	findAllByLanguageCode,
	findAllByDefaultLanguage,
};
