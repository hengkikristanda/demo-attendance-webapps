const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require('uuid');

const PublicComments = sequelize.define(
	"PublicComments",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email_address: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		phone_number: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		comments: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		created_date: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: "public_comments",
		timestamps: false,
	}
);

module.exports = PublicComments;
