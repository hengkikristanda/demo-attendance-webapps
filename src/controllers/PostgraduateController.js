const express = require("express");
const axios = require("axios");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const fs = require("fs");

const siteMenuServices = require("../services/siteMenuServices");
const CommonsComponentServices = require("../services/CommonsComponentServices");
const LanguageService = require("../services/languageService");
const TranslationService = require("../services/translationService");
const ContactInfoService = require("../services/ContactInfoService");
const CompanyProfileService = require("../services/CompanyProfileService");
const PublicImagesService = require("../services/PublicImagesService");
const AlumniService = require("../services/AlumniService");
const LecturerService = require("../services/Lecturer/LecturerService");
const NewsService = require("../services/NewsService");
const CommonUtils = require("../utils/CommonUtils");
const PublicCommentsService = require("../services/PublicCommentsService");
const FacilitiesTranslationService = require("../services/FacilitiesTranslationService");
const FacilitiesImagesService = require("../services/FacilitiesImagesService");
const LecturerDetailService = require("../services/Lecturer/LecturerDetailService");
const StudyProgramService = require("../services/StudyProgram/StudyProgramService");
const SectionContentService = require("../services/SectionContent/SectionContentService");
const { WEB_PAGE_TITLE } = require("../utils/Constants");

const currentPage = {
	id: "Magister Pemasaran, Inovasi, dan Teknologi",
	en: "Master in Marketing, Innovation and Technology",
	ja: "マーケティング、イノベーション、テクノロジーの修士号",
	ko: "마케팅, 혁신 및 기술 석사",
	zh: "市场营销、创新和技术硕士",
};

const getPostGraduateMarketingInnovationTechnology = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonsComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonsComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonsComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonsComponentServices.getCompanyInfo();

		const heroSection = await CommonsComponentServices.getMarketingInnovationTechnologyHeroSection(
			req
		);

		res.locals.heroSection = heroSection;

		const groupSection =
			await CommonsComponentServices.getMarketingInnovationTechnologyGroupSection(req);

		res.locals.groupSection = groupSection;

		const summarySection =
			await CommonsComponentServices.getMarketingInnovationTechnologySummarySection(req);

		res.locals.summarySection = summarySection;

		const overviewSection =
			await CommonsComponentServices.getMarketingInnovationTechnologyOverviewSection(req);

		res.locals.overviewSection = overviewSection;

		const studentActivitiesSection =
			await CommonsComponentServices.getMarketingInnovationTechnologyStudentActivitiesSection(req);

		res.locals.studentActivitiesSection = studentActivitiesSection;

		const careerImpactSection =
			await CommonsComponentServices.getMarketingInnovationTechnologyCareerImpactSection(req);

		res.locals.careerImpactSection = careerImpactSection;

		// Render the index page
		return res.render("academics/postGraduate/marketingInnovationTechnology/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

const getSafetyRiskEngineering = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonsComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonsComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonsComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonsComponentServices.getCompanyInfo();

		const heroSection = await CommonsComponentServices.getSafetyRiskEngHeroSection(req);

		res.locals.heroSection = heroSection;

		const groupSection = await CommonsComponentServices.getSafetyRiskEngGroupSection(req);

		res.locals.groupSection = groupSection;

		const summarySection = await CommonsComponentServices.getSafetyRiskEngSummarySection(req);

		res.locals.summarySection = summarySection;

		const overviewSection = await CommonsComponentServices.getSafetyRiskEngOverviewSection(req);

		res.locals.overviewSection = overviewSection;

		const studentActivitiesSection =
			await CommonsComponentServices.getSafetyRiskEngStudentActivitiesSection(req);

		res.locals.studentActivitiesSection = studentActivitiesSection;

		const careerImpactSection = await CommonsComponentServices.getSafetyRiskEngCareerImpactSection(
			req
		);

		res.locals.careerImpactSection = careerImpactSection;

		// Render the index page
		return res.render("academics/postGraduate/safetyRiskEngineering/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

module.exports = {
	getPostGraduateMarketingInnovationTechnology,
	getSafetyRiskEngineering,
};
