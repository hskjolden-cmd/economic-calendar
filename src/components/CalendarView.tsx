'use client';

import { MetricRecord } from '@/types';
import { useState, useMemo, useEffect } from 'react';
import { CountryCard } from './CountryCard';
import { X } from 'lucide-react';

// Scroll lock effect moved into component
import { format, addDays } from 'date-fns';
import { REGION_COLORS, getRegionColor } from '@/lib/colors';

export function CalendarView({ 
  data, 
  metricName, 
  benchmarkCode = 'NOR',
  benchmarkName = 'Norway' 
}: { 
  data: MetricRecord[], 
  metricName: string,
  benchmarkCode?: string,
  benchmarkName?: string
}) {
  const [selectedCountry, setSelectedCountry] = useState<MetricRecord | null>(null);

  // Scroll lock and Escape key handler for modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCountry(null);
      }
    };
    if (selectedCountry) {
      document.body.classList.add('overflow-hidden');
      document.addEventListener('keydown', handleKey);
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKey);
    };
  }, [selectedCountry]);

  // Group data by day of year (1-365)
  const daysMap = useMemo(() => {
    const map = new Map<number, MetricRecord[]>();
    data.forEach(d => {
      const existing = map.get(d.comparison_day) || [];
      map.set(d.comparison_day, [...existing, d]);
    });
    return map;
  }, [data]);

  const months = [
    { name: 'Jan', days: 31 }, { name: 'Feb', days: 28 }, { name: 'Mar', days: 31 },
    { name: 'Apr', days: 30 }, { name: 'May', days: 31 }, { name: 'Jun', days: 30 },
    { name: 'Jul', days: 31 }, { name: 'Aug', days: 31 }, { name: 'Sep', days: 30 },
    { name: 'Oct', days: 31 }, { name: 'Nov', days: 30 }, { name: 'Dec', days: 31 }
  ];

  let currentDayOfYear = 1;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4 items-center p-4 bg-white rounded-xl border shadow-sm text-sm">
        <span className="font-semibold text-slate-700">Regions:</span>
        {Object.entries(REGION_COLORS).map(([region, colorClass]) => (
          <div key={region} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full ${colorClass.split(' ')[0]}`} />
            <span className="text-slate-600">{region}</span>
          </div>
        ))}
      </div>

      <p className="text-sm text-center text-slate-600 lg:hidden mt-2 mb-4">Tap a dot to view country details</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 overflow-x-auto">
          <div className="min-w-[800px] grid grid-cols-12 gap-1 bg-white p-4 rounded-xl border shadow-sm">
            {months.map((month, mIdx) => {
              const startDay = currentDayOfYear;
              currentDayOfYear += month.days;
              
              return (
                <div key={mIdx} className="flex flex-col">
                  <div className="text-center font-semibold text-slate-700 py-2 border-b bg-slate-50 text-sm">
                    {month.name}
                  </div>
                  <div className="flex flex-col flex-1 mt-1">
                    {Array.from({ length: month.days }).map((_, dIdx) => {
                      const dayOfYear = startDay + dIdx;
                      const countriesHere = daysMap.get(dayOfYear) || [];
                      const isBenchmarkDay = dayOfYear === 365;

                      return (
                        <div 
                          key={dIdx} 
                          className={`
                            relative h-8 sm:h-10 border-b border-r border-slate-100 p-0.5 group hover:bg-slate-50 transition-colors
                            ${countriesHere.length > 0 ? 'bg-slate-50/50' : ''}
                            ${isBenchmarkDay ? 'bg-green-100/50' : ''}
                          `}
                        >
                          <div className="text-[10px] text-slate-400 absolute top-0.5 left-1 z-0">
                            {dIdx + 1}
                          </div>
                          <div className="flex flex-wrap gap-0.5 relative z-10 mt-3 pl-1">
                            {countriesHere.map(c => (
                              <button
                                key={c.country_code}
                                onClick={() => setSelectedCountry(c)}
                                title={c.country_name}
                                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors cursor-pointer ring-1 ring-white ${getRegionColor(c.region)}`}
                              />
                            ))}
                            {isBenchmarkDay && (
                              <div className="text-[10px] font-bold text-green-700 px-1 rounded bg-green-200 mt-[-2px]">
                                {benchmarkCode}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="w-full lg:w-96">
          <div className="sticky top-24 hidden lg:block">
            {selectedCountry ? (
              <CountryCard 
                data={selectedCountry} 
                metricName={metricName} 
                benchmarkName={benchmarkName}
                benchmarkValue={data.find(d => d.country_code === benchmarkCode)?.value}
              />
            ) : (
              <div className="bg-slate-50 border rounded-xl p-8 text-center text-slate-500 h-64 flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p>Click on a dot in the calendar to see country details.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedCountry && (
        <div
          className="lg:hidden fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedCountry(null);
          }}
        >
          <div className="bg-white rounded-lg max-w-md w-full p-4 relative transform transition-transform duration-300 ease-out scale-100">
            <button
              className="absolute top-2 right-2 p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Close"
              onClick={() => setSelectedCountry(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <CountryCard 
              data={selectedCountry} 
              metricName={metricName} 
              benchmarkName={benchmarkName}
              benchmarkValue={data.find((d) => d.country_code === benchmarkCode)?.value}
            />
          </div>
        </div>
      )}
    </div>
  );
}
