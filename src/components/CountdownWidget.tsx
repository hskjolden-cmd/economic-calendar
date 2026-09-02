'use client';

import { useState, useEffect } from 'react';
import { MetricRecord } from '@/types';
import { format, addDays, getDayOfYear } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';

export function CountdownWidget({
  data,
  countries,
  currentBenchmark,
  benchmarkName
}: {
  data: MetricRecord[];
  countries: { code: string, name: string }[];
  currentBenchmark: string;
  benchmarkName: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const handleBenchmarkChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('benchmark', val);
    router.push(`?${params.toString()}`);
  };

  if (!today) return <div className="h-64 animate-pulse bg-slate-100 rounded-2xl mb-12"></div>;

  const currentDayOfYear = getDayOfYear(today);
  
  // Sort data by comparison_day
  const sorted = [...data].sort((a, b) => a.comparison_day - b.comparison_day);
  
  // Find past and upcoming
  const past = sorted.filter(d => d.comparison_day < currentDayOfYear && d.country_code !== currentBenchmark).reverse().slice(0, 3);
  const upcoming = sorted.filter(d => d.comparison_day >= currentDayOfYear && d.country_code !== currentBenchmark).slice(0, 3);

  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden mb-12">
      <div className="bg-slate-900 text-white p-8 text-center relative">
        <h2 className="text-sm uppercase tracking-widest text-slate-400 font-bold mb-2">Today is</h2>
        <div className="text-5xl font-extrabold mb-4">{format(today, 'MMMM do')}</div>
        <div className="text-lg text-slate-300 flex flex-wrap items-center justify-center gap-2">
          <span>Tracking economic level dates relative to</span>
          <select 
            value={currentBenchmark}
            onChange={e => handleBenchmarkChange(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white text-base rounded px-2 py-1 font-bold focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {countries.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x border-t">
        <div className="p-6 bg-slate-50">
          <h3 className="text-slate-500 font-bold uppercase text-sm tracking-wider mb-6 flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-400 mr-2"></span> Recently Passed
          </h3>
          <div className="space-y-4">
            {past.length > 0 ? past.map(c => {
              const diff = currentDayOfYear - c.comparison_day;
              return (
                <div key={c.country_code} className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm hover:border-slate-300 transition-colors">
                  <div>
                    <div className="font-bold text-slate-800">{c.country_name}</div>
                    <div className="text-sm text-slate-500">{(c.ratio * 100).toFixed(1)}% of {benchmarkName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-700">{diff} {diff === 1 ? 'day' : 'days'} ago</div>
                    <div className="text-xs text-slate-400">{format(addDays(new Date(today.getFullYear(), 0, 1), c.comparison_day - 1), 'MMM do')}</div>
                  </div>
                </div>
              );
            }) : <p className="text-slate-500 italic">No recent countries</p>}
          </div>
        </div>

        <div className="p-6 bg-slate-50">
          <h3 className="text-slate-500 font-bold uppercase text-sm tracking-wider mb-6 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span> Upcoming
          </h3>
          <div className="space-y-4">
            {upcoming.length > 0 ? upcoming.map(c => {
              const diff = c.comparison_day - currentDayOfYear;
              return (
                <div key={c.country_code} className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm hover:border-slate-300 transition-colors">
                  <div>
                    <div className="font-bold text-slate-800">{c.country_name}</div>
                    <div className="text-sm text-slate-500">{(c.ratio * 100).toFixed(1)}% of {benchmarkName}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-blue-600">{diff === 0 ? 'Today!' : `In ${diff} ${diff === 1 ? 'day' : 'days'}`}</div>
                    <div className="text-xs text-slate-400">{format(addDays(new Date(today.getFullYear(), 0, 1), c.comparison_day - 1), 'MMM do')}</div>
                  </div>
                </div>
              );
            }) : <p className="text-slate-500 italic">No upcoming countries</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
