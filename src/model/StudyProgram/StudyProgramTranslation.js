const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const StudyProgramTranslation = sequelize.define(
	"StudyProgramTranslation",
	{
		id: {
			type: DataTypes.STRING(36),
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		duration: {
			type: DataTypes.STRING(64),
			allowNull: true,
		},
		degree: {
			type: DataTypes.STRING(64),
			allowNull: true,
		},
		accreditation: {
			type: DataTypes.STRING(64),
			allowNull: true,
		},
		lang: {
			type: DataTypes.STRING(2),
			allowNull: true,
		},
		study_programs_id: {
			type: DataTypes.STRING(36),
			allowNull: false,
		},
	},
	{
		tableName: "study_programs_translation",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = { sequelize, StudyProgramTranslation };
