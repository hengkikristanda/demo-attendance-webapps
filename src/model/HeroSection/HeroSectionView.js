const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const HeroSectionView = sequelize.define(
	"HeroSectionView",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		subtitle: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image_id: {
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
		tableName: "hero_section_view",
		timestamps: false,
	}
);

module.exports = { sequelize, HeroSectionView };
