const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const ContactInfoView = sequelize.define(
	"ContactInfoView",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		label: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		value: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		channel: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "contact_info_view",
		timestamps: false,
	}
);

module.exports = ContactInfoView;
