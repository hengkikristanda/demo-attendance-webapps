const ContactInfoView = require("../model/views/ContactInfoView");
const { ContactInfo, sequelize } = require("../model/ContactInfo/ContactInfo");

const findAll = async () => {
	try {
		return ContactInfoView.findAll({ raw: true });
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Contact Info");
	}
};

const bulkCreate = async (profileData) => {
	const transaction = await sequelize.transaction();
	try {
		const resultDeleted = deleteAll();
		if (!resultDeleted) throw new Error();

		const result = await ContactInfo.bulkCreate(profileData);
		await transaction.commit();
		return result;
	} catch (error) {
		await transaction.rollback();
		console.log(error);
		throw new Error("Error during batch create Contact Info");
	}
};

const deleteAll = async () => {
	try {
		return await ContactInfo.destroy({
			where: {}, // Empty where clause
		});
	} catch (error) {
		console.error("Error deleting rows:", error);
		throw new Error("Error deleting rows");
	}
};

module.exports = {
	findAll,
	bulkCreate,
	deleteAll,
};
