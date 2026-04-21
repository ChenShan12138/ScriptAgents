import React, { useState } from 'react';
import { useStore } from '../store';
import { WordCloud } from './WordCloud';
import { Loader2, Sparkles, Upload } from 'lucide-react';
import { motion } from 'motion/react';

export function Step1Trends() {
  const { 
    trendingKeywords, 
    selectedKeywords, 
    toggleKeyword, 
    customKeyword, 
    setCustomKeyword, 
    addCustomKeyword,
    removeKeyword,
    nextStep,
    setIdea,
    setDirector
  } = useStore();

  const [isGenerating, setIsGenerating] = useState(false);

  const handleAutoCreate = () => {
    setIsGenerating(true);
    // Simulate LLM Call
    setTimeout(() => {
      // Pick random keywords if none selected
      if (selectedKeywords.length === 0) {
        const randoms = [...trendingKeywords].sort(() => 0.5 - Math.random()).slice(0, 3);
        randoms.forEach(k => toggleKeyword(k.text));
      }
      setIdea('在这个剧本中，游戏主角意外穿越到了现代都市，并且带着一身史诗级装备去打工，引发了一系列爆笑名场面...');
      setDirector('d1'); // Default to Comedy Director
      setIsGenerating(false);
      nextStep();
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">捕获全网热点，触发无限创意</h1>
        <p className="text-lg text-slate-500">点击词云选择近期爆款热词，或手动输入关键词作为创作灵感。</p>
      </div>

      <div className="w-full relative">
        <WordCloud 
          words={trendingKeywords} 
          selectedWords={selectedKeywords}
          onWordClick={toggleKeyword}
        />
        <button className="absolute top-4 right-4 flex items-center gap-2 text-sm text-slate-500 bg-white/80 hover:bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm transition-all">
          <Upload size={16} /> 用 JSON 导入数据
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCustomKeyword()}
            placeholder="输入您自己的创意关键词，回车添加..."
            className="flex-1 bg-white px-5 py-4 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-slate-200 transition-all font-medium"
          />
          <button 
            onClick={addCustomKeyword}
            disabled={!customKeyword.trim()}
            className="bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white px-8 py-4 rounded-lg font-bold transition-all shadow-sm"
          >
            添加
          </button>
        </div>

        {selectedKeywords.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {selectedKeywords.map(keyword => (
              <span key={keyword} className="inline-flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-sm font-semibold">
                {keyword}
                <button onClick={() => removeKeyword(keyword)} className="hover:text-indigo-900 ml-1 opacity-60 hover:opacity-100">&times;</button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl flex justify-between items-center bg-slate-50 border border-slate-200 p-6 rounded-2xl">
        <div className="flex-1">
          <h3 className="font-bold text-slate-900 mb-1">懒得想？让AI帮你</h3>
          <p className="text-slate-500 text-sm">自动选择热点、生成脑洞并挑选最适合的导演。</p>
        </div>
        <button 
          onClick={handleAutoCreate}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-all disabled:opacity-70"
        >
          {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
          一键AI自动创作
        </button>
      </div>

      <div className="flex justify-end w-full max-w-6xl mt-4">
         <button 
            onClick={nextStep}
            disabled={selectedKeywords.length === 0}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-medium shadow-sm transition-all"
          >
            下一步：选择导演
          </button>
      </div>

    </div>
  );
}
