import { getYears, getMetrics, getCountries } from '@/lib/db';
import { Selectors } from '@/components/Selectors';
import { MapView } from '@/components/MapView';

export default function MapPage({
  searchParams,
}: {
  searchParams: { year?: string; indicator?: string; benchmark?: string };
}) {
  const years = getYears();
  const countries = getCountries();
  
  // Defaults
  const currentYear = searchParams.year ? parseInt(searchParams.year) : years[0];
  const currentIndicator = searchParams.indicator || 'gni_ppp';
  const currentBenchmark = searchParams.benchmark || 'NOR';

  const rawData = getMetrics(currentYear, currentIndicator);
  
  const benchmarkCountry = rawData.find(d => d.country_code === currentBenchmark);
  const benchmarkValue = benchmarkCountry ? benchmarkCountry.value : 1; // fallback
  const benchmarkName = benchmarkCountry?.country_name ??
    (countries.find(c => c.code === currentBenchmark)?.name ?? 'Unknown');

  // Recalculate ratios
  const data = rawData.map(d => {
    const ratio = d.value / benchmarkValue;
    let day = Math.round(ratio * 365);
    if (day < 1) day = 1;
    if (day > 365) day = 365;
    return { ...d, ratio, comparison_day: day };
  });

  const metricNames: Record<string, string> = {
    'gni_ppp': 'GNI per capita (PPP)',
    'gdp_ppp': 'GDP per capita (PPP)',
    'gdp_nom': 'GDP per capita (Nominal)',
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Interactive Map</h1>
        <p className="text-slate-600">
          Explore economic metrics geographically. Color grading indicates the ratio relative to {benchmarkName}.
        </p>
      </div>

      <Selectors 
        years={years} 
        currentYear={currentYear} 
        currentIndicator={currentIndicator} 
        countries={countries}
        currentBenchmark={currentBenchmark}
      />

      <div className="mt-8">
          <MapView
            key={currentBenchmark}
            data={data}
            metricName={metricNames[currentIndicator]}
            benchmarkCode={currentBenchmark}
            benchmarkName={benchmarkName}
          />
      </div>
    </main>
  );
}
