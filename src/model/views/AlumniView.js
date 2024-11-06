const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const AlumniView = sequelize.define(
	"AlumniView",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		generation: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		job_position: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pos: {
			type: DataTypes.INTEGER,
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
		tableName: "alumni_view",
		timestamps: false,
	}
);

module.exports = AlumniView;
