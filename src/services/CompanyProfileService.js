const CompanyProfile = require("../model/CompanyProfile");

const findAll = async () => {
	try {
		// return ContactInfoView.findAll({
		// 	offset: startIndex,
		// 	limit: 30,
		// 	order: ["createdAt"],
		// });

		return CompanyProfile.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Contact Info");
	}
};

module.exports = {
	findAll,
};
