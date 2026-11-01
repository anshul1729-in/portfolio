export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: string[];
  categories: ('systems' | 'distributed' | 'fullstack' | 'ai-web3' | 'tools')[];
  roleTrack: ('systems' | 'fullstack' | 'core')[];
  language: string;
  githubUrl: string;
  liveUrl?: string;
  architectureSnippet?: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: { name: string; level: 'Mastery' | 'Advanced' | 'Proficient'; context?: string }[];
}

export interface ResumeTrack {
  id: 'fullstack' | 'systems' | 'core';
  title: string;
  subtitle: string;
  fileName: string;
  filePath: string;
  badge: string;
  badgeColor: string;
  summary: string;
  targetRoles: string[];
  keyHighlights: string[];
  featuredProjects: string[];
}

export const PERSONAL_INFO = {
  name: "Anshul Pal",
  handle: "anshul1729-in",
  tagline: "Building software from first principles — from Raft consensus clusters and Linux container runtimes to algorithmic recommendation engines and high-throughput platforms.",
  role: "Systems & Full-Stack Software Engineer",
  education: {
    degree: "Bachelor of Computer Applications (BCA) – Computer Science",
    institution: "Amity University",
    location: "Noida, India",
    period: "2024 – Expected July 2027",
    coursework: [
      "Operating Systems",
      "Distributed Systems",
      "Data Structures & Algorithms",
      "Computer Networks",
      "Database Management Systems",
      "Systems Programming",
      "Object-Oriented Software Engineering",
      "Artificial Intelligence",
      "Cloud Computing"
    ]
  },
  location: "New Delhi, India",
  email: "anshul6272@gmail.com",
  phone: "+91 8287481934",
  socials: {
    github: "https://github.com/anshul1729-in",
    linkedin: "https://linkedin.com/in/anshulpal101",
    twitter: "https://x.com/Anshul1729in"
  },
  status: "Expecting Graduation in July 2027 • Open for Software Engineering & Systems Roles / Internships",
  stats: [
    { label: "Graduation", value: "July 2027" },
    { label: "Failover Speed", value: "~400ms" },
    { label: "Container Overhead", value: "0% (Raw Syscalls)" },
    { label: "Flagship Projects", value: "8+ Engineered" }
  ]
};

export const RESUME_TRACKS: ResumeTrack[] = [
  {
    id: 'systems',
    title: "Cloud Infrastructure & Systems Engineer",
    subtitle: "Linux Kernel, Cgroups v2, Namespaces, Raft Consensus, POSIX Syscalls",
    fileName: "Anshul_Pal_Cloud_Systems_Resume.pdf",
    filePath: "/resumes/Anshul_Pal_Cloud_Systems_Resume.pdf",
    badge: "Systems & Cloud",
    badgeColor: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
    summary: "Tailored for Systems Engineering, Cloud Infrastructure, Platform, and SRE roles. Emphasizes low-level OS internals, Raft consensus algorithm implementation, container virtualization primitives, and socket networking.",
    targetRoles: ["Systems Software Engineer", "Cloud Infrastructure Engineer", "Site Reliability Engineer (SRE)", "Platform Engineer"],
    keyHighlights: [
      "Fault-tolerant Raft consensus protocol written in Go over raw TCP RPCs with zero external libraries.",
      "Custom Linux container runtime written in Go with CLONE_NEWPID, CLONE_NEWNET, pivot_root, and Cgroups v2 throttling.",
      "POSIX-compliant shell in C orchestrating processes via fork, execve, waitpid, arbitrary pipelines, and signal multiplexing.",
      "RFC 5321/RFC 5322 asynchronous custom SMTP mail server and Render Infrastructure as Code."
    ],
    featuredProjects: ["miniraft", "minicontainer", "minishell", "personal-email-server"]
  },
  {
    id: 'core',
    title: "Core Software Engineer",
    subtitle: "Distributed Systems, High Availability, Concurrency, Algorithms & Data Structures",
    fileName: "Anshul_Pal_Core_SWE_Resume.pdf",
    filePath: "/resumes/Anshul_Pal_Core_SWE_Resume.pdf",
    badge: "Core SWE",
    badgeColor: "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
    summary: "Tailored for Core SWE, Generalist Software Engineer, and Backend Engineering positions at top tech organizations. Focuses on systems fundamentals, distributed algorithms, concurrency, and performance optimization.",
    targetRoles: ["Software Engineer (L3 / Early Career)", "Core Backend SWE", "Distributed Systems Engineer", "Generalist SWE"],
    keyHighlights: [
      "Rigorous distributed consensus implementation (leader election 300-600ms, strict quorum math, sub-second failover).",
      "Low-level C systems orchestration, file descriptor table rewiring with pipe() and dup2(), and job control.",
      "Algorithmic recommendation engine with exponential time-decay scoring (λ = exp(-Δt/7d)) and PostgreSQL window CTEs.",
      "Production-grade full-stack delivery with sub-second LCP and zero layout shift."
    ],
    featuredProjects: ["miniraft", "minishell", "Music-app", "minicontainer"]
  },
  {
    id: 'fullstack',
    title: "AI & Full-Stack Software Engineer",
    subtitle: "Next.js App Router, React 19, Supabase RLS Auth, Web Audio API, Web3 & Solana",
    fileName: "Anshul_Pal_AI_FullStack_Resume.pdf",
    filePath: "/resumes/Anshul_Pal_AI_FullStack_Resume.pdf",
    badge: "AI & Full-Stack",
    badgeColor: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    summary: "Tailored for Full-Stack, Web Application, AI-integrated, and Web3 Engineering roles. Showcases end-to-end platform design, algorithmic telemetry, multi-tenant databases, real-time UI, and cryptographic signing.",
    targetRoles: ["Full-Stack Software Engineer", "Frontend / Product SWE", "AI Web Applications Engineer", "Web3 Engineer"],
    keyHighlights: [
      "NeonWave: Algorithmic audio streaming platform with Markov transition chains and 60fps Web Audio visualizer.",
      "Sanctuary: Daily engineering reflection platform with dual-storage (localStorage + Supabase RLS) and TipTap ProseMirror.",
      "Cendex: Non-custodial DEX with Jupiter AMM aggregator routing and Solana VersionedTransaction signing.",
      "Amigo-CLI: Reverse-engineered Moodle REST API client with automated offline study guide generation."
    ],
    featuredProjects: ["Music-app", "sanctuary", "cendex", "amigo-cli"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "miniraft",
    title: "Miniraft",
    subtitle: "Fault-Tolerant Distributed Consensus & Lock Service in Go",
    description: "Architected a fault-tolerant distributed Key-Value store and Lock Manager in Go from first principles, implementing the complete Raft Consensus Protocol over raw TCP RPCs with zero external dependencies.",
    highlights: [
      "Automated leader election with randomized election timers (300–600ms) and strict majority quorum math (⌊N/2⌋ + 1), eliminating split-brain risks during network partitions.",
      "Two-phase commit log replication (AppendEntries), surviving abrupt kill -9 leader failure in ~400ms with 100% data durability and zero committed log loss.",
      "Formulated idempotent state mutation handling via client-generated req_id deduplication state tables, preventing duplicate execution during network retries."
    ],
    tags: ["Go", "Distributed Systems", "Raft Consensus", "TCP RPC", "Concurrency", "High Availability"],
    categories: ['distributed', 'systems'],
    roleTrack: ['systems', 'core'],
    language: "Go",
    githubUrl: "https://github.com/anshul1729-in/miniraft",
    featured: true,
    metrics: [
      { label: "Failover Latency", value: "~400ms" },
      { label: "Log Durability", value: "100%" },
      { label: "Dependencies", value: "0 External" }
    ],
    architectureSnippet: `Client ──► [ Leader Node ] ──► Appends to log[]
                 │
                 ├──► AppendEntries RPC (TCP) ──► [ Follower A ]
                 └──► AppendEntries RPC (TCP) ──► [ Follower B ]
                 │
                 ▼ (Quorum 2/3 Ack)
             Commit Index Advanced ──► Applied to KV & Lock State Machine`
  },
  {
    id: "minicontainer",
    title: "Minicontainer",
    subtitle: "Linux Container Runtime from Scratch in Go",
    description: "Engineered a lightweight container runtime in Go directly on Linux kernel primitives via Go syscall, achieving complete process isolation without Docker or containerd.",
    highlights: [
      "Isolated process trees, hostnames, mount tables, and network interfaces via CLONE_NEWPID, CLONE_NEWUTS, CLONE_NEWNS (MS_PRIVATE), and CLONE_NEWNET namespaces.",
      "Implemented secure filesystem isolation using pivot_root and host root detachment (MNT_DETACH) over Alpine Linux minirootfs with dedicated /proc mount.",
      "Enforced strict hardware quotas via Linux Cgroups v2 (/sys/fs/cgroup), capping container memory at 50MB (swap disabled) and throttling CPU utilization to 50% core quota.",
      "Resolved Linux PID 1 namespace re-parenting and execution lifecycle using the /proc/self/exe re-execution architecture."
    ],
    tags: ["Go", "Linux Kernel", "Namespaces", "Cgroups v2", "Syscalls", "Virtualization"],
    categories: ['systems'],
    roleTrack: ['systems', 'core'],
    language: "Go",
    githubUrl: "https://github.com/anshul1729-in/minicontainer",
    featured: true,
    metrics: [
      { label: "Memory Ceiling", value: "50 MB" },
      { label: "CPU Quota", value: "50% Core" },
      { label: "Daemon Overhead", value: "0 MB" }
    ],
    architectureSnippet: `User CLI (run /bin/sh)
       │
       ▼
  /proc/self/exe re-exec
  [CLONE_NEWPID | CLONE_NEWUTS | CLONE_NEWNS | CLONE_NEWNET]
       │
       ├──► cgroups v2 applied: memory.max=50M, cpu.max=50000 100000
       ├──► pivot_root -> Alpine minirootfs (/proc fresh mount)
       ▼
  Isolated Container Process (PID 1 in Namespace)`
  },
  {
    id: "minishell",
    title: "Minishell",
    subtitle: "Custom POSIX Command Shell in C",
    description: "Engineered a custom POSIX-compliant shell in C orchestrating process lifecycles via low-level kernel syscalls (fork(), execve(), waitpid() with WUNTRACED and WNOHANG).",
    highlights: [
      "Implemented an arbitrary-depth multi-stage pipeline executor (cmd1 | cmd2 | cmd3) by dynamically rewiring per-process File Descriptor tables using pipe() and dup2().",
      "Built comprehensive I/O redirection (<, >, 2>&1) and terminal session job control (setpgid(), tcsetpgrp()) to isolate foreground and background process groups.",
      "Designed asynchronous signal multiplexing for SIGINT (Ctrl+C), SIGTSTP (Ctrl+Z), and SIGCONT, maintaining an interactive process table for job control (jobs, fg, bg)."
    ],
    tags: ["C", "POSIX Syscalls", "Process Lifecycle", "Pipes & FDs", "Signals", "Systems"],
    categories: ['systems'],
    roleTrack: ['systems', 'core'],
    language: "C",
    githubUrl: "https://github.com/anshul1729-in/minishell",
    featured: true,
    metrics: [
      { label: "Pipeline Depth", value: "Arbitrary" },
      { label: "Syscalls Used", value: "fork, exec, dup2" },
      { label: "POSIX Conformance", value: "High" }
    ],
    architectureSnippet: `stdin ──► [ Process 1 ] ──► pipe()[1] ===> pipe()[0] ──► [ Process 2 ] ──► stdout
               │                                               │
         dup2(p[1], 1)                                   dup2(p[0], 0)
         setpgid(0, g1)                                  setpgid(0, g1)`
  },
  {
    id: "Music-app",
    title: "NeonWave",
    subtitle: "Algorithmic Music Recommendation & Streaming Platform",
    description: "Architected a full-stack audio streaming platform powered by an algorithmic recommendation engine implementing personalized affinity scoring, discovery feeds, and track similarities.",
    highlights: [
      "Engineered exponential time-decay scoring (λ = exp(-Δt / 7d)) over user telemetry (play completion: +2.2, skip: -1.0, progress: +0.3), dynamically prioritizing fresh listener preferences.",
      "Formulated session-transition Markov chain modeling and item-item collaborative filtering using PostgreSQL Common Table Expressions (CTEs) and window functions (LEAD).",
      "Built an in-memory TTL cache (60,000ms) mitigating analytical database load, and developed an interactive 60fps audio visualizer via the Web Audio API.",
      "Automated production cloud deployment with infrastructure-as-code configuration (render.yaml)."
    ],
    tags: ["Node.js", "Express", "PostgreSQL", "React", "Web Audio API", "Recommender Systems"],
    categories: ['fullstack', 'ai-web3'],
    roleTrack: ['fullstack', 'core'],
    language: "JavaScript / TypeScript",
    githubUrl: "https://github.com/anshul1729-in/Music-app",
    featured: true,
    metrics: [
      { label: "Time-Decay Half-Life", value: "7 Days" },
      { label: "Audio Visualizer", value: "60 FPS" },
      { label: "TTL Cache", value: "60,000 ms" }
    ]
  },
  {
    id: "sanctuary",
    title: "Sanctuary",
    subtitle: "Full-Stack Knowledge Platform & Learning Analytics",
    description: "Engineered a full-stack daily engineering reflection journal featuring dual-storage architecture supporting synchronous local mode and cloud synchronization via Supabase PostgreSQL.",
    highlights: [
      "Implemented robust multi-tenant data isolation and security using PostgreSQL Row Level Security (RLS) policies (auth.uid() = user_id) paired with JWT session caching.",
      "Integrated TipTap ProseMirror rich-text editor featuring 800ms debounced auto-save, dynamic domain taxonomy categorization, and a 16-week GitHub-style streak analytics engine.",
      "Engineered an object-relational mapping abstraction cleanly bridging camelCase client state with snake_case database records with optimistic UI updates."
    ],
    tags: ["React 18", "Supabase", "PostgreSQL", "RLS Auth", "TipTap", "Tailwind CSS"],
    categories: ['fullstack'],
    roleTrack: ['fullstack'],
    language: "TypeScript / React",
    githubUrl: "https://github.com/anshul1729-in/sanctuary",
    featured: true,
    metrics: [
      { label: "Auto-Save Debounce", value: "800 ms" },
      { label: "Sync Mode", value: "Dual Local/Cloud" },
      { label: "Streak Engine", value: "16 Weeks" }
    ]
  },
  {
    id: "cendex",
    title: "Cendex",
    subtitle: "Non-Custodial Decentralized Exchange & Web3 Engine",
    description: "Built a non-custodial Solana DEX platform integrating Jupiter aggregator API (/v6/swap) for real-time optimal routing across decentralized automated market makers (AMMs).",
    highlights: [
      "Engineered client-side cryptographic transaction signing using @solana/web3.js, deserializing base64 payloads and executing Solana VersionedTransaction structures.",
      "Broadcasted raw transactions across high-throughput Helius RPC nodes with automated retry policies (skipPreflight: true) and validated blockhash/block height finality.",
      "Integrated NextAuth session security and Prisma ORM for relational PostgreSQL persistence of encrypted user wallet addresses and audit history."
    ],
    tags: ["Next.js 14", "TypeScript", "Solana Web3", "Jupiter API", "Prisma", "PostgreSQL"],
    categories: ['fullstack', 'ai-web3'],
    roleTrack: ['fullstack'],
    language: "TypeScript",
    githubUrl: "https://github.com/anshul1729-in/cendex",
    featured: true,
    metrics: [
      { label: "Routing Engine", value: "Jupiter v6 AMM" },
      { label: "Payload Format", value: "VersionedTx" },
      { label: "Custody", value: "Non-Custodial" }
    ]
  },
  {
    id: "amigo-cli",
    title: "Amigo-CLI",
    subtitle: "Moodle REST API Client & Academic Automation Engine",
    description: "Reverse-engineered Moodle Mobile REST API endpoints (core_course_get_contents, mod_quiz_get_user_attempts) into a high-performance Python terminal client bypassing sluggish web portals.",
    highlights: [
      "Built a modular CLI tool with persistent token caching in local configuration, enabling automated courseware downloading and real-time academic grade tracking.",
      "Automated quiz attempt aggregation and Markdown compilation, transforming raw API JSON review responses into structured offline study guides."
    ],
    tags: ["Python", "REST APIs", "Reverse Engineering", "Automation", "CLI Tooling"],
    categories: ['tools'],
    roleTrack: ['fullstack', 'systems'],
    language: "Python",
    githubUrl: "https://github.com/anshul1729-in/amigo-cli",
    featured: false,
    metrics: [
      { label: "Protocol", value: "REST API Reverse-Eng" },
      { label: "Export Format", value: "Markdown Guides" }
    ]
  },
  {
    id: "personal-email-server",
    title: "Personal Mail Server & Cloud IaC",
    subtitle: "Asynchronous SMTP Protocol Server & Render Automation",
    description: "Engineered an asynchronous custom SMTP mail server in Python (aiosmtpd) processing raw RFC 5321 and RFC 5322 protocol streams over non-privileged TCP ports.",
    highlights: [
      "Automated production cloud deployments using Infrastructure as Code (render.yaml), orchestrating containerized web backends and managed PostgreSQL databases.",
      "Implemented structured in-memory TTL caching layers (60,000ms) on backend services to prevent analytical database contention and eliminate thundering herd traffic."
    ],
    tags: ["Python", "aiosmtpd", "SMTP RFC 5321", "Render IaC", "PostgreSQL", "Docker"],
    categories: ['systems', 'tools'],
    roleTrack: ['systems'],
    language: "Python",
    githubUrl: "https://github.com/anshul1729-in/personal-email-server",
    featured: false,
    metrics: [
      { label: "Protocols", value: "RFC 5321 / 5322" },
      { label: "Deployment", value: "Render IaC" }
    ]
  },
  {
    id: "http-server-py",
    title: "Raw Socket HTTP/1.1 Server",
    subtitle: "Zero-Dependency Low-Level Web Server in Python",
    description: "Built a zero-dependency raw TCP socket HTTP/1.1 server in Python exploring the low-level lifecycle of client connections, keep-alive connections, chunked transfer encoding, and HTTP headers parsing.",
    highlights: [
      "Implemented manual TCP socket binding, listen backlogs, and multi-threaded connection handling without high-level frameworks.",
      "Handled RFC-compliant HTTP request parsing, query parameters extraction, content-length validation, and static asset streaming."
    ],
    tags: ["Python", "Sockets", "TCP/IP", "HTTP/1.1", "Concurrency"],
    categories: ['systems', 'tools'],
    roleTrack: ['systems', 'core'],
    language: "Python",
    githubUrl: "https://github.com/anshul1729-in/http-server-py",
    featured: false,
    metrics: [
      { label: "Dependencies", value: "0 Standard Library" },
      { label: "Protocol", value: "HTTP/1.1 Raw TCP" }
    ]
  },
  {
    id: "dsa-prep",
    title: "Algorithmic & Systems Patterns",
    subtitle: "Curated Implementations & Rigorous Problem Solving",
    description: "Comprehensive repository of production-grade implementations for advanced data structures, graph algorithms, dynamic programming, and low-level systems concurrency paradigms.",
    highlights: [
      "Includes optimized graph algorithms (Dijkstra, Tarjan SCC, Topological Sort), Fenwick trees, Segment trees, and LRU caches.",
      "Documented time/space complexity derivations and systems interview patterns."
    ],
    tags: ["Python", "Algorithms", "Data Structures", "Graph Theory", "Dynamic Programming"],
    categories: ['tools'],
    roleTrack: ['core'],
    language: "Python / C++",
    githubUrl: "https://github.com/anshul1729-in/dsa-prep",
    featured: false,
    metrics: [
      { label: "Patterns", value: "Graph, DP, Trees" },
      { label: "Focus", value: "Time & Space Opt" }
    ]
  }
];

export const WORK_EXPERIENCE = [
  {
    role: "Freelance Software Engineer",
    company: "PropertyLay",
    location: "New Delhi, India",
    period: "Jun 2025 – Sep 2025",
    type: "Contract / Freelance",
    highlights: [
      "Architected and delivered a responsive commercial real estate web platform using Next.js (App Router), React, and Tailwind CSS for dynamic property portfolios.",
      "Engineered client-side routing, modular UI component hierarchies, and performant dynamic lead capture forms integrated with input validation pipelines.",
      "Optimized asset delivery, metadata, and Core Web Vitals, achieving sub-second Largest Contentful Paint (LCP) and zero-layout-shift UI transitions."
    ],
    technologies: ["Next.js (App Router)", "React", "Tailwind CSS", "TypeScript", "Performance & Core Web Vitals"]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Systems & Linux Internals",
    icon: "Cpu",
    description: "Kernel primitives, virtualization, process management, and low-level C/Go systems.",
    skills: [
      { name: "Linux Namespaces (PID, UTS, MNT, NET)", level: "Mastery", context: "Used in minicontainer" },
      { name: "Cgroups v2 Resource Quotas", level: "Mastery", context: "Hardware throttling" },
      { name: "POSIX Syscalls (fork, execve, waitpid)", level: "Mastery", context: "Used in minishell" },
      { name: "File Descriptors & Pipelines (pipe, dup2)", level: "Mastery", context: "Multi-stage pipeline" },
      { name: "Signal Multiplexing (SIGINT, SIGTSTP)", level: "Advanced", context: "Job control" },
      { name: "pivot_root & Mount Namespaces", level: "Advanced", context: "Alpine rootfs detachment" }
    ]
  },
  {
    title: "Distributed Systems & Networking",
    icon: "Network",
    description: "Consensus algorithms, network protocols, RPCs, and high availability.",
    skills: [
      { name: "Raft Distributed Consensus Protocol", level: "Mastery", context: "miniraft from scratch" },
      { name: "Leader Election & Quorum Math (⌊N/2⌋ + 1)", level: "Mastery", context: "Split-brain immunity" },
      { name: "Two-Phase Commit Log Replication", level: "Mastery", context: "~400ms failover" },
      { name: "TCP/IP Sockets & Custom RPCs", level: "Advanced", context: "Raw wire protocol" },
      { name: "Idempotent State Machines (req_id)", level: "Advanced", context: "Deduplication tables" },
      { name: "SMTP Protocol Streams (RFC 5321/5322)", level: "Advanced", context: "Custom mail server" }
    ]
  },
  {
    title: "Languages & Runtimes",
    icon: "Code",
    description: "Core programming languages from systems to modern full-stack.",
    skills: [
      { name: "Go (Golang)", level: "Mastery", context: "Systems & Raft" },
      { name: "C (POSIX / Linux)", level: "Advanced", context: "Process orchestrator" },
      { name: "TypeScript / JavaScript", level: "Mastery", context: "Next.js & Solana DEX" },
      { name: "Python", level: "Mastery", context: "Reverse engineering & Sockets" },
      { name: "SQL (PostgreSQL)", level: "Advanced", context: "CTEs, Window Functions, RLS" },
      { name: "Bash / Shell Scripting", level: "Advanced", context: "Linux automation" }
    ]
  },
  {
    title: "Full-Stack, AI & Web3",
    icon: "Layers",
    description: "High-performance web applications, algorithmic engines, and decentralized tech.",
    skills: [
      { name: "Next.js 14/15 (App Router)", level: "Mastery", context: "Production platforms" },
      { name: "React 18/19", level: "Mastery", context: "Concurrent rendering" },
      { name: "Supabase (PostgreSQL + RLS Auth)", level: "Advanced", context: "Multi-tenant data isolation" },
      { name: "Algorithmic Recommender Systems", level: "Advanced", context: "Markov chains & Time decay" },
      { name: "Tailwind CSS & Framer Motion", level: "Mastery", context: "Fluid UI design" },
      { name: "Web Audio API & Canvas Visualizers", level: "Advanced", context: "60fps audio processing" },
      { name: "Solana Web3 (@solana/web3.js, Jupiter)", level: "Proficient", context: "DEX aggregation & signing" }
    ]
  },
  {
    title: "DevOps, Cloud & Tooling",
    icon: "Server",
    description: "Infrastructure as Code, containerization, debugging, and build toolchains.",
    skills: [
      { name: "Docker & Container Architecture", level: "Advanced", context: "Production packaging" },
      { name: "Infrastructure as Code (Render IaC)", level: "Advanced", context: "Automated deploys" },
      { name: "In-Memory TTL Caching", level: "Advanced", context: "Thundering-herd mitigation" },
      { name: "Git & GitHub Actions CI/CD", level: "Advanced", context: "Automated workflows" },
      { name: "Make, GCC, GDB, Valgrind", level: "Advanced", context: "C/Go debugging" },
      { name: "Linux / WSL2 Development", level: "Mastery", context: "Primary development env" }
    ]
  }
];

export const TERMINAL_COMMANDS: Record<string, { desc: string; output: string | string[] }> = {
  "help": {
    desc: "Lists all available CLI commands",
    output: [
      "Available commands in Anshul's Systems Terminal:",
      "  whoami       - Display candidate engineering profile summary",
      "  about        - View core philosophy and engineering disciplines",
      "  projects     - List all engineered systems and proof-of-work",
      "  resumes      - Inspect available resume variants (AI, Cloud, Core)",
      "  cat <resume> - Preview specific resume details (systems | core | fullstack)",
      "  skills       - View categorized technical competencies",
      "  education    - Display university credentials and expected graduation",
      "  experience   - View professional engineering history",
      "  curl raft    - Display Raft consensus architecture ASCII diagram",
      "  curl cont    - Display Linux container runtime isolation ASCII diagram",
      "  contact      - Display email, phone, and social contact links",
      "  clear        - Clear the terminal screen"
    ]
  },
  "whoami": {
    desc: "Display candidate summary",
    output: [
      "User: Anshul Pal (anshul1729-in)",
      "Role: Systems & Full-Stack Software Engineer",
      "Status: Expected Graduation July 2027 (Amity University BCA CS)",
      "Location: New Delhi, India",
      "Philosophy: 'Build from first principles — understand how computers actually execute code.'"
    ]
  },
  "about": {
    desc: "View core philosophy",
    output: [
      "Anshul Pal specializes in:",
      "1. Distributed Systems: Raft consensus, quorum math, fault-tolerant state machines.",
      "2. Linux Internals: Namespaces (PID, NET, MNT, UTS), Cgroups v2 quotas, POSIX syscalls.",
      "3. Backend & Protocols: Raw TCP sockets, RPC, SMTP RFC streams, PostgreSQL CTEs.",
      "4. Full-Stack: React 18/19, Next.js App Router, Supabase RLS, Web Audio API."
    ]
  },
  "projects": {
    desc: "List proof-of-work projects",
    output: [
      "[01] miniraft      - Go: Raft distributed consensus & lock service (~400ms failover)",
      "[02] minicontainer - Go: Container runtime via raw Linux namespaces & cgroups v2",
      "[03] minishell     - C: POSIX shell with arbitrary pipelines & job control",
      "[04] NeonWave      - Node/PostgreSQL/React: Algorithmic audio recommendation & streaming",
      "[05] Sanctuary     - React/Supabase: Dual-storage journal with TipTap & streak analytics",
      "[06] Cendex        - Next.js/Solana: Non-custodial DEX with Jupiter AMM aggregator",
      "[07] Amigo-CLI     - Python: Reverse-engineered Moodle API automation",
      "[08] Mail-Server   - Python: Async RFC 5321 SMTP server with Render IaC"
    ]
  },
  "education": {
    desc: "View academic credentials",
    output: [
      "Institution: Amity University, Noida, India",
      "Degree:      Bachelor of Computer Applications (BCA) – Computer Science",
      "Timeline:    2024 – Expected July 2027",
      "Coursework:  Distributed Systems, Operating Systems, DSA, Computer Networks,",
      "             DBMS, Systems Programming, AI, OOSE, Cloud Computing."
    ]
  },
  "experience": {
    desc: "View work experience",
    output: [
      "PropertyLay | Freelance Software Engineer (Jun 2025 – Sep 2025)",
      "  • Built commercial real estate platform with Next.js App Router & Tailwind CSS.",
      "  • Achieved sub-second Largest Contentful Paint (LCP) and zero-layout-shift.",
      "  • Implemented modular component hierarchies & defensive lead capture forms."
    ]
  },
  "contact": {
    desc: "Display contact information",
    output: [
      "Email:    anshul6272@gmail.com",
      "Phone:    +91 8287481934",
      "GitHub:   https://github.com/anshul1729-in",
      "LinkedIn: https://linkedin.com/in/anshulpal101",
      "Twitter:  https://x.com/Anshul1729in"
    ]
  },
  "curl raft": {
    desc: "Display Raft architecture diagram",
    output: [
      "Client ──► [ Leader Node ] ──► Appends to log[]",
      "                 │",
      "                 ├──► AppendEntries RPC (TCP) ──► [ Follower A ]",
      "                 └──► AppendEntries RPC (TCP) ──► [ Follower B ]",
      "                 │",
      "                 ▼ (Quorum 2/3 Ack)",
      "             Commit Index Advanced ──► Applied to KV & Lock State Machine"
    ]
  },
  "curl cont": {
    desc: "Display Linux container runtime diagram",
    output: [
      "User CLI (run /bin/sh)",
      "       │",
      "       ▼",
      "  /proc/self/exe re-exec",
      "  [CLONE_NEWPID | CLONE_NEWUTS | CLONE_NEWNS | CLONE_NEWNET]",
      "       │",
      "       ├──► cgroups v2 applied: memory.max=50M, cpu.max=50000 100000",
      "       ├──► pivot_root -> Alpine minirootfs (/proc fresh mount)",
      "       ▼",
      "  Isolated Container Process (PID 1 in Namespace)"
    ]
  }
};
