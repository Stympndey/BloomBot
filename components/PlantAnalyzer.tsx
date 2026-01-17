
import React, { useState, useRef } from 'react';
import { analyzePlantImage } from '../services/geminiService';
import { PlantInfo } from '../types';

interface PlantAnalyzerProps {
  onResult: (plant: PlantInfo) => void;
}

const PlantAnalyzer: React.FC<PlantAnalyzerProps> = ({ onResult }) => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlantInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = (reader.result as string).split(',')[1];
        setImage(reader.result as string);
        processImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await analyzePlantImage(base64);
      setResult(data);
      onResult(data);
    } catch (err) {
      setError("Failed to analyze image. Please try again with a clearer photo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-emerald-100 overflow-hidden">
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-emerald-950 mb-2">Botanical Scanner</h2>
          <p className="text-emerald-700/60 font-medium">Snap a photo and uncover the secrets of any plant.</p>
        </div>
        
        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-emerald-200 bg-emerald-50/30 rounded-[2rem] h-96 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 hover:border-emerald-400 transition-all group"
          >
            <div className="w-20 h-20 bg-white shadow-xl shadow-emerald-900/10 rounded-[2rem] flex items-center justify-center mb-6 transition group-hover:scale-110">
              <svg className="w-10 h-10 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-emerald-900 font-bold text-lg">Upload or Capture</p>
            <p className="text-sm text-emerald-700/50 mt-2 font-medium">Click to pick a photo from your gallery</p>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
            />
          </div>
        ) : (
          <div className="space-y-10">
            <div className="relative rounded-[2rem] overflow-hidden h-80 bg-emerald-50 border border-emerald-100">
              <img src={image} alt="Target" className="w-full h-full object-contain" />
              <button 
                onClick={() => { setImage(null); setResult(null); }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur shadow-xl rounded-full p-3 hover:bg-white text-emerald-900 hover:rotate-90 transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {loading && (
              <div className="flex flex-col items-center py-12">
                <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-900 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-serif font-bold text-emerald-900">BloomBot is Thinking...</h3>
                <p className="text-emerald-700/60 font-medium">Analyzing leaf patterns and botanical traits.</p>
              </div>
            )}

            {error && (
              <div className="p-6 bg-red-50 text-red-600 rounded-[1.5rem] text-center font-bold border border-red-100 shadow-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="animate-fade-in space-y-12">
                <header className="border-b border-emerald-100 pb-8 text-center md:text-left">
                  <div className="inline-block px-4 py-1.5 mb-4 text-[10px] font-black uppercase tracking-widest bg-emerald-900 text-white rounded-full">
                    {result.difficulty} Difficulty
                  </div>
                  <h1 className="text-5xl font-serif font-bold text-emerald-950 mb-2">{result.commonName}</h1>
                  <p className="text-2xl text-emerald-600 italic font-medium">{result.scientificName}</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-serif font-bold text-emerald-950 mb-4 flex items-center gap-3">
                        <span className="w-3 h-8 bg-emerald-900 rounded-full"></span>
                        Story & Origin
                      </h3>
                      <p className="text-emerald-900/70 leading-relaxed text-lg">{result.description}</p>
                    </div>
                    <div className="bg-emerald-50/50 p-6 rounded-[1.5rem] border border-emerald-100">
                      <span className="text-xs font-black text-emerald-900/40 uppercase tracking-widest">Natural Habitat</span>
                      <p className="text-emerald-900 font-bold text-lg mt-1">{result.origin}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-xl font-serif font-bold text-emerald-950 mb-4 flex items-center gap-3">
                      <span className="w-3 h-8 bg-terra-500 rounded-full"></span>
                      Care Instruction
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <CareItem icon="💧" label="Watering" value={result.care.watering} />
                      <CareItem icon="☀️" label="Sunlight" value={result.care.sunlight} />
                      <CareItem icon="🌱" label="Soil Type" value={result.care.soil} />
                      <CareItem icon="🧪" label="Fertilizer" value={result.care.fertilizer} />
                      <CareItem icon="🐾" label="Pet Safety" value={result.care.toxicity} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CareItem: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-5 p-5 bg-white border border-emerald-50 rounded-[1.5rem] hover:shadow-md transition group">
    <span className="text-2xl bg-emerald-50 shadow-inner w-14 h-14 flex items-center justify-center rounded-2xl group-hover:scale-110 transition">{icon}</span>
    <div className="flex-1">
      <span className="text-[10px] font-black text-emerald-800/30 uppercase tracking-widest">{label}</span>
      <p className="text-emerald-950 font-bold text-sm leading-snug mt-1">{value}</p>
    </div>
  </div>
);

export default PlantAnalyzer;
