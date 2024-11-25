const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const UsersCmsMenuView = sequelize.define(
	"UsersCmsMenuView",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		user_role: {
			type: DataTypes.ENUM("Admin", "Employee", "Webadmin", "HR"),
			allowNull: true,
		},
		cms_menu_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        menu: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        menu_url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "users_cms_menu_view",
		timestamps: false,
	}
);

module.exports = UsersCmsMenuView;
