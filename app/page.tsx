"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { generatePlan } from '@/lib/planGenerator';

export default function HomePage() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('Bangladesh');
  const [role, setRole] = useState('Student & private tutor');
  const [currentLevel, setCurrentLevel] = useState<'beginner'|'intermediate'|'upper-intermediate'>('intermediate');
  const [targetBand, setTargetBand] = useState(7.0);
  const [examDate, setExamDate] = useState<string>('');
  const [weaknesses, setWeaknesses] = useState<string[]>(['speaking','writing','listening','reading']);
  const [grammarGaps, setGrammarGaps] = useState<string[]>(['tense','preposition','article','subject-verb agreement']);
  const [vocabFocus, setVocabFocus] = useState<string[]>(['academic','paraphrasing']);

  useEffect(() => {
    const stored = localStorage.getItem('icp_profile');
    if (stored) {
      const p = JSON.parse(stored);
      setName(p.name || '');
      setCountry(p.country || 'Bangladesh');
      setRole(p.role || 'Student & private tutor');
      setCurrentLevel(p.currentLevel || 'intermediate');
      setTargetBand(p.targetBand || 7.0);
      setExamDate(p.examDate || '');
      setWeaknesses(p.weaknesses || ['speaking','writing','listening','reading']);
      setGrammarGaps(p.grammarGaps || ['tense','preposition','article','subject-verb agreement']);
      setVocabFocus(p.vocabFocus || ['academic','paraphrasing']);
    }
  }, []);

  const weeksUntilExam = useMemo(() => {
    if (!examDate) return 24;
    const now = new Date();
    const exam = new Date(examDate);
    const diff = Math.max(0, exam.getTime() - now.getTime());
    return Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
  }, [examDate]);

  function saveProfile() {
    const profile = { name, country, role, currentLevel, targetBand, examDate, weaknesses, grammarGaps, vocabFocus };
    localStorage.setItem('icp_profile', JSON.stringify(profile));

    const plan = generatePlan({ weeks: Math.max(12, Math.min(26, weeksUntilExam || 24)), currentLevel, targetBand, weaknesses, grammarGaps, vocabFocus });
    localStorage.setItem('icp_plan', JSON.stringify(plan));
  }

  function toggle(arr: string[], value: string, setter: (v: string[]) => void) {
    setter(arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]);
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h1 className="text-2xl font-semibold mb-2">Personalized IELTS 6?Month Plan</h1>
        <p className="text-sm text-gray-600">Fill in your details. A weekly plan will be generated focusing on your weaknesses: Speaking, Writing, Listening, Reading, plus Grammar and Vocabulary.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card space-y-4">
          <div>
            <label className="label">Name</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Optional" />
          </div>
          <div>
            <label className="label">Country</label>
            <input className="input" value={country} onChange={e=>setCountry(e.target.value)} />
          </div>
          <div>
            <label className="label">Role</label>
            <input className="input" value={role} onChange={e=>setRole(e.target.value)} />
          </div>
          <div>
            <label className="label">Current English Level</label>
            <select className="input" value={currentLevel} onChange={e=>setCurrentLevel(e.target.value as any)}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="upper-intermediate">Upper-Intermediate</option>
            </select>
          </div>
          <div>
            <label className="label">Target IELTS Band</label>
            <input className="input" type="number" step="0.5" min={5} max={9} value={targetBand} onChange={e=>setTargetBand(parseFloat(e.target.value))} />
          </div>
          <div>
            <label className="label">Exam Date (optional)</label>
            <input className="input" type="date" value={examDate} onChange={e=>setExamDate(e.target.value)} />
            <p className="text-xs text-gray-500 mt-1">Weeks planned: {weeksUntilExam || 24}</p>
          </div>
        </div>

        <div className="card space-y-4">
          <div>
            <label className="label">Skill Weaknesses</label>
            <div className="flex flex-wrap gap-2">
              {['speaking','writing','listening','reading'].map(w => (
                <button key={w} onClick={()=>toggle(weaknesses,w,setWeaknesses)} className={`px-3 py-1 rounded-md border text-sm ${weaknesses.includes(w)?'bg-brand-50 border-brand-200 text-brand-800':'bg-white'}`}>{w}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Grammar Gaps</label>
            <div className="flex flex-wrap gap-2">
              {['tense','preposition','article','subject-verb agreement'].map(g => (
                <button key={g} onClick={()=>toggle(grammarGaps,g,setGrammarGaps)} className={`px-3 py-1 rounded-md border text-sm ${grammarGaps.includes(g)?'bg-brand-50 border-brand-200 text-brand-800':'bg-white'}`}>{g}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="label">Vocabulary Focus</label>
            <div className="flex flex-wrap gap-2">
              {['academic','paraphrasing','collocations','topic-specific'].map(v => (
                <button key={v} onClick={()=>toggle(vocabFocus,v,setVocabFocus)} className={`px-3 py-1 rounded-md border text-sm ${vocabFocus.includes(v)?'bg-brand-50 border-brand-200 text-brand-800':'bg-white'}`}>{v}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/plan" className="btn" onClick={saveProfile}>Generate Plan</Link>
        <Link href="/practice/grammar" className="px-4 py-2 rounded-md border text-sm">Quick Grammar Diagnostic</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <a className="card hover:shadow-md transition" href="/practice/speaking">
          <h3 className="font-semibold">Speaking Lab</h3>
          <p className="text-sm text-gray-600">Timed prompts, recording, feedback checklist.</p>
        </a>
        <a className="card hover:shadow-md transition" href="/practice/writing">
          <h3 className="font-semibold">Writing Studio</h3>
          <p className="text-sm text-gray-600">Task 1/2 templates, band criteria, word-count.</p>
        </a>
        <a className="card hover:shadow-md transition" href="/practice/vocab">
          <h3 className="font-semibold">Vocabulary Trainer</h3>
          <p className="text-sm text-gray-600">Daily 10-word quizzes from AWL.</p>
        </a>
      </div>
    </div>
  );
}
