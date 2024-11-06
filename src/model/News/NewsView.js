const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const NewsView = sequelize.define(
	"NewsView",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		sub_title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		value: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		created_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		lang: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image_url: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "news_view",
		timestamps: false,
	}
);

module.exports = NewsView;
