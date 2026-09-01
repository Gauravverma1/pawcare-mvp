import React, { useState } from 'react';
import { 
  Search, 
  AlertCircle, 
  Stethoscope, 
  Building2, 
  Siren, 
  Truck, 
  HeartHandshake, 
  Home, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Clock,
  Star
} from 'lucide-react';
import { CategoryType, Provider } from '../types';

interface HomeScreenProps {
  onSearchSubmit: (query: string, category: CategoryType) => void;
  onSelectCategory: (category: CategoryType) => void;
  onEmergencyClick: () => void;
  onOpenAiReport: () => void;
  onViewProviderDetail: (provider: Provider) => void;
  providers: Provider[];
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSearchSubmit,
  onSelectCategory,
  onEmergencyClick,
  onOpenAiReport,
  onViewProviderDetail,
  providers
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(searchQuery, 'all');
  };

  const sampleNlQueries = [
    "My dog has been vomiting since morning and I need a clinic nearby",
    "24/7 emergency vet for cat injury in Pune",
    "Animal rescue NGO for stray dog near Koregaon Park"
  ];

  const categories = [
    {
      id: 'veterinarian' as CategoryType,
      label: 'Veterinarian',
      description: 'Consultations, routine checkups & expert care',
      icon: Stethoscope,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      id: 'clinic' as CategoryType,
      label: 'Clinic & Hospital',
      description: 'Multispecialty centers with diagnostic labs',
      icon: Building2,
      color: 'bg-teal-50 text-teal-600 border-teal-200'
    },
    {
      id: 'emergency' as CategoryType,
      label: 'Emergency',
      description: '24/7 critical trauma & urgent care centers',
      icon: Siren,
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    },
    {
      id: 'ambulance' as CategoryType,
      label: 'Ambulance',
      description: 'Oxygen-equipped transport for pets',
      icon: Truck,
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      id: 'ngo' as CategoryType,
      label: 'NGO / Rescue',
      description: 'Animal welfare, stray rescue & adoptions',
      icon: HeartHandshake,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      id: 'boarding' as CategoryType,
      label: 'Boarding',
      description: 'Safe daycare & overnight stays',
      icon: Home,
      color: 'bg-sky-50 text-sky-600 border-sky-200'
    }
  ];

  return (
    <div className="space-y-10 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900/5 via-white to-slate-50 border-b border-slate-200/60 pt-10 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center space-x-2 bg-teal-100/80 text-teal-800 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-teal-200 shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            <span>Care near Pune</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Find the right care for your animal.
          </h1>
          
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Vets, clinics, emergency care and animal services — all in one place.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto relative mt-4">
            <div className="relative flex items-center shadow-lg rounded-2xl bg-white border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500 transition-all">
              <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vets, clinics, ambulance, NGOs..."
                className="w-full py-4 px-4 text-slate-800 placeholder-slate-400 text-sm sm:text-base outline-none bg-transparent"
              />
              <button
                type="submit"
                className="mr-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors shrink-0 shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Natural Language Prompt Chips */}
          <div className="pt-2 text-xs text-slate-500 space-y-2">
            <span className="font-medium text-slate-600">Try natural language search:</span>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {sampleNlQueries.map((query, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(query);
                    onSearchSubmit(query, 'all');
                  }}
                  className="bg-white hover:bg-slate-100 text-slate-700 hover:text-teal-700 border border-slate-200 px-3 py-1.5 rounded-full transition-all text-xs text-left shadow-2xs"
                >
                  "{query}"
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* PROMINENT EMERGENCY BANNER */}
        <section className="bg-gradient-to-r from-rose-600 to-rose-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-rose-900/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-2 text-center md:text-left z-10">
            <div className="inline-flex items-center space-x-2 bg-rose-500/40 text-white px-3 py-1 rounded-full text-xs font-semibold border border-rose-400/30">
              <AlertCircle className="w-4 h-4 animate-pulse" />
              <span>Urgent Assistance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Need emergency help?</h2>
            <p className="text-rose-100 text-sm sm:text-base max-w-xl">
              Locate 24/7 veterinary trauma centers, urgent surgery facilities, and animal ambulances instantly.
            </p>
          </div>

          <button
            onClick={onEmergencyClick}
            className="z-10 bg-white text-rose-700 hover:bg-rose-50 font-bold px-6 py-3.5 rounded-2xl text-sm sm:text-base transition-all shadow-md hover:shadow-lg shrink-0 flex items-center space-x-2"
          >
            <Siren className="w-5 h-5 text-rose-600" />
            <span>Find Emergency Care</span>
          </button>
        </section>

        {/* SERVICE CATEGORIES GRID */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Explore Services</h2>
              <p className="text-slate-500 text-sm">Select a category to view nearby animal-care providers in Pune</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="group bg-white hover:bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 hover:border-teal-300 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between space-y-4"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${cat.color} transition-transform group-hover:scale-105`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* AI REPORT ASSISTANT HIGHLIGHT BANNER */}
        <section className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-teal-800/60 text-teal-200 px-3 py-1 rounded-full text-xs font-semibold border border-teal-700/50">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>AI Feature Highlight</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Understand My Pet's Medical Report
            </h2>
            <p className="text-teal-100 text-sm sm:text-base max-w-2xl leading-relaxed">
              Upload a lab test or vet report. AI extracts lab values, medicines mentioned, and prepares smart questions for your vet — in simple language.
            </p>
          </div>

          <button
            onClick={onOpenAiReport}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3.5 rounded-2xl text-sm sm:text-base transition-all shadow-md shrink-0 flex items-center space-x-2"
          >
            <span>Try AI Report Assistant</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>

        {/* FEATURED PROVIDERS NEAR PUNE */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Featured Providers Near Pune</h2>
              <p className="text-slate-500 text-sm">Animal-care providers listed near central Pune</p>
            </div>
            <button
              onClick={() => onSelectCategory('all')}
              className="text-sm font-semibold text-teal-700 hover:text-teal-800 flex items-center space-x-1"
            >
              <span>View all</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {providers.slice(0, 3).map((provider) => (
              <div
                key={provider.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {provider.emergencyAvailable && (
                      <span className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs flex items-center space-x-1">
                        <Siren className="w-3 h-3" />
                        <span>24/7 Emergency</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-bold text-slate-900 text-base leading-snug">
                        {provider.name}
                      </h3>
                      <div className="flex items-center space-x-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-200">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{provider.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-xs text-slate-500 space-x-3">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-teal-600" />
                        <span>{provider.location} • {provider.distanceKm} km</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{provider.openStatus}</span>
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {provider.services.slice(0, 3).map((srv, i) => (
                        <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md">
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onViewProviderDetail(provider)}
                    className="w-full bg-slate-50 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors border border-slate-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
