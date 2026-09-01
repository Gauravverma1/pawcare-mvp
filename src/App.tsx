import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { ProviderDetailModal } from './components/ProviderDetailModal';
import { AIReportAssistant } from './components/AIReportAssistant';
import { ArchitectureModal } from './components/ArchitectureModal';
import { SAMPLE_PROVIDERS } from './data/mockData';
import { CategoryType, Provider, SearchFilters } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'ai-report' | 'architecture'>('home');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    category: 'all',
    query: '',
    maxDistanceKm: 5,
    openNowOnly: false,
    emergencyOnly: false
  });

  // Flow Handler: Click Category on Home
  const handleSelectCategory = (category: CategoryType) => {
    setSearchFilters(prev => ({
      ...prev,
      category,
      emergencyOnly: category === 'emergency'
    }));
    setActiveTab('search');
  };

  // Flow Handler: Search Submit
  const handleSearchSubmit = (query: string, category: CategoryType) => {
    setSearchFilters(prev => ({
      ...prev,
      query,
      category,
      maxDistanceKm: 10 // Expand radius to 10km for natural language intent search
    }));
    setActiveTab('search');
  };

  // Flow Handler: Emergency Banner CTA
  const handleEmergencyClick = () => {
    setSearchFilters({
      category: 'emergency',
      query: '',
      maxDistanceKm: 10,
      openNowOnly: false,
      emergencyOnly: true
    });
    setActiveTab('search');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEmergencyClick={handleEmergencyClick}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeScreen
            onSearchSubmit={handleSearchSubmit}
            onSelectCategory={handleSelectCategory}
            onEmergencyClick={handleEmergencyClick}
            onOpenAiReport={() => setActiveTab('ai-report')}
            onViewProviderDetail={(provider) => setSelectedProvider(provider)}
            providers={SAMPLE_PROVIDERS}
          />
        )}

        {activeTab === 'search' && (
          <SearchScreen
            providers={SAMPLE_PROVIDERS}
            initialFilters={searchFilters}
            onViewProviderDetail={(provider) => setSelectedProvider(provider)}
            onEmergencyFilterToggle={handleEmergencyClick}
          />
        )}

        {activeTab === 'ai-report' && (
          <AIReportAssistant />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureModal />
        )}
      </main>

      {/* Provider Details Modal Overlay */}
      <ProviderDetailModal
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-2xs">
              P
            </div>
            <span className="font-bold text-slate-200 text-sm">PawCare</span>
            <span className="text-slate-500">— Find the right care, when it matters.</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <button onClick={() => setActiveTab('home')} className="hover:text-white">Home</button>
            <button onClick={() => setActiveTab('search')} className="hover:text-white">Search Vets</button>
            <button onClick={() => setActiveTab('ai-report')} className="hover:text-white">AI Report Assistant</button>
            <button onClick={() => setActiveTab('architecture')} className="hover:text-white">Architecture & Specs</button>
          </div>

          <div className="text-slate-500">
            Conceptual Screening Prototype • Product & Tech Intern Assignment
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
