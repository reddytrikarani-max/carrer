export type SkillLevel = 'Beginner' | 'Basic' | 'Intermediate' | 'Advanced';

export interface StudentProfile {
  name: string;
  college: string;
  degree: string;
  branch: string;
  currentYear: string;
  cgpa: string;
  gradYear: string;
  skills: Record<string, SkillLevel>;
  targetCareer: string;
  customCareer?: string;
  studyTime: string;
  timeline: string;
  xp: number;
  level: 'Beginner' | 'Explorer' | 'Builder' | 'Skilled' | 'Job Ready';
  streakDays: number;
  weeklyHours: number;
  completedTasksCount: number;
  hasCompletedOnboarding: boolean;
}

export interface SkillScore {
  name: string;
  current: number;
  target: number;
  category: string;
  importance: 'Critical' | 'High' | 'Medium' | 'Optional';
  gapStatus: 'Critical' | 'Needs Improvement' | 'Almost Ready' | 'Ready';
  whyItMatters: string;
}

export interface CareerTwinData {
  careerReadiness: number;
  skillsBreakdown: SkillScore[];
  strongSkills: string[];
  weakSkills: string[];
  missingSkills: string[];
  recommendedSkills: string[];
  learningTimeline: string;
  projectReadiness: number;
  interviewReadiness: number;
}

export interface RoadmapNode {
  id: string;
  title: string;
  category: string;
  status: 'completed' | 'in-progress' | 'recommended' | 'locked' | 'revision-required';
  score?: number;
  estimatedHours: number;
  whyItMatters: string;
  fourStages: {
    learn: string;
    practice: string;
    apply: string;
    test: string;
  };
  quizTopic: string;
  isRevision?: boolean;
  reasonForAddition?: string;
}

export interface DailyMission {
  id: string;
  title: string;
  category: string;
  durationMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  completed: boolean;
}

export interface KnowledgeMemoryItem {
  id: string;
  topic: string;
  reason: string;
  lastAssessed: string;
  mastery: number;
  status: 'Needs Revision' | 'In Practice' | 'Mastered';
  recommendedAction: string;
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  tagline: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  targetCareer: string;
  skillsLearned: string[];
  problemStatement: string;
  objectives: string[];
  features: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    devops: string[];
  };
  databaseSchema: {
    table: string;
    fields: string[];
    purpose: string;
  }[];
  developmentSteps: {
    step: number;
    title: string;
    description: string;
    estimatedHours: number;
  }[];
  testingChecklist: string[];
  githubChecklist: string[];
  resumeBullets: string[];
  inRoadmap: boolean;
  completed: boolean;
}

export interface CareerRoleOption {
  id: string;
  title: string;
  tagline: string;
  avgSalary: string;
  hiringDemand: 'High' | 'Very High' | 'Exponential';
  requiredSkills: { skill: string; targetLevel: SkillLevel; minScore: number; critical: boolean }[];
  description: string;
  typicalTimeline: string;
  keyProjects: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  agentId?: string;
  agentName?: string;
  text: string;
  timestamp: string;
}

export interface AIAgent {
  id: string;
  name: string;
  role: string;
  description: string;
  iconName: string;
  accentColor: string;
  samplePrompts: string[];
}
