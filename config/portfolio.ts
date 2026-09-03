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

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  architecture: string;
  tech: string[];
  highlights: string[];
  metrics: string;
  github?: string;
  gitlab?: string;
  link?: string;
}

export interface CurrentlyLearningItem {
  id: string;
  topic: string;
  area: string;
  status: "Exploring" | "In Progress" | "Deep Dive";
  note: string;
}

export interface SpecSnippet {
  id: string;
  name: string;
  domain: string;
  filename: string;
  code: string;
  summary: string;
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
  specSnippets: SpecSnippet[];
  projects: ProjectItem[];
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

  // Interactive inline spec snippets for hero workstation
  specSnippets: [
    {
      id: "cpp",
      name: "C++",
      domain: "Native Systems & Memory Arenas",
      filename: "arena_allocator.hpp",
      code: `class LinearArena {
public:
  explicit LinearArena(size_t capacity) 
    : buffer_(std::make_unique<uint8_t[]>(capacity)), offset_(0) {}

  template<typename T, typename... Args>
  T* allocate(Args&&... args) {
    void* ptr = buffer_.get() + offset_;
    offset_ += sizeof(T);
    return new (ptr) T(std::forward<Args>(args)...);
  }
  void reset() noexcept { offset_ = 0; }
};`,
      summary: "Zero-fragmentation contiguous linear memory block for sub-millisecond tick loops.",
    },
    {
      id: "python",
      name: "Python",
      domain: "Distributed Pipelines & Asynchronous Workers",
      filename: "pipeline_worker.py",
      code: `async def process_task_batch(queue: RedisQueue, batch_size: int = 64):
    async with queue.lock("worker_ingest"):
        tasks = await queue.dequeue_many(batch_size)
        results = await asyncio.gather(
            *(enrich_telemetry(task) for task in tasks),
            return_exceptions=True
        )
        return [r for r in results if not isinstance(r, Exception)]`,
      summary: "High-throughput asynchronous ingest pipeline with failure recovery and telemetry streaming.",
    },
    {
      id: "ts",
      name: "TypeScript",
      domain: "Type-Safe Contracts & Platform Architecture",
      filename: "system_contract.ts",
      code: `type Transition<State extends string> = {
  readonly to: State;
  readonly guard?: (context: SystemContext) => boolean;
};

export interface SystemContract<States extends string> {
  readonly initial: States;
  readonly transitions: ReadonlyMap<States, readonly Transition<States>[]>;
}`,
      summary: "Compile-time deterministic state machine contracts preventing invalid runtime transitions.",
    },
    {
      id: "luau",
      name: "Luau",
      domain: "Client/Server Replication & Netcode",
      filename: "netcode_sync.luau",
      code: `local NetcodeSync = {}
function NetcodeSync.packDelta(previousState: Vector3, currentState: Vector3): buffer
    local delta = currentState - previousState
    local b = buffer.create(6)
    buffer.writei16(b, 0, math.clamp(math.round(delta.X * 100), -32768, 32767))
    buffer.writei16(b, 2, math.clamp(math.round(delta.Y * 100), -32768, 32767))
    buffer.writei16(b, 4, math.clamp(math.round(delta.Z * 100), -32768, 32767))
    return b
end`,
      summary: "Compressed delta position packets reducing client/server network bandwidth by up to 68%.",
    },
  ],

  // Featured Engineering Architectures
  projects: [
    {
      id: "titan-engine",
      index: "01",
      title: "Titan Core",
      tagline: "High-Performance C++20 Systems Architecture",
      category: "Systems & Engines",
      description: "A lightweight, data-oriented systems framework designed for deterministic game loops and low-latency physics simulation. Implements custom arena allocators and SIMD vector math.",
      architecture: "C++20 • Linear Memory Arenas • Entity-Component Pipeline • Cache-Conscious Data Layout",
      tech: ["C++", "CMake", "SIMD", "Memory Management"],
      highlights: [
        "Linear memory arena allocator preventing heap fragmentation",
        "Deterministic fixed-timestep simulation loop running at sub-millisecond latency",
        "Zero external dependencies for core data structures and memory pools",
      ],
      metrics: "< 0.4ms tick time",
      github: "https://github.com/lukaxdq",
    },
    {
      id: "pulse-pipeline",
      index: "02",
      title: "Pulse Engine",
      tagline: "Distributed Asynchronous Task & Telemetry Pipeline",
      category: "Automation & Tooling",
      description: "An event-driven backend service for scraping, automated data enrichment, and real-time telemetry streaming built with modern async Python and Redis.",
      architecture: "Python 3.12 • AsyncIO • Redis PubSub • Structured Logging • Dockerized Multi-Worker",
      tech: ["Python", "AsyncIO", "Redis", "Docker", "Linux"],
      highlights: [
        "Distributed task queues handling burst ingest traffic gracefully",
        "Automated failure recovery and dead-letter queue re-processing",
        "Telemetry exporter streaming status metrics directly to dashboards",
      ],
      metrics: "5,000+ ops/sec",
      github: "https://github.com/lukaxdq",
    },
    {
      id: "nexus-netcode",
      index: "03",
      title: "Nexus Replication",
      tagline: "Low-Latency Luau Game Netcode & Replication Framework",
      category: "Game Mechanics",
      description: "A production-tested multiplayer replication framework for the Roblox platform. Features client-side prediction, delta compression for position packets, and modular component lifecycle.",
      architecture: "Luau (Strict) • Delta Compression • Client Prediction • Event Batching",
      tech: ["Luau", "Roblox Engine", "Networking", "State Sync"],
      highlights: [
        "Delta compression reducing packet bandwidth consumption by up to 68%",
        "Server-authoritative state reconciliation with smooth client prediction",
        "Clean OOP/functional modular design separating simulation from view layer",
      ],
      metrics: "-68% Bandwidth",
      github: "https://github.com/lukaxdq",
    },
    {
      id: "hyperion-portfolio",
      index: "04",
      title: "Hyperion Portfolio",
      tagline: "Next.js 15 Standalone Architecture & CI/CD Pipeline",
      category: "Web Architecture",
      description: "The platform you are viewing right now. Engineered with Next.js 15 App Router, React 19, Turbopack, physical Framer Motion springs, and automated GitLab CI/CD container registry builds.",
      architecture: "Next.js 15 • React 19 • TypeScript • Tailwind CSS • Docker Standalone • GitLab CI/CD",
      tech: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "GitLab CI/CD", "Docker"],
      highlights: [
        "Output: standalone Docker build with Alpine Linux for minimal container footprints",
        "Automated GitLab CI/CD pipeline running multi-stage caching, lint, and build checks",
        "Sub-150ms interaction feedback following Emil Kowalski's craft principles",
      ],
      metrics: "100 Lighthouse Perf",
      gitlab: "https://gitlab.com/Lukk1a/portfolio",
      link: "https://gitlab.com/Lukk1a/portfolio",
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
