const CommonComponentServices = require("../services/CommonComponentServices");
const AlumniService = require("../services/AlumniService");
const LecturerService = require("../services/Lecturer/LecturerService");
const NewsService = require("../services/NewsService");
const CommonUtils = require("../utils/CommonUtils");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const webPageId = "e69a143c-9cda-11ef-b867-9e406641108e";
const currentPage = {
	id: "Beranda",
	en: "Home",
	ja: "ホーム",
	ko: "홈",
	zh: "主页",
};

const getHome = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		const homeHero = await CommonComponentServices.getHomeHero(req);
		res.locals.homeHero = homeHero;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		const r = await CommonComponentServices.getContactInfo();
		console.log(r);
		res.locals.contactInfo = r;
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		// Section
		let homeSectionList;
		if (selectedLanguage.toLowerCase() == "id") {
			homeSectionList = await SectionContentService.findAllInViewByWebPageId(webPageId);
		} else {
			homeSectionList = await SectionContentService.findAllTranslationInViewByWebPageId(
				webPageId,
				selectedLanguage
			);
		}

		console.log(homeSectionList);

		res.locals.sectionList = await CommonComponentServices.groupByType(homeSectionList, (item) => {
			if (item.image_id && item.mime_type) {
				item.imageUrl = `/img/sections/${item.image_id}.${item.mime_type.split("/")[1]}`;
			}
		});

		// Talk to Us Section
		res.locals.complaintMenu = navBarMenuList.find((menu) => menu.url === "/complaints");
		res.locals.publicCommentMenu = navBarMenuList.find((menu) => menu.url === "/public-comments");

		// Alumnies Section
		const alumniList = (await AlumniService.findAllAlumniView()).slice(0, 4);
		const firstFourAlumni = alumniList.map((alumni) => ({
			id: alumni.id,
			fullName: alumni["full_name"],
			generation: alumni.generation,
			job: alumni["job_position"],
			pos: alumni.pos,
			imageUrl: `/img/alumnies/${alumni["image_id"]}.${alumni["mime_type"].split("/")[1]}`,
			mimeType: alumni["mime_type"],
		}));
		res.locals.firstFourAlumni = firstFourAlumni;
		res.locals.alumniesSection = await CommonComponentServices.getAlumniSection(req);
		res.locals.alumniMenu = navBarMenuList.find((menu) => menu.url === "/alumni");

		// Lecturer Section
		const lecturerList = (await LecturerService.findAllLecturerView("pos")).slice(0, 10);
		const firstTenLecturer = lecturerList.map((lecturer) => {
			const result = {
				id: lecturer.id,
				fullName: lecturer["full_name"],
				emailAddress: lecturer["email_address"],
				experience: lecturer["experience"],
				research: lecturer["research"],
				education: lecturer["education"],
			};

			// docUrl: `/lecturer-cv/${lecturer["doc_id"]}.${lecturer["doc_type"].split("/")[1]}`,
			// imageUrl: `/img/lecturer/${lecturer["image_id"]}.${lecturer["image_type"].split("/")[1]}`,

			if (
				lecturer["doc_id"] != undefined &&
				lecturer["doc_id"] != null &&
				lecturer["doc_type"] != undefined &&
				lecturer["doc_type"] != null
			) {
				result.docUrl = `/docs/lecturer-cv/${lecturer["doc_id"]}.${
					lecturer["doc_type"].split("/")[1]
				}`;
			}

			if (
				lecturer["image_id"] != undefined &&
				lecturer["image_id"] != null &&
				lecturer["image_type"] != undefined &&
				lecturer["image_type"] != null
			) {
				result.imageUrl = `/img/lecturer/${lecturer["image_id"]}.${
					lecturer["image_type"].split("/")[1]
				}`;
			}

			return result;
		});
		res.locals.firstTenLecturer = firstTenLecturer;
		res.locals.lecturerSection = await CommonComponentServices.getLecturerSection(req);
		res.locals.lecturerMenu = await CommonComponentServices.findByUrl(navBarMenuList, "/lecturers");

		// Latest News Section
		const newsList = await NewsService.findAllPublishedNews(selectedLanguage);
		const newsData = newsList.map((item) => ({
			newsId: item["id"],
			title: item["title"],
			lastModified: CommonUtils.formatDateTimeToLongString(item["last_modified"], selectedLanguage),
			lang: item["lang"] ? item["lang"] : "ID",
			imageUrl: `/img/news/${item["display_image_id"]}.${item["mime_type"].split("/")[1]}`,
		}));
		res.locals.newsData = newsData;
		res.locals.latestNewsSection = await CommonComponentServices.getLatestNewsSection(req);
		res.locals.latestNewsMenu = await CommonComponentServices.findByUrl(navBarMenuList, "/news");

		// Render the index page
		return res.render("home/index", {
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
	getHome,
};
