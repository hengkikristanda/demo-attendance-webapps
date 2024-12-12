const { sequelize, Leaders } = require("../../model/Leaders/Leaders");
const LeadersView = require("../../model/Leaders/LeadersView");
const CommonUtils = require("../../utils/CommonUtils");
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

const findAll = async (orderValue = "pos", isRaw = false) => {
	try {
		return Leaders.findAll({
			order: [orderValue],
			raw: isRaw,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Leaders");
	}
};

const findLeaderById = async (leaderId, isRaw = false) => {
	try {
		return Leaders.findOne({
			where: {
				id: leaderId,
			},
			raw: isRaw,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Leader");
	}
};

const createLeader = async (leaderData, uploadedFile) => {
	const transaction = await sequelize.transaction();
	try {
		if (uploadedFile) {
			const uploadedProfilePicture = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"profilePictureFile-",
				"public/img/leaders/"
			);
			leaderData.image_id = uploadedProfilePicture.id;
			leaderData.mime_type = uploadedProfilePicture.mime_type;
			leaderData.original_filename = uploadedProfilePicture.original_filename;
		}

		const createdLeader = await Leaders.create(leaderData, { transaction });

		await transaction.commit();

		return createdLeader;
	} catch (error) {
		await transaction.rollback();
		console.error("Error details:", error);
		throw new Error("Error Creating Leader");
	}
};

const deleteLeader = async (leaderId) => {
	try {
		const leader = await Leaders.findByPk(leaderId);

		if (!leader) {
			return null;
		}

		await Leaders.destroy({
			where: { id: leaderId },
		});

		return leader; // Return the deleted alumni record
	} catch (error) {
		console.error("Error deleting Leader:", error);
		throw error;
	}
};

const updateLeader = async (existingLeaderData, uploadedFile) => {
	try {
		if (uploadedFile) {
			const uploadedProfilePicture = await CommonUtils.handleUploadedFile(
				uploadedFile,
				"profilePictureFile-",
				"public/img/leaders/"
			);
			existingLeaderData.image_id = uploadedProfilePicture.id;
			existingLeaderData.mime_type = uploadedProfilePicture.mime_type;
			existingLeaderData.original_filename = uploadedProfilePicture.original_filename;
		}
		return await existingLeaderData.save();
	} catch (error) {
		console.log(error);
		throw new Error("Error Updating User Profile");
	}
};

module.exports = {
	findAllInLeadersView,
	findAll,
	createLeader,
	deleteLeader,
	findLeaderById,
	updateLeader,
};
