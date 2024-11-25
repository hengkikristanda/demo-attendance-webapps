const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const WebMenu = sequelize.define(
	"WebMenu",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		label_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		label_en: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		label_ja: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		label_ko: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		label_zh: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		parent_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		order: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "web_menu",
		timestamps: false,
	}
);

module.exports = WebMenu;
