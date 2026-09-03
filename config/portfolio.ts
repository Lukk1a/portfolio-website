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
  milestone: string;
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
    coreHighlights: ["Native Memory Models", "Async Task Pipelines", "Deterministic Simulation", "Type-Safe Architecture"],
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
      domain: "Native Systems & High-Perf",
      detail: "Low-level memory management, linear arena allocators, deterministic game loops & cache-friendly SIMD layouts.",
      levelSnippet: "LinearArena::alloc<Packet>(sizeof(T));",
    },
    {
      name: "Python",
      domain: "Automation, CLI & Services",
      detail: "Distributed task workers, async queues, scraping pipelines, structured logging, and automation workflows.",
      levelSnippet: "async for batch in stream.consume():",
    },
    {
      name: "JavaScript",
      domain: "Web Platform & Event Loop",
      detail: "Non-blocking event architecture, DOM reconciliation, modern web platform APIs, and client runtimes.",
      levelSnippet: "const [head, ...tail] = buffer.drain();",
    },
    {
      name: "TypeScript",
      domain: "Type-Safe Architecture",
      detail: "Strict type contracts, generic compile-time constraints, scalable full-stack applications & zero-leak contracts.",
      levelSnippet: "type Contract<T> = StrictSchema<T>;",
    },
    {
      name: "Luau",
      domain: "Game Scripting & Netcode",
      detail: "Delta-compressed client/server replication, latency compensation, and authoritative state machines.",
      levelSnippet: "Replicator:delta_sync(state, prev_tick);",
    },
  ],

  // Structured Technology Index (Non-duplicate domains)
  skillCategories: [
    {
      id: "web",
      index: "01",
      title: "WEB & RUNTIMES",
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
      index: "02",
      title: "DEVOPS & INFRASTRUCTURE",
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
      index: "03",
      title: "GAME & SYSTEMS SPECIALIZATIONS",
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
      milestone: "Profiling SPSC lock-free ring buffer in C++20",
    },
    {
      id: "learning-2",
      topic: "Graphics Pipelines, Shaders & Render Math",
      area: "Graphics & Simulation",
      status: "Exploring",
      note: "Investigating modern compute shaders, vertex/fragment buffers, and spatial acceleration trees (BVH).",
      milestone: "Building compute shader pipeline for particle simulation",
    },
    {
      id: "learning-3",
      topic: "Distributed Consensus & Edge State Machines",
      area: "Infrastructure",
      status: "Exploring",
      note: "Researching raft consensus, deterministic state replication across unreliable networks, and edge caching.",
      milestone: "Prototyping state replication over unreliable UDP",
    },
  ],
};
