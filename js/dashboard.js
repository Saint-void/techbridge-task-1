/**
 * TechBridge Intern Dashboard (Task 6)
 * Handles:
 * - Dynamic Task Rendering (Tasks 1-8)
 * - Interactive Completion & Status Toggling
 * - Real-time Progress Bar & Percentage Calculation
 * - Status Filtering (All, Completed, In Progress, Not Started)
 * - Task Search by Keyword, Title, or Day
 * - Task Details Modal Dialog
 * - LocalStorage State Persistence & Demo Reset
 * - Modern Web Technologies Interactive Explorer (Next.js, Vue, Angular, Backend)
 */

// ============================================
// Internship Tasks Data Structure
// ============================================
export const initialDashboardTasks = [
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

// ============================================
// Modern Web Technologies Knowledge Base
// ============================================
export const technologyDetails = {
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
