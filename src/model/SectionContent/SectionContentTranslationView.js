const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const SectionContentTranslationView = sequelize.define(
	"SectionContentTranslationView",
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
			allowNull: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		lang: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		section_content_id: {
			type: DataTypes.STRING(36),
			allowNull: true,
		},
		type: {
			type: DataTypes.STRING,
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
		original_filename: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mime_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "section_content_translation_view",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = SectionContentTranslationView;
