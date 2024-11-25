const { raw } = require("body-parser");
const WebMenu = require("../model/WebMenu");

const findAllByParentId = async (parentId) => {
	try {
		return WebMenu.findAll({
			where: { parent_id: parentId },
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Web Menu");
	}
};

const findAll = async () => {
	try {
		return await WebMenu.findAll({ raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error finding web menu");
	}
};

module.exports = {
	findAllByParentId,
	findAll,
};
