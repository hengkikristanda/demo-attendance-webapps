const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const Leaders = sequelize.define(
	"Leaders",
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
		tableName: "leaders",
		timestamps: false,
	}
);

module.exports = { Leaders, sequelize };
