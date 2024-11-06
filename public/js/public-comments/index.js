document.addEventListener("DOMContentLoaded", () => {
	const phoneNumber = document.getElementById("phoneNumber");
	phoneNumber.addEventListener("input", enforceNumberInput);
	phoneNumber.addEventListener("paste", enforceNumberInputOnCopyPaste);
});
