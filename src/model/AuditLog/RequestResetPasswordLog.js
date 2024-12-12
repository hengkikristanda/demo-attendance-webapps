const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const RequestResetPasswordLog = sequelize.define(
	"RequestResetPasswordLog",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email_recipient: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		created_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		error_log: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "request_reset_password_log",
		timestamps: false,
	}
);

module.exports = { RequestResetPasswordLog, sequelize };
