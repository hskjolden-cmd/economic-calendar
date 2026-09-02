import { getYears, getMetrics, getCountries } from "@/lib/db";
import { Selectors } from "@/components/Selectors";
import { CountdownWidget } from "@/components/CountdownWidget";
import Link from "next/link";
import { ArrowRight, CalendarDays, BarChart, MapIcon } from "lucide-react";
export const metadata = {
  title: "What if global economic differences were a calendar?",
  description: "Compare countries using GNI and GDP per capita, and see economic differences translated into calendar dates, maps and rankings.",
  openGraph: {
    title: "What if global economic differences were a calendar?",
    description: "Compare countries using GNI and GDP per capita, and see economic differences translated into calendar dates, maps and rankings.",
    url: "https://economic-calendar-topaz.vercel.app/",
    images: [{ url: "/og-image.png", width: 1200, height: 627 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What if global economic differences were a calendar?",
    description: "Compare countries using GNI and GDP per capita, and see economic differences translated into calendar dates, maps and rankings.",
    images: ["/og-image.png"],
  },
};
export default function Home({
  searchParams,
}: {
  searchParams: { year?: string; indicator?: string; benchmark?: string };
}) {
  const years = getYears();
  const countries = getCountries();
  
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

  const metricName = currentIndicator === 'gni_ppp' ? 'GNI per capita (PPP)' :
                     currentIndicator === 'gdp_ppp' ? 'GDP per capita (PPP)' : 'GDP per capita (Nominal)';

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <CountdownWidget 
        data={data} 
        countries={countries} 
        currentBenchmark={currentBenchmark} 
        benchmarkName={benchmarkName} 
      />

      <div className="text-center space-y-6 mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
          When does the world reach <span className="text-blue-600">{benchmarkName}'s</span> economic level?
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          We compare each country's average economic output to {benchmarkName} and display the result as a calendar date. 
          The date represents when, during the year, the average person in that country would reach their {benchmarkName}-comparable annual income level.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border mb-12">
        <h2 className="text-2xl font-bold mb-6">Explore the Data</h2>
        <Selectors 
          years={years} 
          currentYear={currentYear} 
          currentIndicator={currentIndicator} 
          countries={countries}
          currentBenchmark={currentBenchmark}
        />
        
        <div className="grid sm:grid-cols-3 gap-6 mt-8">
          <Link href={`/calendar?year=${currentYear}&indicator=${currentIndicator}&benchmark=${currentBenchmark}`} 
                className="group flex flex-col p-6 rounded-xl border-2 border-blue-100 hover:border-blue-500 hover:bg-blue-50 transition-all">
            <CalendarDays className="w-10 h-10 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700">Calendar View</h3>
            <p className="text-slate-600 text-sm flex-1">Explore a 365-day visualization showing when countries reach their income-equivalent date.</p>
            <div className="flex items-center text-blue-600 text-sm font-semibold mt-4 group-hover:translate-x-1 transition-transform">
              View Calendar <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link href={`/map?year=${currentYear}&indicator=${currentIndicator}&benchmark=${currentBenchmark}`} 
                className="group flex flex-col p-6 rounded-xl border-2 border-emerald-100 hover:border-emerald-500 hover:bg-emerald-50 transition-all">
            <MapIcon className="w-10 h-10 text-emerald-600 mb-4" />
            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-700">Interactive Map</h3>
            <p className="text-slate-600 text-sm flex-1">Explore a color-graded global map showing economic ratios relative to {benchmarkName}.</p>
            <div className="flex items-center text-emerald-600 text-sm font-semibold mt-4 group-hover:translate-x-1 transition-transform">
              View Map <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
          
          <Link href={`/ranking?year=${currentYear}&indicator=${currentIndicator}&benchmark=${currentBenchmark}`} 
                className="group flex flex-col p-6 rounded-xl border-2 border-slate-100 hover:border-slate-800 hover:bg-slate-50 transition-all">
            <BarChart className="w-10 h-10 text-slate-700 mb-4" />
            <h3 className="text-xl font-bold mb-2 group-hover:text-slate-900">Rankings Table</h3>
            <p className="text-slate-600 text-sm flex-1">See a complete list of all countries sorted by their economic output compared to {benchmarkName}.</p>
            <div className="flex items-center text-slate-700 text-sm font-semibold mt-4 group-hover:translate-x-1 transition-transform">
              View Rankings <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Why Norway?</h3>
        <p className="text-blue-800/80 mb-4">
          Norway consistently ranks among the highest in the world for GNI per capita and standard of living. 
          By using it as the default benchmark, we can contextualize global economic inequality in an intuitive, time-based format.
        </p>
        <Link href="/methodology" className="text-blue-700 font-semibold hover:underline">
          Read our full methodology and limitations &rarr;
        </Link>
      </div>
    </div>
  );
}
