import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Agent } from '../store';
import { Check, Settings } from 'lucide-react';

interface AgentCardProps {
  key?: React.Key;
  agent: Agent;
  isSelected?: boolean;
  selectedCount?: number;
  onClick: () => void;
  onSettingsClick?: () => void;
  disabled?: boolean;
}

export function AgentCard({ agent, isSelected, selectedCount = 0, onClick, onSettingsClick, disabled }: AgentCardProps) {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02, y: -4 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={cn(
        "relative flex flex-col items-center p-6 bg-white rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow-md",
        disabled ? "opacity-60 cursor-not-allowed border-slate-200" :
        isSelected ? "border-indigo-500 bg-indigo-50/50 shadow-[0_0_0_1px_rgba(99,102,241,1)]" : "border-slate-200 hover:border-slate-300"
      )}
    >
      {/* Top border highlight matching the image */}
      <div className={cn(
        "absolute top-0 left-6 right-6 h-1 rounded-b-md transition-colors",
        isSelected ? "bg-indigo-500" : "bg-slate-200"
      )} />

      {selectedCount > 0 && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white text-xs font-bold flex items-center justify-center rounded-full shadow-sm z-10">
          {selectedCount}
        </div>
      )}

      {isSelected && onSettingsClick && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSettingsClick();
          }}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Settings size={18} />
        </button>
      )}

      <div className="relative mb-4">
        <img 
          src={agent.avatarUrl} 
          alt={agent.name}
          className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm"
        />
        {isSelected && (
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-500 rounded-full border-2 border-white flex items-center justify-center text-white">
            <Check size={14} strokeWidth={3} />
          </div>
        )}
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-1">{agent.name}</h3>
      
      <div className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg mb-3">
        {agent.title}
      </div>

      <p className="text-sm text-slate-500 text-center line-clamp-3 leading-relaxed">
        {agent.description}
      </p>
    </motion.div>
  );
}
