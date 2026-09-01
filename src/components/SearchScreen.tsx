import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Star, 
  Clock, 
  Siren, 
  Filter, 
  Check, 
  Navigation, 
  ShieldCheck,
  AlertCircle,
  Phone,
  Sparkles
} from 'lucide-react';
import { CategoryType, Provider, SearchFilters } from '../types';

interface SearchScreenProps {
  providers: Provider[];
  initialFilters: SearchFilters;
  onViewProviderDetail: (provider: Provider) => void;
  onEmergencyFilterToggle: () => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  providers,
  initialFilters,
  onViewProviderDetail,
  onEmergencyFilterToggle
}) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [directionToast, setDirectionToast] = useState<string | null>(null);
  const [callToast, setCallToast] = useState<string | null>(null);

  // Sync initial filters
  React.useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Filter & sorting logic with Natural Language Intent Parsing
  const filteredProviders = useMemo(() => {
    return providers.filter((provider) => {
      
      // Query filter (Smart Natural Language Intent Parser)
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase().trim();
        
        // 1. Exact or partial substring match
        const matchesName = provider.name.toLowerCase().includes(q);
        const matchesServices = provider.services.some(s => s.toLowerCase().includes(q));
        const matchesLoc = provider.location.toLowerCase().includes(q) || provider.address.toLowerCase().includes(q);
        const matchesDesc = provider.description.toLowerCase().includes(q);

        if (!matchesName && !matchesServices && !matchesLoc && !matchesDesc) {
          // 2. Tokenize & extract key intent terms for natural language sentences
          const words = q.split(/\s+/).filter(w => w.length > 2);
          const stopWords = ['the', 'and', 'for', 'has', 'been', 'since', 'morning', 'need', 'near', 'nearby', 'with', 'this', 'that', 'you', 'from', 'some'];
          const keyWords = words.filter(w => !stopWords.includes(w));

          if (keyWords.length > 0) {
            const hasKeywordMatch = keyWords.some(word => {
              const inName = provider.name.toLowerCase().includes(word);
              const inCategory = provider.category.toLowerCase().includes(word);
              const inServices = provider.services.some(s => s.toLowerCase().includes(word));
              const inLocation = provider.location.toLowerCase().includes(word) || provider.address.toLowerCase().includes(word);
              const inDesc = provider.description.toLowerCase().includes(word);
              const inDoctors = provider.doctors?.some(d => d.toLowerCase().includes(word));
              
              // Smart Intent Aliases
              const isEmergIntent = (word === 'emergency' || word === '24/7' || word === 'urgent' || word === 'vomiting' || word === 'injury') && provider.emergencyAvailable;
              const isNgoIntent = (word === 'ngo' || word === 'rescue' || word === 'stray') && provider.category === 'ngo';
              const isClinicIntent = (word === 'clinic' || word === 'hospital' || word === 'vet' || word === 'doctor') && (provider.category === 'clinic' || provider.category === 'veterinarian');
              const isAmbulanceIntent = (word === 'ambulance' || word === 'transport') && provider.category === 'ambulance';

              return inName || inCategory || inServices || inLocation || inDesc || inDoctors || isEmergIntent || isNgoIntent || isClinicIntent || isAmbulanceIntent;
            });

            if (!hasKeywordMatch) return false;
          } else {
            return false;
          }
        }
      }

      // Category filter (if not overridden by NL query context)
      if (filters.category !== 'all') {
        if (filters.category === 'emergency') {
          if (!provider.emergencyAvailable) return false;
        } else if (provider.category !== filters.category) {
          return false;
        }
      }

      // Emergency filter
      if (filters.emergencyOnly && !provider.emergencyAvailable) {
        return false;
      }

      // Open now filter
      if (filters.openNowOnly && !provider.open24Hours && !provider.openStatus.toLowerCase().includes('open until')) {
        return false;
      }

      // Distance filter (allow radius up to maxDistanceKm)
      if (provider.distanceKm > filters.maxDistanceKm) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.emergencyOnly) {
        if (a.emergencyAvailable && !b.emergencyAvailable) return -1;
        if (!a.emergencyAvailable && b.emergencyAvailable) return 1;
      }
      return a.distanceKm - b.distanceKm;
    });
  }, [providers, filters]);

  const triggerDirections = (providerName: string) => {
    setDirectionToast(`Opening GPS directions to ${providerName}...`);
    setTimeout(() => setDirectionToast(null), 3000);
  };

  const triggerCall = (providerName: string, phone: string) => {
    setCallToast(`Calling ${providerName} (${phone})...`);
    setTimeout(() => setCallToast(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header & Location Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md w-fit border border-teal-200">
              <MapPin className="w-3.5 h-3.5" />
              <span>Pune • Within {filters.maxDistanceKm} km</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              {filters.emergencyOnly ? '24/7 Emergency Animal Care Near You' : 'Veterinary Care Near You'}
            </h1>
            <p className="text-sm text-slate-500">
              Showing {filteredProviders.length} animal-care providers in Pune
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              placeholder="Filter by name, symptom, or service..."
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        {/* Natural Language Intent Context Chip if query active */}
        {filters.query && (
          <div className="bg-teal-50/80 border border-teal-200 rounded-xl p-3 flex items-center justify-between text-xs text-teal-900">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Natural language query parsed: <strong>"{filters.query}"</strong></span>
            </div>
            <button
              onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
              className="text-2xs bg-white text-slate-700 hover:bg-slate-100 px-2 py-1 rounded-md border border-slate-200 font-semibold"
            >
              Clear Search Query
            </button>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          
          <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </span>

          {/* Category Dropdown */}
          <select
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value as CategoryType }))}
            className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-medium outline-none"
          >
            <option value="all">All Categories</option>
            <option value="veterinarian">Veterinarian</option>
            <option value="clinic">Clinic & Hospital</option>
            <option value="emergency">Emergency Care</option>
            <option value="ambulance">Ambulance</option>
            <option value="ngo">NGO / Rescue</option>
            <option value="boarding">Boarding</option>
          </select>

          {/* Emergency 24/7 Filter Toggle */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, emergencyOnly: !prev.emergencyOnly }))}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              filters.emergencyOnly
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Siren className="w-3.5 h-3.5" />
            <span>Emergency 24/7 Only</span>
            {filters.emergencyOnly && <Check className="w-3 h-3 ml-1" />}
          </button>

          {/* Open Now Toggle */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, openNowOnly: !prev.openNowOnly }))}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              filters.openNowOnly
                ? 'bg-teal-700 text-white border-teal-700'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Open Now</span>
            {filters.openNowOnly && <Check className="w-3 h-3 ml-1" />}
          </button>

          {/* Distance Filter */}
          <select
            value={filters.maxDistanceKm}
            onChange={(e) => setFilters(prev => ({ ...prev, maxDistanceKm: Number(e.target.value) }))}
            className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 font-medium outline-none"
          >
            <option value={3}>Distance: &lt; 3 km</option>
            <option value={5}>Distance: &lt; 5 km</option>
            <option value={10}>Distance: &lt; 10 km</option>
          </select>

          {/* Clear Filters button */}
          {(filters.emergencyOnly || filters.openNowOnly || filters.category !== 'all' || filters.query) && (
            <button
              onClick={() => setFilters({ category: 'all', query: '', maxDistanceKm: 10, openNowOnly: false, emergencyOnly: false })}
              className="text-xs text-rose-600 hover:underline font-medium ml-auto"
            >
              Reset filters
            </button>
          )}

        </div>
      </div>

      {/* Direction & Call Notification Toasts */}
      {directionToast && (
        <div className="bg-teal-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between border border-teal-700">
          <div className="flex items-center space-x-2 text-sm">
            <Navigation className="w-4 h-4 text-teal-400 animate-spin" />
            <span>{directionToast}</span>
          </div>
          <span className="text-xs bg-teal-800 text-teal-200 px-2 py-0.5 rounded">Mock Navigation</span>
        </div>
      )}

      {callToast && (
        <div className="bg-rose-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center justify-between border border-rose-700">
          <div className="flex items-center space-x-2 text-sm">
            <Phone className="w-4 h-4 text-rose-400 animate-bounce" />
            <span>{callToast}</span>
          </div>
          <span className="text-xs bg-rose-800 text-rose-200 px-2 py-0.5 rounded">Direct Call</span>
        </div>
      )}

      {/* PROVIDER CARDS LIST */}
      <div className="space-y-4">
        {filteredProviders.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">No providers matched your search query</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try broadening your natural language terms or resetting the search filters.
            </p>
            <button
              onClick={() => setFilters({ category: 'all', query: '', maxDistanceKm: 10, openNowOnly: false, emergencyOnly: false })}
              className="bg-teal-600 text-white font-semibold px-4 py-2 rounded-xl text-sm mt-2"
            >
              Reset Search & Show All Providers
            </button>
          </div>
        ) : (
          filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className={`bg-white rounded-2xl border transition-all p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                filters.emergencyOnly 
                  ? 'border-rose-200 shadow-sm bg-gradient-to-r from-rose-50/20 to-white' 
                  : 'border-slate-200/90 shadow-2xs hover:shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 w-full md:w-auto">
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="w-full sm:w-28 h-28 rounded-xl object-cover border border-slate-200 shrink-0"
                />

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 hover:text-teal-700 transition-colors">
                      {provider.name}
                    </h3>
                    
                    {provider.providerListed && (
                      <span className="inline-flex items-center text-xs text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 mr-1 text-teal-600" />
                        Provider Listed
                      </span>
                    )}

                    {provider.emergencyAvailable && (
                      <span className="inline-flex items-center text-xs text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 font-semibold">
                        <Siren className="w-3 h-3 mr-1 text-rose-600 animate-pulse" />
                        24/7 Emergency
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center text-xs text-slate-600 gap-y-1 gap-x-4">
                    <div className="flex items-center space-x-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{provider.rating} ({provider.reviewsCount} reviews)</span>
                    </div>

                    <span className="flex items-center space-x-1 text-slate-600 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-teal-600" />
                      <span>{provider.distanceKm} km away • {provider.location}</span>
                    </span>

                    <span className="flex items-center space-x-1 text-slate-600 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className={provider.open24Hours ? 'text-teal-700 font-bold' : ''}>
                        {provider.openStatus}
                      </span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 max-w-xl">
                    {provider.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {provider.services.map((srv, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row md:flex-col items-center gap-2.5 w-full md:w-44 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                {filters.emergencyOnly ? (
                  <>
                    <button
                      onClick={() => triggerCall(provider.name, provider.phone)}
                      className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center space-x-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 animate-pulse" />
                      <span>Call Now</span>
                    </button>
                    
                    <button
                      onClick={() => triggerDirections(provider.name)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 border border-slate-200"
                    >
                      <Navigation className="w-3.5 h-3.5 text-teal-600" />
                      <span>Directions</span>
                    </button>

                    <button
                      onClick={() => onViewProviderDetail(provider)}
                      className="w-full text-slate-600 hover:text-slate-900 font-medium text-xs py-1"
                    >
                      View Details
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onViewProviderDetail(provider)}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-xs"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => triggerDirections(provider.name)}
                      className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 border border-slate-200"
                    >
                      <Navigation className="w-3.5 h-3.5 text-teal-600" />
                      <span>Directions</span>
                    </button>
                  </>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
