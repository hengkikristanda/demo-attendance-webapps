const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const SectionImagesMapping = sequelize.define(
	"SectionImagesMapping",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		image_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		section_images_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		original_filename: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		mime_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "section_images_mapping",
		timestamps: false,
	}
);

module.exports = { SectionImagesMapping };
