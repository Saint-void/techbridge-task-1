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
// Interactive Challenge Hub
// ============================================
const challenges = [
  {
    id: "sales-snapshot",
    title: "Sales Snapshot",
    track: "analytics",
    trackName: "Data Analytics",
    difficulty: "Beginner",
    description: "Clean a small sales spreadsheet and find out which products and months bring in the most revenue.",
    outcome: "A tidy spreadsheet with a short summary of the strongest sales trends.",
    objective: "Turn a sample sales export into a reliable, easy-to-understand snapshot of business performance.",
    skills: ["Removing duplicates and correcting inconsistent values", "Using SUM, COUNTIF, and basic date formulas", "Comparing totals across products and months"],
    tools: ["Google Sheets or Microsoft Excel"],
    deliverable: "A cleaned workbook with a summary table and a few written observations.",
    time: "2–3 hours",
  },
  {
    id: "customer-patterns",
    title: "Customer Patterns",
    track: "analytics",
    trackName: "Data Analytics",
    difficulty: "Intermediate",
    description: "Explore a customer dataset to understand repeat purchases and which customer groups return most often.",
    outcome: "A concise customer analysis with practical retention recommendations.",
    objective: "Use customer order history to identify repeat-purchase behavior and patterns that may help a small business retain customers.",
    skills: ["Grouping and summarizing records", "Using Pivot Tables or SQL aggregations", "Turning findings into clear recommendations"],
    tools: ["Google Sheets or Microsoft Excel", "Optional: SQLite or an online SQL editor"],
    deliverable: "A one-page analysis with supporting summary tables and two evidence-based recommendations.",
    time: "4–5 hours",
  },
  {
    id: "spending-dashboard",
    title: "Monthly Spending Dashboard",
    track: "analytics",
    trackName: "Data Analytics",
    difficulty: "Advanced",
    description: "Bring together category and transaction data to compare monthly spending and highlight unusual changes.",
    outcome: "A dashboard that shows spending by month and category, with a short explanation of key changes.",
    objective: "Combine related tables, calculate monthly totals, and present changes in spending in a way a non-technical audience can quickly understand.",
    skills: ["Joining related tables with SQL", "Aggregating and validating totals", "Choosing clear visualizations and explaining trends"],
    tools: ["SQLite or another SQL environment", "Google Sheets or Microsoft Excel"],
    deliverable: "A documented SQL query and a dashboard with at least two charts and a written insight summary.",
    time: "6–8 hours",
  },
  {
    id: "responsive-event-page",
    title: "Responsive Event Landing Page",
    track: "webdev",
    trackName: "Web Development",
    difficulty: "Beginner",
    description: "Build a polished landing page for a community event that works well on phones and larger screens.",
    outcome: "A responsive page with event details, a clear call to action, and a consistent visual style.",
    objective: "Practice structuring content with HTML and styling a readable, responsive layout with CSS.",
    skills: ["Semantic HTML structure", "CSS layout and responsive media queries", "Accessible color contrast and link states"],
    tools: ["HTML5", "CSS3", "A code editor and browser"],
    deliverable: "A complete landing page that adapts to mobile and desktop widths.",
    time: "3–4 hours",
  },
  {
    id: "interactive-product-card",
    title: "Interactive Product Showcase",
    track: "webdev",
    trackName: "Web Development",
    difficulty: "Intermediate",
    description: "Create a product page where visitors can switch between product options and see the details update instantly.",
    outcome: "An interactive, responsive product page with working controls and clear product information.",
    objective: "Use JavaScript to connect user actions to updates on the page, while keeping the experience usable with a keyboard.",
    skills: ["Selecting and updating DOM elements", "Handling click events and application state", "Accessible buttons and responsive styling"],
    tools: ["HTML5", "CSS3", "Vanilla JavaScript"],
    deliverable: "A product page with at least two working options, updated details, and keyboard-friendly controls.",
    time: "4–6 hours",
  },
  {
    id: "contact-form-checker",
    title: "Contact Form with Validation",
    track: "webdev",
    trackName: "Web Development",
    difficulty: "Advanced",
    description: "Build a contact form that checks user input and gives helpful feedback before a message can be sent.",
    outcome: "A polished, accessible form with clear validation and confirmation states.",
    objective: "Create a trustworthy form experience that guides users when fields are missing or incorrectly formatted.",
    skills: ["HTML form semantics and labels", "JavaScript input validation and event handling", "Accessible error messages and focus management"],
    tools: ["HTML5", "CSS3", "Vanilla JavaScript"],
    deliverable: "A responsive form with required-field checks, email validation, inline feedback, and a success state.",
    time: "5–7 hours",
  },
];

const challengeGrid = document.getElementById("challenge-grid");
const challengeResults = document.getElementById("challenge-results");
const challengeEmpty = document.getElementById("challenge-empty");
const challengeDialog = document.getElementById("challenge-dialog");
const challengeDetails = document.getElementById("challenge-details");
const trackFilters = document.querySelectorAll("[data-track-filter]");
const difficultyFilters = document.querySelectorAll("[data-difficulty-filter]");

if (
  challengeGrid &&
  challengeResults &&
  challengeEmpty &&
  challengeDialog instanceof HTMLDialogElement &&
  challengeDetails
) {
  let selectedTrack = "all";
  let selectedDifficulty = "all";

  function renderChallenges() {
    const filteredChallenges = challenges.filter((challenge) => {
      const matchesTrack = selectedTrack === "all" || challenge.track === selectedTrack;
      const matchesDifficulty =
        selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
      return matchesTrack && matchesDifficulty;
    });

    challengeGrid.innerHTML = filteredChallenges
      .map((challenge) => {
        const difficultyClass = challenge.difficulty.toLowerCase();
        return `
          <article class="challenge-card">
            <div class="challenge-card-top">
              <span class="challenge-track-label ${challenge.track}">${challenge.trackName}</span>
              <span class="challenge-level ${difficultyClass}">${challenge.difficulty}</span>
            </div>
            <div class="challenge-card-copy">
              <p class="challenge-card-index">${challenge.track === "analytics" ? "DATA /" : "WEB /"} CHALLENGE</p>
              <h3>${challenge.title}</h3>
              <p>${challenge.description}</p>
            </div>
            <div class="challenge-outcome">
              <span>YOU'LL CREATE</span>
              <p>${challenge.outcome}</p>
            </div>
            <div class="challenge-card-footer">
              <span>${challenge.time}</span>
              <button class="challenge-view-button" type="button" data-challenge-id="${challenge.id}">
                View challenge <span aria-hidden="true">↗</span>
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    challengeResults.textContent =
      `Showing ${filteredChallenges.length} ${filteredChallenges.length === 1 ? "challenge" : "challenges"}`;
    challengeEmpty.hidden = filteredChallenges.length > 0;
  }

  function setActiveFilter(buttons, selectedButton) {
    buttons.forEach((button) => {
      const isSelected = button === selectedButton;
      button.classList.toggle("is-active", isSelected);
      button.setAttribute("aria-pressed", String(isSelected));
    });
  }

  function showChallengeDetails(challenge) {
    challengeDetails.innerHTML = `
      <p class="eyebrow section-eyebrow">Challenge brief <span aria-hidden="true">/</span> ${challenge.trackName}</p>
      <div class="challenge-dialog-heading">
        <div>
          <span class="challenge-level ${challenge.difficulty.toLowerCase()}">${challenge.difficulty}</span>
          <h2 id="challenge-dialog-title">${challenge.title}</h2>
        </div>
        <span class="challenge-dialog-time">${challenge.time}</span>
      </div>
      <p class="challenge-dialog-objective">${challenge.objective}</p>
      <div class="challenge-detail-grid">
        <section>
          <h3>Skills to practice</h3>
          <ul>${challenge.skills.map((skill) => `<li>${skill}</li>`).join("")}</ul>
        </section>
        <section>
          <h3>Suggested tools</h3>
          <ul>${challenge.tools.map((tool) => `<li>${tool}</li>`).join("")}</ul>
        </section>
      </div>
      <div class="challenge-dialog-deliverable">
        <span>YOUR DELIVERABLE</span>
        <p>${challenge.deliverable}</p>
      </div>
    `;
    challengeDialog.showModal();
  }

  trackFilters.forEach((button) => {
    button.addEventListener("click", () => {
      selectedTrack = button.dataset.trackFilter || "all";
      setActiveFilter(trackFilters, button);
      renderChallenges();
    });
  });

  difficultyFilters.forEach((button) => {
    button.addEventListener("click", () => {
      selectedDifficulty = button.dataset.difficultyFilter || "all";
      setActiveFilter(difficultyFilters, button);
      renderChallenges();
    });
  });

  challengeGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest("[data-challenge-id]");
    const challenge = challenges.find(
      (item) => item.id === button?.getAttribute("data-challenge-id"),
    );
    if (challenge) {
      showChallengeDetails(challenge);
    }
  });

  challengeDialog.addEventListener("click", (event) => {
    if (event.target === challengeDialog) {
      challengeDialog.close();
    }
  });

  renderChallenges();
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
