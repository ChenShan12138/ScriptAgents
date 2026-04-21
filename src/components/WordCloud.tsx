import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface WordCloudProps {
  words: Array<{ text: string; value: number }>;
  selectedWords: string[];
  onWordClick: (word: string) => void;
}

export function WordCloud({ words, selectedWords, onWordClick }: WordCloudProps) {
  // Normalize values to font sizes between 1rem and 3rem
  const maxValue = Math.max(...words.map(w => w.value));
  const minValue = Math.min(...words.map(w => w.value));

  const getFontSize = (value: number) => {
    const minSize = 1;
    const maxSize = 3.5;
    if (maxValue === minValue) return `${(minSize + maxSize) / 2}rem`;
    const size = minSize + ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize);
    return `${size}rem`;
  };

  const colors = [
    'text-slate-600', 'text-indigo-500', 'text-slate-500', 
    'text-blue-500', 'text-teal-600', 'text-indigo-400', 'text-sky-500'
  ];

  const floatingWords = useMemo(() => {
    return words.map((word, i) => {
      const color = colors[i % colors.length];
      const animationDuration = 3 + Math.random() * 4;
      const animationDelay = Math.random() * 2;
      return { ...word, color, animationDuration, animationDelay };
    });
  }, [words]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 p-8 w-full max-w-4xl mx-auto min-h-[400px] border border-slate-200 rounded-2xl bg-white/80 backdrop-blur-md shadow-sm">
      {floatingWords.map((word) => {
        const isSelected = selectedWords.includes(word.text);
        return (
          <motion.button
            key={word.text}
            onClick={() => onWordClick(word.text)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0] // Floating effect
            }}
            transition={{
              y: {
                duration: word.animationDuration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: word.animationDelay
              },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
            whileHover={{ scale: 1.1, cursor: 'pointer' }}
            whileTap={{ scale: 0.95 }}
            style={{ fontSize: getFontSize(word.value) }}
            className={cn(
              "font-bold transition-colors duration-300",
              isSelected 
                ? "text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200 shadow-sm" 
                : word.color,
              isSelected ? "hover:text-indigo-700" : "hover:text-slate-700 opacity-80 hover:opacity-100"
            )}
          >
            {word.text}
          </motion.button>
        );
      })}
    </div>
  );
}
