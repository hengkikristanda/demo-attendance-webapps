const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const TabListItemTranslation = sequelize.define(
	"TabListItemTranslation",
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
		lang: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		tablist_item_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "tablist_item_translation",
		timestamps: false,
	}
);

module.exports = TabListItemTranslation;
