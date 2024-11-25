const CommonComponentServices = require("../services/CommonsComponentServices");
const { WEB_PAGE_TITLE } = require("../utils/Constants");
const { VALIDATION_ERROR_CODE } = require("../utils/Constants");
const CommonUtils = require("../utils/CommonUtils");
const ComplaintService = require("../services/ComplaintService");

const currentPage = {
	id: "Keluhan",
	en: "Complaint",
	ja: "苦情",
	ko: "불만",
	zh: "投诉",
};

let errorMessage = {};

const getComplaints = async (req, res) => {
	const error = req.query.error || null;

	if (error) {
		res.locals.responseMessage = `${VALIDATION_ERROR_CODE[error]}`;
		res.locals.responseMessageClass = "danger";
	}

	if (errorMessage.isError) {
		res.locals.responseMessage = errorMessage.message;
		res.locals.responseMessageClass = "danger";
		errorMessage = {};
	}

	const selectedLanguage = req.language;

	res.locals.complaintsTranslation = await CommonComponentServices.getComplaints(req);

	// Common components
	const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
	res.locals.webMenuList = navBarMenuList;
	res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
	res.locals.contactInfo = await CommonComponentServices.getContactInfo();
	res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

	// Render the index page
	res.render("complaints/index", {
		title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
		selectedLanguage,
	});
};

const postCreateComplaint = async (req, res) => {
	try {
		const { fullName, emailAddress, phoneNumber, complaints } = req.body;

		const sanitizeContent = CommonUtils.sanitizeContent(complaints);

		const fileMetaData = {};
		if (req.file) {
			fileMetaData.uploadedFilePath = req.file.path;
			fileMetaData.originalFileName = req.file.originalname;
			fileMetaData.mimeType = req.file.mimeType;
		}

		await ComplaintService.createComplaint(
			{
				full_name: fullName,
				email_address: emailAddress,
				phone_no: phoneNumber,
				content: sanitizeContent,
			},
			fileMetaData
		);

		return res.status(400).json({ error: "TEST" });
	} catch (error) {
		console.log(error);
	}
	errorMessage.message = "Failed to submit complaint. Please try again later";
	errorMessage.isError = true;
	return res.redirect("/complaints");
};

module.exports = {
	getComplaints,
	postCreateComplaint,
};
