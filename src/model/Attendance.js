const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid"); // Import uuidv4

const Attendance = sequelize.define(
	"Attendance",
	{
		id: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
			unique: true,
			defaultValue: () => uuidv4(),
		},
		user_id: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		latitude: {
			type: DataTypes.DECIMAL(9, 7),
			allowNull: true,
		},
		longitude: {
			type: DataTypes.DECIMAL(9, 7),
			allowNull: true,
		},
		clocked_in: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		clocked_out: {
			type: DataTypes.DATE,
			allowNull: true,
		},
	},
	{
		tableName: "attendance",
		timestamps: false,
	}
);

module.exports = Attendance;
