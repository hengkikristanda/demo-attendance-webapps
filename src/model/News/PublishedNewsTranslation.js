const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const PublishedNewsTranslation = sequelize.define(
	"PublishedNewsTranslation",
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
		lang: {
			type: DataTypes.STRING(2),
			allowNull: true,
		},
	},
	{
		tableName: "published_news_translation",
		timestamps: false, // Disable created_at and updated_at
	}
);
module.exports = PublishedNewsTranslation;
