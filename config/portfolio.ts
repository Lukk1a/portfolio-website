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

export interface MatrixLanguage {
  name: string;
  domain: string;
  detail: string;
  levelSnippet: string;
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
    fullName: string;
    role: string;
    bio: string;
    statement: string;
    coreHighlights: string[];
  };
  social: {
    github: string;
    gitlab: string;
    email: string;
    discord: string;
  };
  matrixLanguages: MatrixLanguage[];
  skillCategories: SkillCategory[];
  currentlyLearning: CurrentlyLearningItem[];
}

export const portfolioConfig: PortfolioConfig = {
  personal: {
    name: "LUKA",
    fullName: "Luka Pajkanovic",
    role: "Systems & Web Developer",
    bio: "I build high-performance software, systems-level logic, scalable web architectures, and interactive game mechanics from scratch.",
    statement: "Focused on deterministic engineering, clean memory models, zero-overhead abstractions, and tactile digital interfaces.",
    coreHighlights: ["C++", "Python", "TypeScript", "JavaScript", "Luau", "Next.js", "Docker"],
  },

  social: {
    github: "https://github.com/lukaxdq",
    gitlab: "https://gitlab.com/Lukk1a/portfolio",
    email: "pajkanovicluka7@gmail.com",
    discord: "lukaxdq",
  },


  // Interactive Floating Typographic Matrix
  matrixLanguages: [
    {
      name: "C++",
      domain: "Native Systems & Performance",
      detail: "Low-level memory management, arena allocators, deterministic game loops & high-performance computing.",
      levelSnippet: "#include <memory>",
    },
    {
      name: "Python",
      domain: "Automation & Scripting",
      detail: "Backend services, async pipelines, CLI tooling, data manipulation, automation workflows & rapid prototyping.",
      levelSnippet: "def execute_pipeline():",
    },
    {
      name: "JavaScript",
      domain: "Web & Runtime Engines",
      detail: "Asynchronous I/O, event-driven programming, modern DOM APIs, and full-stack ecosystem tooling.",
      levelSnippet: "const runtime = await init();",
    },
    {
      name: "TypeScript",
      domain: "Type-Safe Architecture",
      detail: "Strict type systems, robust interfaces, scalable full-stack applications & clean contracts.",
      levelSnippet: "type SystemContract<T> = ...",
    },
    {
      name: "Luau",
      domain: "Game Scripting & Roblox Engine",
      detail: "High-performance embedded scripting, type inference, real-time client/server state replication.",
      levelSnippet: "local RunService: RunService = ...",
    },
  ],

  // Structured Technology Index
  skillCategories: [
    {
      id: "languages",
      index: "01",
      title: "CORE LANGUAGES",
      description: "Primary programming languages for native systems, asynchronous services, full-stack web, and game engines.",
      items: [
        { name: "C++", category: "languages", domain: "Native Systems & High-Perf", highlight: true },
        { name: "Python", category: "languages", domain: "Automation, CLI & Services", highlight: true },
        { name: "TypeScript", category: "languages", domain: "Type-Safe Architecture", highlight: true },
        { name: "JavaScript", category: "languages", domain: "Web Platform & Event Loop", highlight: true },
        { name: "Luau", category: "languages", domain: "Roblox Game Engine & Netcode", highlight: true },
      ],
    },
    {
      id: "web",
      index: "02",
      title: "WEB & PLATFORMS",
      description: "Modern frameworks, server runtime environments, and styling libraries for fast, responsive web systems.",
      items: [
        { name: "React 19", category: "web", domain: "Component Architecture", highlight: true },
        { name: "Next.js 15", category: "web", domain: "App Router & SSR", highlight: true },
        { name: "Node.js", category: "web", domain: "Async Runtimes & APIs" },
        { name: "Tailwind CSS", category: "web", domain: "Design Tokens & Styling" },
        { name: "Framer Motion", category: "web", domain: "Spring Physics & Motion" },
        { name: "Astro", category: "web", domain: "Content-Driven Framework" },
        { name: "REST APIs", category: "web", domain: "Distributed Service Contracts" },
      ],
    },
    {
      id: "tools",
      index: "03",
      title: "DEVOPS & ENVIRONMENT",
      description: "Containerization, continuous integration, version control, and Linux systems administration.",
      items: [
        { name: "GitLab CI/CD", category: "tools", domain: "Automated Multi-Stage Pipelines", highlight: true },
        { name: "Docker", category: "tools", domain: "Multi-Stage Containers & Isolation", highlight: true },
        { name: "Linux / POSIX", category: "tools", domain: "Shell Scripting & Server Admin" },
        { name: "Git", category: "tools", domain: "Branching Strategies & Commits" },
        { name: "GitHub", category: "tools", domain: "Version Control & Repositories" },
        { name: "Cloudflare", category: "tools", domain: "Edge Routing, DNS & Security" },
        { name: "CMake", category: "tools", domain: "C++ Build Systems & Toolchains" },
      ],
    },
    {
      id: "other",
      index: "04",
      title: "SYSTEMS & SPECIALIZATIONS",
      description: "Engine mechanics, client/server replication, game architecture, and workflow automation.",
      items: [
        { name: "Roblox Architecture", category: "other", domain: "State Replication & Netcode", highlight: true },
        { name: "Game Loops & Physics", category: "other", domain: "Fixed-Step Simulation" },
        { name: "Data-Oriented Design", category: "other", domain: "Cache Optimization & Memory" },
        { name: "Automation & Scraping", category: "other", domain: "Task Queues & ETL Workflows" },
      ],
    },
  ],

  // Currently Learning & Research Radar
  currentlyLearning: [
    {
      id: "learning-1",
      topic: "Low-Latency Concurrency & Lock-Free Structures",
      area: "Systems Engineering",
      status: "In Progress",
      note: "Exploring lock-free queues, atomic operations, cache-line bouncing prevention, and memory order semantics.",
    },
    {
      id: "learning-2",
      topic: "Graphics Pipelines, Shaders & Render Math",
      area: "Graphics & Simulation",
      status: "Exploring",
      note: "Investigating modern compute shaders, vertex/fragment buffers, and spatial acceleration trees (BVH).",
    },
    {
      id: "learning-3",
      topic: "Distributed Consensus & Edge State Machines",
      area: "Infrastructure",
      status: "Exploring",
      note: "Researching raft consensus, deterministic state replication across unreliable networks, and edge caching.",
    },
  ],
};
