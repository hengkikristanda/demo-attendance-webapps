const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.STRING(36),
			primaryKey: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		encoded_password: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		full_name: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		phone_number: {
			type: DataTypes.STRING(15),
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: true,
			unique: true,
		},
		image_id: {
			type: DataTypes.STRING(36),
			allowNull: true,
		},
		mime_type: {
			type: DataTypes.STRING(32),
			allowNull: true,
		},
		original_filename: {
			type: DataTypes.STRING(128),
			allowNull: true,
		},
		failed_login_attempt: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			unique: true,
		},
		is_active: {
			type: DataTypes.TINYINT(1),
			allowNull: true,
			defaultValue: 1,
			validate: {
				isIn: [[0, 1]], // Ensure the value is either 0 or 1
			},
		},
		role: {
			type: DataTypes.ENUM("Admin", "Employee", "Webadmin", "HR"),
			allowNull: false,
			defaultValue: "Employee",
		},
	},
	{
		tableName: "users",
		timestamps: false, // Disable created_at and updated_at
	}
);

module.exports = User;
