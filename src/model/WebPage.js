const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const WebPage = sequelize.define(
	"WebPage",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "web_page",
		timestamps: false,
	}
);

module.exports = { sequelize, WebPage };
