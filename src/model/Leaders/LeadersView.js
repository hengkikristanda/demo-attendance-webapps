const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const LeadersView = sequelize.define(
	"LeadersView",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		full_name: {
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
		tableName: "leaders_view",
		timestamps: false,
	}
);

module.exports = LeadersView;
