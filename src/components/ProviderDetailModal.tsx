import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Siren, 
  CheckCircle2, 
  Navigation, 
  UserCheck, 
  ShieldCheck,
  CalendarCheck,
  Send
} from 'lucide-react';
import { Provider } from '../types';

interface ProviderDetailModalProps {
  provider: Provider | null;
  onClose: () => void;
}

export const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({ provider, onClose }) => {
  const [requestState, setRequestState] = useState<'idle' | 'form' | 'submitted'>('idle');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Dog');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [callToast, setCallToast] = useState<string | null>(null);

  if (!provider) return null;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestState('submitted');
  };

  const handleCall = () => {
    setCallToast(`Calling ${provider.name} at ${provider.phone}...`);
    setTimeout(() => setCallToast(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      
      <div className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-slate-900/60 hover:bg-slate-900 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Call Toast Notification */}
        {callToast && (
          <div className="absolute top-4 left-4 right-16 z-20 bg-teal-900 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center space-x-2 text-xs border border-teal-700">
            <Phone className="w-4 h-4 text-teal-400 animate-bounce" />
            <span>{callToast}</span>
          </div>
        )}

        {/* Provider Banner Image */}
        <div className="relative h-56 sm:h-64 bg-slate-100">
          <img
            src={provider.image}
            alt={provider.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
          
          <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold bg-teal-600/90 text-white px-2.5 py-0.5 rounded-full border border-teal-400/30">
                {provider.category.toUpperCase()}
              </span>
              {provider.emergencyAvailable && (
                <span className="text-xs font-bold bg-rose-600 text-white px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                  <Siren className="w-3 h-3" />
                  <span>24/7 Emergency Available</span>
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {provider.name}
            </h2>
            <div className="flex items-center space-x-3 text-xs text-slate-200">
              <span className="flex items-center space-x-1 text-amber-300 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{provider.rating} ({provider.reviewsCount} reviews)</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{provider.distanceKm} km away ({provider.location})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">

          {requestState === 'submitted' ? (
            /* CONFIRMATION STATE */
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center space-y-4 my-4">
              <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-slate-900">Consultation Request Sent!</h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  <strong>{provider.name}</strong> has received your request for <strong>{petName || 'your pet'}</strong>. Their receptionist will call you shortly at <strong>{phone || 'your phone number'}</strong>.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-xl text-left border border-teal-100 text-xs space-y-1.5 text-slate-700">
                <p><strong>Provider:</strong> {provider.name}</p>
                <p><strong>Address:</strong> {provider.address}</p>
                <p><strong>Urgency:</strong> Routine Consultation</p>
              </div>

              <div className="pt-2 flex justify-center space-x-3">
                <button
                  onClick={() => setRequestState('idle')}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-2 rounded-xl text-xs"
                >
                  Back to Profile
                </button>
                <button
                  onClick={onClose}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2 rounded-xl text-xs"
                >
                  Done
                </button>
              </div>
            </div>
          ) : requestState === 'form' ? (
            /* CONSULTATION REQUEST FORM */
            <form onSubmit={handleFormSubmit} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Request Consultation</h3>
                  <p className="text-xs text-slate-500">Fast callback request — no advance payment required</p>
                </div>
                <button
                  type="button"
                  onClick={() => setRequestState('idle')}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pet Name</label>
                  <input
                    type="text"
                    required
                    value={petName}
                    onChange={(e) => setPetName(e.target.value)}
                    placeholder="e.g. Bruno"
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Animal Species</label>
                  <select
                    value={petType}
                    onChange={(e) => setPetType(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Stray / Rescued Animal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Your Mobile Number (India +91)</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Reason for Visit / Symptoms</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Routine vaccination checkup or lethargy..."
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </form>
          ) : (
            /* STANDARD PROVIDER DETAILS VIEW */
            <>
              {/* Description */}
              <p className="text-sm text-slate-700 leading-relaxed">
                {provider.description}
              </p>

              {/* Doctors & Staff */}
              {provider.doctors && provider.doctors.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Attending Veterinarians & Staff
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {provider.doctors.map((doc, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center text-xs bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 font-medium"
                      >
                        <UserCheck className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Services Available */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Services Offered
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {provider.services.map((srv, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-xs text-slate-800 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location & Hours Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-slate-900 font-bold text-xs">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    <span>Address</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {provider.address}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-slate-900 font-bold text-xs">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>Operating Hours</span>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold">
                    {provider.openStatus}
                  </p>
                  <p className="text-2xs text-slate-500">
                    Emergency triage open 24/7
                  </p>
                </div>
              </div>

              {/* Primary & Secondary Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setRequestState('form')}
                  className="w-full sm:flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-2xl text-sm transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Request Consultation</span>
                </button>

                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <button
                    onClick={handleCall}
                    className="flex-1 sm:flex-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3.5 px-5 rounded-2xl text-sm transition-colors border border-slate-200 flex items-center justify-center space-x-1.5"
                  >
                    <Phone className="w-4 h-4 text-teal-600" />
                    <span>Call</span>
                  </button>

                  <button
                    onClick={() => {
                      alert(`Directions trigger for GPS navigation to ${provider.address}`);
                    }}
                    className="flex-1 sm:flex-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3.5 px-5 rounded-2xl text-sm transition-colors border border-slate-200 flex items-center justify-center space-x-1.5"
                  >
                    <Navigation className="w-4 h-4 text-teal-600" />
                    <span>Directions</span>
                  </button>
                </div>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
