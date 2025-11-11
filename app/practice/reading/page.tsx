"use client";

import { useMemo, useState } from 'react';

const passage = `Cities are complex systems that evolve over time. While economic opportunity draws people into urban areas, infrastructure often struggles to keep pace with demand. Public transport, affordable housing, and green spaces compete for limited budgets, and policymakers must balance short-term needs with long-term resilience. In many developing countries, rapid urbanization has produced informal settlements that lack reliable water and sanitation. However, cities can also be laboratories for innovation. When local governments collaborate with communities and leverage data, they can design targeted interventions?such as bus rapid transit or waste-to-energy programs?that improve quality of life while reducing environmental impact.`;

const questions = [
  {
    q: 'According to the passage, why do cities struggle to keep pace with demand?',
    options: [
      'Because people prefer rural life',
      'Because infrastructure expansion is slower than population growth',
      'Because cities have unlimited budgets',
      'Because policymakers ignore public transport'
    ],
    answer: 1
  },
  {
    q: 'Which of the following is NOT mentioned as competing for budgets?',
    options: [
      'Public transport',
      'Affordable housing',
      'Green spaces',
      'Rural development'
    ],
    answer: 3
  },
  {
    q: 'What enables targeted interventions in cities?',
    options: [
      'High taxes',
      'Collaboration and data-driven approaches',
      'Privatization of services',
      'Migration controls'
    ],
    answer: 1
  }
];

export default function ReadingPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = useMemo(()=> Object.entries(answers).filter(([i,v]) => questions[Number(i)].answer === v).length, [answers]);

  return (
    <div className="space-y-4">
      <div className="card">
        <h1 className="text-xl font-semibold">Reading Practice</h1>
        <p className="text-sm text-gray-600">Skim for gist, scan for detail, and answer questions under time.</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between">
          <div className="font-medium">Passage</div>
          <div className="text-xs px-2 py-1 bg-gray-100 rounded">3 questions ? 8 minutes</div>
        </div>
        <p className="mt-2 text-gray-800 whitespace-pre-line">{passage}</p>
      </div>

      <ol className="space-y-4">
        {questions.map((q, idx)=> (
          <li key={idx} className="card">
            <div className="font-medium">{idx+1}. {q.q}</div>
            <div className="mt-2 grid sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi)=> (
                <button key={oi} onClick={()=>!submitted && setAnswers(a=>({...a,[idx]:oi}))} className={`text-left px-3 py-2 rounded-md border text-sm ${answers[idx]===oi?'border-brand-300 bg-brand-50':''} ${submitted && q.answer===oi?'border-green-300 bg-green-50':''}`}>{opt}</button>
              ))}
            </div>
          </li>
        ))}
      </ol>

      <div className="flex items-center gap-2">
        {!submitted ? (
          <button className="btn" onClick={()=>setSubmitted(true)}>Submit</button>
        ) : (
          <span className="px-3 py-2 rounded-md bg-green-50 text-green-700 border border-green-200 text-sm">Score: {score}/{questions.length}</span>
        )}
      </div>
    </div>
  );
}
