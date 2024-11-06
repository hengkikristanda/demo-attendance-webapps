const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const FacilitiesImages = sequelize.define(
	"FacilitiesImages",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		facility_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "facilities_images",
		timestamps: false,
	}
);

module.exports = FacilitiesImages;
