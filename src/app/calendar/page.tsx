import { getYears, getMetrics, getCountries } from "@/lib/db";
import { Selectors } from "@/components/Selectors";
import { CalendarView } from "@/components/CalendarView";

export default function CalendarPage({
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
  const benchmarkValue = benchmarkCountry ? benchmarkCountry.value : 1;
  const benchmarkName = benchmarkCountry ? benchmarkCountry.country_name : 'Norway';

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
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Economic Calendar</h1>
        <p className="text-slate-600">
          Visualizing global economic metrics as dates relative to {benchmarkName}'s level.
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
        {data.length > 0 ? (
          <CalendarView 
            data={data} 
            metricName={metricNames[currentIndicator]} 
            benchmarkCode={currentBenchmark} 
            benchmarkName={benchmarkName} 
          />
        ) : (
          <div className="p-12 text-center text-slate-500 bg-white border rounded-xl">
            No data available for the selected year and metric.
          </div>
        )}
      </div>
    </main>
  );
}
