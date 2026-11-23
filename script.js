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
// Interactive Internship Roadmap
// ============================================
const trackTasks = {
  analytics: [
    {
      number: 1,
      day: 1,
      title: "Data Cleaning Basics",
      description:
        "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
      difficulty: "Beginner",
    },
    {
      number: 2,
      day: 4,
      title: "Formulas & Pivot Tables",
      description:
        "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
      difficulty: "Beginner",
    },
    {
      number: 3,
      day: 8,
      title: "Data Visualization",
      description:
        "Create charts and a simple dashboard that communicate useful insights from a dataset.",
      difficulty: "Beginner → Intermediate",
    },
    {
      number: 4,
      day: 11,
      title: "Introduction to SQL",
      description:
        "Practice basic SQL queries and use them to answer real-world questions about data.",
      difficulty: "Beginner → Intermediate",
    },
    {
      number: 5,
      day: 15,
      title: "SQL Joins & Aggregations",
      description:
        "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
      difficulty: "Intermediate",
    },
    {
      number: 6,
      day: 19,
      title: "Lookup Functions & Data Wrangling",
      description:
        "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
      difficulty: "Intermediate",
    },
    {
      number: 7,
      day: 22,
      title: "Mini Analysis Project",
      description:
        "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
      difficulty: "Intermediate",
    },
    {
      number: 8,
      day: 26,
      title: "Capstone Project",
      description:
        "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
      difficulty: "Intermediate",
    },
  ],
  webdev: [
    {
      number: 1,
      day: 1,
      title: "Build the TechBridge Homepage",
      description:
        "Create the first version of the TechBridge website using HTML and CSS.",
      difficulty: "Beginner",
    },
    {
      number: 2,
      day: 4,
      title: "Build the TechBridge Programs Experience",
      description:
        "Create a Programs experience presenting TechBridge's available learning programs.",
      difficulty: "Beginner",
    },
    {
      number: 3,
      day: 8,
      title: "Build the Internship Tasks Experience",
      description:
        "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
      difficulty: "Beginner → Intermediate",
    },
    {
      number: 4,
      day: 11,
      title: "Build an Interactive Internship Roadmap",
      description:
        "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
      difficulty: "Beginner → Intermediate",
    },
    {
      number: 5,
      day: 15,
      title: "Build the Intern Registration Experience",
      description:
        "Create a professional registration and onboarding interface for TechBridge interns.",
      difficulty: "Intermediate",
    },
    {
      number: 6,
      day: 19,
      title: "Build the Task Submission System",
      description:
        "Create an interface through which interns can prepare and submit their task work.",
      difficulty: "Intermediate",
    },
    {
      number: 7,
      day: 22,
      title: "Build the Intern Dashboard",
      description:
        "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
      difficulty: "Intermediate",
    },
    {
      number: 8,
      day: 26,
      title: "Build the Complete TechBridge Internship Platform",
      description:
        "Combine the different components created during the internship into a complete TechBridge platform.",
      difficulty: "Intermediate",
    },
  ],
};

const trackNames = {
  analytics: "Data Analytics",
  webdev: "Web Development",
};
const trackButtons = document.querySelectorAll(".track-button[data-track]");
const taskRoadmap = document.getElementById("task-roadmap");
const selectedTrackName = document.getElementById("selected-track-name");

function renderTrack(trackKey) {
  const tasks = trackTasks[trackKey];
  if (!tasks || !taskRoadmap || !selectedTrackName) {
    return;
  }

  const trackName = trackNames[trackKey];
  selectedTrackName.textContent = trackName;
  taskRoadmap.setAttribute("aria-label", `${trackName} internship tasks`);
  taskRoadmap.innerHTML = tasks
    .map((task) => {
      const taskNumber = String(task.number).padStart(2, "0");
      const dayNumber = String(task.day).padStart(2, "0");
      const difficultyClass =
        task.difficulty === "Beginner"
          ? "level-beginner"
          : task.difficulty === "Intermediate"
            ? "level-intermediate"
            : "level-growing";

      return `
        <li class="roadmap-item">
          <span class="roadmap-marker" aria-hidden="true">${taskNumber}</span>
          <article class="task-card">
            <div class="task-card-top">
              <span class="task-day">DAY ${dayNumber}</span>
              <span class="task-level ${difficultyClass}">${task.difficulty}</span>
            </div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <div class="task-card-foot">
              <span>Task ${taskNumber}</span>
              <span>${taskNumber} / 08</span>
            </div>
          </article>
        </li>
      `;
    })
    .join("");

  trackButtons.forEach((button) => {
    const isSelected = button.dataset.track === trackKey;
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

if (trackButtons.length && taskRoadmap && selectedTrackName) {
  trackButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const trackKey = button.dataset.track;
      if (trackKey && trackTasks[trackKey]) {
        renderTrack(trackKey);
      }
    });
  });

  renderTrack("webdev");
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
