const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const NewsDetail = sequelize.define(
	"NewsDetail",
	{
		id: {
			type: DataTypes.STRING(36),
			primaryKey: true,
			allowNull: false,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		title: {
			type: DataTypes.STRING(512),
			allowNull: false,
			unique: true,
		},
		lang: {
			type: DataTypes.STRING(2),
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		news_id: {
			type: DataTypes.STRING(36),
			allowNull: true,
		},
	},
	{
		tableName: "news_detail",
		timestamps: false, // Disable created_at and updated_at
	}
);

module.exports = NewsDetail;
