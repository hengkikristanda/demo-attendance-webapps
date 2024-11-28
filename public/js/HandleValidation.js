function hasEmpty(values) {
	return values.some((value) => value === "" || value === undefined);
}

function displayValidationResult(targetElement, message, className) {
	targetElement.textContent = message;
	targetElement.classList.remove("hidden");
	targetElement.classList.add(className);
}

function cleanUpValues(inputList) {
	inputList.forEach((input) => {
		input.value = "";
		input.checked = false;
		input.selectedIndex = 0;
	});
}

function validateEmailInput(input) {
	// Regular expression to validate email format
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(input);
}

function enforcePhoneNumber(input) {
	// Remove any character that is not a digit
	let cleaned = ("" + input.value).replace(/\D/g, "");

	// Match the cleaned number to the pattern (XXX) XXX-XXXX
	let match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);

	if (match) {
		input.value = !match[2]
			? match[1]
			: "(" + match[1] + ") " + match[2] + (match[3] ? "-" + match[3] : "");
	}
}
