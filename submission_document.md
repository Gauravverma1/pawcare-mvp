# PawCare — Animal-Care Discovery & AI Assistance MVP Proposal

> **Tagline**: *"Find the right care, when it matters."*  
> **Candidate Application**: Product & Technology Intern Screening Assignment  
> **Target Location**: Pune, Maharashtra (India Focus)  

---

## PAGE 1 — PRODUCT STRATEGY & CORE EXPERIENCE

### 1. Problem Statement
Pet parents and animal rescuers in India struggle to find timely, reliable animal care during routine checkups and urgent medical emergencies. Critical information regarding veterinarians, 24/7 emergency clinics, ambulances, and animal welfare NGOs is fragmented across Google Search, Instagram pages, WhatsApp groups, and word-of-mouth recommendations. When an animal is in distress, parents face decision paralysis and fragmented contact channels.

### 2. Target Users
* **Primary User**: Pet Parents (seeking verified nearby care, clear operating hours, and simple medical guidance).
* **Secondary User**: Animal Rescuers (needing instant access to 24/7 trauma centers, stray rescue NGOs, and animal ambulance dispatch contacts).
* **Future Users (V2+)**: Animal-care service providers (Veterinarians, Clinic Administrators, Boarding Facilities).

### 3. First Problem to Solve (MVP Scope)
> *"When my animal needs help, how can I quickly find the right nearby service and know what to do next?"*

Rather than attempting to digitize the entire veterinary ecosystem in V1, PawCare focuses strictly on **location-based discovery and actionable next steps**, reducing cognitive load and decision friction during high-stress moments.

### 4. Five Prioritized MVP Features
1. **Location-Based Animal-Care Discovery**: Radius-aware provider listing ("Care near Pune • Within 5 km").
2. **Search & Filtering**: Multi-criteria filter engine by distance (< 3km, < 5km, < 10km), Open Now status, service category, and emergency availability.
3. **Provider / Clinic Profiles**: Profiles showing listed credentials, attending doctors, service menus, operating hours, direct phone call triggers, and interactive consultation request modals.
4. **Emergency-Care Discovery**: Prominent emergency banner CTA ("Need emergency help?") prioritizing 24/7 trauma centers, critical care hospitals, and ambulances with direct "Call Now" and "Directions" actions.
5. **AI Medical-Report Assistant ("Understand My Pet's Report")**: OCR document parsing + LLM-based summarization pipeline that translates lab reports into plain-language findings, medicine lists, reference-range flags, and questions for the vet.

---

### 5. Core User Journeys & Flows

```
[Home Screen (Pune, MH)] ───► [Search & Discovery Results]
      │
      ├───► Click "Need Emergency Help?" ───► [Emergency Results: 24/7 Priority + Call Now / Directions]
      │
      ├───► Click "Report Assistant" ───► [AI Medical Report Assistant]
      │
      └───► Select Provider ───► [Provider Profile Details]
                                        │
                                        └───► Request Consultation ───► [Request Form & Callback Notice]
```

* **Safety UX Principle**: All AI-generated report summaries display explicit disclaimers: *"AI-generated summary. This does not replace veterinary advice."* AI assists, organizes, and extracts — it **never** diagnoses or prescribes.

---

## PAGE 2 — TECHNICAL ARCHITECTURE, AI & EXECUTION PLAN

### 6. Three Concrete AI Workflows

| AI Workflow | Input | Processing Pipeline | Output | Value Created |
| :--- | :--- | :--- | :--- | :--- |
| **1. Medical Report Simplifier** | PDF or image of veterinary blood test | OCR Document Parsing → LLM-based Summarization Pipeline → Reference Range Check | Important findings, medicines mentioned, reference-range flags, questions for vet | Removes pet parent anxiety & prepares them for vet consultation. |
| **2. Natural Language Care Search** | Unstructured query: *"My dog has been vomiting since morning..."* | Intent & Entity Parser (Animal: Dog, Issue: Vomiting, Potential Urgency: Assessment needed) | Mapped search results prioritizing nearby clinics | Replaces complex manual filter selection with plain conversational text without diagnosing. |
| **3. Provider Information Structuring** | Messy text from clinics or NGOs | LLM Schema Extractor → Standardized Field Mapping | Structured fields (Services[], Availability: 24/7, Contact, Location) | Reduces repetitive manual data entry and speeds up provider onboarding. |

---

### 7. Technology Architecture

```
User (Web / Mobile Browser)
  ↓
React + TypeScript + Vite + Tailwind CSS (Frontend Client)
  ↓ REST API
Node.js + Express REST API Gateway
  ↓ Spatial Queries (PostGIS)
PostgreSQL Database (Providers | Services | Locations | Operating Hours | Report Metadata)
  ↓ Async Queue
AI Processing Layer (OCR Document Parsing + LLM API)
```

### 8. API & Integration Evaluation

1. **Google Maps API**: Geolocation, distance calculation (in km), and directions *(Mock in prototype)*.
2. **LLM API**: Natural-language search intent understanding and medical-document summarization *(Simulated in prototype)*.
3. **OCR API / Service**: Extracting text from scanned medical documents and prescriptions *(Simulated in prototype)*.
4. **WhatsApp / SMS Integration**: Notifications and communication between providers and pet parents *(Proposed integration)*.
5. **Cloud Storage**: Storing uploaded medical documents securely *(Proposed integration)*.

---

### 9. 30-Day MVP Implementation Plan

* **Week 1 — Understand & Design**: Define primary user, finalise user journeys, create initial provider data model, design prototype, collect sample provider data.
* **Week 2 — Discovery MVP**: Search & location engine, service categories, provider profiles, basic filters, emergency discovery.
* **Week 3 — AI MVP**: Report upload, OCR text extraction, AI summarisation, natural-language care search.
* **Week 4 — Test & Improve**: Conduct usability testing with a small group of pet parents, measure search success, observe user confusion, improve results and UX.

---

### 10. Deliberately Out of Scope for V1 Rationale
*"I would rather make one core discovery journey reliable than build ten incomplete features."*
* **Excluded Features**: Payments, video consultations, full social/community platform, nationwide provider coverage, AI diagnosis, automated treatment recommendations, complex ambulance dispatch, advanced appointment management, full pet health-record ecosystem.

---

### 11. Tools & Platforms Used
* **Antigravity IDE**: Full-stack prototype development, component architecture, and automated verification.
* **React + TypeScript + Vite**: Fast, type-safe web application framework.
* **Tailwind CSS**: Modern healthcare-inspired design system styling.
* **Lucide Icons**: Modern vector icon set.
* **ChatGPT / Gemini**: Product ideation, UX copy refining, and technical exploration.
