const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const WebPageContentMapping = sequelize.define(
	"WebPageContentMapping",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		web_page_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		hero_section_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		section_content_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		accordion_content_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		section_images_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pos: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "web_page_content_mapping",
		timestamps: false,
	}
);

module.exports = { sequelize, WebPageContentMapping };
