import React, { useState, useEffect } from 'react';
import { LogEntry } from '../hooks/useSocket';

export const ErrorSpotlight: React.FC<{ errorLog: LogEntry | null }> = ({ errorLog }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastErrorId, setLastErrorId] = useState<string | null>(null);

  useEffect(() => {
    if (errorLog && errorLog.id !== lastErrorId) {
      setIsVisible(true);
      setLastErrorId(errorLog.id!);
    }
  }, [errorLog, lastErrorId]);

  if (!errorLog || !isVisible) return null;

  return (
    <div className="bg-red-500/10 border-b border-red-500/20 p-4 sticky top-16 z-20 backdrop-blur-md animate-in slide-in-from-top-4 flex items-start gap-4 shadow-lg shadow-red-900/10">
      <div className="shrink-0 bg-red-500/20 p-2 rounded-lg text-red-500 border border-red-500/30">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col pt-0.5">
        <div className="flex items-center gap-3">
          <h3 className="text-red-400 font-bold uppercase tracking-wider text-sm flex items-center gap-2">
            Critical Error Detected
            <span className="bg-red-500 text-white rounded px-1.5 py-0.5 text-[10px]">New</span>
          </h3>
          <span className="text-zinc-500 text-xs font-mono">
            {new Date(errorLog.timestamp).toLocaleTimeString()}
          </span>
          {errorLog.source && (
             <span className="text-zinc-600 font-mono text-xs italic ml-2">via {errorLog.source}</span>
          )}
        </div>
        <p className="text-zinc-200 mt-1 font-mono text-sm break-words whitespace-pre-wrap">{errorLog.message}</p>
      </div>

      <button 
        onClick={() => setIsVisible(false)}
        className="shrink-0 text-red-400 hover:text-white bg-transparent hover:bg-red-500/20 p-1.5 rounded-lg transition-colors border border-transparent hover:border-red-500/30 font-bold px-3 text-xs"
      >
        DISMISS
      </button>
    </div>
  );
};
