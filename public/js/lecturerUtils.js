document.addEventListener("DOMContentLoaded", () => {
	var slidesContainer = document.querySelector(".slides");
	var slides = document.querySelectorAll(".slide");
	var currentSlide = 0;

	function showSlide(index) {
		if (index >= 0 && index < slides.length) {
			slidesContainer.style.transform = `translateX(${-index * 100}%)`;
			currentSlide = index;
		}
	}
});
