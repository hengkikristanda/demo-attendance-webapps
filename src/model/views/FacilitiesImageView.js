const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const FacilitiesImagesView = sequelize.define(
	"FacilitiesImagesView",
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
		mime_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "facilities_images_view",
		timestamps: false,
	}
);

module.exports = FacilitiesImagesView;
