/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useStore } from './store';
import { Step1Trends } from './components/Step1Trends';
import { Step2Director } from './components/Step2Director';
import { Step3Team } from './components/Step3Team';
import { Step4Output } from './components/Step4Output';
import { SettingsModal } from './components/SettingsModal';
import { Camera, Clapperboard, Users, FileJson, Settings } from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { step, setSettingsOpen } = useStore();

  const STEPS = [
    { num: 1, title: '风向与灵感', icon: Camera },
    { num: 2, title: '挑选导演', icon: Clapperboard },
    { num: 3, title: '组建团队', icon: Users },
    { num: 4, title: '创意清单', icon: FileJson },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 text-slate-800">
      
      {/* Header & Stepper */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
              <Clapperboard size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              智能剧本创作平台
            </span>
          </div>

          <div className="flex items-center space-x-2 md:space-x-8">
            {STEPS.map((s, index) => {
              const isActive = step === s.num;
              const isPast = step > s.num;
              const Icon = s.icon;
              return (
                <div key={s.num} className="flex items-center">
                  <div className={cn(
                    "flex items-center gap-2 transition-all",
                    isActive ? "text-indigo-600" : isPast ? "text-slate-900" : "text-slate-400"
                  )}>
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                      isActive ? "bg-indigo-100 text-indigo-700" : isPast ? "bg-slate-100 text-slate-900" : "bg-slate-100 text-slate-400"
                    )}>
                      <Icon size={14} />
                    </div>
                    <span className={cn("hidden md:block text-sm font-bold", isActive ? "text-indigo-700" : "")}>
                      {s.title}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={cn(
                      "w-8 md:w-16 h-[2px] mx-2 md:mx-4 rounded-full transition-colors",
                      isPast ? "bg-slate-300" : "bg-slate-100"
                    )} />
                  )}
                </div>
              )
            })}
            
            <button 
              onClick={() => setSettingsOpen(true)}
              className="ml-4 p-2 text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-colors shrink-0"
              title="全局设置"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 py-12">
        {step === 1 && <Step1Trends />}
        {step === 2 && <Step2Director />}
        {step === 3 && <Step3Team />}
        {step === 4 && <Step4Output />}
      </main>

      <SettingsModal />

    </div>
  );
}
