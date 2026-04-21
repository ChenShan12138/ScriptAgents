import React from 'react';
import { useStore } from '../store';
import { CheckCircle, Copy, Play, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function Step4Output() {
  const { selectedKeywords, idea, directorId, team, directors, prevStep } = useStore();

  const director = directors.find(d => d.id === directorId);

  const scriptOutlineJSON = {
    keywords: selectedKeywords,
    generatedIdea: idea,
    targetAudience: "游戏二创爱好者",
    expectedDuration: "2-3分钟",
    plotStructure: [
      "开场白：利用热更梗吸引注意力",
      "起反转：主角看似牛逼实则憨憨",
      "高潮：大招失败，引发全场爆笑",
      "结尾：一句话总结，诱导三连"
    ]
  };

  const teamMetadataJSON = {
    director: director ? {
      name: director.name,
      title: director.title,
    } : null,
    teamMembers: team.map(m => ({
      role: m.role,
      name: m.name,
      title: m.title,
      params: m.configuredParams
    }))
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20">
      <div className="text-center space-y-3">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="w-20 h-20 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm"
        >
          <CheckCircle size={40} strokeWidth={3} />
        </motion.div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">编排完成，准备开拍！</h1>
        <p className="text-lg text-slate-500">以下是本次创作的剧本大纲结构与团队配置清单。</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Script Outline JSON */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-800">
          <div className="bg-slate-800/50 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <span className="text-slate-100 font-mono text-sm font-bold flex items-center gap-2">
              <span className="text-indigo-400">{}</span> script-outline.json
            </span>
            <button className="text-slate-400 hover:text-white transition-colors" title="Copy">
              <Copy size={16} />
            </button>
          </div>
          <div className="p-6 overflow-auto max-h-[500px]">
            <pre className="text-indigo-200 font-mono text-sm leading-relaxed">
              {JSON.stringify(scriptOutlineJSON, null, 2)}
            </pre>
          </div>
        </div>

        {/* Team JSON */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-800">
          <div className="bg-slate-800/50 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
            <span className="text-slate-100 font-mono text-sm font-bold flex items-center gap-2">
              <span className="text-sky-400">{}</span> team-manifest.json
            </span>
            <button className="text-slate-400 hover:text-white transition-colors" title="Copy">
              <Copy size={16} />
            </button>
          </div>
          <div className="p-6 overflow-auto max-h-[500px]">
            <pre className="text-sky-200 font-mono text-sm leading-relaxed">
              {JSON.stringify(teamMetadataJSON, null, 2)}
            </pre>
          </div>
        </div>

      </div>

      <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-200">
        <button 
          onClick={prevStep}
          className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-8 py-3 rounded-lg font-medium transition-all"
        >
          <ArrowLeft size={18} />
          返回上一步
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center gap-3">
          <Play fill="currentColor" />
          运行工作流
        </button>
      </div>

    </div>
  );
}
