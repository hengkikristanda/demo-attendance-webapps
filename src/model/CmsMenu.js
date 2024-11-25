const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CmsMenu = sequelize.define(
	"CmsMenu",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		icon: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "cms_menu",
		timestamps: false,
	}
);

module.exports = CmsMenu;
