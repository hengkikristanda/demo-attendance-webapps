const { where } = require("sequelize");
const LecturerDetail = require("../../model/Lecturer/LecturerDetail");

const findDetailByLecturerId = async (lecturerId) => {
	try {
		return LecturerDetail.findAll({
			where: {
				lecturer_id: lecturerId,
			},
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Lecturer Detail");
	}
};

module.exports = {
	findDetailByLecturerId,
};
