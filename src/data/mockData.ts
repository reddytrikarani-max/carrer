import { StudentProfile, CareerRoleOption, AIAgent, RoadmapNode, DailyMission, KnowledgeMemoryItem, ProjectBlueprint } from '../types';

export const INITIAL_DEMO_STUDENT: StudentProfile = {
  name: 'Demo Student',
  college: 'National Institute of Technology',
  degree: 'B.Tech',
  branch: 'CSE',
  currentYear: '3rd Year',
  cgpa: '8.4',
  gradYear: '2026',
  skills: {
    'Java': 'Beginner',
    'SQL': 'Intermediate',
    'HTML/CSS': 'Intermediate',
    'DSA': 'Beginner',
    'Git/GitHub': 'Beginner',
    'Communication': 'Intermediate',
    'Problem Solving': 'Beginner',
    'Aptitude': 'Basic',
  },
  targetCareer: 'Software Developer',
  studyTime: '2 hours',
  timeline: '6 months',
  xp: 340,
  level: 'Explorer',
  streakDays: 5,
  weeklyHours: 11.5,
  completedTasksCount: 14,
  hasCompletedOnboarding: true,
};

export const CAREER_ROLES: CareerRoleOption[] = [
  {
    id: 'software-developer',
    title: 'Software Developer',
    tagline: 'Design and build performant backend services, core APIs, and algorithmic systems.',
    avgSalary: '$110,000 / ₹14-22 LPA',
    hiringDemand: 'Very High',
    description: 'Focuses on object-oriented system design, algorithmic efficiency, relational data models, and resilient backend microservices.',
    typicalTimeline: '6 months',
    requiredSkills: [
      { skill: 'Java', targetLevel: 'Advanced', minScore: 80, critical: true },
      { skill: 'DSA', targetLevel: 'Advanced', minScore: 75, critical: true },
      { skill: 'SQL', targetLevel: 'Intermediate', minScore: 70, critical: true },
      { skill: 'Git/GitHub', targetLevel: 'Intermediate', minScore: 70, critical: false },
      { skill: 'Problem Solving', targetLevel: 'Advanced', minScore: 80, critical: true },
    ],
    keyProjects: ['Distributed Task Orchestrator', 'High-Throughput REST Gateway', 'Memory-Mapped Key-Value Store'],
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    tagline: 'Bridge frontend user experiences with scalable cloud backends.',
    avgSalary: '$115,000 / ₹12-20 LPA',
    hiringDemand: 'Very High',
    description: 'Requires mastery of responsive interfaces, server-side frameworks, state management, and database query optimization.',
    typicalTimeline: '6-9 months',
    requiredSkills: [
      { skill: 'JavaScript', targetLevel: 'Advanced', minScore: 85, critical: true },
      { skill: 'HTML/CSS', targetLevel: 'Advanced', minScore: 80, critical: true },
      { skill: 'SQL', targetLevel: 'Intermediate', minScore: 70, critical: true },
      { skill: 'Git/GitHub', targetLevel: 'Intermediate', minScore: 75, critical: false },
      { skill: 'DSA', targetLevel: 'Intermediate', minScore: 65, critical: false },
    ],
    keyProjects: ['Real-Time Collaborative Workspace', 'E-Commerce Platform with Stripe Checkout', 'SaaS Analytics Engine'],
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    tagline: 'Transform raw enterprise telemetry into actionable business intelligence.',
    avgSalary: '$95,000 / ₹10-16 LPA',
    hiringDemand: 'High',
    description: 'Specializes in complex SQL window functions, Python data manipulation (Pandas), statistical hypothesis testing, and BI visual storytelling.',
    typicalTimeline: '4-6 months',
    requiredSkills: [
      { skill: 'SQL', targetLevel: 'Advanced', minScore: 85, critical: true },
      { skill: 'Python', targetLevel: 'Intermediate', minScore: 75, critical: true },
      { skill: 'Aptitude', targetLevel: 'Advanced', minScore: 80, critical: true },
      { skill: 'Communication', targetLevel: 'Advanced', minScore: 80, critical: true },
    ],
    keyProjects: ['Customer Churn Diagnostic Pipeline', 'Multi-Touch Marketing Attribution Model', 'Real-time Sales Forecasting Dashboard'],
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    tagline: 'Engineer transformer architectures, embedding pipelines, and production inference.',
    avgSalary: '$135,000 / ₹18-30 LPA',
    hiringDemand: 'Exponential',
    description: 'Focuses on deep learning math, Python data pipelines, PyTorch, model quantization, vector retrieval, and LLM fine-tuning.',
    typicalTimeline: '9-12 months',
    requiredSkills: [
      { skill: 'Python', targetLevel: 'Advanced', minScore: 90, critical: true },
      { skill: 'DSA', targetLevel: 'Advanced', minScore: 80, critical: true },
      { skill: 'Problem Solving', targetLevel: 'Advanced', minScore: 85, critical: true },
      { skill: 'SQL', targetLevel: 'Intermediate', minScore: 70, critical: false },
    ],
    keyProjects: ['RAG Retrieval System with Vector DB', 'Edge-Deployed Object Detection Engine', 'Autonomous Code Review Assistant'],
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    tagline: 'Architect high-availability Kubernetes infrastructure and CI/CD pipelines.',
    avgSalary: '$120,000 / ₹14-24 LPA',
    hiringDemand: 'High',
    description: 'Automates cloud infrastructure with Terraform, configures container orchestration, manages zero-downtime deployments, and enforces security.',
    typicalTimeline: '6 months',
    requiredSkills: [
      { skill: 'Git/GitHub', targetLevel: 'Advanced', minScore: 85, critical: true },
      { skill: 'SQL', targetLevel: 'Intermediate', minScore: 65, critical: false },
      { skill: 'Problem Solving', targetLevel: 'Intermediate', minScore: 70, critical: true },
      { skill: 'Communication', targetLevel: 'Intermediate', minScore: 70, critical: false },
    ],
    keyProjects: ['Multi-Region Kubernetes Cluster Setup', 'Automated GitOps Pipeline with ArgoCD', 'Zero-Trust IAM Policy Enforcement'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    tagline: 'Defend enterprise infrastructure against zero-day threats and vulnerabilities.',
    avgSalary: '$115,000 / ₹12-22 LPA',
    hiringDemand: 'Very High',
    description: 'Specializes in penetration testing, network packet inspection, cryptographic protocols, vulnerability management, and incident response.',
    typicalTimeline: '6-9 months',
    requiredSkills: [
      { skill: 'Problem Solving', targetLevel: 'Advanced', minScore: 85, critical: true },
      { skill: 'Git/GitHub', targetLevel: 'Intermediate', minScore: 70, critical: false },
      { skill: 'Communication', targetLevel: 'Advanced', minScore: 80, critical: true },
    ],
    keyProjects: ['Automated Vulnerability Scanner', 'SIEM Log Correlation Engine', 'Secure Authentication & OAuth2 Audit Sandbox'],
  },
];

export const AI_AGENTS: AIAgent[] = [
  {
    id: 'career',
    name: 'Career Agent',
    role: 'Market Pathways & Role Strategist',
    description: 'Evaluates current industry hiring bars, compensation trajectories, and skill prerequisites for top tech roles.',
    iconName: 'Compass',
    accentColor: 'text-indigo-500',
    samplePrompts: [
      'Am I ready to apply for junior software developer roles?',
      'How does a backend role compare with full-stack in 2026?',
      'What are typical technical interview rounds at tier-1 product companies?',
    ],
  },
  {
    id: 'learning',
    name: 'Learning Agent',
    role: 'Adaptive Study Scheduler',
    description: 'Constructs daily time-boxed study blocks tuned specifically to your available 2-hour daily window.',
    iconName: 'BookOpen',
    accentColor: 'text-cyan-500',
    samplePrompts: [
      'How should I divide my 2 hours between DSA and Java today?',
      'Create a 14-day study plan to master SQL window functions',
      'I have an exam in 2 weeks; how should I adjust my roadmap pace?',
    ],
  },
  {
    id: 'assessment',
    name: 'Assessment Agent',
    role: 'Diagnostic Testing & Gap Auditing',
    description: 'Generates targeted diagnostic questions to uncover false confidence and verify actual mastery.',
    iconName: 'CheckCircle2',
    accentColor: 'text-emerald-500',
    samplePrompts: [
      'Test my understanding of Java Polymorphism vs Inheritance',
      'Give me 2 hard diagnostic questions on Binary Search edge cases',
      'Why did I score low on Hash collisions?',
    ],
  },
  {
    id: 'coding',
    name: 'Coding Agent',
    role: 'Algorithm & Syntax Deep-Dive',
    description: 'Explains complex data structures, algorithmic time-space trade-offs, and provides clean code implementations.',
    iconName: 'Code2',
    accentColor: 'text-amber-500',
    samplePrompts: [
      'Explain how HashMap resizing works internally in Java',
      'Show me the two-pointer template for sliding window problems',
      'What is the difference between Comparable and Comparator?',
    ],
  },
  {
    id: 'project',
    name: 'Project Agent',
    role: 'Production Architecture Architect',
    description: 'Designs non-trivial, resume-defining engineering projects with schemas, steps, and measurable user metrics.',
    iconName: 'FolderGit2',
    accentColor: 'text-purple-500',
    samplePrompts: [
      'Suggest a backend project that will impress a hiring manager',
      'How can I add caching and concurrency to my current project?',
      'Generate a database schema for an asynchronous task queue',
    ],
  },
  {
    id: 'resume',
    name: 'Resume Agent',
    role: 'ATS Optimizer & Bullet Editor',
    description: 'Transforms weak academic project lines into Google XYZ formula bullets with quantified technical impact.',
    iconName: 'FileText',
    accentColor: 'text-rose-500',
    samplePrompts: [
      'Rewrite my Java project bullet point to follow the XYZ formula',
      'Which keywords am I missing for a Software Developer resume?',
      'Check consistency between my resume claims and test scores',
    ],
  },
  {
    id: 'interview',
    name: 'Interview Agent',
    role: 'STAR & Mock Evaluation Coach',
    description: 'Conducts technical and behavioral mock sessions with rigorous scoring on relevance, accuracy, and filler words.',
    iconName: 'Mic2',
    accentColor: 'text-blue-500',
    samplePrompts: [
      'Conduct a 5-minute technical round on OOP concepts',
      'Ask me the behavioral question: "Tell me about a difficult bug"',
      'Evaluate my answer for technical depth and clarity',
    ],
  },
  {
    id: 'progress',
    name: 'Progress Agent',
    role: 'Velocity & Readiness Tracker',
    description: 'Monitors your weekly hours, task completion rate, retention decay, and career readiness trajectory.',
    iconName: 'TrendingUp',
    accentColor: 'text-teal-500',
    samplePrompts: [
      'How has my career readiness progressed over the last 14 days?',
      'At my current pace, when will I be ready for mock interviews?',
      'Which skills showed the highest improvement this week?',
    ],
  },
];

export const INITIAL_ROADMAP: RoadmapNode[] = [
  {
    id: 'rm-1',
    title: 'Career Goal & Profile Calibration',
    category: 'Foundations',
    status: 'completed',
    score: 95,
    estimatedHours: 2,
    whyItMatters: 'Establishes clear market requirements and aligns daily study time to high-value hiring milestones.',
    fourStages: {
      learn: 'Understand software engineering roles, salary bands, and market hiring expectations.',
      practice: 'Audit current academic coursework against industry job descriptions.',
      apply: 'Formulate a 6-month target timeline with milestone deliverables.',
      test: 'Career Readiness diagnostic assessment.',
    },
    quizTopic: 'Software Engineering Career Standards',
  },
  {
    id: 'rm-2',
    title: 'Skill Assessment & Baseline Diagnostics',
    category: 'Foundations',
    status: 'completed',
    score: 65,
    estimatedHours: 4,
    whyItMatters: 'Exposes actual retention gaps instead of passive familiarity, preventing wasted study time.',
    fourStages: {
      learn: 'Review core CS fundamentals: compilation lifecycle, memory layout, and computational complexity.',
      practice: 'Solve timed baseline diagnostic problems on arrays, strings, and SQL queries.',
      apply: 'Map out personal strengths and high-priority weak areas in Career Twin.',
      test: 'Full diagnostic evaluation across 5 core technical areas.',
    },
    quizTopic: 'CS Fundamentals & Complexity',
  },
  {
    id: 'rm-3',
    title: 'Programming Fundamentals & Memory Model',
    category: 'Core Coding',
    status: 'completed',
    score: 82,
    estimatedHours: 12,
    whyItMatters: 'Deep understanding of pointers, stack vs. heap allocation, and pass-by-value prevents catastrophic production memory bugs.',
    fourStages: {
      learn: 'Java memory allocation: Stack frames, Heap objects, Garbage Collection lifecycle, and primitive vs reference types.',
      practice: 'Implement deep cloning, string pooling experiments, and pass-by-value demonstrations.',
      apply: 'Write memory-safe utility functions with proper null checks and assertions.',
      test: 'Timed memory analysis and syntax boundary quiz.',
    },
    quizTopic: 'Java Memory Management & References',
  },
  {
    id: 'rm-4',
    title: 'Object-Oriented Programming (OOP) & Clean Design',
    category: 'Core Coding',
    status: 'in-progress',
    score: 68,
    estimatedHours: 16,
    whyItMatters: 'Enterprise codebases require modularity, testability, and adherence to SOLID principles to scale without breaking.',
    fourStages: {
      learn: 'Inheritance vs Composition, Polymorphic dispatch, Abstract classes, Interface contracts, and SOLID principles.',
      practice: 'Refactor procedural spaghetti code into cohesive classes using the Strategy and Factory patterns.',
      apply: 'Build an extensible Parking Lot or Payment Processing domain model.',
      test: 'Architectural design quiz and OOP edge-case review.',
    },
    quizTopic: 'Java OOP & SOLID Principles',
  },
  {
    id: 'rm-5',
    title: 'Data Structures & Algorithms: Linear & Hashing',
    category: 'DSA',
    status: 'recommended',
    estimatedHours: 24,
    whyItMatters: 'Technical screening rounds require instant identification of optimal time-space trade-offs using HashMaps, Two Pointers, and Stacks.',
    fourStages: {
      learn: 'Array manipulation, Two Pointers, Sliding Window, Linked Lists, Stack/Queue implementations, and Hash collision resolution.',
      practice: 'Solve 25 curated LeetCode Easy/Medium problems with rigorous time complexity audits.',
      apply: 'Implement a custom LRU Cache using a Doubly Linked List and HashMap from scratch.',
      test: 'Live 45-minute coding challenge simulation.',
    },
    quizTopic: 'HashMaps, Pointers & Two-Sum Patterns',
  },
  {
    id: 'rm-6',
    title: 'Relational Database Architecture & SQL Optimization',
    category: 'Databases',
    status: 'in-progress',
    score: 72,
    estimatedHours: 18,
    whyItMatters: 'Backend bottlenecks are almost always database-related. Understanding indexing, transactions (ACID), and joins is non-negotiable.',
    fourStages: {
      learn: 'Relational algebra, B-Tree indexes, Join algorithms, ACID guarantees, and isolation levels.',
      practice: 'Write complex window functions, CTEs (Common Table Expressions), and aggregate grouping queries.',
      apply: 'Profile slow queries using EXPLAIN ANALYZE and design composite indexes to reduce execution time.',
      test: 'Real-world SQL query optimization and schema design test.',
    },
    quizTopic: 'SQL Indexing & Query Tuning',
  },
  {
    id: 'rm-7',
    title: 'Full-Stack Engineering & Capstone Project',
    category: 'Projects',
    status: 'recommended',
    estimatedHours: 35,
    whyItMatters: 'Employers hire candidates who have built end-to-end working systems with persistent data, authentication, and error boundaries.',
    fourStages: {
      learn: 'REST API design standards, JWT token lifecycle, database connection pooling, and error handling middleware.',
      practice: 'Construct authenticated endpoints with input validation and rate limiting.',
      apply: 'Deploy a full-stack distributed system with Docker containerization to cloud infrastructure.',
      test: 'Production readiness audit and GitHub code review.',
    },
    quizTopic: 'REST API Design & System Integration',
  },
  {
    id: 'rm-8',
    title: 'ATS Resume Engineering & Consistency Verification',
    category: 'Career Prep',
    status: 'locked',
    estimatedHours: 6,
    whyItMatters: 'Resumes are filtered by automated parsers in 6 seconds. Clean typography, XYZ bullet points, and verified skills ensure interviews.',
    fourStages: {
      learn: 'ATS parsing algorithms, Google XYZ impact bullet structure, and technical keyword density.',
      practice: 'Draft 4 impact-driven project bullets highlighting quantifiable outcomes.',
      apply: 'Run CareerPilot consistency audit to align resume claims with assessment scores.',
      test: 'ATS benchmark score $\\ge 80/100$.',
    },
    quizTopic: 'Technical Resume & ATS Standards',
  },
  {
    id: 'rm-9',
    title: 'AI Mock Interviews: Technical & Behavioral',
    category: 'Interview',
    status: 'locked',
    estimatedHours: 12,
    whyItMatters: 'Speaking clearly under pressure, articulating trade-offs, and adhering to the STAR method converts interviews into job offers.',
    fourStages: {
      learn: 'STAR method for behavioral rounds, communication pacing, and technical clarification techniques.',
      practice: 'Complete 5 AI-evaluated mock interview sessions across Data Structures, OOP, and System Design.',
      apply: 'Record answers to senior-level behavioral scenarios and incorporate AI feedback.',
      test: 'Comprehensive Mock Interview with $\\ge 80\\%$ composite readiness score.',
    },
    quizTopic: 'STAR Technique & Technical Communication',
  },
  {
    id: 'rm-10',
    title: 'Job Applications & Placement Campaign',
    category: 'Placement',
    status: 'locked',
    estimatedHours: 20,
    whyItMatters: 'Systematic outreach, personalized referrals, and tracking application conversion rates maximize job offer outcomes.',
    fourStages: {
      learn: 'Campus placement strategy, cold outreach templates, and technical negotiation guidelines.',
      practice: 'Draft 5 tailored cover notes referencing specific company engineering blogs.',
      apply: 'Submit 25 targeted applications to validated hiring pipelines.',
      test: 'Interview callback milestone achieved.',
    },
    quizTopic: 'Hiring Pipeline & Placement Strategy',
  },
];

export const INITIAL_DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'm-1',
    title: 'Learn Java OOP: Dynamic Polymorphism & Interfaces',
    category: 'Core Coding',
    durationMinutes: 25,
    difficulty: 'Medium',
    xp: 20,
    completed: true,
  },
  {
    id: 'm-2',
    title: 'Solve 3 Two-Pointer Problems (Container With Most Water, 3Sum)',
    category: 'DSA',
    durationMinutes: 30,
    difficulty: 'Medium',
    xp: 30,
    completed: false,
  },
  {
    id: 'm-3',
    title: 'Complete SQL Diagnostic: Indexing & Query Tuning',
    category: 'Databases',
    durationMinutes: 15,
    difficulty: 'Easy',
    xp: 15,
    completed: false,
  },
  {
    id: 'm-4',
    title: 'Practice Technical Interview Question: "Explain HashMap Collisions"',
    category: 'Interview',
    durationMinutes: 10,
    difficulty: 'Easy',
    xp: 15,
    completed: false,
  },
];

export const INITIAL_KNOWLEDGE_MEMORY: KnowledgeMemoryItem[] = [
  {
    id: 'km-1',
    topic: 'HashMap Collision Handling (Chaining vs Treeification)',
    reason: 'Scored 40% on internal bucket lookup complexity during OOP diagnostic.',
    lastAssessed: 'Yesterday',
    mastery: 45,
    status: 'Needs Revision',
    recommendedAction: 'Review Java 8 TreeNode threshold (>8 items converts LinkedList to Red-Black tree O(log n)).',
  },
  {
    id: 'km-2',
    topic: 'SQL Window Functions (ROW_NUMBER vs DENSE_RANK)',
    reason: 'Missed partitioning clause in salary ranking challenge.',
    lastAssessed: '3 days ago',
    mastery: 55,
    status: 'In Practice',
    recommendedAction: 'Practice running sum and employee partition ranking queries in SQL sandbox.',
  },
  {
    id: 'km-3',
    topic: 'Interface vs Abstract Class Execution Mechanics',
    reason: 'Confused default methods multiple inheritance diamond problem resolution.',
    lastAssessed: '5 days ago',
    mastery: 60,
    status: 'In Practice',
    recommendedAction: 'Review explicit super keyword syntax: InterfaceA.super.method().',
  },
];

export const INITIAL_PROJECTS: ProjectBlueprint[] = [
  {
    id: 'proj-1',
    title: 'CloudScale — Distributed Task Orchestrator & Telemetry Engine',
    tagline: 'Fault-tolerant background job execution pool with real-time websocket monitoring.',
    difficulty: 'Intermediate',
    duration: '2-3 weeks',
    targetCareer: 'Software Developer',
    skillsLearned: ['Java / Node.js', 'PostgreSQL Row Locks', 'Concurrency', 'REST APIs', 'Docker'],
    problemStatement: 'Web applications need asynchronous execution of resource-heavy tasks (report generation, email dispatch) without blocking user HTTP threads.',
    objectives: [
      'Build a persistent worker queue with zero task loss during worker crashes',
      'Implement concurrency control using row-level locking',
      'Construct a live dashboard measuring queue latency and error rates',
    ],
    features: [
      'Job priority scheduling (High, Medium, Low)',
      'Dead-letter queue with exponential backoff retries',
      'Real-time WebSocket streaming of worker health and queue depth',
      'REST API authenticated via JWT bearer tokens',
    ],
    techStack: {
      frontend: ['React 19', 'Tailwind CSS', 'Lucide Icons'],
      backend: ['Node.js / Express or Java Spring Boot', 'TypeScript'],
      database: ['PostgreSQL', 'Redis for fast token caching'],
      devops: ['Docker Compose', 'GitHub Actions'],
    },
    databaseSchema: [
      { table: 'jobs', fields: ['id UUID', 'payload JSONB', 'status VARCHAR', 'priority INT', 'attempts INT', 'created_at TIMESTAMP'], purpose: 'Tracks lifecycle and retries of all jobs' },
      { table: 'workers', fields: ['id VARCHAR', 'status VARCHAR', 'heartbeat TIMESTAMP', 'current_job_id UUID'], purpose: 'Health monitoring of distributed worker nodes' },
      { table: 'audit_logs', fields: ['id UUID', 'job_id UUID', 'message TEXT', 'created_at TIMESTAMP'], purpose: 'Telemetry and failure diagnosis' },
    ],
    developmentSteps: [
      { step: 1, title: 'Database Schema & State Machine', description: 'Design tables, foreign keys, and status enum transitions.', estimatedHours: 4 },
      { step: 2, title: 'Worker Loop with Concurrency Lock', description: 'Implement SELECT FOR UPDATE SKIP LOCKED query to prevent race conditions.', estimatedHours: 8 },
      { step: 3, title: 'REST API & Authentication', description: 'Build job submission, cancellation, and metrics endpoints.', estimatedHours: 6 },
      { step: 4, title: 'Dashboard & Deployment', description: 'Create responsive visual dashboard and Docker Compose deployment.', estimatedHours: 6 },
    ],
    testingChecklist: [
      'Verify duplicate submission is deduplicated',
      'Simulate kill -9 on worker node and ensure unacknowledged job re-queued',
      'Verify dead-letter queue catches jobs failing after 3 attempts',
    ],
    githubChecklist: [
      'Comprehensive README with architecture diagram',
      'One-command local reproduction with docker-compose up',
      'Unit test suite with >= 80% coverage',
    ],
    resumeBullets: [
      'Engineered distributed task queue in Node.js/PostgreSQL handling 500+ async jobs/sec with zero-loss guarantee using row-level locks.',
      'Implemented exponential backoff retry policy and dead-letter queue, reducing failed task recovery time from minutes to seconds.',
      'Constructed real-time telemetry dashboard in React, providing instant visibility into worker memory allocation and p99 queue latency.',
    ],
    inRoadmap: true,
    completed: false,
  },
  {
    id: 'proj-2',
    title: 'DataPulse — Real-Time API Performance & Query Profiler',
    tagline: 'Lightweight APM agent that intercepts database queries and identifies slow N+1 bottlenecks.',
    difficulty: 'Intermediate',
    duration: '2 weeks',
    targetCareer: 'Software Developer',
    skillsLearned: ['SQL Query Profiling', 'Middleware Interceptors', 'Express/Java', 'Chart.js / SVG'],
    problemStatement: 'Junior developers frequently introduce N+1 query bugs that degrade application response times by 10x in production.',
    objectives: [
      'Build middleware interceptor capturing query execution duration',
      'Detect duplicate queries executed within the same HTTP request cycle',
      'Generate visual flamegraph of backend execution time',
    ],
    features: [
      'Automatic N+1 query detection algorithm',
      'Query execution time distribution histogram',
      'Exportable JSON performance audit reports',
    ],
    techStack: {
      frontend: ['React 19', 'Tailwind CSS'],
      backend: ['Node.js / Express', 'TypeScript'],
      database: ['PostgreSQL', 'SQLite'],
      devops: ['Docker', 'Vercel / Cloud Run'],
    },
    databaseSchema: [
      { table: 'query_logs', fields: ['id UUID', 'query_hash VARCHAR', 'sql_text TEXT', 'duration_ms NUMERIC', 'request_id UUID'], purpose: 'Stores individual query timings' },
      { table: 'request_traces', fields: ['id UUID', 'path VARCHAR', 'total_duration_ms NUMERIC', 'query_count INT'], purpose: 'HTTP request summary' },
    ],
    developmentSteps: [
      { step: 1, title: 'Interceptor Middleware', description: 'Hook into database client to record start and finish timestamps.', estimatedHours: 4 },
      { step: 2, title: 'N+1 Detection Algorithm', description: 'Analyze query text similarity and caller stack traces.', estimatedHours: 6 },
      { step: 3, title: 'Interactive Trace Viewer', description: 'Build waterfall chart displaying execution timeline.', estimatedHours: 6 },
    ],
    testingChecklist: [
      'Verify middleware adds under 1ms overhead per request',
      'Simulate typical 10-query loop and verify N+1 alert triggers',
    ],
    githubChecklist: [
      'Benchmark results published in README',
      'Simple npm or local import guide',
    ],
    resumeBullets: [
      'Built lightweight database profiling agent intercepting SQL executions, cutting development debugging time by 30%.',
      'Devised pattern matching algorithm that flags N+1 query patterns before code reaches production.',
    ],
    inRoadmap: false,
    completed: false,
  },
  {
    id: 'proj-3',
    title: 'SentinelAuth — Zero-Trust OAuth2 & RBAC Identity Provider',
    tagline: 'Production-ready authorization service with refresh token rotation and role-based access control.',
    difficulty: 'Advanced',
    duration: '3 weeks',
    targetCareer: 'Software Developer',
    skillsLearned: ['Security / OAuth2', 'Cryptography', 'JWT Rotation', 'SQL RBAC Schemas'],
    problemStatement: 'Modern microservices require secure, centralized user authentication with rapid permission revocation and auditability.',
    objectives: [
      'Implement cryptographically secure JWT issuance with RSA256 keys',
      'Build atomic refresh token rotation to neutralize stolen token replay attacks',
      'Implement granular Role-Based Access Control (RBAC) with hierarchical permissions',
    ],
    features: [
      'Token revocation blocklist backed by Redis',
      'Rate-limiting on login endpoints to prevent brute-force attacks',
      'Audit log for permission escalations and suspicious IP logins',
    ],
    techStack: {
      frontend: ['React 19', 'Tailwind CSS'],
      backend: ['Node.js / Express', 'Crypto API'],
      database: ['PostgreSQL', 'Redis'],
      devops: ['Docker', 'Nginx Reverse Proxy'],
    },
    databaseSchema: [
      { table: 'users', fields: ['id UUID', 'email VARCHAR', 'password_hash VARCHAR', 'is_active BOOLEAN'], purpose: 'Core user credentials' },
      { table: 'roles', fields: ['id VARCHAR', 'name VARCHAR', 'permissions TEXT[]'], purpose: 'Access control definitions' },
      { table: 'refresh_tokens', fields: ['token_hash VARCHAR', 'user_id UUID', 'family_id UUID', 'expires_at TIMESTAMP'], purpose: 'Token rotation validation' },
    ],
    developmentSteps: [
      { step: 1, title: 'Password Hashing & Token Engine', description: 'Implement Argon2 password hashing and RS256 token issuance.', estimatedHours: 6 },
      { step: 2, title: 'Token Rotation Family Logic', description: 'Detect reuse of old refresh tokens and invalidate entire family.', estimatedHours: 8 },
      { step: 3, title: 'RBAC Authorization Middleware', description: 'Create lightweight declarative permission guard middleware.', estimatedHours: 6 },
    ],
    testingChecklist: [
      'Attempting to reuse an old refresh token immediately invalidates session',
      'Brute force login triggers IP rate-limiting after 5 failed attempts',
    ],
    githubChecklist: [
      'Security architecture whitepaper and threat model diagram',
      'Automated integration tests for all auth edge cases',
    ],
    resumeBullets: [
      'Architected centralized OAuth2 identity service with RS256 JWT tokens and atomic refresh token rotation.',
      'Designed hierarchical RBAC schema in PostgreSQL supporting fast O(1) permission validation across 10,000+ active user sessions.',
    ],
    inRoadmap: false,
    completed: false,
  },
];

export const DEMO_RESUME_TEXT = `
DEMO STUDENT
demo.student@nit.edu | +91 98765 43210 | linkedin.com/in/demostudent | github.com/demostudent

EDUCATION
National Institute of Technology
Bachelor of Technology in Computer Science & Engineering (2022 - 2026)
CGPA: 8.4 / 10.0

TECHNICAL SKILLS
Languages: Java (Proficient), SQL, JavaScript, HTML/CSS, C
Frameworks & Tools: Git, GitHub, VS Code, Node.js, Express, React, MySQL
Core Competencies: Object-Oriented Programming, Data Structures, Relational Database Management, Web Development

PROJECTS
1. E-Commerce Web Store | React, Node.js, Express, MySQL
- Developed an online shopping cart application where users can view products and add items to a cart.
- Created RESTful API endpoints for products, authentication, and order processing.
- Used MySQL to store user data and product inventories.

2. Student Management Portal | Java, JDBC, MySQL
- Created a desktop application for college administration to manage student attendance and marks.
- Implemented CRUD operations using JDBC connections.
- Designed database tables for departments, faculty, and enrolled students.

3. Algorithm Visualizer | HTML, CSS, JavaScript
- Built an interactive sorting visualizer demonstrating Bubble Sort, Merge Sort, and Quick Sort.
- Added speed controls and random array generation.

EXPERIENCE & LEADERSHIP
- Technical Club Member: Organized coding contests and mentored 40+ first-year students in C and Java fundamentals.
- Hackathon Participant: Built a campus food pre-ordering app during annual 24-hour collegiate hackathon.
`;
