const Facilities = require("../model/Facilities/Facilities");

const createFacilities = async (newFacility) => {
	try {
		return await Facilities.create(newFacility);
	} catch (error) {
		console.log(error);
		throw new Error("Error Creating new facility");
	}
};

module.exports = {
	createFacilities,
};
