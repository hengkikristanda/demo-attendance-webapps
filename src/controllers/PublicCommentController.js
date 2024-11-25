const CommonComponentServices = require("../services/CommonComponentServices");
const { WEB_PAGE_TITLE } = require("../utils/Constants");
const CommonUtils = require("../utils/CommonUtils");
const ComplaintService = require("../services/ComplaintService");
const PublicCommentsService = require("../services/PublicCommentsService");

const currentPage = {
	id: "Komentar Publik",
	en: "Public Comment",
	ja: "公共のコメント",
	ko: "공개 의견",
	zh: "公众评论",
};

const getPublicComments = async (req, res) => {
	// try {
		const selectedLanguage = req.language;

		res.locals.publicCommentsTranslation = await CommonComponentServices.getPublicComment(req);

		// Common components
		const navBarMenuList = await CommonComponentServices.getWebMenu(req.language);
		res.locals.webMenuList = navBarMenuList;
		res.locals.footerTranslation = await CommonComponentServices.getFooter(req);
		res.locals.contactInfo = await CommonComponentServices.getContactInfo();
		res.locals.companyInfo = await CommonComponentServices.getCompanyInfo();

		let commentsData = [];
		const publicCommentList = await PublicCommentsService.findAll();
		for (let n = 0; n < publicCommentList.length; n++) {
			commentsData.push({
				id: publicCommentList[n].id,
				fullName: publicCommentList[n].fullname,
				commentText: publicCommentList[n].comments,
				createdDate: CommonUtils.formatDateToLongString(
					publicCommentList[n]["created_date"],
					selectedLanguage
				),
			});
		}

		res.locals.commentsData = commentsData;

		const alertMessage = req.flash("alertMessage");

		// Render the index page
		return res.render("public-comments/index", {
			title: `${WEB_PAGE_TITLE} ${currentPage[selectedLanguage]}`,
			selectedLanguage,
			alertMessage: alertMessage[0],
		});
	// } catch (error) {
	// 	console.log("=====ERROR:");
	// 	console.log(error);
	// 	req.flash("alertMessage");
	// 	req.flash("alertMessage", {
	// 		message: "Something went wrong, please try again in a few minutes.",
	// 		className: "danger",
	// 	});
	// 	return res.redirect("/error");
	// }
};

const postCreatePublicComment = async (req, res) => {
	try {
		const { fullName, emailAddress, phoneNumber, comment } = req.body;

		const sanitizeContent = CommonUtils.sanitizeContent(comment);

		const createdPublicComment = await PublicCommentsService.create({
			fullName,
			emailAddress,
			phoneNumber,
			sanitizeContent,
		});

		if (!createdPublicComment) throw new Error();

		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Thank you for submitting your comment.",
			className: "success",
		});
	} catch (error) {
		req.flash("alertMessage");
		req.flash("alertMessage", {
			message: "Failed to Submit Comment, please try again in a few minutes.",
			className: "danger",
		});
	}
	return res.redirect("/public-comments");
};

module.exports = {
	getPublicComments,
	postCreatePublicComment,
};
