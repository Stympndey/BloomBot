
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import PlantAnalyzer from './components/PlantAnalyzer';
import ChatInterface from './components/ChatInterface';
import { PlantInfo } from './types';

type View = 'dashboard' | 'identify' | 'chat';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [history, setHistory] = useState<PlantInfo[]>([]);

  const addToHistory = (plant: PlantInfo) => {
    setHistory(prev => [plant, ...prev.slice(0, 9)]);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard history={history} onNavigate={setCurrentView} />;
      case 'identify':
        return <PlantAnalyzer onResult={addToHistory} />;
      case 'chat':
        return <ChatInterface />;
      default:
        return <Dashboard history={history} onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center space-x-3 hover:opacity-90 transition group"
            >
              <div className="w-10 h-10 bg-emerald-900 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-emerald-900/20">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <span className="text-2xl font-extrabold text-emerald-950 tracking-tight font-serif">BloomBot</span>
            </button>
            <nav className="flex items-center space-x-1 sm:space-x-8">
              <button 
                onClick={() => setCurrentView('identify')}
                className={`px-4 py-2 text-sm font-bold transition-all rounded-xl ${currentView === 'identify' ? 'bg-emerald-900 text-white shadow-md' : 'text-emerald-900 hover:bg-emerald-50'}`}
              >
                Scan Plant
              </button>
              <button 
                onClick={() => setCurrentView('chat')}
                className={`px-4 py-2 text-sm font-bold transition-all rounded-xl ${currentView === 'chat' ? 'bg-emerald-900 text-white shadow-md' : 'text-emerald-900 hover:bg-emerald-50'}`}
              >
                AI Expert
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {renderView()}
      </main>

      <footer className="bg-emerald-950 text-emerald-200 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-emerald-900/50 pb-12 mb-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-serif font-bold text-white mb-2">BloomBot</h2>
            <p className="text-sm text-emerald-400">Your intelligent botanical companion for a greener home.</p>
          </div>
          <div className="flex justify-center space-x-6">
            <button onClick={() => setCurrentView('dashboard')} className="hover:text-white transition">Home</button>
            <button onClick={() => setCurrentView('identify')} className="hover:text-white transition">Scanner</button>
            <button onClick={() => setCurrentView('chat')} className="hover:text-white transition">Expert Chat</button>
          </div>
          <div className="text-center md:text-right">
             <div className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-2">Created By</div>
             <span className="text-lg font-bold text-white">@notsatyamm</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center text-emerald-500 text-xs font-medium">
          &copy; {new Date().getFullYear()} BloomBot AI. Crafted for nature lovers.
        </div>
      </footer>
    </div>
  );
};

export default App;
