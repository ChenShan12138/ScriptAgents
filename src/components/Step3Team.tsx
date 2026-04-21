import React, { useState } from 'react';
import { useStore, AgentRole, Agent } from '../store';
import { AgentCard } from './AgentCard';
import { ArrowLeft, Trash2, CheckCircle2, UserPlus, Settings2, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const TABS: { id: AgentRole | 'all'; label: string }[] = [
  { id: 'all', label: '全部' },
  { id: 'writer', label: '编剧' },
  { id: 'cinematographer', label: '摄像师' },
  { id: 'voice', label: '配音导演' },
  { id: 'editor', label: '剪辑师' }
];

export function Step3Team() {
  const { 
    directorId, 
    team, 
    addTeamMember, 
    removeTeamMember, 
    updateTeamMemberParams, 
    nextStep, 
    prevStep,
    directors,
    availableAgents
  } = useStore();
  
  const [activeTab, setActiveTab] = useState<AgentRole | 'all'>('all');
  const [editingInstance, setEditingInstance] = useState<string | null>(null);

  const director = directors.find(d => d.id === directorId);

  const availableAgentsFiltered = availableAgents.filter(agent => activeTab === 'all' || agent.role === activeTab);

  const getTeamCount = (agentId: string) => team.filter(m => m.id === agentId).length;

  const handleToggleMember = (agent: Agent) => {
    const existingMember = team.find(m => m.id === agent.id);
    if (existingMember) {
      removeTeamMember(existingMember.instanceId);
    } else {
      addTeamMember(agent);
    }
  };

  const editingMember = team.find(m => m.instanceId === editingInstance);

  return (
    <div className="flex flex-col items-center w-full max-w-[1400px] mx-auto space-y-6 lg:space-y-10 animate-in fade-in slide-in-from-right-8 duration-500 pb-20">
      
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">组建你的梦之队</h1>
        <p className="text-lg text-slate-500">点击下方专家将其加入团队，也可以在设置中调整他们的专属参数。</p>
      </div>

      {/* Selected Team Area */}
      <div className="w-full bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900">
            <CheckCircle2 className="text-indigo-500" />
            已选团队 ({team.length + (director ? 1 : 0)}人)
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 items-stretch min-h-[120px] bg-slate-50 rounded-xl p-4 border border-dashed border-slate-300">
          {/* Always show director */}
          {director && (
            <div className="relative group shrink-0 w-48 bg-indigo-50 rounded-xl p-3 border border-indigo-200 flex flex-col items-center shadow-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 rounded-t-xl" />
              <div className="text-[10px] font-bold text-white bg-indigo-600 px-2 py-0.5 rounded-full absolute -top-2">总导演</div>
              <img src={director.avatarUrl} alt={director.name} className="w-12 h-12 rounded-full mb-2 object-cover" />
              <span className="font-bold text-sm text-slate-900">{director.name}</span>
              <span className="text-xs text-indigo-700">{director.title}</span>
            </div>
          )}

          <AnimatePresence>
            {team.map((member) => (
              <motion.div
                key={member.instanceId}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, width: 0, margin: 0, padding: 0 }}
                className="relative group shrink-0 w-48 bg-white rounded-xl p-3 border border-slate-200 flex flex-col items-center shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setEditingInstance(member.instanceId)}
              >
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeTeamMember(member.instanceId); }}
                    className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full mb-2 object-cover" />
                <span className="font-bold text-sm text-slate-900 line-clamp-1">{member.name}</span>
                <span className="text-xs text-slate-500 line-clamp-1">{member.title}</span>
              </motion.div>
            ))}
          </AnimatePresence>

          {team.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 gap-2 min-w-[200px]">
              <UserPlus size={24} />
              <p className="text-sm">点击下方卡片添加专家</p>
            </div>
          )}
        </div>
      </div>

      {/* Available Agents Area based on Image */}
      <div className="w-full">
        {/* Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 mb-8 overflow-x-auto hide-scrollbar">
          <div className="flex space-x-8 min-w-max px-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-4 text-sm font-bold transition-all relative whitespace-nowrap",
                  activeTab === tab.id ? "text-indigo-600" : "text-slate-500 hover:text-slate-900"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab" 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t-full" 
                  />
                )}
              </button>
            ))}
          </div>
          
          <div className="pb-4 hidden lg:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索专家职称或描述..." 
                className="pl-4 pr-10 py-2 bg-slate-50 hover:bg-slate-100 focus:bg-white border-transparent focus:border-indigo-300 focus:ring-1 focus:ring-indigo-300 rounded-full text-sm w-64 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {availableAgentsFiltered.map(agent => {
            const isSelected = getTeamCount(agent.id) > 0;
            return (
              <AgentCard
                key={agent.id}
                agent={agent}
                isSelected={isSelected}
                onClick={() => handleToggleMember(agent)}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 z-40 transform translate-y-0">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center px-4">
          <button 
            onClick={prevStep}
            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-all"
          >
            <ArrowLeft size={18} />
            返回
          </button>
          <button 
            onClick={nextStep}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-sm flex items-center gap-2 active:scale-95 transition-all"
          >
            <Settings2 size={18} />
            生成配置清单
          </button>
        </div>
      </div>

      {/* Params Modal */}
      <AnimatePresence>
        {editingInstance && editingMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setEditingInstance(null)}
                className="absolute top-6 right-6 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
              
              <div className="flex items-center gap-4 mb-6">
                <img src={editingMember.avatarUrl} alt="" className="w-16 h-16 rounded-full border-2 border-slate-100" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{editingMember.name}</h3>
                  <p className="text-sm text-slate-500 font-medium">{editingMember.title} 配置</p>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(editingMember.configuredParams).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase">{key}</label>
                    <input 
                      type={typeof value === 'number' ? 'number' : 'text'}
                      value={value as string | number}
                      onChange={(e) => updateTeamMemberParams(
                        editingMember.instanceId, 
                        { ...editingMember.configuredParams, [key]: typeof value === 'number' ? Number(e.target.value) : e.target.value }
                      )}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-3 outline-none transition-all"
                    />
                  </div>
                ))}
                
                {Object.keys(editingMember.configuredParams).length === 0 && (
                  <div className="p-4 bg-slate-50 text-slate-500 rounded-lg text-center text-sm">
                    该专家无需额外参数配置
                  </div>
                )}
              </div>

              <button 
                onClick={() => setEditingInstance(null)}
                className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition-colors shadow-sm"
              >
                保存配置
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
