"use client";

import prompts from '@/data/speaking.json';
import { useEffect, useRef, useState } from 'react';
import Timer from '@/components/Timer';

export default function SpeakingPage() {
  const [part, setPart] = useState<'part1'|'part2'|'part3'>('part2');
  const [prompt, setPrompt] = useState<string>('');
  const [phase, setPhase] = useState<'prep'|'speak'|'done'>('prep');

  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const [permission, setPermission] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string|null>(null);

  useEffect(()=>{
    pickPrompt('part2');
  }, []);

  function pickPrompt(p: 'part1'|'part2'|'part3') {
    setPart(p);
    const arr = (prompts as any)[p] as string[];
    const idx = Math.floor(Math.random()*arr.length);
    setPrompt(arr[idx]);
    setPhase(p==='part2' ? 'prep' : 'speak');
    setAudioUrl(null);
  }

  async function ensureMic() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      mediaRecorderRef.current = rec;
      setPermission(true);
    } catch (e) {
      alert('Microphone permission denied. You can still practice without recording.');
      setPermission(false);
    }
  }

  function startRecording() {
    if (!permission || !mediaRecorderRef.current) return;
    const chunks: BlobPart[] = [];
    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Speaking Lab</h1>
        <p className="text-sm text-gray-600">Choose a part, then practice with timers. Part 2 includes 1 min prep + 2 min speaking.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <button className={`px-3 py-1 rounded-md border text-sm ${part==='part1'?'bg-brand-50 border-brand-200':''}`} onClick={()=>pickPrompt('part1')}>Part 1</button>
        <button className={`px-3 py-1 rounded-md border text-sm ${part==='part2'?'bg-brand-50 border-brand-200':''}`} onClick={()=>pickPrompt('part2')}>Part 2</button>
        <button className={`px-3 py-1 rounded-md border text-sm ${part==='part3'?'bg-brand-50 border-brand-200':''}`} onClick={()=>pickPrompt('part3')}>Part 3</button>
        <button className="px-3 py-1 rounded-md border text-sm" onClick={()=>pickPrompt(part)}>New prompt</button>
      </div>

      <div className="card space-y-3">
        <div className="font-medium">Prompt</div>
        <p className="text-gray-800">{prompt}</p>

        {part==='part2' && (
          <div className="mt-2">
            {phase==='prep' ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">Prep time (1:00)</span>
                <Timer seconds={60} autostart onDone={()=>setPhase('speak')} />
              </div>
            ) : phase==='speak' ? (
              <div className="flex items-center gap-3">
                <span className="text-sm">Speaking time (2:00)</span>
                <Timer seconds={120} autostart onDone={()=>setPhase('done')} />
              </div>
            ) : (
              <div className="text-sm text-green-700">Time complete.</div>
            )}
          </div>
        )}

        {part!=='part2' && (
          <div className="flex items-center gap-3">
            <span className="text-sm">Suggested: 30?45s (Part 1) or 60?90s (Part 3)</span>
            <Timer seconds={90} />
          </div>
        )}

        <div className="pt-2 border-t">
          <div className="flex items-center gap-2 flex-wrap">
            <button className="px-4 py-2 rounded-md border text-sm" onClick={ensureMic}>Enable microphone</button>
            {!recording ? (
              <button className="btn" onClick={startRecording} disabled={!permission}>Start recording</button>
            ) : (
              <button className="px-4 py-2 rounded-md border text-sm" onClick={stopRecording}>Stop recording</button>
            )}
            {audioUrl && (
              <a className="px-4 py-2 rounded-md border text-sm" href={audioUrl} download="speaking.webm">Download audio</a>
            )}
          </div>
          <ul className="mt-3 text-sm text-gray-700 list-disc list-inside">
            <li>Fluency: avoid long pauses; use fillers naturally.</li>
            <li>Pronunciation: stress and intonation; clear sounds.</li>
            <li>Grammar: accurate tenses; complex sentences.</li>
            <li>Lexical resource: paraphrase; use collocations.</li>
            <li>Coherence: clear structure; linking words.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
