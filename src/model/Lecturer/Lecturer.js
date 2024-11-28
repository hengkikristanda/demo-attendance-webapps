const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const Lecturer = sequelize.define(
	"Lecturer",
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
			allowNull: false,
		},
		email_address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cv_docs: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		cv_docs_mime_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		cv_docs_original_filename: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image_mime_type: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image_original_filename: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pos: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		tableName: "lecturer",
		timestamps: false,
	}
);

module.exports = {sequelize, Lecturer};
