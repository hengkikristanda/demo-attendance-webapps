const { raw } = require("body-parser");
const { AccordionContent, sequelize } = require("../model/AccordionContent");
const { where } = require("sequelize");

const findById = async (id) => {
	try {
		return await AccordionContent.findByPk(id, { raw: true });
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error finding AccordionContent");
	}
};

const findBySectionId = async (sectionId) => {
	try {
		return await AccordionContent.findAll({ where: { section_id: sectionId }, raw: true });
	} catch (error) {
		console.error("Error details:", error);
		throw new Error("Error finding AccordionContent");
	}
};

const deleteAll = async () => {
	try {
		return await AccordionContent.destroy({
			where: {}, // Empty where clause
		});
	} catch (error) {
		console.error("Error deleting rows:", error);
		throw new Error("Error deleting rows");
	}
};

module.exports = {
	findById,
	findBySectionId,
	deleteAll,
};
