const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const Alumni = sequelize.define(
	"Alumni",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		generation: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		job_position: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		pos: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		image_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "alumni",
		timestamps: false,
	}
);

module.exports = Alumni;
