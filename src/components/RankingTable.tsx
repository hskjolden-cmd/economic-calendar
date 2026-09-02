'use client';

import { MetricRecord } from '@/types';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { getRegionColor } from '@/lib/colors';
import { format, addDays } from 'date-fns';

export function RankingTable({ 
  data,
  benchmarkCode = 'NOR' 
}: { 
  data: MetricRecord[],
  benchmarkCode?: string
}) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = data.filter(d => 
    d.country_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.country_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
        <h2 className="font-semibold text-slate-800">Complete Rankings</h2>
        <input 
          type="text" 
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600 border-b">
            <tr>
              <th className="px-6 py-3 font-medium">Rank</th>
              <th className="px-6 py-3 font-medium">Country</th>
              <th className="px-6 py-3 font-medium">Region</th>
              <th className="px-6 py-3 font-medium">Value</th>
              <th className="px-6 py-3 font-medium">Ratio</th>
              <th className="px-6 py-3 font-medium">Equivalent Date</th>
            </tr>
          </thead>
          <tbody className="divide-y text-slate-700">
            {filteredData.map((d, i) => {
              const date = addDays(new Date(d.year, 0, 1), d.comparison_day - 1);
              const formattedDate = format(date, 'MMM d');
              
              return (
                <tr 
                  key={d.country_code} 
                  className={`hover:bg-slate-50 transition-colors ${d.country_code === benchmarkCode ? 'bg-green-50 hover:bg-green-100 font-medium' : ''}`}
                >
                  <td className="px-6 py-3">{i + 1}</td>
                  <td className="px-6 py-3 flex items-center gap-2">
                    <span>{d.country_name}</span>
                    {d.country_code === benchmarkCode && <span className="text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded font-bold">Benchmark</span>}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${getRegionColor(d.region).split(' ')[0]}`} />
                      <span>{d.region}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">${Math.round(d.value).toLocaleString()}</td>
                  <td className="px-6 py-3">{(d.ratio * 100).toFixed(1)}%</td>
                  <td className="px-6 py-3">{formattedDate}</td>
                </tr>
              );
            })}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No countries match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
