const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const LecturerView = sequelize.define(
	"LecturerView",
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
		email_address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		experience: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        research: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        education: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        doc_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        doc_filename: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        doc_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        image_filename: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        image_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pos: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "lecturer_view",
		timestamps: false,
	}
);

module.exports = LecturerView;
