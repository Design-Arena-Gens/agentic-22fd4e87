"use client";

import grammar from '@/data/grammar.json';
import { useMemo, useState } from 'react';

type Item = { q: string; options: string[]; answer: number; ex: string };

export default function GrammarPage() {
  const bank = useMemo(()=>{
    const all: Item[] = [];
    Object.values(grammar).forEach(arr => all.push(...(arr as Item[])));
    return all.map((q, idx)=> ({...q, id: idx}));
  }, []);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(()=>{
    let s = 0;
    bank.forEach((it, idx)=>{ if (answers[idx] === it.answer) s++; });
    return s;
  }, [answers, bank]);

  function select(idx: number, optIdx: number) {
    if (submitted) return;
    setAnswers(a => ({...a, [idx]: optIdx}));
  }

  function submit() {
    setSubmitted(true);
    localStorage.setItem('icp_grammar_last_score', String(score));
  }

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Grammar Diagnostic</h1>
        <p className="text-sm text-gray-600">Focus: Tense, Preposition, Article, Subject-Verb Agreement</p>
      </div>
      <div className="flex items-center gap-2">
        {!submitted ? (
          <button className="btn" onClick={submit}>Submit</button>
        ) : (
          <>
            <span className="px-3 py-2 rounded-md bg-green-50 text-green-700 border border-green-200 text-sm">Score: {score} / {bank.length}</span>
            <button className="px-4 py-2 rounded-md border text-sm" onClick={reset}>Retry</button>
          </>
        )}
      </div>

      <ol className="space-y-4">
        {bank.map((it, idx)=> (
          <li key={idx} className="card">
            <div className="font-medium">{idx+1}. {it.q}</div>
            <div className="mt-2 grid sm:grid-cols-2 gap-2">
              {it.options.map((opt, oi)=>{
                const isSelected = answers[idx] === oi;
                const isCorrect = submitted && oi === it.answer;
                const isWrong = submitted && isSelected && !isCorrect;
                return (
                  <button key={oi} onClick={()=>select(idx, oi)} className={`text-left px-3 py-2 rounded-md border text-sm ${isSelected? 'border-brand-300 bg-brand-50': ''} ${isCorrect? 'border-green-300 bg-green-50':''} ${isWrong? 'border-red-300 bg-red-50':''}`}>{opt}</button>
                );
              })}
            </div>
            {submitted && (
              <p className="mt-2 text-xs text-gray-600">Explanation: {it.ex}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
