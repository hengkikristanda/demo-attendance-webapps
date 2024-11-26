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

const { WEB_PAGE_TITLE } = require("../utils/Constants");

const getAssociateRoadTransportationManagement = async (req, res) => {
	const currentPage = {
		id: "D-III Manajemen Transportasi Jalan",
		EN: "Diploma III Road Transport Management",
		JA: "道路輸送管理学科 (D-III)",
		KO: "도로교통관리학과 (D-III)",
		ZH: "道路运输管理学 (D-III)",
	};
	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonsComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonsComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonsComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonsComponentServices.getCompanyInfo();

		const heroSection = await CommonsComponentServices.getAcademicsHeroSection(
			req,
			"d3TransportasiJalanHeroSection"
		);

		res.locals.heroSection = heroSection;

		const groupSection = await CommonsComponentServices.getAcademicsGroupSection(
			req,
			"d3TransportasiJalanGroupSection"
		);

		res.locals.groupSection = groupSection;

		const summarySection = await CommonsComponentServices.getAcademicsSummarySection(
			req,
			"d3TransportasiJalanSummarySection"
		);

		res.locals.summarySection = summarySection;

		const overviewSection = await CommonsComponentServices.getAcademicsOverviewSection(
			req,
			"d3TransportasiJalanOverviewSection"
		);

		res.locals.overviewSection = overviewSection;

		const studentActivitiesSection =
			await CommonsComponentServices.getAcademicsStudentActivitiesSection(
				req,
				"d3TransportasiJalanStudentActivitiesSection"
			);

		res.locals.studentActivitiesSection = studentActivitiesSection;

		const careerImpactSection = await CommonsComponentServices.getAcademicsCareerImpactSection(
			req,
			"d3TransportasiJalanCareerImpactSection"
		);

		res.locals.careerImpactSection = careerImpactSection;

		// Render the index page
		return res.render("academics/underGraduate/associateRoadTransportationManagement/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

const getAssociateRailwayTransportationManagement = async (req, res) => {
	const currentPage = {
		id: "D-III Manajemen Transportasi Perkeretaapian",
		en: "D-III Railway Transportation Management",
		ja: "D-III 鉄道輸送管理",
		ko: "D-III 철도운송관리",
		zh: "D-III 铁路运输管理",
	};

	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonsComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonsComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonsComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonsComponentServices.getCompanyInfo();

		const heroSection = await CommonsComponentServices.getAcademicsHeroSection(
			req,
			"d3TransportasiKeretaApiHeroSection"
		);

		res.locals.heroSection = heroSection;

		const groupSection = await CommonsComponentServices.getAcademicsGroupSection(
			req,
			"d3TransportasiKeretaApiGroupSection"
		);

		res.locals.groupSection = groupSection;

		const summarySection = await CommonsComponentServices.getAcademicsSummarySection(
			req,
			"d3TransportasiKeretaApiSummarySection"
		);

		res.locals.summarySection = summarySection;

		const overviewSection = await CommonsComponentServices.getAcademicsOverviewSection(
			req,
			"d3TransportasiKeretaApiOverviewSection"
		);

		res.locals.overviewSection = overviewSection;

		const studentActivitiesSection =
			await CommonsComponentServices.getAcademicsStudentActivitiesSection(
				req,
				"d3TransportasiKeretaApiStudentActivitiesSection"
			);

		res.locals.studentActivitiesSection = studentActivitiesSection;

		const careerImpactSection = await CommonsComponentServices.getAcademicsCareerImpactSection(
			req,
			"d3TransportasiKeretaApiCareerImpactSection"
		);

		res.locals.careerImpactSection = careerImpactSection;

		// Render the index page
		return res.render("academics/underGraduate/associateRailwayTransportationManagement/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

const getAppliedBachelorLandTransportationManagement = async (req, res) => {
	const currentPage = {
		id: "Sarjana Terapan Manajemen Transportasi Darat",
		en: "Bachelor of Applied Land Transportation Management",
		ja: "応用陸上輸送管理学士",
		ko: "응용 육상 운송 관리 학사",
		zh: "应用陆路运输管理学士",
	};

	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonsComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonsComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonsComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonsComponentServices.getCompanyInfo();

		const heroSection = await CommonsComponentServices.getAcademicsHeroSection(
			req,
			"transportasiDaratHeroSection"
		);

		res.locals.heroSection = heroSection;

		const groupSection = await CommonsComponentServices.getAcademicsGroupSection(
			req,
			"transportasiDaratGroupSection"
		);

		res.locals.groupSection = groupSection;

		const summarySection = await CommonsComponentServices.getAcademicsSummarySection(
			req,
			"transportasiDaratSummarySection"
		);

		res.locals.summarySection = summarySection;

		const overviewSection = await CommonsComponentServices.getAcademicsOverviewSection(
			req,
			"transportasiDaratOverviewSection"
		);

		res.locals.overviewSection = overviewSection;

		const studentActivitiesSection =
			await CommonsComponentServices.getAcademicsStudentActivitiesSection(
				req,
				"transportasiDaratStudentActivitiesSection"
			);

		res.locals.studentActivitiesSection = studentActivitiesSection;

		const careerImpactSection = await CommonsComponentServices.getAcademicsCareerImpactSection(
			req,
			"transportasiDaratCareerImpactSection"
		);

		res.locals.careerImpactSection = careerImpactSection;

		// Render the index page
		return res.render("academics/underGraduate/appliedBachelorLandTransportationManagement/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

const getAppliedBachelorAutomotiveEngineeringTechnology = async (req, res) => {
	const currentPage = {
		id: "Sarjana Terapan Teknologi Rekayasa Otomotif",
		en: "Bachelor of Applied Automotive Engineering Technology",
		ja: "応用自動車工学技術学士",
		ko: "응용 자동차 공학 기술 학사",
		zh: "应用汽车工程技术学士",
	};

	try {
		const selectedLanguage = req.language;

		// Common components
		const navBarMenuList = await CommonsComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonsComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonsComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonsComponentServices.getCompanyInfo();

		const heroSection = await CommonsComponentServices.getAcademicsHeroSection(
			req,
			"rekayasaOtomotifHeroSection"
		);

		res.locals.heroSection = heroSection;

		const groupSection = await CommonsComponentServices.getAcademicsGroupSection(
			req,
			"rekayasaOtomotifGroupSection"
		);

		res.locals.groupSection = groupSection;

		const summarySection = await CommonsComponentServices.getAcademicsSummarySection(
			req,
			"rekayasaOtomotifSummarySection"
		);

		res.locals.summarySection = summarySection;

		const overviewSection = await CommonsComponentServices.getAcademicsOverviewSection(
			req,
			"rekayasaOtomotifOverviewSection"
		);

		res.locals.overviewSection = overviewSection;

		const studentActivitiesSection =
			await CommonsComponentServices.getAcademicsStudentActivitiesSection(
				req,
				"rekayasaOtomotifStudentActivitiesSection"
			);

		res.locals.studentActivitiesSection = studentActivitiesSection;

		const careerImpactSection = await CommonsComponentServices.getAcademicsCareerImpactSection(
			req,
			"rekayasaOtomotifCareerImpactSection"
		);

		res.locals.careerImpactSection = careerImpactSection;

		// Render the index page
		return res.render("academics/underGraduate/appliedBachelorAutomotiveEngineeringTechnology/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
		});
	} catch (error) {
		console.log(error);
	}
	return res.redirect("/error");
};

module.exports = {
	getAssociateRoadTransportationManagement,
	getAssociateRailwayTransportationManagement,
	getAppliedBachelorLandTransportationManagement,
	getAppliedBachelorAutomotiveEngineeringTechnology,
};
