import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  StudentProfile,
  SkillScore,
  CareerTwinData,
  RoadmapNode,
  DailyMission,
  KnowledgeMemoryItem,
  ProjectBlueprint,
  CareerRoleOption,
  ChatMessage,
  SkillLevel,
} from '../types';
import {
  INITIAL_DEMO_STUDENT,
  CAREER_ROLES,
  INITIAL_ROADMAP,
  INITIAL_DAILY_MISSIONS,
  INITIAL_KNOWLEDGE_MEMORY,
  INITIAL_PROJECTS,
} from '../data/mockData';

interface CareerPilotContextType {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  careerTwin: CareerTwinData;
  careerRoles: CareerRoleOption[];
  activeCareerRole: CareerRoleOption;
  switchCareerRole: (roleTitle: string) => void;
  roadmap: RoadmapNode[];
  completeRoadmapNode: (id: string, score: number) => void;
  failRoadmapNode: (id: string, score: number) => void;
  missions: DailyMission[];
  toggleMission: (id: string) => void;
  addMission: (mission: Omit<DailyMission, 'id' | 'completed'>) => void;
  knowledgeMemory: KnowledgeMemoryItem[];
  addKnowledgeMemory: (item: Omit<KnowledgeMemoryItem, 'id'>) => void;
  resolveKnowledgeMemory: (id: string) => void;
  projects: ProjectBlueprint[];
  addProjectToRoadmap: (id: string) => void;
  completeProject: (id: string) => void;
  addNewProject: (project: ProjectBlueprint) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  resetToDemo: () => void;
  completeOnboarding: (data: Partial<StudentProfile>) => void;
  triggerCelebration: () => void;
}

const CareerPilotContext = createContext<CareerPilotContextType | undefined>(undefined);

const LEVEL_THRESHOLDS = [
  { level: 'Beginner' as const, minXp: 0, maxXp: 200 },
  { level: 'Explorer' as const, minXp: 201, maxXp: 500 },
  { level: 'Builder' as const, minXp: 501, maxXp: 900 },
  { level: 'Skilled' as const, minXp: 901, maxXp: 1500 },
  { level: 'Job Ready' as const, minXp: 1501, maxXp: Infinity },
];

export const CareerPilotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('careerpilot_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DEMO_STUDENT;
  });

  // 2. Roadmap State
  const [roadmap, setRoadmap] = useState<RoadmapNode[]>(() => {
    try {
      const saved = localStorage.getItem('careerpilot_roadmap');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ROADMAP;
  });

  // 3. Missions State
  const [missions, setMissions] = useState<DailyMission[]>(() => {
    try {
      const saved = localStorage.getItem('careerpilot_missions');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_DAILY_MISSIONS;
  });

  // 4. Knowledge Memory State
  const [knowledgeMemory, setKnowledgeMemory] = useState<KnowledgeMemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('careerpilot_memory');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_KNOWLEDGE_MEMORY;
  });

  // 5. Projects State
  const [projects, setProjects] = useState<ProjectBlueprint[]>(() => {
    try {
      const saved = localStorage.getItem('careerpilot_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECTS;
  });

  // 6. Chat Messages State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('careerpilot_chat');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'msg-1',
        sender: 'ai',
        agentName: 'CareerPilot',
        text: `Welcome back, ${profile.name}! Your current Career Readiness for ${profile.targetCareer} is at 62%. You're in your 5-day study streak. What would you like to focus on today?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  // 7. Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('careerpilot_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Premium dark mode by default
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('careerpilot_theme', theme);
  }, [theme]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('careerpilot_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('careerpilot_roadmap', JSON.stringify(roadmap));
  }, [roadmap]);

  useEffect(() => {
    localStorage.setItem('careerpilot_missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem('careerpilot_memory', JSON.stringify(knowledgeMemory));
  }, [knowledgeMemory]);

  useEffect(() => {
    localStorage.setItem('careerpilot_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('careerpilot_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      // safe ignore in environments without canvas
    }
  };

  // Active Career Role
  const activeCareerRole = useMemo(() => {
    const found = CAREER_ROLES.find(
      r => r.title.toLowerCase() === profile.targetCareer.toLowerCase()
    );
    return found || CAREER_ROLES[0];
  }, [profile.targetCareer]);

  // Intelligent Career Twin & Skill Gap Calculation
  const careerTwin = useMemo<CareerTwinData>(() => {
    const levelScoreMap: Record<SkillLevel, number> = {
      Beginner: 35,
      Basic: 50,
      Intermediate: 70,
      Advanced: 90,
    };

    const role = activeCareerRole;

    // Map all required skills plus existing skills
    const allSkillKeys = Array.from(
      new Set([
        ...role.requiredSkills.map(r => r.skill),
        'Java',
        'DSA',
        'SQL',
        'Projects',
        'Communication',
        'Interview',
      ])
    );

    const skillsBreakdown: SkillScore[] = allSkillKeys.map(skillName => {
      let current = 0;
      let target = 75;
      let category = 'Technical';
      let importance: 'Critical' | 'High' | 'Medium' | 'Optional' = 'Medium';
      let whyItMatters = 'Essential for technical proficiency and problem solving.';

      const requiredDef = role.requiredSkills.find(r => r.skill.toLowerCase() === skillName.toLowerCase());
      if (requiredDef) {
        target = requiredDef.minScore;
        importance = requiredDef.critical ? 'Critical' : 'High';
      }

      if (skillName === 'Projects') {
        const completedProj = projects.filter(p => p.completed).length;
        current = Math.min(90, 45 + completedProj * 20);
        target = 80;
        category = 'Portfolio';
        importance = 'Critical';
        whyItMatters = 'Demonstrates ability to engineer production-ready software systems with real-world users.';
      } else if (skillName === 'Interview') {
        current = 40;
        target = 80;
        category = 'Hiring';
        importance = 'Critical';
        whyItMatters = 'Clear communication, algorithmic problem decomposition, and STAR method mastery.';
      } else {
        const userLevel = profile.skills[skillName];
        if (userLevel) {
          current = levelScoreMap[userLevel] || 35;
        } else {
          current = 20; // Untested or missing
        }
      }

      // Add dynamic modifier based on completed roadmap modules
      if (skillName === 'Java' && roadmap.find(r => r.id === 'rm-4')?.status === 'completed') {
        current = Math.min(90, current + 15);
      }
      if (skillName === 'SQL' && roadmap.find(r => r.id === 'rm-6')?.status === 'completed') {
        current = Math.min(95, current + 15);
      }
      if (skillName === 'DSA' && roadmap.find(r => r.id === 'rm-5')?.status === 'completed') {
        current = Math.min(90, current + 20);
      }

      if (skillName === 'Java') {
        whyItMatters = 'Core object-oriented language for high-throughput enterprise backends and distributed systems.';
      } else if (skillName === 'DSA') {
        whyItMatters = 'Required for passing algorithmic technical screenings and writing computationally optimal code.';
      } else if (skillName === 'SQL') {
        whyItMatters = 'Relational database schema design, transactions (ACID), and query performance tuning.';
      } else if (skillName === 'Communication') {
        whyItMatters = 'Articulating technical trade-offs with cross-functional teammates and interviewers.';
      }

      const gap = target - current;
      let gapStatus: SkillScore['gapStatus'] = 'Ready';
      if (gap > 25) gapStatus = 'Critical';
      else if (gap > 12) gapStatus = 'Needs Improvement';
      else if (gap > 0) gapStatus = 'Almost Ready';

      return {
        name: skillName,
        current,
        target,
        category,
        importance,
        gapStatus,
        whyItMatters,
      };
    });

    // Compute Career Readiness %
    const totalCurrent = skillsBreakdown.reduce((sum, s) => sum + s.current, 0);
    const totalTarget = skillsBreakdown.reduce((sum, s) => sum + s.target, 0);
    const careerReadiness = Math.min(100, Math.round((totalCurrent / totalTarget) * 100));

    const strongSkills = skillsBreakdown.filter(s => s.current >= 65).map(s => s.name);
    const weakSkills = skillsBreakdown.filter(s => s.current < 55 && s.target >= 70).map(s => s.name);
    const missingSkills = role.requiredSkills
      .filter(r => !profile.skills[r.skill] || profile.skills[r.skill] === 'Beginner')
      .map(r => r.skill);
    const recommendedSkills = skillsBreakdown
      .filter(s => s.gapStatus === 'Critical' || s.gapStatus === 'Needs Improvement')
      .map(s => s.name);

    return {
      careerReadiness,
      skillsBreakdown,
      strongSkills,
      weakSkills,
      missingSkills,
      recommendedSkills,
      learningTimeline: profile.timeline || '6 months',
      projectReadiness: skillsBreakdown.find(s => s.name === 'Projects')?.current || 50,
      interviewReadiness: skillsBreakdown.find(s => s.name === 'Interview')?.current || 40,
    };
  }, [profile, activeCareerRole, roadmap, projects]);

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };

      // Re-evaluate XP and Level
      const xp = next.xp;
      const matchedLevel = LEVEL_THRESHOLDS.find(t => xp >= t.minXp && xp <= t.maxXp);
      if (matchedLevel) {
        next.level = matchedLevel.level;
      }
      return next;
    });
  };

  const switchCareerRole = (roleTitle: string) => {
    updateProfile({ targetCareer: roleTitle });
    // Add helpful mission for new career role
    setMissions(prev => [
      {
        id: `m-switch-${Date.now()}`,
        title: `Calibrate study roadmap for ${roleTitle}`,
        category: 'Foundations',
        durationMinutes: 15,
        difficulty: 'Easy',
        xp: 20,
        completed: false,
      },
      ...prev.slice(0, 3),
    ]);
  };

  // Adaptive Roadmap actions:
  const completeRoadmapNode = (id: string, score: number) => {
    setRoadmap(prev =>
      prev.map(node => {
        if (node.id === id) {
          return {
            ...node,
            status: 'completed',
            score,
            isRevision: false,
          };
        }
        return node;
      })
    );

    // Reward XP & update profile
    const earnedXp = 40;
    updateProfile({
      xp: profile.xp + earnedXp,
      completedTasksCount: profile.completedTasksCount + 1,
    });
    triggerCelebration();

    // Unlock subsequent node
    const currentIndex = roadmap.findIndex(r => r.id === id);
    if (currentIndex >= 0 && currentIndex + 1 < roadmap.length) {
      setRoadmap(prev =>
        prev.map((node, idx) => {
          if (idx === currentIndex + 1 && node.status === 'locked') {
            return { ...node, status: 'recommended' };
          }
          return node;
        })
      );
    }
  };

  const failRoadmapNode = (id: string, score: number) => {
    // If the student performs poorly (<75%):
    // Automatically recommend Revision, additional practice, quiz, mini challenge!
    const targetNode = roadmap.find(r => r.id === id);
    const topic = targetNode?.quizTopic || 'Technical Fundamentals';

    setRoadmap(prev =>
      prev.map(node => {
        if (node.id === id) {
          return {
            ...node,
            status: 'revision-required',
            score,
            isRevision: true,
            reasonForAddition: `Diagnostic score (${score}%) flagged critical gaps in ${topic}. Automatic revision injected.`,
          };
        }
        return node;
      })
    );

    // Automatically add to Knowledge Memory (Topics to Revisit)
    addKnowledgeMemory({
      topic: `${topic} — Targeted Revision`,
      reason: `Diagnostic score was ${score}%. Conceptual grasp needs reinforcement before progressing.`,
      lastAssessed: 'Just now',
      mastery: score,
      status: 'Needs Revision',
      recommendedAction: `Complete the review notes and pass the 3-question diagnostic review.`,
    });

    // Automatically add a daily revision mission
    addMission({
      title: `⚡ Revision Mission: Revisit ${topic} & solve 2 practice problems`,
      category: 'Revision',
      durationMinutes: 20,
      difficulty: 'Medium',
      xp: 25,
    });
  };

  const toggleMission = (id: string) => {
    setMissions(prev =>
      prev.map(m => {
        if (m.id === id) {
          const nextCompleted = !m.completed;
          if (nextCompleted) {
            updateProfile({
              xp: profile.xp + m.xp,
              completedTasksCount: profile.completedTasksCount + 1,
            });
            triggerCelebration();
          } else {
            updateProfile({
              xp: Math.max(0, profile.xp - m.xp),
              completedTasksCount: Math.max(0, profile.completedTasksCount - 1),
            });
          }
          return { ...m, completed: nextCompleted };
        }
        return m;
      })
    );
  };

  const addMission = (mission: Omit<DailyMission, 'id' | 'completed'>) => {
    const newMission: DailyMission = {
      ...mission,
      id: `mission-${Date.now()}`,
      completed: false,
    };
    setMissions(prev => [newMission, ...prev]);
  };

  const addKnowledgeMemory = (item: Omit<KnowledgeMemoryItem, 'id'>) => {
    const newItem: KnowledgeMemoryItem = {
      ...item,
      id: `km-${Date.now()}`,
    };
    setKnowledgeMemory(prev => [newItem, ...prev.filter(x => x.topic !== item.topic)]);
  };

  const resolveKnowledgeMemory = (id: string) => {
    setKnowledgeMemory(prev =>
      prev.map(k => (k.id === id ? { ...k, status: 'Mastered', mastery: 90 } : k))
    );
    updateProfile({ xp: profile.xp + 20 });
    triggerCelebration();
  };

  const addProjectToRoadmap = (id: string) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, inRoadmap: true } : p))
    );
    triggerCelebration();
  };

  const completeProject = (id: string) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, completed: true } : p))
    );
    updateProfile({
      xp: profile.xp + 60,
      completedTasksCount: profile.completedTasksCount + 1,
    });
    triggerCelebration();
  };

  const addNewProject = (project: ProjectBlueprint) => {
    setProjects(prev => [project, ...prev]);
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  const resetToDemo = () => {
    localStorage.clear();
    setProfile(INITIAL_DEMO_STUDENT);
    setRoadmap(INITIAL_ROADMAP);
    setMissions(INITIAL_DAILY_MISSIONS);
    setKnowledgeMemory(INITIAL_KNOWLEDGE_MEMORY);
    setProjects(INITIAL_PROJECTS);
    setChatMessages([
      {
        id: 'msg-reset',
        sender: 'ai',
        agentName: 'CareerPilot',
        text: `Demo student profile restored. Target Career: Software Developer. Ready to explore!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const completeOnboarding = (data: Partial<StudentProfile>) => {
    const newProfile: StudentProfile = {
      ...profile,
      ...data,
      hasCompletedOnboarding: true,
      xp: 100, // onboarding reward
      level: 'Explorer',
    };
    setProfile(newProfile);
    triggerCelebration();
  };

  return (
    <CareerPilotContext.Provider
      value={{
        profile,
        setProfile,
        updateProfile,
        careerTwin,
        careerRoles: CAREER_ROLES,
        activeCareerRole,
        switchCareerRole,
        roadmap,
        completeRoadmapNode,
        failRoadmapNode,
        missions,
        toggleMission,
        addMission,
        knowledgeMemory,
        addKnowledgeMemory,
        resolveKnowledgeMemory,
        projects,
        addProjectToRoadmap,
        completeProject,
        addNewProject,
        chatMessages,
        addChatMessage,
        clearChat,
        theme,
        toggleTheme,
        resetToDemo,
        completeOnboarding,
        triggerCelebration,
      }}
    >
      {children}
    </CareerPilotContext.Provider>
  );
};

export const useCareerPilot = () => {
  const context = useContext(CareerPilotContext);
  if (!context) {
    throw new Error('useCareerPilot must be used within a CareerPilotProvider');
  }
  return context;
};
