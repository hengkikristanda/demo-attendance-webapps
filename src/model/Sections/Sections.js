const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const Sections = sequelize.define(
	"Sections",
	{
		id: {
			type: DataTypes.STRING(36),
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		heading: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		subheading: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		image_id: {
			type: DataTypes.STRING,
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
		action_link_label: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		action_link_href: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		option_link_label: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		option_link_href: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		template_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "section",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = { sequelize, Sections };
