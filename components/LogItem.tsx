"use client";

import React, { useState } from 'react';
import { LogEntry } from '../hooks/useSocket';

const typeColors = {
  info: 'text-blue-400',
  success: 'text-green-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
};

const typeBg = {
  info: 'bg-blue-500/10',
  success: 'bg-green-500/10',
  warning: 'bg-yellow-500/10',
  error: 'bg-red-500/10',
};

interface LogItemProps {
  log: LogEntry;
  searchQuery?: string;
}

const renderHighlightedText = (text: string, query?: string) => {
  if (!query) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, i) => 
    part.toLowerCase() === query.toLowerCase() 
      ? <mark key={i} className="bg-yellow-500/40 text-yellow-100 rounded px-0.5">{part}</mark> 
      : part
  );
};

export const LogItem: React.FC<LogItemProps> = ({ log, searchQuery }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (ts: string) => new Date(ts).toLocaleTimeString([], { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  const time = formatTime(log.timestamp);

  return (
    <div className="flex flex-col border-b border-white/5">
      <div 
        className={`group flex items-start gap-3 py-1.5 px-4 font-mono text-sm hover:bg-white/5 transition-colors cursor-default ${typeBg[log.type]}`}
        onClick={() => log.count && log.count > 1 && setIsExpanded(!isExpanded)}
      >
        <span className="text-zinc-500 select-none shrink-0 w-20">{time}</span>
        <span className={`uppercase font-bold shrink-0 w-16 ${typeColors[log.type]}`}>
          [{log.type}]
        </span>
        <div className="flex-1 break-all">
          <span className="text-zinc-100 whitespace-pre-wrap">
            {renderHighlightedText(log.message, searchQuery)}
          </span>
          {log.source && (
            <span className="ml-2 text-xs text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
              via {log.source}
            </span>
          )}
        </div>
        {log.count && log.count > 1 && (
          <div className="flex items-center gap-2 shrink-0">
             <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''} text-[10px] text-zinc-600`}>
              ▶
            </span>
            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
              x{log.count}
            </span>
          </div>
        )}
      </div>
      
      {/* Expanded occurrences */}
      {isExpanded && log.occurrences && (
        <div className="bg-black/20 px-4 py-2 border-l-2 border-blue-500/30 ml-4 mb-1 animate-in fade-in slide-in-from-left-2 duration-200">
          <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mb-2">
            Repeated Occurrences
          </div>
          <div className="grid grid-cols-4 gap-2">
            {log.occurrences.map((occ, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
                <span className="w-1 h-1 bg-zinc-700 rounded-full" />
                {formatTime(occ)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
