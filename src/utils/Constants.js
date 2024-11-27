const { id } = require("translate-google/languages");

const LANGUAGE_CODE = ["en", "id", "zh", "ja", "ko"];
const WEB_PAGE_TITLE = "PTDI STTD";
const LIMIT_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes

const VALIDATION_ERROR_CODE = {
	400: "Something went wrong",
	422: "Invalid attached file",
	423: `File size should not exceed 5mb`,
};

const PROFILE_PICTURE_PLACEHOLDER = "/img/profile-picture-placeholder.jpeg";

const allowedDocumentFileFormat = [".pdf"];
const allowedImageFileFormat = [".png", ".jpg", ".jpeg"];

function getHttpStatusMessage(code) {
	const httpStatusMessages = {
		100: "Continue",
		101: "Switching Protocols",
		102: "Processing",
		200: "OK",
		201: "Created",
		202: "Accepted",
		203: "Non-Authoritative Information",
		204: "No Content",
		205: "Reset Content",
		206: "Partial Content",
		207: "Multi-Status",
		208: "Already Reported",
		226: "IM Used",
		300: "Multiple Choices",
		301: "Moved Permanently",
		302: "Found",
		303: "See Other",
		304: "Not Modified",
		305: "Use Proxy",
		307: "Temporary Redirect",
		308: "Permanent Redirect",
		400: "Bad Request",
		401: "Unauthorized",
		402: "Payment Required",
		403: "Forbidden",
		404: "Not Found",
		405: "Method Not Allowed",
		406: "Not Acceptable",
		407: "Proxy Authentication Required",
		408: "Request Timeout",
		409: "Conflict",
		410: "Gone",
		411: "Length Required",
		412: "Precondition Failed",
		413: "Payload Too Large",
		414: "URI Too Long",
		415: "Unsupported Media Type",
		416: "Range Not Satisfiable",
		417: "Expectation Failed",
		418: "I'm a Teapot",
		422: "Unprocessable Entity",
		423: "Locked",
		424: "Failed Dependency",
		426: "Upgrade Required",
		428: "Precondition Required",
		429: "Too Many Requests",
		431: "Request Header Fields Too Large",
		451: "Unavailable For Legal Reasons",
		500: "Internal Server Error",
		501: "Not Implemented",
		502: "Bad Gateway",
		503: "Service Unavailable",
		504: "Gateway Timeout",
		505: "HTTP Version Not Supported",
		506: "Variant Also Negotiates",
		507: "Insufficient Storage",
		508: "Loop Detected",
		510: "Not Extended",
		511: "Network Authentication Required",
	};

	return httpStatusMessages[code] || "Unknown Status Code";
}

const TEMPLATES = [
	{
		id: "SimpleBasic",
		label: "Sections",
	},
	{
		id: "CtaSection",
		label: "Section CTA",
	},
	{
		id: "AccordionSection",
		label: "Accordion",
	},
	{
		id: "GallerySection",
		label: "Gallery",
	},
	{
		id: "SimpleSection",
		label: "Simple Section",
	},
];

module.exports = {
	TEMPLATES,
	LANGUAGE_CODE,
	getHttpStatusMessage,
	WEB_PAGE_TITLE,
	LIMIT_FILE_SIZE,
	VALIDATION_ERROR_CODE,
	allowedDocumentFileFormat,
	allowedImageFileFormat,
	PROFILE_PICTURE_PLACEHOLDER
};
