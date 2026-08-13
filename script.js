document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(".reveal");

    /*
     * Reveal sections as they enter the viewport.
     */

    if (!("IntersectionObserver" in window)) {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const element = entry.target;

                const position =
                    element.getBoundingClientRect().top /
                    window.innerHeight;

                const depth = Math.min(
                    Math.max(position, 0.2),
                    1.2
                );

                const duration =
                    0.55 + depth * 0.25;

                element.style.setProperty(
                    "--reveal-duration",
                    `${duration}s`
                );

                element.classList.add("is-visible");

                observerInstance.unobserve(element);
            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });


    /*
     * Subtle project-card interaction.
     * Keeps the UI responsive without heavy animation.
     */

    const cards =
        document.querySelectorAll(".project-card");

    cards.forEach((card) => {

        card.addEventListener("mousemove", (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                ((event.clientX - rect.left) / rect.width - 0.5) * 2;

            const y =
                ((event.clientY - rect.top) / rect.height - 0.5) * 2;

            card.style.transform =
                `translateY(-8px) perspective(900px)
                 rotateX(${y * -1.2}deg)
                 rotateY(${x * 1.2}deg)`;
        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";
        });

    });


    /*
     * Current year in footer.
     * Your HTML already says 2026, but this keeps it current automatically.
     */

    const footerYear =
        document.querySelector(".site-footer p");

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} J Venkata Sandeep`;
    }

});
