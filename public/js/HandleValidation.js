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

