const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const Complaint = sequelize.define(
	"Complaint",
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
		email_address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		content: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone_no: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		document_id: {
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
		tableName: "complaint",
		timestamps: false,
	}
);

module.exports = { sequelize, Complaint };
