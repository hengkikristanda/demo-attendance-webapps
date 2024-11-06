const PublicImages = require("../model/PublicImages");

const findAll = async () => {
	try {
		// return ContactInfoView.findAll({
		// 	offset: startIndex,
		// 	limit: 30,
		// 	order: ["createdAt"],
		// });

		return PublicImages.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Contact Info");
	}
};

module.exports = {
	findAll,
};
