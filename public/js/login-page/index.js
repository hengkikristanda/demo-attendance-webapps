document.addEventListener("DOMContentLoaded", () => {
	handleButtonState_onClick("loginForm", "signInButton");
	handleButtonState_onFormSubmit("loginForm", "signInButton");

	handleButtonState_onClick("resetPasswordForm", "resetPasswordButton");
	handleButtonState_onFormSubmit("resetPasswordForm", "resetPasswordButton");
});
