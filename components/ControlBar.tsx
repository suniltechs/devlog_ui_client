"use client";

import React from 'react';

interface ControlBarProps {
  isConnected: boolean;
  isPaused: boolean;
  togglePause: () => void;
  clearLogs: () => void;
  bufferSize: number;
}

export const ControlBar: React.FC<ControlBarProps> = ({ 
  isConnected, 
  isPaused, 
  togglePause, 
  clearLogs,
  bufferSize
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-950 border-t border-white/5 backdrop-blur-md">
      {/* Connection Status */}
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 whitespace-nowrap">
          {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </span>
      </div>

      <div className="h-4 w-px bg-white/10 mx-2" />

      {/* Main Controls */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={togglePause}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all border ${
            isPaused 
            ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20' 
            : 'bg-zinc-800 border-white/5 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          {isPaused ? '▶ RESUME' : '⏸ PAUSE'}
          {isPaused && bufferSize > 0 && (
            <span className="bg-yellow-500 text-zinc-950 px-1 rounded-sm text-[10px]">
              +{bufferSize}
            </span>
          )}
        </button>

        <button
          onClick={clearLogs}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold bg-zinc-800 border border-white/5 text-zinc-300 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all"
        >
          🗑 CLEAR
        </button>
      </div>

      <div className="ml-auto text-xs text-zinc-600 font-mono italic">
        v1.0.0-phase7
      </div>
    </div>
  );
};
