const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const StudyProgram = sequelize.define(
	"StudyProgram",
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
			allowNull: false,
		},
		degree: {
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		accreditation: {
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		accreditation_document: {
			type: DataTypes.STRING(36),
			allowNull: false,
		},
		web_page_id: {
			type: DataTypes.STRING(36),
			allowNull: false,
		},
	},
	{
		tableName: "study_programs",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = { sequelize, StudyProgram };
