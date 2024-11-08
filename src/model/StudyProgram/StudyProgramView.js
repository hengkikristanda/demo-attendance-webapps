const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const StudyProgramView = sequelize.define(
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
		original_filename: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
		mime_type: {
			type: DataTypes.STRING(16),
			allowNull: false,
		},
		web_page_id: {
			type: DataTypes.STRING(36),
			allowNull: false,
		},
	},
	{
		tableName: "study_programs_view",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = StudyProgramView;
