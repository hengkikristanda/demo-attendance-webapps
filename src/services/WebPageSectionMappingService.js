const path = require("path");
const fs = require("fs-extra"); // Import fs-extra for file handling
const CommonUtils = require("../utils/CommonUtils");
const { WebPageSectionMapping } = require("../model/WebPageSectionMapping");

const findByWebPageId = async (webPageId) => {
	try {
		return WebPageSectionMapping.findAll({
			where: { web_page_id: webPageId },
			order: [["pos"]],
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Fetching WebPageSectionMapping");
	}
};

module.exports = {
	findByWebPageId,
};
