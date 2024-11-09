const path = require("path");
const fs = require("fs");
const translate = require("translate-google");
const { JSDOM } = require("jsdom");
const { ta } = require("translate-google/languages");

const getTranslation = (targetComponent, selectedLanguage) => {
	/* return JSON.parse(
		fs.readFileSync(
			path.join(__dirname, `../translations/${targetComponent}/`, `${selectedLanguage}.json`),
			"utf8"
		)
	); */

	const filePath = path.join(
		__dirname,
		`../translations/${targetComponent}/`,
		`${selectedLanguage}.json`
	);
	delete require.cache[require.resolve(filePath)];
	return JSON.parse(fs.readFileSync(filePath));
};

async function translateText(text, targetLang = "en") {
	try {
		const res = await translate(text, { from: "id", to: targetLang });
		return res; // Return the translated result
	} catch (err) {
		console.error(err);
		throw new Error("Translation failed"); // Optionally handle errors by throwing or returning an error message
	}
}

async function translateHtmlContent(htmlContent, lang) {
	const dom = new JSDOM(htmlContent);
	const document = dom.window.document;

	if (lang.toLowerCase() == "zh") lang = "zh-cn";

	// Translate all text nodes while preserving HTML tags and styles
	async function translateNode(node) {
		if (node.nodeType === node.TEXT_NODE) {
			// Translate only the text content
			node.textContent = await translateText(node.textContent, lang);
		} else if (node.nodeType === node.ELEMENT_NODE) {
			for (let child of node.childNodes) {
				await translateNode(child);
			}
		}
	}

	await translateNode(document.body);

	// Return the updated HTML content
	return document.body.innerHTML;
}

module.exports = {
	getTranslation,
	translateHtmlContent,
	translateText,
};
