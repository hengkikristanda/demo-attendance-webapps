const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UsersCmsMenu = sequelize.define(
	"UsersCmsMenu",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		role: {
			type: DataTypes.ENUM("Admin", "Employee", "Webadmin", "HR"),
			allowNull: false,
			defaultValue: "Employee",
		},
		cms_menu_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "users_cms_menu",
		timestamps: false,
	}
);

module.exports = UsersCmsMenu;
