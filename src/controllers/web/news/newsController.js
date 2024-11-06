const TranslationService = require("../../../services/translationService");
const ContactInfoService = require("../../../services/ContactInfoService");
const CompanyProfileService = require("../../../services/CompanyProfileService");
const NewsService = require("../../../services/NewsService");
const CommonUtils = require("../../../utils/CommonUtils");
const LanguageService = require("../../../services/languageService");

const pageTitle = "PTDI STTD - ";

const getNews = async (req, res) => {
	const currentPage = {
		id: "Berita Terbaru",
		en: "Latest News",
		ja: "最新ニュース",
		ko: "최신 뉴스",
		zh: "最新新闻",
	};

	// Get the language from the query parameter or use the language from the cookie if it exists
	let selectedLanguage = req.query.lang
		? LanguageService.getUserPreferredLanguage(req.query.lang)
		: req.cookies.language || "en"; // Default to 'en' if no cookie or query param

	// Set the language preference in a cookie
	res.cookie("language", selectedLanguage, { maxAge: 900000, httpOnly: true });

	// Load translations
	const navBarTranslation = TranslationService.getTranslation("navbar", selectedLanguage);
	const footerTranslation = TranslationService.getTranslation("footer", selectedLanguage);
	const newsSectionTranslation = TranslationService.getTranslation("home/news", selectedLanguage);

	// Redirect only if `lang` query parameter is present
	if (req.query.lang) {
		const cleanUrl = req.originalUrl.split("?")[0]; // Remove query parameters
		return res.redirect(cleanUrl); // Redirect to the clean URL
	}

	const emails = [];
	const phoneNo = [];
	const instagram = [];
	const youtube = [];
	const facebook = [];
	const whatsapp = [];

	const contactInfo = await ContactInfoService.findAll();
	for (let n = 0; n < contactInfo.length; n++) {
		if (contactInfo[n].channel.toLowerCase() === "email") {
			emails.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "phone") {
			phoneNo.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "instagram") {
			instagram.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "youtube") {
			youtube.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "facebook") {
			facebook.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		} else if (contactInfo[n].channel.toLowerCase() === "whatsapp") {
			whatsapp.push({
				label: contactInfo[n].label,
				value: contactInfo[n].value,
			});
		}
	}

	let companyInfo = {};

	const companyProfile = await CompanyProfileService.findAll();
	for (let n = 0; n < companyProfile.length; n++) {
		companyInfo = {
			address: companyProfile[n].address,
		};
	}

	const newsId = req.params.newsId;

	if (newsId) {
		let publishedNews = await NewsService.findPublishedNewsById(newsId, selectedLanguage);
		publishedNews = publishedNews.toJSON();

		publishedNews.imageUrl = `/img/news/${publishedNews["display_image_id"]}.${publishedNews["mime_type"].split("/")[1]}`;
		publishedNews.lastModified = CommonUtils.formatDateTimeToLongString(publishedNews["last_modified"], selectedLanguage),

		res.locals.publishedNews = publishedNews;
	} else {
		const newsList = await NewsService.findAllPublishedNews(selectedLanguage);
		const newsData = newsList.map((item) => ({
			id: item["id"],
			title: item["title"],
			lastModified: CommonUtils.formatDateTimeToLongString(item["last_modified"], selectedLanguage),
			lang: item["lang"] ? item["lang"] : "ID",
			imageUrl: `/img/news/${item["display_image_id"]}.${item["mime_type"].split("/")[1]}`,
		}));
		res.locals.newsData = newsData;
	}

	res.locals.navBarTranslation = navBarTranslation;
	res.locals.footerTranslation = footerTranslation;
	res.locals.newsSectionTranslation = newsSectionTranslation;

	res.locals.emails = emails;
	res.locals.phoneNo = phoneNo;
	res.locals.instagram = instagram;
	res.locals.youtube = youtube;
	res.locals.whatsapp = whatsapp;
	res.locals.facebook = facebook;
	res.locals.companyInfo = companyInfo;

	// Render the index page
	res.render("information/news/index", {
		title: `${pageTitle} ${currentPage[selectedLanguage]}`,
		currentPage: currentPage[selectedLanguage],
		selectedLanguage,
	});
};

module.exports = {
	getNews,
};
