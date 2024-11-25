const PublicComments = require("../model/PublicComments");

const findAll = async () => {
	try {
		return PublicComments.findAll({
			order: [["created_date", "DESC"]],
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Public Comment");
	}
};

const create = async (newComment) => {
	try {
		return PublicComments.create({
			fullname: newComment.fullName,
			email_address: newComment.emailAddress,
			phone_number: newComment.phoneNumber,
			comments: newComment.sanitizeContent,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Create Public Comment");
	}
};

module.exports = {
	findAll,
	create,
};
