const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const PublicImages = sequelize.define(
	"PublicImages",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
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
		tableName: "public_images",
		timestamps: false,
	}
);

module.exports = PublicImages;
