const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const PublishedNews = sequelize.define(
	"PublishedNews",
	{
		id: {
			type: DataTypes.STRING(36),
			primaryKey: true,
			allowNull: false,
			unique: true,
		},
		title: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
		},
		display_image_id: {
			type: DataTypes.STRING(36),
			allowNull: false,
		},
		mime_type: {
			type: DataTypes.STRING(16),
			allowNull: true,
		},
		last_modified: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: "published_news",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = PublishedNews;
