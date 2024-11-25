const TranslationService = require("../../../services/translationService");
const ContactInfoService = require("../../../services/ContactInfoService");
const CompanyProfileService = require("../../../services/CompanyProfileService");
const NewsService = require("../../../services/NewsService");
const CommonUtils = require("../../../utils/CommonUtils");
const LanguageService = require("../../../services/languageService");

const { WEB_PAGE_TITLE } = require("../../../utils/Constants");

const CommonComponentServices = require("../../../services/CommonComponentServices");

const currentPage = {
	id: "Berita Terbaru",
	en: "Latest News",
	ja: "最新ニュース",
	ko: "최신 뉴스",
	zh: "最新新闻",
};

const ID = {
	title: "Berita Terbaru",
};

const EN = {
	title: "Latest News",
};

const JA = {
	title: "最新ニュース",
};
const KO = {
	title: "최신 뉴스",
};
const ZH = {
	title: "最新消息",
};

const getNews = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		const newsId = req.params.newsId;

		if (newsId) {
			let publishedNews = await NewsService.findPublishedNewsById(newsId, selectedLanguage);
			publishedNews = publishedNews.toJSON();

			publishedNews.imageUrl = `/img/news/${publishedNews["display_image_id"]}.${
				publishedNews["mime_type"].split("/")[1]
			}`;
			(publishedNews.lastModified = CommonUtils.formatDateTimeToLongString(
				publishedNews["last_modified"],
				selectedLanguage
			)),
				(res.locals.publishedNews = publishedNews);
		} else {
			const newsList = await NewsService.findAllPublishedNews(selectedLanguage);
			const newsData = newsList.map((item) => ({
				id: item["id"],
				title: item["title"],
				lastModified: CommonUtils.formatDateTimeToLongString(
					item["last_modified"],
					selectedLanguage
				),
				lang: item["lang"] ? item["lang"] : "ID",
				imageUrl: `/img/news/${item["display_image_id"]}.${item["mime_type"].split("/")[1]}`,
			}));
			res.locals.newsData = newsData;
		}

		res.locals.newsSectionTranslation = ID;

		if (selectedLanguage == "en") {
			res.locals.newsSectionTranslation = EN;
		} else if (selectedLanguage == "ja") {
			res.locals.newsSectionTranslation = JA;
		} else if (selectedLanguage == "ko") {
			res.locals.newsSectionTranslation = KO;
		} else if (selectedLanguage == "zh") {
			res.locals.newsSectionTranslation = ZH;
		}

		const alertMessage = req.flash("alertMessage");

		// Render the index page
		return res.render("information/news/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		console.log(error);
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
			actionLinkLabel: "Back to Home",
			actionLink: "/",
		});
		return res.redirect("/error");
	}
};

module.exports = {
	getNews,
};
