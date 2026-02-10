document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach((element) => element.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const rect = entry.target.getBoundingClientRect();
                    const depth = Math.min(Math.max(rect.top / window.innerHeight, 0.2), 1.2);
                    const duration = 0.55 + depth * 0.35;
                    entry.target.style.setProperty('--reveal-duration', `${duration}s`);
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px',
        }
    );

    revealElements.forEach((element) => observer.observe(element));
});
