const TabListItem = require("../../model/TabListItem");
const TabListItemTranslation = require("../../model/TabListItemTranslation");

const findAllByTabListId = async (tabListId) => {
	try {
		return TabListItem.findAll({
			where: {
				tablist_id: tabListId,
			},
			order: [["pos", "ASC"]], // order should be part of the same options object
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Tab List Item");
	}
};

const findOneTranslationByTabListItemId = async (tabListItemId, lang) => {
	try {
		return TabListItemTranslation.findOne({
			where: {
				tablist_item_id: tabListItemId,
				lang,
			},
			raw: true,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Error Find Tab List Item Translation");
	}
};

module.exports = {
	findAllByTabListId,
	findOneTranslationByTabListItemId,
};
