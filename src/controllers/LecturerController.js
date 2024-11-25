const CommonComponentServices = require("../services/CommonComponentServices");
const AlumniService = require("../services/AlumniService");
const LecturerService = require("../services/Lecturer/LecturerService");
const LecturerDetailService = require("../services/Lecturer/LecturerDetailService");
const NewsService = require("../services/NewsService");
const CommonUtils = require("../utils/CommonUtils");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const webPageId = "e69a143c-9cda-11ef-b867-9e406641108e";
const currentPage = {
	id: "Diklat",
	en: "Education and Training",
	ja: "教育と訓練",
	ko: "教育と訓練",
	zh: "教育与培训",
};

const EN = {
	title: "Lecturers",
	heading: "Our Dedicated Lecturers",
	content:
		"Meet our dedicated lecturers! Each of them possesses expertise and passion to inspire and guide our students towards success. Explore their profiles to learn more.",
	sectionExperienceLabel: "PROFESSIONAL EXPERIENCE",
	sectionEducationLabel: "EDUCATIONAL BACKGROUND",
	sectionResearchLabel: "RESEARCH ACTIVITIES",
};

const ID = {
	title: "Dosen",
	heading: "Dosen Kami yang Berdedikasi",
	content:
		"Temui dosen-dosen kami yang berdedikasi! Masing-masing memiliki keahlian dan semangat untuk menginspirasi serta membimbing mahasiswa menuju kesuksesan. Jelajahi profil mereka untuk mengetahui lebih lanjut.",
	sectionExperienceLabel: "PENGALAMAN PROFESIONAL",
	sectionEducationLabel: "LATAR BELAKANG PENDIDIKAN",
	sectionResearchLabel: "KEGIATAN PENELITIAN",
};

const JA = {
	title: "講師",
	heading: "私たちの献身的な講師陣",
	content:
		"私たちの献身的な講師陣をご紹介します！ それぞれが専門知識と情熱を持ち、学生を成功へと導きます。 プロフィールをぜひご覧ください。",
	sectionExperienceLabel: "職業経験",
	sectionEducationLabel: "学歴",
	sectionResearchLabel: "研究活動",
};

const KO = {
	title: "강사",
	heading: "헌신적인 강사진",
	content:
		"헌신적인 강사진을 만나보세요! 그들 각각은 성공으로 이끄는 전문성과 열정을 가지고 학생들을 영감을 주고 지도합니다. 프로필을 탐색하여 자세히 알아보세요.",
	sectionExperienceLabel: "직업 경험",
	sectionEducationLabel: "학력",
	sectionResearchLabel: "연구 활동",
};

const ZH = {
	title: "讲师",
	heading: "我们的敬业讲师",
	content:
		"认识我们敬业的讲师！ 他们每个人都拥有专业知识和激情，以激励和引导学生走向成功。 浏览他们的个人资料以了解更多信息。",
	sectionExperienceLabel: "专业经验",
	sectionEducationLabel: "教育背景",
	sectionResearchLabel: "研究活动",
};

const getLecturers = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		let lecturerList = await LecturerService.findAllLecturerView();
		lecturerList = lecturerList.map((lecturer) => ({
			id: lecturer.id,
			fullName: lecturer["full_name"],
			emailAddress: lecturer["email_address"],
			docUrl: `/docs/lecturer-cv/${lecturer["doc_id"]}.${lecturer["doc_type"].split("/")[1]}`,
			imageUrl: `/img/lecturer/${lecturer["image_id"]}.${lecturer["image_type"].split("/")[1]}`,
		}));

		// Use Promise.all to wait for all the details to resolve
		lecturerList = await Promise.all(
			lecturerList.map(async (lecturer) => {
				let lectureDetail = await LecturerDetailService.findDetailByLecturerId(lecturer.id);

				// Wait for all detail items to resolve
				lectureDetail = await Promise.all(
					lectureDetail.map(async (item) => {
						let detail = {
							id: item.id,
							organizationName: item["organization_name"],
							startMonth: CommonUtils.getMonthName(item["start_month"]),
							endMonth: CommonUtils.getMonthName(item["end_month"]),
							startYear: item["start_year"],
							endYear: item["end_year"],
							isPresent: item.present,
							jobTitle: item["job_title"],
							type: item.type,
						};

						if (detail.isPresent.toUpperCase() == "Y") {
							detail.endYear = "Present";
						}

						return detail;
					})
				);

				lectureDetail.sort((a, b) => b.startYear - a.startYear);

				// Add lectureDetail to the lecturer object
				return {
					...lecturer,
					detail: lectureDetail,
				};
			})
		);

		res.locals.lecturerList = lecturerList;

		let lecturerSectionTranslation = ID;

		if (selectedLanguage === "en") {
			lecturerSectionTranslation = EN;
		} else if (selectedLanguage === "ko") {
			lecturerSectionTranslation = KO;
		} else if (selectedLanguage === "ja") {
			lecturerSectionTranslation = JA;
		} else if (selectedLanguage === "zh") {
			lecturerSectionTranslation = ZH;
		}

		res.locals.lecturerSectionTranslation = lecturerSectionTranslation;

		// Render the index page
		return res.render("academics/lecturers/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			currentPage: currentPage[selectedLanguage],
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

module.exports = {
	getLecturers,
};
