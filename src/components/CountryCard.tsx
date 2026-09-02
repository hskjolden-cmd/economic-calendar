'use client';

import { MetricRecord } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addDays } from 'date-fns';

export function CountryCard({ 
  data, 
  metricName,
  benchmarkName = 'Norway',
  benchmarkValue
}: { 
  data: MetricRecord, 
  metricName: string,
  benchmarkName?: string,
  benchmarkValue?: number
}) {
  if (!data) return null;

  // Day 1 = Jan 1
  const date = addDays(new Date(data.year, 0, 1), data.comparison_day - 1);
  const formattedDate = format(date, 'MMMM do');

  const comparisonValue = benchmarkValue || data.norway_value;

  return (
    <Card className="w-full max-w-md shadow-lg border-slate-200">
      <CardHeader className="bg-slate-50 border-b">
        <CardTitle className="text-2xl font-bold">{data.country_name}</CardTitle>
        <CardDescription>{data.region}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <p className="text-sm text-slate-500 uppercase font-semibold">{metricName} ({data.year})</p>
          <div className="flex justify-between items-end mt-1">
            <span className="text-2xl font-medium">${Math.round(data.value).toLocaleString()}</span>
            <span className="text-sm text-slate-500 mb-1">{benchmarkName}: ${Math.round(comparisonValue).toLocaleString()}</span>
          </div>
        </div>
        
        <div className="h-px bg-slate-100 w-full my-2"></div>

        <div>
          <p className="text-sm text-slate-500 uppercase font-semibold">{benchmarkName} Comparison</p>
          <p className="mt-1">
            <span className="text-xl font-medium">{(data.ratio * 100).toFixed(1)}%</span> of {benchmarkName}'s average.
          </p>
        </div>

        <div className="bg-slate-100 p-4 rounded-lg mt-4">
          <p className="text-sm text-slate-700 font-medium">Economic level date</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{formattedDate}</p>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            This date shows when {data.country_name}'s economic output per person reaches the same point in the benchmark year as {benchmarkName}'s, using the selected metric.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
