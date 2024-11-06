const FacilitiesImages = require("../model/Facilities/FacilitiesImages");
const FacilitiesImagesView = require("../model/views/FacilitiesImageView");

const findAll = async (languageCode) => {
	try {
		return FacilitiesImages.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Alumni");
	}
};

const findAllInView = async () => {
	try {
		return FacilitiesImagesView.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Alumni");
	}
};

module.exports = {
	findAll,
	findAllInView,
};
