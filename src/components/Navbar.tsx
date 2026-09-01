import React from 'react';
import { MapPin, AlertCircle, FileText, Cpu, HeartHandshake } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'search' | 'ai-report' | 'architecture';
  setActiveTab: (tab: 'home' | 'search' | 'ai-report' | 'architecture') => void;
  onEmergencyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onEmergencyClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/20">
              {/* Paw Icon SVG */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 11.5c-2.5 0-4.5 1.8-4.5 4 0 1.8 1.2 3.5 2.8 4.2.5.2 1.1.3 1.7.3.6 0 1.2-.1 1.7-.3 1.6-.7 2.8-2.4 2.8-4.2 0-2.2-2-4-4.5-4zM6.5 10c1.2 0 2.2-1.3 2.2-3S7.7 4 6.5 4 4.3 5.3 4.3 7s1 3 2.2 3zm11 0c1.2 0 2.2-1.3 2.2-3s-1-3-2.2-3-2.2 1.3-2.2 3 1 3 2.2 3zM9.5 7.5c1.1 0 2-1.1 2-2.5S10.6 2.5 9.5 2.5s-2 1.1-2 2.5 1 2.5 2 2.5zm5 0c1.1 0 2-1.1 2-2.5s-.9-2.5-2-2.5-2 1.1-2 2.5 1 2.5 2 2.5z" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">PawCare</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                MVP Prototype
              </span>
            </div>
          </div>

          {/* Location Selector */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-100/80 hover:bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-full text-sm font-medium border border-slate-200 transition-colors">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Care near <strong className="text-slate-900">Pune, Maharashtra</strong></span>
            <span className="text-xs bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">Within 5 km</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'home' 
                  ? 'bg-slate-100 text-teal-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Discover
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'search' 
                  ? 'bg-slate-100 text-teal-700 font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Search Vets
            </button>

            <button
              onClick={() => setActiveTab('ai-report')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'ai-report' 
                  ? 'bg-teal-50 text-teal-700 font-semibold border border-teal-200' 
                  : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4 text-teal-600" />
              <span className="hidden sm:inline">Report Assistant</span>
              <span className="sm:hidden">Report</span>
            </button>

            <button
              onClick={() => setActiveTab('architecture')}
              className={`hidden lg:flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'architecture' 
                  ? 'bg-slate-100 text-slate-900 font-semibold' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="View Product Architecture & Proposal"
            >
              <Cpu className="w-4 h-4 text-slate-500" />
              <span>Specs & Architecture</span>
            </button>

            <button
              onClick={onEmergencyClick}
              className="flex items-center space-x-1.5 bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-2 rounded-lg text-sm font-semibold shadow-xs transition-colors"
            >
              <AlertCircle className="w-4 h-4 animate-pulse" />
              <span className="hidden xs:inline">Emergency</span>
            </button>
          </nav>

        </div>
      </div>
    </header>
  );
};
