"use client";

import { useEffect, useRef, useState } from 'react';

export default function Timer({ seconds, onDone, autostart=false }: { seconds: number; onDone?: ()=>void; autostart?: boolean }) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(autostart);
  const intervalRef = useRef<number|undefined>(undefined);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onDone?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, onDone]);

  function reset() {
    clearInterval(intervalRef.current);
    setRemaining(seconds);
    setRunning(false);
  }

  const m = Math.floor(remaining/60).toString().padStart(2,'0');
  const s = (remaining%60).toString().padStart(2,'0');

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="px-2 py-1 rounded bg-gray-100 font-mono">{m}:{s}</span>
      {!running ? (
        <button className="px-3 py-1 rounded-md border" onClick={()=>setRunning(true)}>Start</button>
      ) : (
        <button className="px-3 py-1 rounded-md border" onClick={()=>setRunning(false)}>Pause</button>
      )}
      <button className="px-3 py-1 rounded-md border" onClick={reset}>Reset</button>
    </div>
  );
}
