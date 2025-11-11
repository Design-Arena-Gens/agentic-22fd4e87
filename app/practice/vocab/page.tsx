"use client";

import awl from '@/data/awl.json';
import { useEffect, useMemo, useState } from 'react';

type Word = { word: string; definition: string };

export default function VocabPage() {
  const words: Word[] = awl.words as any;
  const [index, setIndex] = useState(0);
  const [shuffled, setShuffled] = useState<Word[]>([]);
  const [showDef, setShowDef] = useState(false);
  const [known, setKnown] = useState<number>(0);
  const [total, setTotal] = useState<number>(10);

  useEffect(() => {
    startNewSession();
  }, []);

  function startNewSession() {
    const copy = [...words];
    for (let i=copy.length-1; i>0; i--) {
      const j = Math.floor(Math.random()*(i+1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    const todays = copy.slice(0, 10);
    setShuffled(todays);
    setIndex(0);
    setShowDef(false);
    setKnown(0);
    setTotal(todays.length);
  }

  function mark(correct: boolean) {
    if (correct) setKnown(k=>k+1);
    if (index < shuffled.length - 1) {
      setIndex(i=>i+1);
      setShowDef(false);
    } else {
      localStorage.setItem('icp_vocab_last_score', `${known + (correct?1:0)}/${total}`);
    }
  }

  const current = shuffled[index];

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Vocabulary Trainer (AWL)</h1>
        <p className="text-sm text-gray-600">10 words per session. Flip the card and test yourself.</p>
      </div>

      {current ? (
        <div className="card">
          <div className="text-sm text-gray-500">{index+1} / {total}</div>
          <div className="mt-2 p-6 rounded-xl border bg-white">
            <div className="text-2xl font-semibold text-center">{current.word}</div>
            {showDef && (
              <div className="mt-4 text-center text-gray-700">{current.definition}</div>
            )}
            <div className="mt-4 flex items-center justify-center gap-2">
              <button className="px-4 py-2 rounded-md border text-sm" onClick={()=>setShowDef(s=>!s)}>{showDef? 'Hide definition':'Show definition'}</button>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="px-4 py-2 rounded-md border text-sm" onClick={()=>mark(false)}>I forgot</button>
            <button className="btn" onClick={()=>mark(true)}>I knew it</button>
          </div>
        </div>
      ) : (
        <div className="card">
          <p className="text-sm">Session finished. Last score: {typeof window !== 'undefined' ? localStorage.getItem('icp_vocab_last_score') || '-' : '-'}</p>
          <button className="btn mt-3" onClick={startNewSession}>Start new session</button>
        </div>
      )}
    </div>
  );
}
