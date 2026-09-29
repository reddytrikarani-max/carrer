import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini client server-side
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Route: AI CareerPilot & Multi-Agent Chat
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { message, agentType = 'careerpilot', profileContext, history = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      if (ai) {
        const agentPersonas: Record<string, string> = {
          careerpilot: 'You are CareerPilot, a world-class AI Career Mentor for college students. You are encouraging, sharp, pragmatic, and data-driven. Your goal is to help students turn current skills into a rewarding career. Always ground your advice in their specific target role, current skills, and available study hours.',
          career: 'You are the Career Agent on the student\'s AI Career Team. You specialize in industry trends, role requirements, compensation benchmarks, and career path transitions for tech & corporate roles.',
          learning: 'You are the Learning Agent. You craft highly realistic, time-blocked study schedules and recommend high-leverage learning sequences adapted to the student\'s daily hours.',
          assessment: 'You are the Assessment Agent. You diagnose student weaknesses, provide targeted questions, and provide constructive feedback on technical conceptual grasp.',
          coding: 'You are the Coding Agent. You explain programming concepts, DSA patterns, and clean code with concise, clear examples in Java, Python, JavaScript, or C++.',
          project: 'You are the Project Agent. You recommend resume-worthy, non-trivial engineering projects tailored to the student\'s skill level and target role.',
          resume: 'You are the Resume Agent. You critique resume bullet points using the Google XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]), ATS keyword optimization, and clarity.',
          interview: 'You are the Interview Agent. You conduct technical and behavioral interviews, evaluate STAR responses, and provide actionable critique.',
          progress: 'You are the Progress Agent. You analyze completion velocity, weekly hours, quiz scores, and readiness milestones to keep the student motivated and accountable.',
        };

        const systemInstruction = `
${agentPersonas[agentType] || agentPersonas.careerpilot}

Student Profile Context:
- Name: ${profileContext?.name || 'Student'}
- Degree & Branch: ${profileContext?.degree || 'B.Tech'} ${profileContext?.branch || 'CSE'}, Year ${profileContext?.year || '3rd Year'}
- Target Career: ${profileContext?.targetCareer || 'Software Developer'}
- Career Readiness: ${profileContext?.careerReadiness || 62}%
- Daily Study Time: ${profileContext?.studyTime || '2 hours'}
- Current Skills: ${JSON.stringify(profileContext?.skills || {})}
- Weak/Missing Skills: ${JSON.stringify(profileContext?.weakSkills || ['DSA Trees', 'SQL Window Functions'])}
- Topics to Revisit: ${JSON.stringify(profileContext?.topicsToRevisit || ['HashMap Collision Handling'])}

Formatting guidelines:
- Be concise, structured, and action-oriented.
- Use bullet points where appropriate.
- Offer 1 concrete next step the student can do today.
`;

        const promptText = `
Student message: "${message}"
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        return res.json({ reply: response.text });
      }

      // High-quality contextual fallback if GEMINI_API_KEY is not configured
      const reply = generateContextualFallbackReply(agentType, message, profileContext);
      return res.json({ reply });
    } catch (err: any) {
      console.error('Error in /api/gemini/chat:', err);
      const fallback = generateContextualFallbackReply(req.body?.agentType || 'careerpilot', req.body?.message || '', req.body?.profileContext);
      return res.json({ reply: fallback });
    }
  });

  // API Route: Resume Analyzer & Consistency Check
  app.post('/api/gemini/analyze-resume', async (req, res) => {
    try {
      const { resumeText, targetCareer, assessedSkills = {} } = req.body;

      if (!resumeText) {
        return res.status(400).json({ error: 'Resume text is required' });
      }

      if (ai) {
        const prompt = `
Analyze this student resume for the target career: "${targetCareer}".
Student's demonstrated assessment skills: ${JSON.stringify(assessedSkills)}.

Resume Text:
"""
${resumeText}
"""

Evaluate:
1. ATS & Impact Score (0 to 100)
2. Extracted Skills found in the resume
3. Missing Skills required for ${targetCareer}
4. Strengths (3-4 bullet points)
5. Missing Areas / Flaws (3-4 bullet points)
6. Concrete suggestions to improve bullet points (using XYZ formula)
7. Skill Consistency Check: compare resume claims vs assessed skills. If resume claims Advanced in a skill where assessment is Beginner/Basic, flag a "Skill Verification Recommended" notice.

Return ONLY a valid JSON object matching this schema:
{
  "atsScore": number,
  "extractedSkills": string[],
  "missingSkills": string[],
  "strengths": string[],
  "weaknesses": string[],
  "improvementSuggestions": string[],
  "consistencyChecks": [
    {
      "skill": string,
      "resumeClaim": string,
      "assessmentLevel": string,
      "status": "verified" | "mismatch" | "unverified",
      "advice": string
    }
  ],
  "summary": string
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json(parsed);
      }

      // Realistic domain fallback
      const fallbackAnalysis = generateFallbackResumeAnalysis(resumeText, targetCareer, assessedSkills);
      return res.json(fallbackAnalysis);
    } catch (err: any) {
      console.error('Error in /api/gemini/analyze-resume:', err);
      const fallback = generateFallbackResumeAnalysis(req.body?.resumeText || '', req.body?.targetCareer || 'Software Developer', req.body?.assessedSkills || {});
      return res.json(fallback);
    }
  });

  // API Route: AI Mock Interview Evaluation
  app.post('/api/gemini/evaluate-interview', async (req, res) => {
    try {
      const { question, answer, mode = 'Technical', role = 'Software Developer' } = req.body;

      if (!question || !answer) {
        return res.status(400).json({ error: 'Question and answer are required' });
      }

      if (ai) {
        const prompt = `
You are an expert tech interviewer evaluating a student's answer for a ${role} interview (${mode} round).

Question: "${question}"
Candidate's Answer: "${answer}"

Evaluate objectively:
1. Relevance (Score 1-10)
2. Technical Accuracy (Score 1-10)
3. Structure & Clarity (Score 1-10, STAR method adherence if behavioral)
4. Communication & Tone (Score 1-10, check for rambling or filler phrases)
5. Overall Score (Score 1-100)
6. What went well (positive feedback)
7. What to improve (specific blindspots)
8. Model benchmark answer structure (how a top 1% candidate would structure it)
9. Recommended follow-up question

Return ONLY a valid JSON object:
{
  "overallScore": number,
  "relevance": number,
  "technicalAccuracy": number,
  "clarity": number,
  "communication": number,
  "whatWentWell": string[],
  "whatToImprove": string[],
  "suggestedAnswerStructure": string,
  "nextFollowUpQuestion": string
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json(parsed);
      }

      const fallbackEvaluation = generateFallbackInterviewEvaluation(question, answer, mode);
      return res.json(fallbackEvaluation);
    } catch (err: any) {
      console.error('Error in /api/gemini/evaluate-interview:', err);
      const fallback = generateFallbackInterviewEvaluation(req.body?.question || '', req.body?.answer || '', req.body?.mode || 'Technical');
      return res.json(fallback);
    }
  });

  // API Route: AI Project Builder Blueprint
  app.post('/api/gemini/generate-project', async (req, res) => {
    try {
      const { careerGoal, currentSkills = [], skillGaps = [], difficulty = 'Intermediate' } = req.body;

      if (ai) {
        const prompt = `
Generate a comprehensive, production-grade project blueprint for a student targeting: "${careerGoal}".
Current Skills: ${currentSkills.join(', ')}
Skill Gaps to Bridge: ${skillGaps.join(', ')}
Difficulty: ${difficulty}

Create an original, resume-defining project that solves a genuine problem.

Return ONLY a valid JSON object:
{
  "title": string,
  "tagline": string,
  "problemStatement": string,
  "objectives": string[],
  "features": string[],
  "techStack": {
    "frontend": string[],
    "backend": string[],
    "database": string[],
    "devops": string[]
  },
  "databaseSchema": [
    { "table": string, "fields": string[], "purpose": string }
  ],
  "developmentSteps": [
    { "step": number, "title": string, "description": string, "estimatedHours": number }
  ],
  "testingChecklist": string[],
  "githubChecklist": string[],
  "resumeBullets": string[]
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.4,
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json(parsed);
      }

      const fallbackProject = generateFallbackProject(careerGoal, skillGaps);
      return res.json(fallbackProject);
    } catch (err: any) {
      console.error('Error in /api/gemini/generate-project:', err);
      const fallback = generateFallbackProject(req.body?.careerGoal || 'Software Developer', req.body?.skillGaps || []);
      return res.json(fallback);
    }
  });

  // API Route: Diagnostic Quiz Generator for Adaptive Roadmap
  app.post('/api/gemini/generate-quiz', async (req, res) => {
    try {
      const { topic, difficulty = 'Basic' } = req.body;

      if (ai) {
        const prompt = `
Create a 3-question diagnostic multiple-choice quiz for the topic: "${topic}" at level: "${difficulty}".
Questions must test deep understanding, common pitfalls, and practical application.

Return ONLY a valid JSON object:
{
  "topic": "${topic}",
  "questions": [
    {
      "id": string,
      "question": string,
      "options": string[],
      "correctIndex": number,
      "explanation": string
    }
  ]
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.3,
          },
        });

        const parsed = JSON.parse(response.text || '{}');
        return res.json(parsed);
      }

      const fallbackQuiz = generateFallbackQuiz(topic);
      return res.json(fallbackQuiz);
    } catch (err: any) {
      console.error('Error in /api/gemini/generate-quiz:', err);
      const fallback = generateFallbackQuiz(req.body?.topic || 'Java OOP');
      return res.json(fallback);
    }
  });

  // Setup Vite or static serving
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerPilot AI server running on port ${PORT}`);
  });
}

// Helpers for contextual fallbacks
function generateContextualFallbackReply(agent: string, message: string, profile: any): string {
  const target = profile?.targetCareer || 'Software Developer';
  const name = profile?.name || 'Student';

  if (agent === 'learning') {
    return `Here is your optimized learning plan for ${target}:
1. Focus 30 mins daily on core DSA fundamentals (Arrays & Two Pointers).
2. Spend 45 mins building your backend API endpoints.
3. Reserve 15 mins for flashcard concept review.
This structure guarantees steady progress without cognitive fatigue.`;
  }

  if (agent === 'coding') {
    return `In ${target} interviews, interviewers look for problem decomposition. For instance, when implementing an LRU Cache, always combine a Doubly Linked List with a Hash Map to achieve O(1) get and put operations. Remember to handle edge cases like cache capacity of 1.`;
  }

  if (agent === 'interview') {
    return `For ${target} interviews, practice the STAR framework: Situation, Task, Action, Result. When answering "Tell me about a challenging bug," spend 70% of your time on the *Action* (profiling tools, root-cause analysis) and *Result* (latency reduced by 35%).`;
  }

  if (agent === 'project') {
    return `To bridge your skill gaps toward ${target}, build an end-to-end distributed task queue or a real-time collaborative workspace with JWT auth, PostgreSQL indexing, and Docker containerization. It demonstrates full production maturity.`;
  }

  if (agent === 'resume') {
    return `Reviewing your profile for ${target}:
- Convert passive bullet points ("Worked on frontend") to metric-driven impact ("Engineered responsive dashboard in React, cutting initial load time by 42%").
- Highlight SQL indexing, API design, and system architecture.`;
  }

  return `Hello ${name}! As your CareerPilot mentor for ${target}, I recommend tackling your highest-leverage gap today: Data Structures and SQL transactions. Your current readiness is ${profile?.careerReadiness || 62}%. Completing today's mission will push you +5% closer to being job-ready! What topic would you like to master first?`;
}

function generateFallbackResumeAnalysis(text: string, targetRole: string, assessed: any) {
  const lower = text.toLowerCase();
  const hasJava = lower.includes('java');
  const hasSql = lower.includes('sql');
  const hasDsa = lower.includes('dsa') || lower.includes('data structures') || lower.includes('algorithm');

  const consistencyChecks = [
    {
      skill: 'Java',
      resumeClaim: hasJava ? 'Proficient / Advanced' : 'Not listed',
      assessmentLevel: assessed?.Java || 'Beginner (45%)',
      status: hasJava ? 'mismatch' : 'unverified',
      advice: hasJava
        ? 'Skill verification recommended: Resume suggests high proficiency, but recent diagnostic placed you at Beginner. We advise revising OOP inheritance and exception handling before technical screening.'
        : 'Add Java projects to your resume to showcase OOP fundamentals.',
    },
    {
      skill: 'SQL & Relational DBs',
      resumeClaim: hasSql ? 'Intermediate' : 'Basic',
      assessmentLevel: assessed?.SQL || 'Intermediate (65%)',
      status: 'verified',
      advice: 'Strong match. Add performance metrics such as indexing and query optimization results to make your bullet points pop.',
    },
    {
      skill: 'Data Structures & Algorithms',
      resumeClaim: hasDsa ? 'Intermediate' : 'Basic',
      assessmentLevel: assessed?.DSA || 'Beginner (30%)',
      status: hasDsa ? 'mismatch' : 'unverified',
      advice: 'Skill verification recommended: Technical coding rounds will rigorously test trees, graphs, and recursion. Align resume claims with demonstrated problem-solving milestones.',
    },
  ];

  return {
    atsScore: 74,
    extractedSkills: ['Java', 'SQL', 'Git', 'JavaScript', 'HTML/CSS', 'Object-Oriented Programming'],
    missingSkills: ['System Design Basics', 'Docker / Containerization', 'Unit Testing (JUnit / Jest)', 'CI/CD Pipelines'],
    strengths: [
      'Clear educational credentials with relevant coursework highlighted',
      'Solid fundamental projects demonstrating full-stack integration',
      'Consistent use of action verbs in project descriptions',
    ],
    weaknesses: [
      'Missing quantified metrics (e.g. latency reduction, user count, test coverage)',
      'No explicit mention of cloud deployment (AWS, GCP, or Vercel)',
      'Lack of system design or architectural decision justification',
    ],
    improvementSuggestions: [
      'Refactor bullets using the XYZ formula: Accomplished [X] as measured by [Y], by doing [Z]',
      'Include specific tools used for testing and code quality (e.g., JUnit, Postman, SonarQube)',
      'Add a dedicated "Technical Competencies" section categorized by Languages, Frameworks, and Tools',
    ],
    consistencyChecks,
    summary: `Your resume demonstrates good academic foundations for a ${targetRole}. By quantifying your project impact and addressing the 2 skill mismatches identified in your diagnostic assessments, your interview callback rate can improve significantly.`,
  };
}

function generateFallbackInterviewEvaluation(question: string, answer: string, mode: string) {
  const wordCount = answer.trim().split(/\s+/).length;
  const isShort = wordCount < 30;

  return {
    overallScore: isShort ? 65 : 84,
    relevance: isShort ? 6 : 9,
    technicalAccuracy: isShort ? 7 : 8,
    clarity: isShort ? 6 : 8,
    communication: 8,
    whatWentWell: [
      'Directly addressed the core question without excessive tangents',
      'Demonstrated understanding of core computer science fundamentals',
      'Maintained a professional, confident tone',
    ],
    whatToImprove: [
      isShort ? 'Answer is slightly brief; provide concrete examples from real projects or code scenarios' : 'Elaborate on edge cases and trade-offs (e.g., time vs. space complexity)',
      'Explicitly state the business or performance impact of your technical choice',
      'Conclude with a succinct summary of how this knowledge applies in production',
    ],
    suggestedAnswerStructure:
      '1. Direct definition & principle -> 2. Architecture/Algorithm breakdown -> 3. Practical trade-offs (Time/Space/Concurrency) -> 4. Real-world project scenario.',
    nextFollowUpQuestion: 'How would you scale this approach if concurrent requests increased by 100x while memory remained constrained?',
  };
}

function generateFallbackProject(careerGoal: string, skillGaps: string[]) {
  return {
    title: 'CloudScale — Distributed Task Orchestrator & Telemetry Engine',
    tagline: 'A fault-tolerant distributed background job execution platform with real-time analytics.',
    problemStatement:
      'Modern web apps need asynchronous execution of long-running operations without blocking user requests. This project builds a reliable worker pool with deduplication, retries, and latency telemetry.',
    objectives: [
      'Implement an asynchronous worker queue with persistent job state',
      'Design idempotent job handling with exponential backoff retries',
      'Build a live telemetry dashboard measuring queue throughput and error rates',
    ],
    features: [
      'Job priority scheduling (High, Normal, Low)',
      'Dead-letter queue (DLQ) for failed payloads with manual replay',
      'Real-time WebSocket streaming of worker health and memory consumption',
      'JWT-authenticated REST API for submitting and monitoring tasks',
    ],
    techStack: {
      frontend: ['React 19', 'Tailwind CSS', 'Lucide Icons'],
      backend: ['Node.js / Express', 'TypeScript'],
      database: ['PostgreSQL / SQL', 'Redis for caching'],
      devops: ['Docker', 'GitHub Actions CI'],
    },
    databaseSchema: [
      { table: 'jobs', fields: ['id UUID', 'payload JSONB', 'status VARCHAR', 'attempts INT', 'created_at TIMESTAMP'], purpose: 'Tracks lifecycle of all submitted execution payloads' },
      { table: 'worker_nodes', fields: ['node_id VARCHAR', 'status VARCHAR', 'current_load INT', 'heartbeat TIMESTAMP'], purpose: 'Maintains health and distributed node registration' },
      { table: 'job_logs', fields: ['id UUID', 'job_id UUID', 'log_message TEXT', 'level VARCHAR', 'timestamp TIMESTAMP'], purpose: 'Detailed diagnostic trace for debugging failures' },
    ],
    developmentSteps: [
      { step: 1, title: 'Database Schema & Job State Machine', description: 'Design database tables, indexes, and write migration scripts for ACID job state transitions.', estimatedHours: 4 },
      { step: 2, title: 'Core Worker Execution Pool', description: 'Implement concurrency control, worker polling with locking (SELECT FOR UPDATE SKIP LOCKED), and timeout watchdogs.', estimatedHours: 8 },
      { step: 3, title: 'REST API & Authentication', description: 'Expose endpoints for job dispatch, cancellation, and metrics with JWT bearer authentication.', estimatedHours: 6 },
      { step: 4, title: 'Telemetry Dashboard & Live Visualizer', description: 'Build responsive admin interface displaying throughput charts and error breakdown.', estimatedHours: 6 },
    ],
    testingChecklist: [
      'Verify duplicate job submission triggers deduplication hash check',
      'Simulate worker crash and verify unacknowledged job is safely reclaimed',
      'Test dead-letter queue routing after 3 consecutive failures',
      'Load test queue with 1,000 concurrent jobs and measure p99 latency',
    ],
    githubChecklist: [
      'Comprehensive README with architecture diagram and setup guide',
      'Docker Compose file for one-command local reproduction',
      'GitHub Actions workflow running unit tests on pull requests',
      'Clear MIT license and code documentation',
    ],
    resumeBullets: [
      'Architected distributed background task queue handling asynchronous processing with zero-data-loss guarantee using PostgreSQL row-level locks.',
      'Implemented exponential backoff retry mechanism and dead-letter queue, reducing failed task recovery time from minutes to seconds.',
      'Constructed real-time telemetry dashboard in React, providing visibility into worker memory allocation and p99 execution latency.',
    ],
  };
}

function generateFallbackQuiz(topic: string) {
  return {
    topic,
    questions: [
      {
        id: 'q1',
        question: `In ${topic}, what is the primary architectural advantage of favoring composition over inheritance?`,
        options: [
          'It provides tighter coupling between parent and child classes',
          'It allows changing system behavior dynamically at runtime without rigid class hierarchies',
          'It reduces the amount of memory allocated on the stack',
          'It prevents methods from being overridden by subclasses',
        ],
        correctIndex: 1,
        explanation: 'Composition allows flexible object assembly and loose coupling, avoiding the fragile base class problem inherent in deep inheritance trees.',
      },
      {
        id: 'q2',
        question: `When designing high-performance systems with ${topic}, what occurs if hash collisions are not handled effectively?`,
        options: [
          'Lookup complexity degrades from average O(1) toward O(n)',
          'The program throws an immediate OutOfMemoryError',
          'Keys are silently overwritten with undefined values',
          'The garbage collector is permanently paused',
        ],
        correctIndex: 0,
        explanation: 'Excessive collisions cause keys to chain into linked lists or trees, degrading search and insertion times to linear O(n).',
      },
      {
        id: 'q3',
        question: `Which testing approach is most critical when verifying code in ${topic} for enterprise production readiness?`,
        options: [
          'Only testing the happy path with default parameters',
          'Boundary condition tests including empty inputs, maximum capacity, and concurrent modification',
          'Relying solely on manual console.log verification',
          'Skipping unit tests in favor of end-of-year audits',
        ],
        correctIndex: 1,
        explanation: 'Production software failures almost always occur at boundaries (empty sets, concurrency race conditions, null pointers, and resource exhaustion).',
      },
    ],
  };
}

startServer();
