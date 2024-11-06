const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const News = sequelize.define(
	"News",
	{
		id: {
			type: DataTypes.STRING(36),
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		title: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		display_image_id: {
			type: DataTypes.STRING(36),
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		status: {
			type: DataTypes.STRING(16),
			allowNull: true,
		},
		last_modified: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: "news",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = { sequelize, News };
