const { where } = require("sequelize");
const WebPage = require("../model/WebPage");
const { WebPageContentMapping, sequelize } = require("../model/WebPageContentMapping");
const { raw } = require("body-parser");

const findAll = async () => {
	try {
		return WebMenu.WebPage({
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Web Page");
	}
};

const findMappingById = async (webPageId) => {
	try {
		return WebPageContentMapping.findAll({
			where: {
				web_page_id: webPageId,
			},
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Web Page Content Mapping");
	}
};

async function groupByIdentifier(data) {
	return await data.reduce(
		(groups, item) => {
			if (item.hero_section_id) {
				groups.hero_section.push(item);
			}
			if (item.section_content_id) {
				groups.section_content.push(item);
			}
			if (item.accordion_content_id) {
				groups.accordion_content.push(item);
			}
			if (item.section_images_id) {
				groups.section_images.push(item);
			}
			return groups;
		},
		{ hero_section: [], section_content: [], accordion_content: [], section_images: [] }
	);
}
// Group the data
module.exports = {
	findAll,
	findMappingById,
	groupByIdentifier,
};
