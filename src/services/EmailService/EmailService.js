const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const transporterNoReply = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: true,
	auth: {
		user: process.env.SMTP_USER_NOREPLY,
		pass: process.env.SMTP_PASS_NOREPLY,
	},
});

const sendNewPasswordEmail = async (userEmail, newPassword) => {
	try {
		const templatePath = path.join(__dirname, "EmailTemplates", "ResetPasswordEmailTemplate.html");
		let htmlContent = fs.readFileSync(templatePath, "utf8");

		// Replace placeholders with actual values
		htmlContent = htmlContent.replace("{{newPassword}}", newPassword);
		htmlContent = htmlContent.replace("{{year}}", new Date().getFullYear());

		const mailOptions = {
			from: process.env.EMAIL_USER, // Sender's email address
			to: userEmail, // Recipient's email address
			subject: "Your Password Reset Request",
			html: htmlContent,
			attachments: [
				{
					filename: "logo-removebg-preview.png", // The file name for the attachment
					path: path.join(__dirname, "EmailTemplates", "logo-removebg-preview.png"), // Path to the image file
					cid: "headerImage", // The content ID to reference in the HTML
				},
			],
		};

		await transporterNoReply.sendMail(mailOptions);
		console.log(`Password reset email sent to ${userEmail}`);
		return { success: true, message: `Password reset email sent to ${userEmail}` };
	} catch (error) {
		console.error("Error sending password reset email:", error);
		return { success: false, message: "Failed to send password reset email" };
	}
};

module.exports = { sendNewPasswordEmail };
