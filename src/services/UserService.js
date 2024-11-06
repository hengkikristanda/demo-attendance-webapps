const Users = require("../model/Users/Users");

const findById = async (userId) => {
	try {
		return Users.findByPk(userId);
	} catch (error) {
		console.log(error);
		throw new Error("Error Find User");
	}
};

module.exports = {
	findById,
};
