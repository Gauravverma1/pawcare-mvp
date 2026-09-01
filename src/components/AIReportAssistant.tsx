import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Pill, 
  Activity, 
  RefreshCw, 
  ShieldAlert,
  FileCheck
} from 'lucide-react';
import { MedicalReportAnalysis } from '../types';
import { MOCK_BRUNO_REPORT } from '../data/mockData';

export const AIReportAssistant: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [reportResult, setReportResult] = useState<MedicalReportAnalysis | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const simulateProcessing = () => {
    setIsProcessing(true);
    setReportResult(null);
    
    // Simulate OCR & LLM extraction pipeline delay
    setTimeout(() => {
      setIsProcessing(false);
      setReportResult(MOCK_BRUNO_REPORT);
    }, 1800);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    simulateProcessing();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-teal-50 text-teal-700 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-teal-200">
          <Sparkles className="w-4 h-4 text-teal-600" />
          <span>AI Medical Report Assistant</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Understand My Pet's Report
        </h1>

        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Upload a lab report or prescription and we'll help you understand the important information in simpler language.
        </p>
      </div>

      {/* Safety UX Disclaimer Banner */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5 text-amber-900 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm space-y-1">
          <p className="font-bold text-amber-950">
            Important Safety Note: AI-generated summary. This does not replace veterinary advice.
          </p>
          <p className="text-amber-800 leading-relaxed">
            PawCare AI only extracts and organizes text from documents to help you prepare for your vet consultation. It does NOT diagnose medical conditions, recommend treatment, or alter medications.
          </p>
        </div>
      </div>

      {/* UPLOAD & DEMO SECTION */}
      {!reportResult && !isProcessing && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Upload Dropzone */}
          <div className={`md:col-span-2 bg-white rounded-3xl border-2 border-dashed p-8 text-center space-y-4 transition-colors flex flex-col items-center justify-center min-h-[300px] ${
            dragActive ? 'border-teal-500 bg-teal-50/30' : 'border-slate-300 hover:border-teal-400'
          }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-100 shadow-2xs">
              <Upload className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Upload PDF or image</h3>
              <p className="text-xs text-slate-500 mt-1">
                Drag and drop blood tests, lab reports, or vet notes (PDF, JPG, PNG)
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <label className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all cursor-pointer shadow-xs">
                <span>Upload Report</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  className="hidden"
                  onChange={simulateProcessing}
                />
              </label>

              <button
                type="button"
                onClick={simulateProcessing}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold px-5 py-3 rounded-xl text-sm transition-colors border border-slate-300 flex items-center space-x-1.5 shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Try Sample Report (Bruno)</span>
              </button>
            </div>
          </div>

          {/* What AI Helps With */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-3 flex items-center space-x-2">
                <FileCheck className="w-4 h-4 text-teal-600" />
                <span>What AI Can Help With</span>
              </h3>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Important findings:</strong> Summarizes key findings mentioned in the text.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Medicines mentioned:</strong> Lists prescribed medications found in the report.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Reference-range flags:</strong> Highlights lab metrics above or below listed reference ranges.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span><strong>Smart vet questions:</strong> Generates relevant questions to ask your veterinarian.</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-2xs text-slate-500">
              ⚡ Powered by OCR document parsing + LLM-based summarization pipeline.
            </div>
          </div>

        </div>
      )}

      {/* PROCESSING STATE ANIMATION */}
      {isProcessing && (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto relative">
            <RefreshCw className="w-8 h-8 text-teal-600 animate-spin" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Parsing Report & Extracting Findings...</h3>
            <p className="text-xs text-slate-500 mt-1">
              OCR document parsing → LLM-based summarization pipeline → Safety validation
            </p>
          </div>
          
          <div className="max-w-md mx-auto bg-slate-100 rounded-full h-2 overflow-hidden">
            <div className="bg-teal-600 h-full w-3/4 animate-pulse rounded-full" />
          </div>
        </div>
      )}

      {/* AI SUMMARY REPORT RESULT */}
      {reportResult && (
        <div className="space-y-6">
          
          {/* Controls Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {reportResult.petName}'s {reportResult.reportType}
                </h3>
                <p className="text-xs text-slate-500">
                  Species: {reportResult.species} • Date: {reportResult.reportDate}
                </p>
              </div>
            </div>

            <button
              onClick={() => setReportResult(null)}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2 rounded-xl text-xs transition-colors border border-slate-200 flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Upload Another</span>
            </button>
          </div>

          {/* AI Summary Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 space-y-6 shadow-sm">
            
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center space-x-2 text-teal-700 font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>AI Summary</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                "Here are the main things I noticed in the report."
              </h2>
            </div>

            {/* 1. Important Findings */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <Activity className="w-4 h-4 text-teal-600" />
                <span>1. Important Findings</span>
              </h3>
              <div className="space-y-2">
                {reportResult.importantFindings.map((finding, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start space-x-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-600 mt-2 shrink-0" />
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Values Outside Reference Range */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>2. Values Outside Listed Reference Range</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {reportResult.outOfRangeValues.map((val, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      val.status === 'low' 
                        ? 'bg-amber-50/60 border-amber-200 text-amber-950' 
                        : 'bg-rose-50/60 border-rose-200 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs">{val.parameter}</span>
                      <span className={`text-2xs font-extrabold uppercase px-2 py-0.5 rounded-md ${
                        val.status === 'low' ? 'bg-amber-200 text-amber-900' : 'bg-rose-200 text-rose-900'
                      }`}>
                        Below/Above Range
                      </span>
                    </div>
                    <p className="text-lg font-black mt-1">{val.value}</p>
                    <p className="text-2xs text-slate-500 mt-1">Reference Range on Report: {val.referenceRange}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Medicines Mentioned */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <Pill className="w-4 h-4 text-indigo-600" />
                <span>3. Medicines Mentioned</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {reportResult.medicinesMentioned.map((med, idx) => (
                  <div
                    key={idx}
                    className="bg-indigo-50 text-indigo-900 border border-indigo-200 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2"
                  >
                    <Pill className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{med}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Questions for Veterinarian */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
                <HelpCircle className="w-4 h-4 text-teal-600" />
                <span>4. Questions to Discuss With Your Veterinarian</span>
              </h3>
              
              <div className="bg-teal-50/60 border border-teal-200/90 rounded-2xl p-4 sm:p-5 space-y-2.5">
                {reportResult.questionsForVet.map((q, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-800">
                    <span className="bg-teal-600 text-white font-bold w-5 h-5 rounded-full flex items-center justify-center text-2xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="font-medium">{q}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Footer Disclaimer */}
            <div className="pt-4 border-t border-slate-100 text-2xs text-slate-500 italic text-center">
              {reportResult.disclaimer}
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
