export interface TechItem {
  name: string;
  category: "languages" | "web" | "tools" | "other";
  domain?: string;
  highlight?: boolean;
  description?: string;
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  description: string;
  items: TechItem[];
}

export interface CurrentlyLearningItem {
  id: string;
  topic: string;
  area: string;
  status: "Exploring" | "In Progress" | "Deep Dive";
  note: string;
}

export interface PortfolioConfig {
  personal: {
    name: string;
    role: string;
    timezone: string;
    bio: string;
    statement: string;
    coreHighlights: string[];
  };
  social: {
    github: string;
    email: string;
    discord: string;
  };
  matrixLanguages: {
    name: string;
    domain: string;
    detail: string;
    levelSnippet: string;
    offset: { x: number; y: number };
  }[];
  skillCategories: SkillCategory[];
  currentlyLearning: CurrentlyLearningItem[];
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "LUKA",
    role: "Developer",
    timezone: "Europe/Sarajevo",
    bio: "I'm Luka — a developer interested in software, web technologies, game development and building things from scratch.",
    statement: "Focused on clean code, systems-level logic, scalable web architectures, and interactive mechanics.",
    coreHighlights: ["C++", "Python", "JavaScript", "Luau"],
  },

  social: {
    github: "https://github.com/lukaxdq", // [EDIT_ME]: Update with your GitHub profile URL
    email: "pajkanovicluka7@gmail.com", // [EDIT_ME]: Update with your preferred email address
    discord: "lukaxdq", // [EDIT_ME]: Update with your Discord username or invite
  },

  // Interactive Floating Typographic Matrix (Hero language constellation)
  matrixLanguages: [
    {
      name: "C++",
      domain: "Native Systems & Performance",
      detail: "Low-level memory management, algorithms, game engine systems & high-performance computing.",
      levelSnippet: "#include <memory>",
      offset: { x: -8, y: -24 },
    },
    {
      name: "Python",
      domain: "Automation & Scripting",
      detail: "Backend services, tooling, data manipulation, automation workflows & rapid prototyping.",
      levelSnippet: "def execute_pipeline():",
      offset: { x: -32, y: 12 },
    },
    {
      name: "JavaScript",
      domain: "Web & Runtime Engines",
      detail: "Asynchronous I/O, event-driven programming, modern DOM APIs, and ecosystem tooling.",
      levelSnippet: "const runtime = await init();",
      offset: { x: 4, y: 36 },
    },
    {
      name: "TypeScript",
      domain: "Type-Safe Architecture",
      detail: "Strict type systems, robust interfaces, scalable full-stack applications & clean contracts.",
      levelSnippet: "type SystemContract<T> = ...",
      offset: { x: -22, y: 56 },
    },
    {
      name: "Luau",
      domain: "Game Scripting & Roblox Engine",
      detail: "High-performance embeddable scripting, type inference, real-time client/server replication.",
      levelSnippet: "local RunService: RunService = ...",
      offset: { x: 30, y: -8 },
    },
  ],

  // Structured Technology Index
  skillCategories: [
    {
      id: "languages",
      index: "01",
      title: "LANGUAGES",
      description: "Primary programming languages for systems, web runtime, scripting, and game engines.",
      items: [
        { name: "C++", category: "languages", domain: "Systems / Engines", highlight: true },
        { name: "Python", category: "languages", domain: "Automation / Scripting", highlight: true },
        { name: "JavaScript", category: "languages", domain: "Web / Runtime", highlight: true },
        { name: "TypeScript", category: "languages", domain: "Type-Safe Applications", highlight: true },
        { name: "Luau", category: "languages", domain: "Game Scripting / Engine", highlight: true },
      ],
    },
    {
      id: "web",
      index: "02",
      title: "WEB",
      description: "Modern frameworks, runtimes, and UI toolkits for fast, responsive web applications.",
      items: [
        { name: "React", category: "web", domain: "Component Architecture" },
        { name: "Next.js", category: "web", domain: "Server Components & SSR" },
        { name: "Node.js", category: "web", domain: "Server Runtime & APIs" },
        { name: "Astro", category: "web", domain: "Content-Driven Framework" },
        { name: "HTML", category: "web", domain: "Semantic Markup" },
        { name: "CSS", category: "web", domain: "Responsive Design & Layouts" },
        { name: "Tailwind CSS", category: "web", domain: "Design Tokens & Utility Styling" },
      ],
    },
    {
      id: "tools",
      index: "03",
      title: "TOOLS / INFRASTRUCTURE",
      description: "Development environments, version control, containerization, and deployment infrastructure.",
      items: [
        { name: "Git", category: "tools", domain: "Version Control & Branching" },
        { name: "GitHub", category: "tools", domain: "Collaboration & CI/CD Actions" },
        { name: "Docker", category: "tools", domain: "Containerization & Environment Isolation" },
        { name: "Linux", category: "tools", domain: "System Administration & Shell Scripting" },
        { name: "Cloudflare", category: "tools", domain: "Edge Infrastructure, DNS & Workers" },
        { name: "VS Code", category: "tools", domain: "Editor Configuration & Extensions" },
      ],
    },
    {
      id: "other",
      index: "04",
      title: "SPECIALIZED & OTHER",
      description: "Domain-specific development across game engines, automation systems, and APIs.",
      items: [
        { name: "Roblox Development", category: "other", domain: "Client/Server Replication & UI" },
        { name: "Game Development", category: "other", domain: "Game Loops, Physics & Mechanics" },
        { name: "Automation", category: "other", domain: "Workflows, Scrapers & Task Runners" },
        { name: "API Development", category: "other", domain: "RESTful Endpoints & System Integrations" },
      ],
    },
  ],

  // [EDIT_ME]: Replace or adjust these learning items easily
  currentlyLearning: [
    {
      id: "learning-1",
      topic: "Systems Architecture & Concurrency",
      area: "Low-Level Computing",
      status: "In Progress",
      note: "[EDIT_ME]: Replace with your current focus (e.g. Memory models, thread pooling, multithreading)",
    },
    {
      id: "learning-2",
      topic: "Graphics Pipelines & Shaders",
      area: "Game & Render Tech",
      status: "Exploring",
      note: "[EDIT_ME]: Replace with your current focus (e.g. WebGPU, Vulkan shaders, rendering math)",
    },
    {
      id: "learning-3",
      topic: "Distributed Systems & Edge Computing",
      area: "Infrastructure",
      status: "Exploring",
      note: "[EDIT_ME]: Replace with your current focus (e.g. Event-driven architectures, Edge runtimes)",
    },
  ],
};
