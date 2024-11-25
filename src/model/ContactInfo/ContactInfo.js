const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const ContactInfo = sequelize.define(
	"ContactInfo",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		label: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		value: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		contact_type_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pinned: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "contact_info",
		timestamps: false,
	}
);

module.exports = { ContactInfo, sequelize };
