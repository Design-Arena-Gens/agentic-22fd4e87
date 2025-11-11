"use client";

import data from '@/data/writing.json';
import { useMemo, useState } from 'react';

export default function WritingPage() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [showOutline, setShowOutline] = useState(true);

  const task = useMemo(()=> data.task2[idx % data.task2.length], [idx]);
  const words = useMemo(()=> text.trim().split(/\s+/).filter(Boolean).length, [text]);

  function newPrompt() { setIdx(i=>i+1); setText(''); }

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Writing Studio (Task 2)</h1>
        <p className="text-sm text-gray-600">Practice with outlines, word count, and band checklist.</p>
      </div>

      <div className="card space-y-3">
        <div className="flex items-center justify-between">
          <div className="font-medium">Prompt</div>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded bg-gray-100">Words: {words}</span>
            <button className="px-3 py-1 rounded-md border text-sm" onClick={newPrompt}>New prompt</button>
          </div>
        </div>
        <p className="text-gray-800">{task.prompt}</p>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 rounded-md border text-sm" onClick={()=>setShowOutline(s=>!s)}>{showOutline? 'Hide outline':'Show outline'}</button>
        </div>
        {showOutline && (
          <ul className="text-sm text-gray-700 list-disc list-inside">
            {task.outline.map((o,i)=>(<li key={i}>{o}</li>))}
          </ul>
        )}
        <textarea className="w-full h-64 p-3 border rounded-md text-sm" placeholder="Write your essay here..." value={text} onChange={e=>setText(e.target.value)}></textarea>
        <div className="border-t pt-3">
          <div className="font-medium text-sm">Band 6.5?7.5 Checklist</div>
          <ul className="text-sm text-gray-700 list-disc list-inside">
            {data.bandChecklist.map((c,i)=>(<li key={i}>{c}</li>))}
          </ul>
        </div>
      </div>
    </div>
  );
}
