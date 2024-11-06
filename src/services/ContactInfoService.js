const ContactInfoView = require("../model/views/ContactInfoView");

const findAll = async () => {
	try {
		// return ContactInfoView.findAll({
		// 	offset: startIndex,
		// 	limit: 30,
		// 	order: ["createdAt"],
		// });

		return ContactInfoView.findAll();
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Contact Info");
	}
};

module.exports = {
	findAll,
};
