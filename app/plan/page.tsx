"use client";

import { useEffect, useMemo, useState } from 'react';
import type { WeekPlan } from '@/lib/planGenerator';

export default function PlanPage() {
  const [plan, setPlan] = useState<WeekPlan[]>([]);
  const [name, setName] = useState<string>('');
  const [target, setTarget] = useState<number>(7.0);

  useEffect(() => {
    const p = localStorage.getItem('icp_plan');
    const profile = localStorage.getItem('icp_profile');
    if (p) setPlan(JSON.parse(p));
    if (profile) {
      const pr = JSON.parse(profile);
      setName(pr.name || '');
      setTarget(pr.targetBand || 7.0);
    }
  }, []);

  const weeks = useMemo(()=>plan.length, [plan]);

  if (!plan.length) return (
    <div className="card">
      <p className="text-sm">No plan found. Please create one on the home page.</p>
      <a className="btn mt-3" href="/">Create Plan</a>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{name ? `${name}'s` : 'Your'} IELTS Plan</h1>
          <p className="text-sm text-gray-600">{weeks} weeks, target band {target}</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-md border text-sm" onClick={()=>window.print()}>Print / Save PDF</button>
          <a className="btn" href="/">Edit Profile</a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 print:grid-cols-2">
        {plan.map(week => (
          <div key={week.week} className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{week.theme}</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2">
                  {week.goals.map((g, idx)=>(<li key={idx}>{g}</li>))}
                </ul>
              </div>
              <span className="text-xs bg-brand-50 text-brand-700 border border-brand-200 px-2 py-1 rounded-md">Focus: {week.focus.join(' + ')}</span>
            </div>
            <div className="mt-3">
              <table className="w-full text-sm">
                <tbody>
                  {week.daily.map(d => (
                    <tr key={d.day} className="align-top">
                      <td className="py-2 w-16 font-medium text-gray-600">{d.day}</td>
                      <td className="py-2">
                        <ul className="list-disc list-inside space-y-1">
                          {d.tasks.map((t, idx)=>(<li key={idx}>{t}</li>))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
