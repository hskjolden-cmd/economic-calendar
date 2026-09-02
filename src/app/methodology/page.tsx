import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-4">Methodology & Limitations</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          The Economic Calendar is designed to illustrate global economic disparities in a relatable way. 
          By translating abstract figures like GDP per capita into calendar dates, we can better understand 
          the scale of global inequality.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>The Motivation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            The inspiration for this project came from the concept of <strong>"Equal Pay Day."</strong> Every year, usually in November, articles and campaigns point out that because of the gender pay gap, "from now on, women effectively work for free for the rest of the year" compared to their male counterparts.
          </p>
          <p>
            This framing is incredibly powerful because it translates abstract percentages into a visceral, relatable concept: time. We wanted to take that exact same conceptual framework and apply it to global economic inequality. If a person in an average-income country makes a fraction of what someone in a high-income benchmark country makes, at what point in the calendar year have they "stopped earning" relative to that benchmark? This calendar provides that visualization.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>The Core Calculation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            For each country, we calculate a ratio comparing its economic output to Norway's:
          </p>
          <div className="bg-slate-50 p-4 rounded-md border font-mono text-sm">
            ratio = country_value / norway_value<br />
            day_of_year = round(ratio * 365)
          </div>
          <p>
            This day of the year is then converted into a calendar date. For example, if a country has 25% of Norway's 
            economic output, its comparison date is approximately day 91, which falls in early April.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Metrics Explained</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <h3 className="font-semibold text-slate-900 mt-2">GNI per capita (PPP)</h3>
          <p>
            Gross National Income (GNI) per capita converted to international dollars using purchasing power parity (PPP) rates. 
            <strong> This is our recommended metric.</strong> PPP takes into account the local cost of living, providing a more 
            accurate comparison of actual living standards than nominal exchange rates.
          </p>
          
          <h3 className="font-semibold text-slate-900 mt-4">GDP per capita (PPP)</h3>
          <p>
            Gross Domestic Product (GDP) measures the total economic output within a country's borders, whereas GNI includes 
            income earned by citizens abroad. For most countries, GDP and GNI are similar, but PPP remains crucial for fair comparison.
          </p>

          <h3 className="font-semibold text-slate-900 mt-4">GDP per capita (Nominal)</h3>
          <p>
            This metric uses standard market exchange rates. It does not account for differences in the cost of living between 
            countries. As a result, it often exaggerates the gap between high-income and low-income nations.
          </p>
        </CardContent>
      </Card>

      <Card className="border-amber-200">
        <CardHeader className="bg-amber-50">
          <CardTitle className="text-amber-900">Important Limitations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-amber-900/80 pt-6">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>It is an average:</strong> GDP and GNI per capita are averages. They do not show how income is distributed within a country.</li>
            <li><strong>Ignores inequality:</strong> A high average does not mean every citizen is wealthy, and a low average doesn't capture the wealth of local elites.</li>
            <li><strong>Not individual wages:</strong> These metrics represent total economic output or income per person, not actual salaries or disposable income.</li>
            <li><strong>PPP is an estimate:</strong> Purchasing Power Parity involves complex calculations based on baskets of goods and can be subject to revision and debate.</li>
            <li><strong>Internal cost of living differences:</strong> Cost of living can vary drastically within a single country (e.g., rural vs. urban areas), which a national average misses.</li>
            <li><strong>Norway is a benchmark, not a moral standard:</strong> Norway is used purely as a high-income reference point due to its consistently high rankings. It is not intended to represent a perfect or required economic model.</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="pb-12 text-sm text-slate-500">
        All data is sourced from the World Bank API.
      </div>
    </div>
  );
}
