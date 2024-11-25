const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CompanyProfile = sequelize.define(
	"CompanyProfile",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		official_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		short_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mime_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		original_filename: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "company_profile",
		timestamps: false,
	}
);

module.exports = CompanyProfile;
