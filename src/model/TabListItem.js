const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const TabListItem = sequelize.define(
	"TabListItem",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		tablist_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pos: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "tablist_item",
		timestamps: false,
	}
);

module.exports = TabListItem;
