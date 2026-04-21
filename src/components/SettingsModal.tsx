import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Plus, Settings2, Cpu, Users, Video } from 'lucide-react';
import { useStore, Agent } from '../store';
import { cn } from '../lib/utils';

export function SettingsModal() {
  const { 
    isSettingsOpen, setSettingsOpen, step, 
    llmConfig, setLlmConfig, 
    directors, updateDirector,
    availableAgents, updateAvailableAgent, addAvailableAgent
  } = useStore();

  const [activeTab, setActiveTab] = useState<'llm' | 'directors' | 'experts'>('llm');

  // Default to corresponding tab based on current step when opened
  useEffect(() => {
    if (isSettingsOpen) {
      if (step === 1) setActiveTab('llm');
      if (step === 2) setActiveTab('directors');
      if (step >= 3) setActiveTab('experts');
    }
  }, [isSettingsOpen, step]);

  // --- Directors State ---
  const [selectedDirectorId, setSelectedDirectorId] = useState(directors[0]?.id || '');
  const selectedDirector = directors.find(d => d.id === selectedDirectorId);

  // --- Experts State ---
  const [selectedExpertId, setSelectedExpertId] = useState<'new' | string>(availableAgents[0]?.id || 'new');
  const [expertJsonInput, setExpertJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Load JSON when selected expert changes
  useEffect(() => {
    if (selectedExpertId === 'new') {
      const template: Agent = {
        id: `expert_${Date.now()}`,
        name: "新专家",
        role: "custom",
        title: "自定义角色",
        description: "新添加的专家描述",
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=new_${Date.now()}`,
        params: {
          "customParam": "defaultValue"
        }
      };
      setExpertJsonInput(JSON.stringify(template, null, 2));
      setJsonError('');
    } else {
      const expert = availableAgents.find(a => a.id === selectedExpertId);
      if (expert) {
        setExpertJsonInput(JSON.stringify(expert, null, 2));
      }
      setJsonError('');
    }
  }, [selectedExpertId, availableAgents, isSettingsOpen]);

  const handleSaveExpert = () => {
    try {
      const parsed = JSON.parse(expertJsonInput) as Agent;
      if (!parsed.id || !parsed.name || !parsed.role) {
        throw new Error('缺少必填字段: id, name, role');
      }
      if (selectedExpertId === 'new') {
        addAvailableAgent(parsed);
        setSelectedExpertId(parsed.id);
      } else {
        updateAvailableAgent(parsed.id, parsed);
      }
      setJsonError('');
      alert('专家设置保存成功！');
    } catch (e: any) {
      setJsonError(e.message || 'JSON格式错误');
    }
  };

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-slate-200"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Settings2 className="text-indigo-600" /> 全局配置
          </h2>
          <button 
            onClick={() => setSettingsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-48 bg-slate-50 border-r border-slate-200 flex flex-col p-2 space-y-1">
            <button
              onClick={() => setActiveTab('llm')}
              className={cn("flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors", activeTab === 'llm' ? "bg-indigo-100 text-indigo-700" : "text-slate-600 hover:bg-slate-200")}
            >
              <Cpu size={16} /> 一键创作大模型
            </button>
            <button
              onClick={() => setActiveTab('directors')}
              className={cn("flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors", activeTab === 'directors' ? "bg-indigo-100 text-indigo-700" : "text-slate-600 hover:bg-slate-200")}
            >
              <Video size={16} /> 导演节点设置
            </button>
            <button
              onClick={() => setActiveTab('experts')}
              className={cn("flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors", activeTab === 'experts' ? "bg-indigo-100 text-indigo-700" : "text-slate-600 hover:bg-slate-200")}
            >
              <Users size={16} /> 专家库管理
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            
            {/* LLM Tab */}
            {activeTab === 'llm' && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">一键创作模型配置</h3>
                  <p className="text-sm text-slate-500">配置您首选的大模型参数，用于热词灵感的自动创意发散。</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">服务提供商 (Provider)</label>
                    <input 
                      type="text" 
                      value={llmConfig.provider}
                      onChange={(e) => setLlmConfig({ provider: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2 outline-none transition-all"
                      placeholder="e.g. OpenAI, Gemini, Anthropic"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">模型名称 (Model)</label>
                    <input 
                      type="text" 
                      value={llmConfig.model}
                      onChange={(e) => setLlmConfig({ model: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2 outline-none transition-all"
                      placeholder="e.g. text-davinci-003, gemini-1.5-pro"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">API Key</label>
                    <input 
                      type="password" 
                      value={llmConfig.apiKey}
                      onChange={(e) => setLlmConfig({ apiKey: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2 outline-none transition-all"
                      placeholder="填入您的API密钥"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Directors Tab */}
            {activeTab === 'directors' && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-800">导演节点设置</h3>
                  <p className="text-sm text-slate-500">为每个导演单独配置其背后的工作流API及个人详情。</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">选择要编辑的导演</label>
                  <select 
                    value={selectedDirectorId}
                    onChange={(e) => setSelectedDirectorId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2 outline-none transition-all"
                  >
                    {directors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.title})</option>
                    ))}
                  </select>
                </div>

                {selectedDirector && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">导演姓名</label>
                      <input 
                        type="text" 
                        value={selectedDirector.name}
                        onChange={(e) => updateDirector(selectedDirector.id, { name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg px-4 py-2 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">职称/标签</label>
                      <input 
                        type="text" 
                        value={selectedDirector.title}
                        onChange={(e) => updateDirector(selectedDirector.id, { title: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg px-4 py-2 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1 text-indigo-700">配置独立工作流API</label>
                      <input 
                        type="text" 
                        value={selectedDirector.workflowApi || ''}
                        onChange={(e) => updateDirector(selectedDirector.id, { workflowApi: e.target.value })}
                        className="w-full bg-indigo-50/50 border border-indigo-200 focus:border-indigo-500 rounded-lg px-4 py-2 outline-none transition-all font-mono text-sm placeholder:text-slate-400"
                        placeholder="https://api.your-workflow.com/v1/execute"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">导演描述</label>
                      <textarea 
                        rows={3}
                        value={selectedDirector.description}
                        onChange={(e) => updateDirector(selectedDirector.id, { description: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg px-4 py-2 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Experts Tab */}
            {activeTab === 'experts' && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200 flex flex-col h-full">
                <div className="space-y-2 shrink-0">
                  <h3 className="text-lg font-bold text-slate-800">专家库管理</h3>
                  <p className="text-sm text-slate-500">以JSON格式自由编辑专家的所有字段支持动态能力和新属性载入。</p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <select 
                    value={selectedExpertId}
                    onChange={(e) => setSelectedExpertId(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg px-4 py-2 outline-none transition-all text-sm font-medium"
                  >
                    <option value="new">-- ✨ 新增专家 --</option>
                    {availableAgents.map(a => (
                      <option key={a.id} value={a.id}>{a.name} ({a.title})</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 flex flex-col min-h-[300px] border border-slate-200 rounded-lg overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all">
                  <div className="bg-slate-800 px-4 py-2 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-300">JSON Editor</span>
                  </div>
                  <textarea
                    value={expertJsonInput}
                    onChange={(e) => {
                      setExpertJsonInput(e.target.value);
                      setJsonError(''); // clear error when typing
                    }}
                    className="flex-1 w-full p-4 bg-slate-900 text-indigo-300 font-mono text-sm leading-relaxed outline-none resize-none hide-scrollbar whitespace-pre"
                    spellCheck={false}
                  />
                </div>

                {jsonError && (
                  <div className="text-red-500 text-sm font-semibold shrink-0">
                    ⚠ JSON 解析错误: {jsonError}
                  </div>
                )}

                <div className="shrink-0 flex justify-end">
                  <button 
                    onClick={handleSaveExpert}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95"
                  >
                    <Save size={18} />
                    保存专家数据
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
