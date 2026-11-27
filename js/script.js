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
// Interactive Intern Dashboard (TASK 6)
// ============================================
const initialDashboardTasks = [
  {
    number: 1,
    day: 1,
    title: "Build the TechBridge Homepage",
    description: "Create the foundational version of the TechBridge website with responsive HTML5 and modern CSS3.",
    status: "completed",
    objective: "Establish brand identity, navigation, value proposition, and call to action for prospective interns.",
    deliverable: "A fully responsive homepage with structured sections, semantic markup, and visual consistency.",
    tags: ["HTML5", "CSS3", "Responsive"],
  },
  {
    number: 2,
    day: 4,
    title: "Build the TechBridge Programs Experience",
    description: "Create a dedicated Programs experience presenting Data Analytics and Web Development tracks.",
    status: "completed",
    objective: "Help visitors clearly distinguish between working with data insights versus building websites.",
    deliverable: "A dedicated Programs page featuring curriculum breakdowns, differentiation cards, and an interactive fit-finder.",
    tags: ["Curriculum", "UX Design", "Flexbox/Grid"],
  },
  {
    number: 3,
    day: 8,
    title: "Build the Internship Tasks Experience",
    description: "Create an interface presenting all internship milestones and day-by-day practical learning expectations.",
    status: "completed",
    objective: "Demonstrate the structured 30-day progression and hands-on deliverables interns complete.",
    deliverable: "A comprehensive task roadmap interface with day markers, difficulty tags, and clear descriptions.",
    tags: ["Information Architecture", "Roadmap", "CSS"],
  },
  {
    number: 4,
    day: 11,
    title: "Build an Interactive Internship Roadmap",
    description: "Use JavaScript to allow visitors to dynamically toggle between Data Analytics and Web Development roadmaps.",
    status: "completed",
    objective: "Enable instant client-side switching of roadmap content without page reloads using DOM manipulation.",
    deliverable: "An interactive dual-track roadmap powered by JavaScript arrays, event listeners, and animated state changes.",
    tags: ["JavaScript", "DOM Manipulation", "Event Listeners"],
  },
  {
    number: 5,
    day: 15,
    title: "Build the TechBridge Challenge Hub",
    description: "Create an interactive Challenge Hub where learners explore and filter practical coding and analytics projects.",
    status: "completed",
    objective: "Provide interns with real-world practice briefs categorized by track, difficulty level, and deliverable.",
    deliverable: "A responsive Challenge Hub with multi-criteria filtering, modal project briefs, and live counter updates.",
    tags: ["Filtering", "Dialog Modals", "State Management"],
  },
  {
    number: 6,
    day: 19,
    title: "Build the Interactive Intern Dashboard",
    description: "Develop a centralized intern dashboard to track progress, complete milestones, and explore modern web stacks.",
    status: "in-progress",
    objective: "Create a personalized platform experience with live progress calculations, task status toggling, and framework exploration.",
    deliverable: "An interactive dashboard with dynamic task cards, progress bar calculation, LocalStorage persistence, and a technology explorer.",
    tags: ["Dashboard", "Calculations", "LocalStorage"],
  },
  {
    number: 7,
    day: 22,
    title: "Build the Task Submission System",
    description: "Create a seamless submission flow where interns can submit GitHub repositories, live demo links, and project notes.",
    status: "not-started",
    objective: "Streamline code review and project verification with structured validation and feedback states.",
    deliverable: "A robust task submission form with input validation, file/URL verification, and submission receipt feedback.",
    tags: ["Forms", "Validation", "User Input"],
  },
  {
    number: 8,
    day: 26,
    title: "Build the Complete TechBridge Platform",
    description: "Integrate all pages, components, and tools into a cohesive, production-ready web platform for graduation.",
    status: "not-started",
    objective: "Unify the entire platform experience, verify performance, cross-browser compatibility, and accessibility standards.",
    deliverable: "An end-to-end, polished web platform connecting homepage, programs, roadmap, challenges, dashboard, and graduation review.",
    tags: ["Full Integration", "Accessibility", "Performance"],
  },
];

let dashboardTasks = JSON.parse(JSON.stringify(initialDashboardTasks));

const technologyDetails = {
  nextjs: {
    title: "Next.js",
    kicker: "FULL-STACK REACT FRAMEWORK",
    mark: "N.",
    description:
      "Next.js is a premier React framework created by Vercel for building high-performance, full-stack web applications. It extends React with built-in architectural features that eliminate boilerplate.",
    extra:
      "Commonly used for production websites, e-commerce stores, and SaaS applications. Key strengths include Server-Side Rendering (SSR) for dynamic pages, Static Site Generation (SSG) for blistering fast delivery, automatic image/font optimization, file-based routing via the App Router, and Server Actions for database mutations without dedicated API endpoints.",
    link: "https://nextjs.org/learn",
    tags: ["React", "SSR & SSG", "Full-Stack", "App Router"],
    backendTechs: null,
  },
  vue: {
    title: "Vue.js",
    kicker: "PROGRESSIVE JAVASCRIPT FRAMEWORK",
    mark: "V.",
    description:
      "Vue.js is an approachable, versatile, and performant progressive JavaScript framework for crafting modern user interfaces. Created by Evan You, it features an intuitive template syntax and reactive state system.",
    extra:
      "Developers use Vue for everything from lightweight interactive page widgets to enterprise Single Page Applications (SPAs). Its standout features include clean two-way data binding, single-file components (.vue files combining HTML, CSS, and JS), a gentle learning curve, and an outstanding ecosystem including Vite, Vue Router, and Pinia for centralized state management.",
    link: "https://vuejs.org/guide/introduction.html",
    tags: ["Single-File Components", "Reactivity", "SPAs", "Vite & Pinia"],
    backendTechs: null,
  },
  angular: {
    title: "Angular",
    kicker: "ENTERPRISE WEB APPLICATION PLATFORM",
    mark: "A.",
    description:
      "Angular is a comprehensive, TypeScript-based platform and framework developed and maintained by Google. It is engineered from the ground up for building robust, scalable web applications.",
    extra:
      "Widely chosen by enterprise organizations, financial institutions, and large engineering teams where strict architecture and long-term maintainability are crucial. It provides out-of-the-box dependency injection, reactive form validation, powerful CLI tooling, modular architecture, and native RxJS integration for asynchronous data streams.",
    link: "https://angular.dev/overview",
    tags: ["TypeScript", "Dependency Injection", "Enterprise", "RxJS"],
    backendTechs: null,
  },
  backend: {
    title: "Backend Development",
    kicker: "THE ENGINE BEHIND THE INTERFACE",
    mark: "{ }",
    description:
      "Backend development refers to the server-side software engineering that powers a web application behind the scenes. While the frontend handles visual layout and user interactions in the browser, the backend manages business logic, data persistence, user authentication, security, and third-party integrations.",
    extra:
      "How it connects with the frontend: The frontend (client) and backend communicate over HTTP/HTTPS protocols using RESTful APIs, GraphQL, or real-time WebSockets. When an intern clicks a button or submits a form, the browser sends an asynchronous request (often formatted as JSON). The backend verifies credentials, executes business logic, queries a database (such as PostgreSQL, MySQL, or MongoDB), and returns an appropriate JSON response or status code for the frontend to render.",
    link: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side",
    tags: ["Server Logic", "REST & GraphQL", "Databases", "Authentication"],
    backendTechs: [
      {
        name: "Node.js & Express.js",
        category: "JavaScript / TypeScript",
        desc: "A fast asynchronous runtime built on Chrome's V8 engine combined with a minimalist web framework. Allows full-stack developers to use JavaScript across the entire stack to create lightweight REST APIs and real-time microservices.",
      },
      {
        name: "Django & Flask (Python)",
        category: "Python Ecosystem",
        desc: "Django provides a robust 'batteries-included' framework with built-in ORM, admin dashboard, and authentication, ideal for data-heavy apps and AI integrations. Flask offers a lightweight, flexible micro-framework for custom architectures.",
      },
      {
        name: "ASP.NET Core (.NET) & Laravel",
        category: "Enterprise C# / PHP",
        desc: "ASP.NET Core is a blazing-fast, cross-platform enterprise framework for cloud-native backends and microservices. Laravel offers an elegant PHP framework renowned for developer ergonomics, Eloquent ORM, and rapid prototyping.",
      },
    ],
  },
};

const dashboardTaskGrid = document.getElementById("dashboard-task-grid");
const dashboardProgressFraction = document.getElementById("progress-fraction");
const dashboardProgressPercent = document.getElementById("progress-percent");
const dashboardProgressTrack = document.getElementById("dashboard-progress-track");
const dashboardProgressFill = document.getElementById("dashboard-progress-fill");
const dashboardRemainingCount = document.getElementById("remaining-count");
const dashboardNextTaskLabel = document.getElementById("next-task-label");
const dashboardTaskFilters = document.querySelectorAll("[data-task-filter]");
const dashboardTaskSearch = document.getElementById("task-search-input");
const dashboardClearSearch = document.getElementById("clear-search-btn");
const dashboardNoTasks = document.getElementById("dashboard-no-tasks");
const dashboardTaskDialog = document.getElementById("dashboard-task-dialog");
const dashboardTaskDetails = document.getElementById("dashboard-task-details");
const dashboardCelebration = document.getElementById("dashboard-celebration");
const dashboardToast = document.getElementById("dashboard-toast");
const welcomeInternStatus = document.getElementById("welcome-intern-status");
const daysCountdownChip = document.getElementById("days-countdown-chip");
const resumeTaskBtn = document.getElementById("resume-task-btn");
const resetProgressBtn = document.getElementById("reset-progress-btn");
const technologyTabs = document.querySelectorAll("[data-technology]");

if (
  dashboardTaskGrid &&
  dashboardProgressFraction &&
  dashboardProgressPercent &&
  dashboardProgressTrack &&
  dashboardProgressFill &&
  dashboardRemainingCount &&
  dashboardNextTaskLabel &&
  dashboardNoTasks &&
  dashboardTaskDialog instanceof HTMLDialogElement &&
  dashboardTaskDetails
) {
  const taskStorageKey = "techbridge-dashboard-task-status-v2";
  const validTaskStatuses = ["completed", "in-progress", "not-started"];
  let activeTaskFilter = "all";
  let activeSearchTerm = "";
  let toastTimeout = null;

  function loadSavedStatuses() {
    try {
      const savedStatuses = JSON.parse(localStorage.getItem(taskStorageKey) || "null");
      if (Array.isArray(savedStatuses) && savedStatuses.length === dashboardTasks.length) {
        savedStatuses.forEach((status, index) => {
          if (dashboardTasks[index] && validTaskStatuses.includes(status)) {
            dashboardTasks[index].status = status;
          }
        });
      }
    } catch (error) {
      console.warn("Could not restore saved internship task progress.", error);
    }
  }

  function saveTaskStatuses() {
    try {
      localStorage.setItem(
        taskStorageKey,
        JSON.stringify(dashboardTasks.map((task) => task.status)),
      );
    } catch (error) {
      console.warn("Could not persist internship task progress.", error);
    }
  }

  function showToast(message) {
    if (!dashboardToast) return;
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    dashboardToast.textContent = message;
    dashboardToast.hidden = false;
    dashboardToast.classList.add("is-visible");
    toastTimeout = setTimeout(() => {
      dashboardToast.classList.remove("is-visible");
      setTimeout(() => {
        dashboardToast.hidden = true;
      }, 250);
    }, 3200);
  }

  function getTaskStatusLabel(status) {
    return status === "in-progress"
      ? "In Progress"
      : status === "not-started"
        ? "Not Started"
        : "Completed";
  }

  function updateDashboardProgress() {
    const totalCount = dashboardTasks.length;
    const completedCount = dashboardTasks.filter((t) => t.status === "completed").length;
    const inProgressCount = dashboardTasks.filter((t) => t.status === "in-progress").length;
    const notStartedCount = dashboardTasks.filter((t) => t.status === "not-started").length;
    const remainingCount = totalCount - completedCount;
    const progressPercent = (completedCount / totalCount) * 100;
    const formattedPercent = Number.isInteger(progressPercent)
      ? `${progressPercent}%`
      : `${progressPercent.toFixed(1)}%`;

    const currentTask = dashboardTasks.find((t) => t.status === "in-progress");
    const nextTask = dashboardTasks.find((t) => t.status === "not-started");

    dashboardProgressFraction.innerHTML = `${completedCount} <span>/ ${totalCount}</span>`;
    dashboardProgressPercent.textContent = formattedPercent;
    dashboardProgressTrack.setAttribute("aria-valuenow", String(completedCount));
    dashboardProgressTrack.setAttribute("aria-valuemax", String(totalCount));
    dashboardProgressTrack.setAttribute(
      "aria-label",
      `${completedCount} of ${totalCount} internship tasks completed (${formattedPercent})`,
    );
    dashboardProgressFill.style.width = `${progressPercent}%`;

    dashboardRemainingCount.textContent = `${remainingCount} ${
      remainingCount === 1 ? "task" : "tasks"
    } remaining`;

    if (currentTask) {
      dashboardNextTaskLabel.textContent = `Current task: Task ${currentTask.number}`;
      if (resumeTaskBtn) {
        resumeTaskBtn.innerHTML = `Resume Task ${currentTask.number} <span aria-hidden="true">→</span>`;
        resumeTaskBtn.disabled = false;
      }
    } else if (nextTask) {
      dashboardNextTaskLabel.textContent = `Next up: Task ${nextTask.number}`;
      if (resumeTaskBtn) {
        resumeTaskBtn.innerHTML = `Start Task ${nextTask.number} <span aria-hidden="true">→</span>`;
        resumeTaskBtn.disabled = false;
      }
    } else {
      dashboardNextTaskLabel.textContent = "All 8 tasks completed!";
      if (resumeTaskBtn) {
        resumeTaskBtn.innerHTML = `All Tasks Completed <span aria-hidden="true">✓</span>`;
        resumeTaskBtn.disabled = true;
      }
    }

    const completedFilterBadge = document.getElementById("completed-filter-count");
    const inProgressFilterBadge = document.getElementById("in-progress-filter-count");
    const notStartedFilterBadge = document.getElementById("not-started-filter-count");

    if (completedFilterBadge) completedFilterBadge.textContent = String(completedCount);
    if (inProgressFilterBadge) inProgressFilterBadge.textContent = String(inProgressCount);
    if (notStartedFilterBadge) notStartedFilterBadge.textContent = String(notStartedCount);

    if (dashboardCelebration) {
      dashboardCelebration.hidden = completedCount !== totalCount;
    }

    if (welcomeInternStatus) {
      if (completedCount === totalCount) {
        welcomeInternStatus.innerHTML = '<i aria-hidden="true"></i> Completed';
        welcomeInternStatus.className = "intern-status status-completed";
      } else {
        welcomeInternStatus.innerHTML = '<i aria-hidden="true"></i> In Progress';
        welcomeInternStatus.className = "intern-status";
      }
    }

    if (daysCountdownChip) {
      if (completedCount === totalCount) {
        daysCountdownChip.textContent = "All Milestones Completed · Graduation Ready";
      } else {
        const estimatedDay = currentTask ? currentTask.day : 19;
        const daysRemaining = Math.max(0, 30 - estimatedDay);
        daysCountdownChip.textContent = `Day ${estimatedDay} of 30 · ${daysRemaining} Days Remaining`;
      }
    }
  }

  function renderDashboardTasks() {
    const term = activeSearchTerm.trim().toLowerCase();

    const visibleTasks = dashboardTasks.filter((task) => {
      const matchesFilter =
        activeTaskFilter === "all" || task.status === activeTaskFilter;

      const matchesSearch =
        !term ||
        task.title.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term) ||
        String(task.number).includes(term) ||
        (task.tags && task.tags.some((tag) => tag.toLowerCase().includes(term)));

      return matchesFilter && matchesSearch;
    });

    dashboardTaskGrid.innerHTML = visibleTasks
      .map((task) => {
        const statusLabel = getTaskStatusLabel(task.status);
        const actionLabel =
          task.status === "completed" ? "Mark as In Progress" : "Mark as Completed";
        const actionNextStatus =
          task.status === "completed" ? "in-progress" : "completed";
        const tagsHtml = task.tags
          ? `<div class="dashboard-task-tags">
              ${task.tags.map((t) => `<span class="task-tag-pill">${t}</span>`).join("")}
            </div>`
          : "";

        return `
          <article class="dashboard-task-card status-${task.status}" id="task-card-${task.number}">
            <div class="dashboard-task-card-top">
              <span class="dashboard-task-number">TASK ${String(task.number).padStart(2, "0")}</span>
              <span class="dashboard-task-status"><i aria-hidden="true"></i>${statusLabel}</span>
            </div>
            <p class="dashboard-task-day">DAY ${String(task.day).padStart(2, "0")}</p>
            <h3>${task.title}</h3>
            <p class="dashboard-task-description">${task.description}</p>
            ${tagsHtml}
            <div class="dashboard-task-card-actions">
              <button type="button" class="dashboard-view-task" data-view-task="${task.number}">
                View Task <span aria-hidden="true">↗</span>
              </button>
              <button
                type="button"
                class="dashboard-complete-task"
                data-set-task-status="${task.number}"
                data-next-status="${actionNextStatus}"
              >
                ${actionLabel}
              </button>
            </div>
          </article>
        `;
      })
      .join("");

    dashboardNoTasks.hidden = visibleTasks.length > 0;
  }

  function updateTaskStatus(taskNumber, nextStatus) {
    const task = dashboardTasks.find((item) => item.number === taskNumber);
    if (!task || !validTaskStatuses.includes(nextStatus)) {
      return;
    }

    task.status = nextStatus;

    if (nextStatus === "completed") {
      const nextTask = dashboardTasks.find((item) => item.status === "not-started");
      if (nextTask) {
        nextTask.status = "in-progress";
      }
      showToast(`✓ Task ${taskNumber} marked as Completed!`);
    } else if (nextStatus === "in-progress") {
      dashboardTasks.forEach((item) => {
        if (item.number !== taskNumber && item.status === "in-progress") {
          item.status = "not-started";
        }
      });
      showToast(`Task ${taskNumber} marked as In Progress.`);
    }

    saveTaskStatuses();
    updateDashboardProgress();
    renderDashboardTasks();

    if (dashboardTaskDialog.open) {
      showDashboardTask(task);
    }
  }

  function showDashboardTask(task) {
    const statusLabel = getTaskStatusLabel(task.status);
    const actionLabel =
      task.status === "completed" ? "Mark as In Progress" : "Mark as Completed";
    const actionNextStatus =
      task.status === "completed" ? "in-progress" : "completed";
    const tagsHtml = task.tags
      ? `<div class="dashboard-dialog-tags">
          ${task.tags.map((t) => `<span class="task-tag-pill">${t}</span>`).join("")}
        </div>`
      : "";

    dashboardTaskDetails.innerHTML = `
      <p class="eyebrow section-eyebrow">Internship task <span aria-hidden="true">/</span> Day ${task.day}</p>
      <div class="dashboard-dialog-heading">
        <div>
          <span class="dashboard-task-number">TASK ${String(task.number).padStart(2, "0")}</span>
          <h2 id="dashboard-dialog-title">${task.title}</h2>
        </div>
        <span class="dashboard-task-status status-label-${task.status}"><i aria-hidden="true"></i>${statusLabel}</span>
      </div>
      <p class="dashboard-dialog-description">${task.description}</p>
      ${tagsHtml}
      <div class="challenge-dialog-deliverable">
        <span>LEARNING OBJECTIVE</span>
        <p>${task.objective}</p>
      </div>
      <div class="challenge-dialog-deliverable dashboard-dialog-outcome">
        <span>EXPECTED DELIVERABLE</span>
        <p>${task.deliverable}</p>
      </div>
      <div class="dashboard-dialog-actions">
        <button
          type="button"
          class="button button-small button-primary"
          data-dialog-set-status="${task.number}"
          data-next-status="${actionNextStatus}"
        >
          ${actionLabel} <span aria-hidden="true">✓</span>
        </button>
        <button type="button" class="button button-small button-light" id="close-dialog-btn">
          Close Details
        </button>
      </div>
    `;

    const dialogStatusBtn = dashboardTaskDetails.querySelector("[data-dialog-set-status]");
    if (dialogStatusBtn) {
      dialogStatusBtn.addEventListener("click", () => {
        updateTaskStatus(task.number, actionNextStatus);
      });
    }

    const closeDialogBtn = dashboardTaskDetails.querySelector("#close-dialog-btn");
    if (closeDialogBtn) {
      closeDialogBtn.addEventListener("click", () => {
        dashboardTaskDialog.close();
      });
    }

    dashboardTaskDialog.showModal();
  }

  // Filter Buttons
  dashboardTaskFilters.forEach((button) => {
    button.addEventListener("click", () => {
      activeTaskFilter = button.dataset.taskFilter || "all";
      dashboardTaskFilters.forEach((filterButton) => {
        const isSelected = filterButton === button;
        filterButton.classList.toggle("is-active", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
      });
      renderDashboardTasks();
    });
  });

  // Search Input
  if (dashboardTaskSearch) {
    dashboardTaskSearch.addEventListener("input", (e) => {
      activeSearchTerm = e.target.value;
      if (dashboardClearSearch) {
        dashboardClearSearch.hidden = !activeSearchTerm;
      }
      renderDashboardTasks();
    });
  }

  if (dashboardClearSearch && dashboardTaskSearch) {
    dashboardClearSearch.addEventListener("click", () => {
      dashboardTaskSearch.value = "";
      activeSearchTerm = "";
      dashboardClearSearch.hidden = true;
      dashboardTaskSearch.focus();
      renderDashboardTasks();
    });
  }

  // Task Grid Event Delegation
  dashboardTaskGrid.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const statusButton = target.closest("[data-set-task-status]");
    if (statusButton) {
      updateTaskStatus(
        Number(statusButton.getAttribute("data-set-task-status")),
        statusButton.getAttribute("data-next-status"),
      );
      return;
    }

    const viewButton = target.closest("[data-view-task]");
    if (viewButton) {
      const task = dashboardTasks.find(
        (item) => item.number === Number(viewButton.getAttribute("data-view-task")),
      );
      if (task) {
        showDashboardTask(task);
      }
    }
  });

  // Modal Backdrop Click
  dashboardTaskDialog.addEventListener("click", (event) => {
    if (event.target === dashboardTaskDialog) {
      dashboardTaskDialog.close();
    }
  });

  // Resume Current Task Button
  if (resumeTaskBtn) {
    resumeTaskBtn.addEventListener("click", () => {
      const currentTask =
        dashboardTasks.find((t) => t.status === "in-progress") ||
        dashboardTasks.find((t) => t.status === "not-started") ||
        dashboardTasks[0];

      if (currentTask) {
        // Ensure filter shows it
        if (activeTaskFilter !== "all" && activeTaskFilter !== currentTask.status) {
          activeTaskFilter = "all";
          dashboardTaskFilters.forEach((btn) => {
            const isAll = btn.dataset.taskFilter === "all";
            btn.classList.toggle("is-active", isAll);
            btn.setAttribute("aria-pressed", String(isAll));
          });
          renderDashboardTasks();
        }

        const taskElement = document.getElementById(`task-card-${currentTask.number}`);
        if (taskElement) {
          taskElement.scrollIntoView({ behavior: "smooth", block: "center" });
          taskElement.classList.add("is-highlighted");
          setTimeout(() => {
            taskElement.classList.remove("is-highlighted");
          }, 1800);
        } else {
          showDashboardTask(currentTask);
        }
      }
    });
  }

  // Reset Demo Progress Button
  if (resetProgressBtn) {
    resetProgressBtn.addEventListener("click", () => {
      if (confirm("Reset demo task progress back to original state?")) {
        localStorage.removeItem(taskStorageKey);
        dashboardTasks = JSON.parse(JSON.stringify(initialDashboardTasks));
        activeTaskFilter = "all";
        activeSearchTerm = "";
        if (dashboardTaskSearch) dashboardTaskSearch.value = "";
        if (dashboardClearSearch) dashboardClearSearch.hidden = true;
        dashboardTaskFilters.forEach((btn) => {
          const isAll = btn.dataset.taskFilter === "all";
          btn.classList.toggle("is-active", isAll);
          btn.setAttribute("aria-pressed", String(isAll));
        });
        updateDashboardProgress();
        renderDashboardTasks();
        showToast("Demo progress reset to default state.");
      }
    });
  }

  // Initialize
  loadSavedStatuses();
  updateDashboardProgress();
  renderDashboardTasks();
}

// ============================================
// Modern Web Technologies Interactive Explorer
// ============================================
if (technologyTabs.length) {
  const technologyPanel = document.getElementById("technology-panel");
  const technologyTitle = document.getElementById("technology-title");
  const technologyKicker = document.getElementById("technology-kicker");
  const technologyDescription = document.getElementById("technology-description");
  const technologyExtra = document.getElementById("technology-extra");
  const technologyLink = document.getElementById("technology-link");
  const technologyMark = document.getElementById("technology-mark");
  const technologyTags = document.getElementById("technology-tags");
  const technologyTechsGrid = document.getElementById("technology-techs-grid");

  if (
    technologyPanel &&
    technologyTitle &&
    technologyKicker &&
    technologyDescription &&
    technologyExtra &&
    technologyLink &&
    technologyMark
  ) {
    function showTechnology(technologyKey) {
      const technology = technologyDetails[technologyKey];
      if (!technology) {
        return;
      }

      technologyTitle.textContent = technology.title;
      technologyKicker.textContent = technology.kicker;
      technologyDescription.textContent = technology.description;
      technologyExtra.textContent = technology.extra;
      technologyLink.href = technology.link;
      technologyMark.textContent = technology.mark;
      technologyPanel.setAttribute(
        "aria-labelledby",
        `technology-tab-${technologyKey}`,
      );

      // Render tags
      if (technologyTags) {
        if (technology.tags && technology.tags.length) {
          technologyTags.innerHTML = technology.tags
            .map((tag) => `<span class="tech-tag-pill">${tag}</span>`)
            .join("");
          technologyTags.hidden = false;
        } else {
          technologyTags.innerHTML = "";
          technologyTags.hidden = true;
        }
      }

      // Render backend technology spotlights if available
      if (technologyTechsGrid) {
        if (technology.backendTechs && technology.backendTechs.length) {
          technologyTechsGrid.innerHTML = technology.backendTechs
            .map(
              (item) => `
                <div class="backend-tech-card">
                  <span class="backend-category">${item.category}</span>
                  <h4>${item.name}</h4>
                  <p>${item.desc}</p>
                </div>
              `,
            )
            .join("");
          technologyTechsGrid.hidden = false;
        } else {
          technologyTechsGrid.innerHTML = "";
          technologyTechsGrid.hidden = true;
        }
      }

      technologyTabs.forEach((tab) => {
        const isSelected = tab.dataset.technology === technologyKey;
        tab.classList.toggle("is-active", isSelected);
        tab.setAttribute("aria-selected", String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
      });
    }

    technologyTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        showTechnology(tab.dataset.technology);
      });
      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (index + direction + technologyTabs.length) % technologyTabs.length;
        technologyTabs[nextIndex].focus();
        technologyTabs[nextIndex].click();
      });
    });

    showTechnology("nextjs");
  }
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
