
import React from 'react';
import { PlantInfo } from '../types';

interface DashboardProps {
  history: PlantInfo[];
  onNavigate: (view: 'dashboard' | 'identify' | 'chat') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ history, onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-emerald-900 rounded-[2.5rem] px-8 py-16 md:px-16 md:py-24 text-white shadow-2xl shadow-emerald-950/20 animate-fade-in">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 hidden lg:block pointer-events-none">
          <svg className="w-full h-full text-emerald-400" viewBox="0 0 200 200" fill="currentColor">
            <path d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.7,-31.4,87.1,-15.7,86.2,-0.5C85.3,14.7,80.1,29.4,72.4,43.2C64.7,57,54.5,69.9,41.4,77.2C28.3,84.5,12.3,86.2,-2.9,91.2C-18.1,96.2,-36.2,104.5,-51.7,100.2C-67.2,95.9,-80.1,79.1,-87.8,61.8C-95.5,44.5,-98,26.7,-98.6,8.9C-99.2,-8.9,-97.9,-26.7,-89.9,-41.8C-81.9,-56.9,-67.2,-69.3,-51.2,-75.4C-35.2,-81.5,-17.6,-81.3,-0.5,-80.4C16.6,-79.5,33.2,-78,44.7,-76.4Z" transform="translate(140 100)" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl text-center md:text-left">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold uppercase tracking-widest bg-emerald-800/50 backdrop-blur-sm rounded-full border border-emerald-700/50 text-emerald-100">
            Intelligent Plant Care
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-[1.1]">
            Grow your own <span className="text-emerald-400 italic">sanctuary.</span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 leading-relaxed mb-10 font-light max-w-lg">
            Identify thousands of plant species instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button 
              onClick={() => onNavigate('identify')}
              className="px-10 py-4 bg-white text-emerald-950 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
            >
              Start Identification
            </button>
            <button 
              onClick={() => onNavigate('chat')}
              className="px-10 py-4 bg-emerald-800/50 text-white border border-emerald-700 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-xl"
            >
              Ask an Expert
            </button>
          </div>
        </div>
        
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-800/20 blur-3xl rounded-full"></div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: '📸', title: 'Instant Scan', desc: 'Identify any plant with just a snap.', bg: 'bg-emerald-50' },
          { icon: '💬', title: 'Care Chat', desc: 'Get 24/7 answers for your garden needs.', bg: 'bg-orange-50' },
          { icon: '🧪', title: 'Soil Expert', desc: 'Learn the perfect nutrients for your greens.', bg: 'bg-blue-50' }
        ].map((feat, i) => (
          <div 
            key={i} 
            className={`${feat.bg} p-8 rounded-[2rem] border border-emerald-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up stagger-${i + 1}`}
          >
            <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{feat.icon}</div>
            <h3 className="text-xl font-bold text-emerald-950 mb-2 font-serif">{feat.title}</h3>
            <p className="text-emerald-800/70 text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* History / My Collection */}
      <section>
        <div className="flex items-center justify-between mb-8 px-4 animate-fade-in stagger-3">
          <div>
            <h2 className="text-3xl font-serif font-bold text-emerald-950">My Green Collection</h2>
            <p className="text-emerald-800/60 font-medium">Your recently scanned botanical findings.</p>
          </div>
          {history.length > 0 && (
             <span className="text-emerald-900 font-bold hover:underline cursor-pointer">Explore All</span>
          )}
        </div>

        {history.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-16 text-center border-2 border-dashed border-emerald-100 animate-slide-up stagger-4">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🌱</span>
            </div>
            <h3 className="text-xl font-bold text-emerald-950 mb-2 font-serif">Your garden is empty</h3>
            <p className="text-emerald-800/60 max-w-xs mx-auto mb-8 text-sm">Scan a plant to start building your personalized digital botanical encyclopedia.</p>
            <button 
              onClick={() => onNavigate('identify')}
              className="text-emerald-900 font-extrabold uppercase tracking-widest text-xs py-3 px-8 rounded-full bg-emerald-50 hover:bg-emerald-100 transition"
            >
              Add First Plant
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
            {history.map((plant, idx) => (
              <div 
                key={plant.id} 
                className={`group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-emerald-100/50 animate-slide-up stagger-${(idx % 5) + 1}`}
              >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={plant.image || 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=600&auto=format&fit=crop'} 
                    alt={plant.commonName} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  />
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-900 shadow-sm">
                      {plant.difficulty}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-emerald-950 mb-1 leading-tight">{plant.commonName}</h3>
                      <p className="text-sm text-emerald-600 italic font-medium">{plant.scientificName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 pt-6 border-t border-emerald-50">
                    <div className="flex flex-col">
                       <span className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-tighter">Sun</span>
                       <span className="text-sm font-bold text-emerald-900">{plant.care.sunlight.split(' ')[0]}</span>
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-tighter">Water</span>
                       <span className="text-sm font-bold text-emerald-900">{plant.care.watering.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Did you know section */}
      <section className="bg-terra-50 rounded-[2rem] p-12 flex flex-col md:flex-row items-center gap-12 border border-terra-100 animate-slide-up stagger-5">
        <div className="text-6xl animate-float">🪴</div>
        <div className="flex-1">
          <h3 className="text-2xl font-serif font-bold text-terra-700 mb-4">Did you know?</h3>
          <p className="text-terra-700/80 leading-relaxed font-medium">
            Some houseplants can live for over 100 years. With BloomBot, you can ensure your green roommates thrive for generations to come.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
