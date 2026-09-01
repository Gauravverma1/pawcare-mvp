export type CategoryType = 
  | 'all'
  | 'veterinarian'
  | 'clinic'
  | 'emergency'
  | 'ambulance'
  | 'ngo'
  | 'boarding';

export interface Provider {
  id: string;
  name: string;
  category: CategoryType;
  rating: number;
  reviewsCount: number;
  distanceKm: number;
  location: string;
  address: string;
  phone: string;
  emergencyAvailable: boolean;
  openStatus: string;
  open24Hours: boolean;
  services: string[];
  doctors?: string[];
  image: string;
  description: string;
  providerListed: boolean;
}

export interface SearchFilters {
  category: CategoryType;
  query: string;
  maxDistanceKm: number;
  openNowOnly: boolean;
  emergencyOnly: boolean;
}

export interface ConsultationRequest {
  providerId: string;
  providerName: string;
  petName: string;
  petSpecies: string;
  contactNumber: string;
  urgency: 'routine' | 'urgent' | 'emergency';
  notes: string;
}

export interface MedicalReportAnalysis {
  petName: string;
  species: string;
  reportType: string;
  reportDate: string;
  importantFindings: string[];
  medicinesMentioned: string[];
  outOfRangeValues: Array<{
    parameter: string;
    value: string;
    referenceRange: string;
    status: 'low' | 'high';
  }>;
  questionsForVet: string[];
  disclaimer: string;
}
