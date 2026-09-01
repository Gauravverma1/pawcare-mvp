import React, { useState } from 'react';
import { 
  Cpu, 
  Database, 
  Sparkles, 
  MapPin, 
  MessageSquare, 
  Cloud, 
  Layers, 
  Calendar, 
  Ban, 
  ArrowRight,
  Server,
  FileCode,
  Globe
} from 'lucide-react';

export const ArchitectureModal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'ai-workflows' | 'integrations' | 'mvp-plan'>('architecture');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-slate-100 text-slate-800 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-slate-300">
          <Cpu className="w-4 h-4 text-slate-700" />
          <span>Product & Technical Architecture Specification</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          PawCare Platform Blueprint
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
          Technical architecture, AI workflows, API integrations evaluation, 30-day MVP rollout, and out-of-scope rationale.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'architecture'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          System Architecture
        </button>

        <button
          onClick={() => setActiveTab('ai-workflows')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'ai-workflows'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          3 Concrete AI Workflows
        </button>

        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'integrations'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          5 APIs / Integrations
        </button>

        <button
          onClick={() => setActiveTab('mvp-plan')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'mvp-plan'
              ? 'bg-teal-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          30-Day Plan & Out of Scope
        </button>
      </div>

      {/* TAB CONTENT 1: SYSTEM ARCHITECTURE */}
      {activeTab === 'architecture' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-8 shadow-2xs">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
              <Layers className="w-5 h-5 text-teal-600" />
              <span>Conceptual System Architecture</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Clean three-tier web architecture with decoupled AI document parser and geolocation indexing
            </p>
          </div>

          {/* VISUAL ARCHITECTURE FLOW */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl space-y-6 font-mono text-xs overflow-x-auto shadow-inner border border-slate-800">
            <div className="flex flex-col items-center space-y-4 min-w-[500px]">
              
              {/* User Layer */}
              <div className="bg-teal-950 border border-teal-500/50 text-teal-200 px-6 py-3 rounded-xl font-bold flex items-center space-x-2 shadow-md">
                <Globe className="w-4 h-4 text-teal-400" />
                <span>USER (Pet Parent / Animal Rescuer Web & Mobile Browser)</span>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-500 rotate-90" />

              {/* Frontend Layer */}
              <div className="bg-slate-800 border border-slate-600 px-6 py-3 rounded-xl text-center space-y-1 w-full max-w-lg">
                <div className="font-bold text-teal-300 flex items-center justify-center space-x-1.5">
                  <FileCode className="w-4 h-4" />
                  <span>Frontend Client (React + TypeScript + Vite + Tailwind CSS)</span>
                </div>
                <div className="text-slate-400 text-2xs">
                  Location Services • Discovery Search & Filters • Report Upload UI • Responsive Design
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-slate-500 rotate-90" />

              {/* Backend API Layer */}
              <div className="bg-slate-800 border border-slate-600 px-6 py-3 rounded-xl text-center space-y-1 w-full max-w-lg">
                <div className="font-bold text-emerald-300 flex items-center justify-center space-x-1.5">
                  <Server className="w-4 h-4" />
                  <span>Backend REST API Layer (Node.js + Express API)</span>
                </div>
                <div className="text-slate-400 text-2xs">
                  Radius Geolocation Queries • Sanitization • Provider Services Controller
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-lg pt-2">
                
                {/* Database Layer */}
                <div className="bg-slate-950 border border-slate-700 p-4 rounded-xl space-y-1">
                  <div className="font-bold text-sky-400 flex items-center space-x-1">
                    <Database className="w-3.5 h-3.5" />
                    <span>PostgreSQL Database</span>
                  </div>
                  <div className="text-2xs text-slate-400">
                    PostGIS Spatial Index<br />
                    • Providers<br />
                    • Services<br />
                    • Locations<br />
                    • Operating Hours<br />
                    • Report Metadata
                  </div>
                </div>

                {/* AI & Cloud Layer */}
                <div className="bg-slate-950 border border-teal-900/60 p-4 rounded-xl space-y-1">
                  <div className="font-bold text-teal-400 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    <span>AI Layer & Integrations</span>
                  </div>
                  <div className="text-2xs text-slate-400">
                    • OCR Document Parsing<br />
                    • LLM-based Summarization<br />
                    • Google Maps API<br />
                    • WhatsApp / Cloud Storage
                  </div>
                </div>

              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Frontend Stack</span>
              <p>React, TypeScript, Vite, Tailwind CSS. Lightweight, fast rendering with clean component architecture.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">Backend & Spatial Data</span>
              <p>Node.js + Express REST API with PostgreSQL + PostGIS spatial extension for geolocation queries near Pune.</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="font-bold text-slate-900">AI Microservice</span>
              <p>OCR document extraction paired with an LLM-based summarization pipeline backed by strict safety prompt boundaries.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: 3 AI WORKFLOWS */}
      {activeTab === 'ai-workflows' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <span>Three Concrete AI Workflows</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Where AI solves information messiness, unstructured text, and search intent — without diagnosing or prescribing.
            </p>
          </div>

          <div className="space-y-6">
            
            {/* WORKFLOW 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="bg-teal-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                  Workflow 1
                </span>
                <h3 className="font-bold text-slate-900 text-base">Medical Report Simplifier</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700">1. Input</span>
                  <p className="text-slate-600">PDF or image of veterinary blood test or lab report.</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-teal-700">2. Processing</span>
                  <p className="text-slate-600">OCR document parsing → LLM-based summarization pipeline → Reference range check.</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700">3. Output</span>
                  <p className="text-slate-600">Important findings, medicines mentioned, out-of-range flags, and questions for vet.</p>
                </div>
              </div>
            </div>

            {/* WORKFLOW 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="bg-teal-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                  Workflow 2
                </span>
                <h3 className="font-bold text-slate-900 text-base">Natural Language Animal-Care Search</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700">1. User Query</span>
                  <p className="text-slate-600">"My dog has been vomiting since morning and I need a clinic nearby."</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-teal-700">2. Intent Extraction</span>
                  <p className="text-slate-600">Animal: Dog • Issue: Vomiting • Potential Urgency: Needs vet assessment • Required Service: Vet Clinic.</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700">3. Search Action</span>
                  <p className="text-slate-600">Retrieves relevant nearby clinics without diagnosing or recommending medical treatments.</p>
                </div>
              </div>
            </div>

            {/* WORKFLOW 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center space-x-2">
                <span className="bg-teal-600 text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                  Workflow 3
                </span>
                <h3 className="font-bold text-slate-900 text-base">Provider Information Structuring</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700">1. Messy Input</span>
                  <p className="text-slate-600">Unstructured clinic text: "We handle surgery, vaccination and emergency cases. Emergency available all night..."</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-teal-700">2. LLM Structuring</span>
                  <p className="text-slate-600">Converts messy text into structured fields: Services[], Availability: 24/7, Contact, Location.</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700">3. Platform Value</span>
                  <p className="text-slate-600">Reduces repetitive manual data entry and speeds up provider onboarding.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT 3: 5 INTEGRATIONS */}
      {activeTab === 'integrations' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-2xs">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
              <Globe className="w-5 h-5 text-teal-600" />
              <span>APIs & External Integrations Evaluation</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Clear distinction between current prototype mocks and proposed future integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>1. Google Maps API</span>
                </span>
                <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-2xs font-bold">Mock in Prototype</span>
              </div>
              <p className="text-slate-600">
                <strong>Purpose:</strong> Geolocation, distance calculation (in km), and directions.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Sparkles className="w-4 h-4 text-teal-600" />
                  <span>2. LLM API</span>
                </span>
                <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-2xs font-bold">Simulated in Prototype</span>
              </div>
              <p className="text-slate-600">
                <strong>Purpose:</strong> Natural-language search intent understanding and medical-document summarization.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Cpu className="w-4 h-4 text-teal-600" />
                  <span>3. OCR API / Service</span>
                </span>
                <span className="bg-teal-100 text-teal-800 px-2 py-0.5 rounded text-2xs font-bold">Simulated in Prototype</span>
              </div>
              <p className="text-slate-600">
                <strong>Purpose:</strong> Extracting text from scanned medical documents and prescriptions.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <span>4. WhatsApp / SMS Integration</span>
                </span>
                <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-2xs font-bold">Proposed Integration</span>
              </div>
              <p className="text-slate-600">
                <strong>Purpose:</strong> Notifications and communication between providers and pet parents.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 sm:col-span-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                  <Cloud className="w-4 h-4 text-teal-600" />
                  <span>5. Cloud Storage</span>
                </span>
                <span className="bg-slate-200 text-slate-700 px-2 py-0.5 rounded text-2xs font-bold">Proposed Integration</span>
              </div>
              <p className="text-slate-600">
                <strong>Purpose:</strong> Storing uploaded medical documents securely.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT 4: 30-DAY MVP & OUT OF SCOPE */}
      {activeTab === 'mvp-plan' && (
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-8 shadow-2xs">
          
          {/* 30-DAY PLAN */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <span>30-Day MVP Implementation Roadmap</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded text-2xs">
                  Week 1 — Understand & Design
                </span>
                <ul className="space-y-1 text-slate-600 list-disc pl-4">
                  <li>Define primary user</li>
                  <li>Finalise user journeys</li>
                  <li>Create initial provider data model</li>
                  <li>Design prototype</li>
                  <li>Collect sample provider data</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded text-2xs">
                  Week 2 — Discovery MVP
                </span>
                <ul className="space-y-1 text-slate-600 list-disc pl-4">
                  <li>Search & location engine</li>
                  <li>Service categories</li>
                  <li>Provider profiles</li>
                  <li>Basic filters</li>
                  <li>Emergency discovery</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded text-2xs">
                  Week 3 — AI MVP
                </span>
                <ul className="space-y-1 text-slate-600 list-disc pl-4">
                  <li>Report upload</li>
                  <li>OCR text extraction</li>
                  <li>AI summarisation</li>
                  <li>Natural-language care search</li>
                </ul>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded text-2xs">
                  Week 4 — Test & Improve
                </span>
                <ul className="space-y-1 text-slate-600 list-disc pl-4">
                  <li>Conduct usability testing with a small group of pet parents</li>
                  <li>Measure search success</li>
                  <li>Observe user confusion</li>
                  <li>Improve results and UX</li>
                </ul>
              </div>
            </div>
          </div>

          {/* DELIBERATELY OUT OF SCOPE */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Ban className="w-5 h-5 text-rose-600" />
              <h2 className="text-xl font-extrabold text-slate-900">Deliberately Out of Scope for V1</h2>
            </div>
            
            <p className="text-xs text-slate-600 italic">
              "I would rather make one core discovery journey reliable than build ten incomplete features."
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                "Payments",
                "Video consultations",
                "Full social/community platform",
                "Nationwide provider coverage",
                "AI diagnosis",
                "Automated treatment recommendations",
                "Complex ambulance dispatch",
                "Advanced appointment management",
                "Full pet health-record ecosystem"
              ].map((item, idx) => (
                <div key={idx} className="bg-rose-50/60 border border-rose-200/80 p-3 rounded-xl text-rose-950 font-medium flex items-center space-x-2">
                  <Ban className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
