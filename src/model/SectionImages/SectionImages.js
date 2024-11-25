const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const SectionImages = sequelize.define(
	"SectionImages",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},

		title_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		title_en: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		title_ja: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		title_ko: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		title_zh: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "section_images",
		timestamps: false,
	}
);

module.exports = { SectionImages };
