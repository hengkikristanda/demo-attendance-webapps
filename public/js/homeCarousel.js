const innerContainer = document.getElementById("innerContainer");

let slidePercentage = 0;

const carouselNavBtn = document.querySelectorAll(".carousel-nav-btn");
carouselNavBtn.forEach((btn, index) => {
	btn.addEventListener("mouseup", () => {
		if (index == 0 && slidePercentage < 0) {
			slidePercentage += 25;
		} else if (index == 1 && slidePercentage > -75) {
			slidePercentage -= 25;
		}
		innerContainer.style.transform = `translateX(${slidePercentage}%)`;
	});
});

function goToNextSlide() {
	if (slidePercentage > -75) {
		slidePercentage -= 25;
	} else {
		slidePercentage = 0;
	}
	innerContainer.style.transform = `translateX(${slidePercentage}%)`;
}

setInterval(goToNextSlide, 5000);
