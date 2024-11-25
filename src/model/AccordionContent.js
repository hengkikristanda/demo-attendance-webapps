const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const AccordionContent = sequelize.define(
	"AccordionContent",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		heading: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		section_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "accordion_content",
		timestamps: false,
	}
);

module.exports = { sequelize, AccordionContent };
