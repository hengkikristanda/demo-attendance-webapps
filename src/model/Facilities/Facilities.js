const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

const Facilities = sequelize.define(
	"Facilities",
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
		description: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "facilities",
		timestamps: false,
	}
);

module.exports = Facilities;
