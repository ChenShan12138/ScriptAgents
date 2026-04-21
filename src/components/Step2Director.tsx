import React from 'react';
import { useStore } from '../store';
import { AgentCard } from './AgentCard';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function Step2Director() {
  const { directorId, setDirector, nextStep, prevStep, idea, selectedKeywords, directors } = useStore();

  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
      
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">选择您的王牌导演</h1>
        <p className="text-lg text-slate-500">导演将决定整个作品的调性、风格以及后续团队的组建方向。</p>
      </div>

      {idea && (
        <div className="w-full max-w-4xl bg-white/80 backdrop-blur-md border border-slate-200 p-6 rounded-2xl relative shadow-sm">
          <div className="absolute top-0 right-8 transform -translate-y-1/2 px-4 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full shadow-sm">
            AI 脑洞预览
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {selectedKeywords.map(k => (
              <span key={k} className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md border border-indigo-100">#{k}</span>
            ))}
          </div>
          <p className="text-slate-700 font-medium leading-relaxed">
            {idea}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-4">
        {directors.map(director => (
          <AgentCard
            key={director.id}
            agent={director}
            isSelected={directorId === director.id}
            onClick={() => setDirector(director.id)}
          />
        ))}
      </div>

      <div className="flex justify-between w-full max-w-7xl px-4 mt-8 pt-8 border-t border-slate-200">
        <button 
          onClick={prevStep}
          className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-8 py-3 rounded-lg font-medium transition-all"
        >
          <ArrowLeft size={18} />
          上一步
        </button>
        <button 
          onClick={nextStep}
          disabled={!directorId}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:shadow-none text-white px-8 py-3 rounded-lg font-medium shadow-sm transition-all"
        >
          确认导演并组建团队
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
