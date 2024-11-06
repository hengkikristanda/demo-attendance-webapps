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
	},
	{
		tableName: "company_profile",
		timestamps: false,
	}
);

module.exports = CompanyProfile;
