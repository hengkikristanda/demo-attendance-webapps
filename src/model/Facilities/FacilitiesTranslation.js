const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const FacilitiesTranslation = sequelize.define(
	"FacilitiesTranslation",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		content_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		language_code: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "facilities_translation",
		timestamps: false,
	}
);

module.exports = FacilitiesTranslation;
