const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const SectionContent = sequelize.define(
	"SectionContent",
	{
		id: {
			type: DataTypes.STRING(36),
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		subtitle: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		type: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		image_id: {
			type: DataTypes.STRING(36),
			allowNull: true,
		},
		web_page_id: {
			type: DataTypes.STRING(36),
			allowNull: true,
		},
	},
	{
		tableName: "section_content",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = { sequelize, SectionContent };
