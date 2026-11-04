const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  document.documentElement.classList.add("js");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
  );

  document.querySelectorAll(".scroll-reveal").forEach((element) => {
    revealObserver.observe(element);
  });
}
