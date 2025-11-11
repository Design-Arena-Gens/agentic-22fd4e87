"use client";

import Timer from '@/components/Timer';
import { useState } from 'react';

export default function ListeningPage() {
  const [notes, setNotes] = useState('');

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Listening Lab</h1>
        <p className="text-sm text-gray-600">Practice with note-taking and time control. Use recommended sources and simulate exam conditions.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card space-y-2">
          <div className="font-medium">Recommended sources</div>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li><a className="text-brand-700 underline" href="https://www.ielts.org/about-ielts/sample-test-questions" target="_blank" rel="noreferrer">Official IELTS sample questions</a></li>
            <li><a className="text-brand-700 underline" href="https://www.bbc.co.uk/programmes/p02pc9tn/episodes/downloads" target="_blank" rel="noreferrer">BBC podcasts (download)</a></li>
            <li><a className="text-brand-700 underline" href="https://www.ted.com/talks" target="_blank" rel="noreferrer">TED talks</a></li>
          </ul>
          <p className="text-xs text-gray-500">Tip: Shadow 1?2 minutes of speech daily to improve decoding and pronunciation.</p>
        </div>

        <div className="card space-y-2">
          <div className="font-medium">Exam timer</div>
          <Timer seconds={1800} />
          <p className="text-xs text-gray-500">30 minutes + 10 minutes transfer in the real test.</p>
        </div>
      </div>

      <div className="card">
        <div className="font-medium mb-2">Note-taking area</div>
        <textarea className="w-full h-64 p-3 border rounded-md text-sm" placeholder="Take notes while listening..." value={notes} onChange={e=>setNotes(e.target.value)}></textarea>
        <div className="mt-2 flex items-center gap-2">
          <button className="px-4 py-2 rounded-md border text-sm" onClick={()=>setNotes('')}>Clear</button>
          <button className="btn" onClick={()=>{
            const blob = new Blob([notes], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url; a.download = 'listening-notes.txt'; a.click();
          }}>Download notes</button>
        </div>
      </div>
    </div>
  );
}
