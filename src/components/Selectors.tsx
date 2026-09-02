'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export function Selectors({
  years,
  currentYear,
  currentIndicator,
  countries,
  currentBenchmark,
  availableCount,
  totalCountries,
  benchmarkHasData,
  benchmarkLatestYear,
}: {
  years: number[];
  currentYear: number;
  currentIndicator: string;
  countries: { code: string; name: string }[];
  currentBenchmark: string;
  availableCount: number;
  totalCountries: number;
  benchmarkHasData: boolean;
  benchmarkLatestYear: number | null;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleYearChange = (val: string | null) => {
    if (!val) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('year', val);
    router.push(`?${params.toString()}`);
  };

  const handleIndicatorChange = (val: string | null) => {
    if (!val) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('indicator', val);
    router.push(`?${params.toString()}`);
  };

  const handleBenchmarkChange = (val: string | null) => {
    if (!val) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('benchmark', val);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Metric selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Select Metric</label>
        <select
          value={currentIndicator}
          onChange={(e) => handleIndicatorChange(e.target.value)}
          className="w-full sm:w-[240px] h-10 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="gni_ppp">GNI per capita (PPP)</option>
          <option value="gdp_ppp">GDP per capita (PPP)</option>
          <option value="gdp_nom">GDP per capita (Nominal)</option>
        </select>
      </div>

      {/* Benchmark selector */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Benchmark Country</label>
        <select
          value={currentBenchmark}
          onChange={(e) => handleBenchmarkChange(e.target.value)}
          className="w-full sm:w-[240px] h-10 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Year selector with availability indicator */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Data Year</label>
        <div className="flex items-center gap-2">
          <select
            value={currentYear.toString()}
            onChange={(e) => handleYearChange(e.target.value)}
            className="w-full sm:w-[120px] h-10 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            {years.map((y) => (
              <option key={y} value={y.toString()}>{y}</option>
            ))}
          </select>
          <div className="text-xs text-slate-600" title="Number of countries with data for the selected year and metric">
            {availableCount} of {totalCountries} countries with data
          </div>
        </div>
      </div>

      {/* Amber warning when benchmark lacks data for selected year */}
      {!benchmarkHasData && (
        <div className="text-sm text-amber-700" role="alert">
          No {currentYear} data available for {countries.find((c) => c.code === currentBenchmark)?.name || currentBenchmark}. Latest available: {benchmarkLatestYear}.
        </div>
      )}
    </div>
  );
}
