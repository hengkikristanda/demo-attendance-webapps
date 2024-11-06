const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const LecturerDetail = sequelize.define(
	"LecturerDetail",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		lecturer_id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		organization_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		start_month: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		end_month: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		start_year: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		end_year: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		present: {
			type: DataTypes.CHAR,
			allowNull: true,
		},
		job_title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "lecturer_detail",
		timestamps: false,
	}
);

module.exports = LecturerDetail;
