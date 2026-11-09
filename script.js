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

// Update copyright year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// ============================================
// Interactive Program Filtering (programs.html)
// ============================================
const filterTabs = document.querySelectorAll(".filter-tab[data-filter]");
const programSections = document.querySelectorAll(".program-detail-section");

if (filterTabs.length && programSections.length) {
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter");

      // Update active tab styling and ARIA attributes
      filterTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      // Filter program sections
      programSections.forEach((section) => {
        const type = section.getAttribute("data-program-type");
        if (filter === "all" || filter === type) {
          section.classList.remove("is-hidden");
          // Re-trigger scroll reveal if it was hidden
          section.querySelector(".scroll-reveal")?.classList.add("is-visible");
        } else {
          section.classList.add("is-hidden");
        }
      });
    });
  });
}

// ============================================
// "Find Your Fit" Interactive Recommendation Tool
// ============================================
const quizButtons = document.querySelectorAll(".quiz-option-btn");
const quizResult = document.getElementById("quiz-result");

if (quizButtons.length && quizResult) {
  const recommendations = {
    analytics: {
      tag: "Recommendation: Data Analytics",
      title: "Data Analytics is your ideal match!",
      statement: "Working with data & extracting actionable business insights",
      description:
        "Your curiosity about finding out 'why things happen' and passion for numbers makes Data Analytics the right path. You'll master spreadsheets, SQL databases, data cleaning, and executive dashboards to turn messy data into clear business choices.",
      targetAnchor: "#data-analytics",
      applyLabel: "Apply for Data Analytics Internship",
    },
    webdev: {
      tag: "Recommendation: Web Development",
      title: "Web Development is your ideal match!",
      statement: "Designing & building modern websites and web applications",
      description:
        "Your instinct to create tangible products, design responsive interfaces, and write functional code makes Web Development a natural fit. You'll master HTML, CSS, JavaScript, Git/GitHub, and deploy your own live web applications.",
      targetAnchor: "#web-development",
      applyLabel: "Apply for Web Development Internship",
    },
  };

  quizButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-recommend");
      const rec = recommendations[type];

      // Update active button state
      quizButtons.forEach((b) => b.classList.remove("is-selected"));
      btn.classList.add("is-selected");

      if (rec) {
        quizResult.innerHTML = `
          <div class="quiz-recommendation-box ${type}-highlight">
            <span class="quiz-rec-tag">${rec.tag}</span>
            <h3>${rec.title}</h3>
            <p class="quiz-rec-statement">${rec.statement}</p>
            <p class="quiz-rec-desc">${rec.description}</p>
            <div class="quiz-rec-actions">
              <a class="button button-small button-primary" href="https://forms.gle/8EbdSy5ttGfLZfjv5?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer">
                ${rec.applyLabel} ↗
              </a>
              <a class="text-link" href="${rec.targetAnchor}">
                Review full curriculum & skills ↓
              </a>
            </div>
          </div>
        `;
      }
    });
  });
}
