const CommonComponentServices = require("../services/CommonComponentServices");
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

const getComplaints = async (req, res) => {
	try {
		const selectedLanguage = req.language;

		res.locals.complaintsTranslation = await CommonComponentServices.getComplaints(req);

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		const alertMessage = req.flash("alertMessage");

		// Render the index page
		return res.render("complaints/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
			alertMessage: alertMessage[0],
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Something went wrong, please try again in a few minutes.",
			className: "danger",
		});
		return res.redirect("/error");
	}
};

const postCreateComplaint = async (req, res) => {
	try {
		const { fullName, emailAddress, phoneNumber, complaints } = req.body;

		const sanitizeContent = CommonUtils.sanitizeContent(complaints);

		const createdComplaint = await ComplaintService.createComplaint(
			{
				full_name: fullName,
				email_address: emailAddress,
				phone_no: phoneNumber,
				content: sanitizeContent,
			},
			req.file
		);

		if (!createdComplaint) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message:
				"Thank you for submitting your complaint. Your feedback is valuable to us, and we will address your concern as soon as possible.",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to Submit Complaint, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/complaints");
};

module.exports = {
	getComplaints,
	postCreateComplaint,
};
