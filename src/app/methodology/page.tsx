import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Motivation */}
      <Card>
        <CardHeader>
          <CardTitle>Motivation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>
            The idea for Economic Calendar came in 2025, when I{" "}
            <a
              href="https://www.forskning.no/likestilling/i-dag-jobber-kvinner-gratis-ut-aret-hva-betyr-egentlig-det/2109606"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              saw an article
            </a>{" "}
            saying that, because of the pay gap, women could be said to ‘work for free’ from a certain date until the end of the year.
          </p>
          <p>
            I’m not going to get into the pay-gap debate here, but the way they turned a percentage into a date stuck with me. It made something abstract much easier to picture.
          </p>
          <p>
            That made me wonder whether the same idea could be used to show economic differences between countries.
          </p>
          <p>
            Instead of only saying that one country is at, for example, 50% of another country’s level, why not turn that 50% into a point halfway through the year?
          </p>
          <p>
            That became the basic idea behind Economic Calendar.
          </p>
        </CardContent>
      </Card>

      {/* 1. How does this work? */}
      <Card>
        <CardHeader>
          <CardTitle>How does this work?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>The idea behind Economic Calendar is pretty simple:</p>
          <p>Take an economic measure for one country, compare it with another country, and turn the difference into a date on the calendar.</p>
          <p>If a country is at 50% of the benchmark country's level, it lands roughly halfway through the year.</p>
          <p>The tricky part is deciding what we actually mean by a country's “economic level”. That is where GDP, GNI and PPP come in.</p>
        </CardContent>
      </Card>

      {/* 2. What are we actually comparing? */}
      <Card>
        <CardHeader>
          <CardTitle>What are we actually comparing?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>None of the numbers in this app are supposed to represent what a typical person earns.</p>
          <p>GDP and GNI are measurements of a whole country's economy. “Per capita” means that the total number is divided by the population, which makes countries of very different sizes easier to compare.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>GNI per capita (PPP) — Recommended</strong><br />
              I think of GNI as asking: “Which country does the income from economic activity belong to?” It includes income connected to a country’s people and businesses, even when some of that income comes from abroad. The “per capita” part means we divide the country’s GNI by its population. PPP adjusts for the fact that the same amount of money can buy very different things in different countries. For example, $1,000 may cover much more food, rent and everyday expenses in one country than in another. PPP tries to answer: “How much can people actually buy with the money in their own country?”
            </li>
            <li>
              <strong>GDP per capita (PPP)</strong><br />
              I think of GDP as asking: “Where was the economic value created?” GDP measures economic activity that happens inside a country’s borders. For example, if a German company owns a factory in Norway, what that factory produces contributes to Norwegian GDP because the production happens in Norway. Again, we divide by the population and use PPP to account for different price levels.
            </li>
            <li>
              <strong>GDP per capita (Nominal)</strong><br />
              This uses the same GDP idea, but does not adjust for differences in local prices. Instead, countries are compared using normal market exchange rates. That can be useful, but it can also make countries with lower prices look poorer than they feel to someone actually living there.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 3. GDP vs GNI */}
      <Card>
        <CardHeader>
          <CardTitle>GDP vs GNI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>The easiest way I remember the difference is:</p>
          <p><strong>GDP = In what country was the value created?</strong></p>
          <p><strong>GNI = What country does the resulting income belong to?</strong></p>
          <p>For many countries the numbers are fairly similar, but they can differ when a lot of money flows in or out of the country.</p>
        </CardContent>
      </Card>

      {/* 4. What does PPP mean? */}
      <Card>
        <CardHeader>
          <CardTitle>What does PPP mean?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>PPP stands for Purchasing Power Parity.</p>
          <p>The name sounds more complicated than the idea.</p>
          <p>Imagine that the same basic shopping basket costs:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Norway: $100</li>
            <li>Country B: $50</li>
          </ul>
          <p>Someone with $1,000 in Country B can therefore buy more locally than someone with $1,000 in Norway. A comparison based only on exchange rates would miss some of this difference. PPP tries to adjust for that.</p>
          <p>That is why the PPP measurements are usually more useful in this app when the goal is to compare economic levels across countries.</p>
        </CardContent>
      </Card>

      {/* 5. Which one should I use? */}
      <Card>
        <CardHeader>
          <CardTitle>Which one should I use?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>GNI per capita (PPP)</strong> – A useful general comparison of economic levels between countries, including income connected to a country’s residents and adjusting for different price levels.</li>
            <li><strong>GDP per capita (PPP)</strong> – Useful if you care more about the economic activity taking place inside each country.</li>
            <li><strong>GDP per capita (Nominal)</strong> – Useful if you specifically want to compare countries using actual market exchange rates without adjusting for local prices.</li>
          </ul>
          <p>There is no single “correct” measurement. They answer slightly different questions.</p>
        </CardContent>
      </Card>

      {/* 6. How does a number become a date? */}
      <Card>
        <CardHeader>
          <CardTitle>How does a number become a date?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>The benchmark country represents a full year: 31 December.</p>
          <p>Every other country is placed on the calendar based on its value compared with the benchmark.</p>
          <p>Simple example:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Benchmark country: 100</li>
            <li>Country B: 50</li>
          </ul>
          <p>Country B is at 50% of the benchmark. 50% of a year is roughly half a year, so Country B lands around the beginning of July. A country at 25% would land around the end of March. A country at 75% would land around the end of September.</p>
          <p>The calendar is therefore just another way of visualising the ratio between two countries.</p>
        </CardContent>
      </Card>

      {/* 7. What does the date actually mean? */}
      <Card>
        <CardHeader>
          <CardTitle>What does the date actually mean?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>The date is a visual comparison. It is not saying that people in that country “run out of money” on that day.</p>
          <p>For example: If Sweden lands on 20 November when Norway is the benchmark, it simply means that Sweden's value for the selected measurement is roughly the same percentage of Norway's value as 20 November is of a full year.</p>
          <p>The calendar is meant to make percentages easier to see and compare.</p>
        </CardContent>
      </Card>

      {/* 8. Missing data */}
      <Card>
        <CardHeader>
          <CardTitle>Missing data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>Not every country has data for every year.</p>
          <p>When a country is missing data for the year you selected, the app does not quietly replace it with an older number. Instead, it is shown as “No data” where possible.</p>
          <p>You may therefore see fewer countries when selecting newer years such as 2024 or 2025.</p>
          <p>The app also shows how many countries have data for the current year and measurement. This is intentional. Comparing a 2022 number for one country with a 2025 number for another could give a misleading result.</p>
        </CardContent>
      </Card>

      {/* 9. What this does NOT tell you */}
      <Card>
        <CardHeader>
          <CardTitle>What this does NOT tell you</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>These numbers can be useful, but they do not tell the whole story. Economic Calendar does NOT directly tell you:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>what the average person earns</li>
            <li>what a normal salary is</li>
            <li>how equally money is distributed</li>
            <li>how wealthy households are</li>
            <li>how expensive everything feels to an individual</li>
            <li>how happy people are</li>
            <li>which country has the best quality of life</li>
          </ul>
          <p>Two countries can have similar GDP or GNI per capita and still be very different places to live.</p>
        </CardContent>
      </Card>

      {/* 10. Where does the data come from? */}
      <Card>
        <CardHeader>
          <CardTitle>Where does the data come from?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>All data used in Economic Calendar comes from the World Bank’s World Development Indicators.</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              GNI per capita, PPP (current international $) –{" "}
              <a
                href="https://data.worldbank.org/indicator/NY.GNP.PCAP.PP.CD"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View this indicator at the World Bank ↗
              </a>
              <br />
              <small className="text-sm text-slate-500">NY.GNP.PCAP.PP.CD</small>
            </li>
            <li>
              GDP per capita, PPP (current international $) –{" "}
              <a
                href="https://data.worldbank.org/indicator/NY.GDP.PCAP.PP.CD"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View this indicator at the World Bank ↗
              </a>
              <br />
              <small className="text-sm text-slate-500">NY.GDP.PCAP.PP.CD</small>
            </li>
            <li>
              GDP per capita (current US$) –{" "}
              <a
                href="https://data.worldbank.org/indicator/NY.GDP.PCAP.CD"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View this indicator at the World Bank ↗
              </a>
              <br />
              <small className="text-sm text-slate-500">NY.GDP.PCAP.CD</small>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 11. Why a calendar? */}
      <Card>
        <CardHeader>
          <CardTitle>Why a calendar?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-slate-700">
          <p>Percentages are useful, but they are not always easy to picture. “Country A is at 43% of Country B” is fairly abstract.</p>
          <p>Putting 43% of a year onto a calendar gives that number something familiar to compare with.</p>
          <p>That is really the whole idea behind Economic Calendar. It is not meant to replace normal economic statistics. It is just another way of looking at them.</p>
        </CardContent>
      </Card>

      {/* 12. Technical details (collapsible) */}
      <details className="border rounded-lg p-4 bg-slate-50 text-slate-800">
        <summary className="font-semibold cursor-pointer select-none">Technical details</summary>
        <div className="mt-3 space-y-2 text-sm text-slate-700">
          <p>Formula used to turn a ratio into a day of the year:</p>
          <pre className="bg-slate-100 p-2 rounded font-mono text-xs text-slate-800">
ratio = country_value / benchmark_value&#10;day_of_year = Math.round(ratio * 365)
          </pre>
          <p>Indicator codes (with links) are listed in the “Where does the data come from?” section above.</p>
          <p>All calculations are performed client-side using the selected metric and year.</p>
        </div>
      </details>

      <div className="pb-12 text-sm text-slate-500">
        All data is sourced from the World Bank API.
      </div>
    </div>
  );
}
