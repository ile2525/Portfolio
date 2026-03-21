export function carrouselAutomatique() {
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const pointsContainer = document.querySelector(".points");

    let index = 0;
    let interval;

    let startX = 0;

    const carrousel = document.querySelector(".carrousel");


    carrousel.addEventListener("pointerdown", (e) => {
        startX = e.clientX;
    });

    carrousel.addEventListener("pointerup", (e) => {
        let endX = e.clientX;
        let diff = endX - startX;

        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                // swipe gauche → next
                index = (index + 1) % slides.length;
            } else {
                // swipe droite → prev
                index = (index - 1 + slides.length) % slides.length;
            }

            afficherSlide(index);
            resetAuto();
        }
    });

    // créer les points
    slides.forEach((_, i) => {
        const point = document.createElement("span");
        point.classList.add("point");

        point.addEventListener("click", () => {
            index = i;
            afficherSlide(index);
            resetAuto();
        });

        pointsContainer.appendChild(point);
    });

    const points = document.querySelectorAll(".point");

    function afficherSlide(i) {
        slides.forEach(slide => slide.classList.remove("active"));
        points.forEach(p => p.classList.remove("active"));

        slides[i].classList.add("active");
        points[i].classList.add("active");
    }


    // next / prev
    nextBtn.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        afficherSlide(index);
        resetAuto();
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        afficherSlide(index);
        resetAuto();
    });

    // auto scroll
    function demarrerAuto() {
        interval = setInterval(() => {
            index = (index + 1) % slides.length;
            afficherSlide(index);
        }, 3000);
    }

    function resetAuto() {
        clearInterval(interval);
        demarrerAuto();
    }

    // init
    afficherSlide(index);
    demarrerAuto();
}