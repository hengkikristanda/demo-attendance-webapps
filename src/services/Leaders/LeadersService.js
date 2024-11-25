const { sequelize, Leaders } = require("../../model/Leaders/Leaders");
const LeadersView = require("../../model/Leaders/LeadersView");
const PublicImage = require("../../model/PublicImages");
const PublicDocument = require("../../model/PublicDocument");
const path = require("path");
const fs = require("fs-extra"); // Import fs-extra for file handling

const findAllInLeadersView = async () => {
	try {
		return LeadersView.findAll(
			{ raw: true },
			{
				order: ["pos"],
			}
		);
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Leaders in LeadersView");
	}
};

module.exports = {
	findAllInLeadersView,
};
