import React, { useState } from 'react';
import { CareerPilotProvider, useCareerPilot } from './context/CareerPilotContext';
import { LandingPage } from './components/LandingPage';
import { TopBar } from './components/TopBar';
import { Sidebar } from './components/Sidebar';
import { OnboardingModal } from './components/OnboardingModal';
import { DashboardView } from './components/DashboardView';
import { CareerTwinView } from './components/CareerTwinView';
import { CareerSimulatorView } from './components/CareerSimulatorView';
import { SkillGapView } from './components/SkillGapView';
import { RoadmapView } from './components/RoadmapView';
import { TodaysMissionView } from './components/TodaysMissionView';
import { AICareerTeamView } from './components/AICareerTeamView';
import { AIChatView } from './components/AIChatView';
import { ProjectBuilderView } from './components/ProjectBuilderView';
import { ResumeAnalyzerView } from './components/ResumeAnalyzerView';
import { MockInterviewView } from './components/MockInterviewView';
import { FocusModeView } from './components/FocusModeView';
import { ProgressView } from './components/ProgressView';

function AppContent() {
  const { profile } = useCareerPilot();
  const [viewMode, setViewMode] = useState<'landing' | 'app'>('landing');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // If user clicks "Get Started" on landing page
  const handleGetStarted = () => {
    setShowOnboarding(true);
    setViewMode('app');
  };

  // If user clicks "Explore Career Paths" or enters demo
  const handleExploreApp = () => {
    setViewMode('app');
  };

  if (viewMode === 'landing') {
    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        onExplore={handleExploreApp}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenOnboarding={() => setShowOnboarding(true)}
          activeTab={activeTab}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}
          {activeTab === 'careertwin' && <CareerTwinView onNavigate={setActiveTab} />}
          {activeTab === 'simulator' && <CareerSimulatorView onNavigate={setActiveTab} />}
          {activeTab === 'skillgap' && <SkillGapView onNavigate={setActiveTab} />}
          {activeTab === 'roadmap' && <RoadmapView />}
          {activeTab === 'missions' && <TodaysMissionView onNavigate={setActiveTab} />}
          {activeTab === 'careerteam' && <AICareerTeamView onNavigate={setActiveTab} />}
          {activeTab === 'chat' && <AIChatView onNavigate={setActiveTab} />}
          {activeTab === 'projects' && <ProjectBuilderView />}
          {activeTab === 'resume' && <ResumeAnalyzerView />}
          {activeTab === 'interview' && <MockInterviewView />}
          {activeTab === 'focus' && <FocusModeView />}
          {activeTab === 'progress' && <ProgressView />}
        </main>
      </div>

      {/* Onboarding Calibration Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CareerPilotProvider>
      <AppContent />
    </CareerPilotProvider>
  );
}
