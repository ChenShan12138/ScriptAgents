import { create } from 'zustand';
import { DIRECTORS as initialDirectors, TEAM_AGENTS as initialTeamAgents } from './data/agents';

export type AgentRole = 'director' | 'writer' | 'cinematographer' | 'voice' | 'editor' | 'custom';

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  title: string;
  description: string;
  avatarUrl: string;
  params?: Record<string, string | number | boolean>;
  workflowApi?: string;
}

export interface SelectedAgent extends Agent {
  instanceId: string; // Unique id for the selected instance, allowing multiple of the same agent
  configuredParams: Record<string, string | number | boolean>;
}

interface AppState {
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  // Step 1: Trends & Keywords
  trendingKeywords: Array<{ text: string; value: number }>;
  setTrendingKeywords: (keywords: Array<{ text: string; value: number }>) => void;
  selectedKeywords: string[];
  toggleKeyword: (keyword: string) => void;
  customKeyword: string;
  setCustomKeyword: (keyword: string) => void;
  addCustomKeyword: () => void;
  removeKeyword: (keyword: string) => void;

  // Auto-create state
  idea: string;
  setIdea: (idea: string) => void;
  scriptOutline: any;
  setScriptOutline: (outline: any) => void;

  // Selected Resources
  directorId: string | null;
  setDirector: (id: string | null) => void;
  team: SelectedAgent[];
  addTeamMember: (agent: Agent) => void;
  removeTeamMember: (instanceId: string) => void;
  updateTeamMemberParams: (instanceId: string, params: any) => void;

  // Custom Categories
  customCategories: Array<{ id: string; label: string }>;
  addCustomCategory: (category: { id: string; label: string }) => void;

  // Settings & Configuration
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  llmConfig: { provider: string; model: string; apiKey: string };
  setLlmConfig: (config: Partial<{ provider: string; model: string; apiKey: string }>) => void;
  
  directors: Agent[];
  updateDirector: (id: string, data: Partial<Agent>) => void;
  
  availableAgents: Agent[];
  addAvailableAgent: (agent: Agent) => void;
  updateAvailableAgent: (id: string, data: Partial<Agent>) => void;
}

const initialTrending = [
  { text: "吃鸡", value: 60 },
  { text: "原神启动", value: 100 },
  { text: "赛博朋克", value: 40 },
  { text: "开放世界", value: 80 },
  { text: "抽卡", value: 90 },
  { text: "非酋", value: 70 },
  { text: "氪金", value: 85 },
  { text: "整活", value: 95 },
  { text: "下饭", value: 50 },
  { text: "速通", value: 65 },
  { text: "鬼畜", value: 75 },
  { text: "搞笑", value: 88 },
  { text: "无伤", value: 45 },
  { text: "卡BUG", value: 55 },
];

export const useStore = create<AppState>((set, get) => ({
  step: 1,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 4) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),

  trendingKeywords: initialTrending,
  setTrendingKeywords: (keywords) => set({ trendingKeywords: keywords }),
  selectedKeywords: [],
  toggleKeyword: (keyword) => set((state) => ({
    selectedKeywords: state.selectedKeywords.includes(keyword)
      ? state.selectedKeywords.filter(k => k !== keyword)
      : [...state.selectedKeywords, keyword]
  })),
  customKeyword: '',
  setCustomKeyword: (keyword) => set({ customKeyword: keyword }),
  addCustomKeyword: () => {
    const { customKeyword, selectedKeywords } = get();
    if (customKeyword.trim() && !selectedKeywords.includes(customKeyword.trim())) {
      set({ 
        selectedKeywords: [...selectedKeywords, customKeyword.trim()],
        customKeyword: ''
      });
    }
  },
  removeKeyword: (keyword) => set((state) => ({
    selectedKeywords: state.selectedKeywords.filter(k => k !== keyword)
  })),

  idea: '',
  setIdea: (idea) => set({ idea }),
  scriptOutline: null,
  setScriptOutline: (outline) => set({ scriptOutline: outline }),

  directorId: null,
  setDirector: (id) => set({ directorId: id }),
  team: [],
  addTeamMember: (agent) => set((state) => ({
    team: [...state.team, {
      ...agent,
      instanceId: `${agent.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      configuredParams: agent.params || {}
    }]
  })),
  removeTeamMember: (instanceId) => set((state) => ({
    team: state.team.filter(m => m.instanceId !== instanceId)
  })),
  updateTeamMemberParams: (instanceId, params) => set((state) => ({
    team: state.team.map(m => m.instanceId === instanceId ? { ...m, configuredParams: params } : m)
  })),

  customCategories: [],
  addCustomCategory: (category) => set((state) => ({
    customCategories: [...state.customCategories, category]
  })),

  isSettingsOpen: false,
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  
  llmConfig: { provider: 'Gemini', model: 'gemini-1.5-pro', apiKey: '' },
  setLlmConfig: (config) => set((state) => ({ llmConfig: { ...state.llmConfig, ...config } })),

  directors: initialDirectors,
  updateDirector: (id, data) => set((state) => ({ 
    directors: state.directors.map(d => d.id === id ? { ...d, ...data } : d) 
  })),

  availableAgents: initialTeamAgents,
  addAvailableAgent: (agent) => set((state) => ({ 
    availableAgents: [...state.availableAgents, agent] 
  })),
  updateAvailableAgent: (id, data) => set((state) => ({ 
    availableAgents: state.availableAgents.map(a => a.id === id ? { ...a, ...data } : a) 
  })),
}));
