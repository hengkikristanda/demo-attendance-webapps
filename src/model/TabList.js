const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const TabList = sequelize.define(
	"TabList",
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
	},
	{
		tableName: "tablist",
		timestamps: false,
	}
);

module.exports = TabList;
