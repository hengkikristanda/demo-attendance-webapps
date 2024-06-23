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

    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
    
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
    
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } /* else {
                reveals[i].classList.remove("active");
            } */
        }
    }

    window.addEventListener("scroll", reveal);
});
