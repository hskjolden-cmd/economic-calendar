You are a senior full-stack engineer, data engineer, and product designer.

Build an MVP for a web app called “Economic Calendar”.

Main idea:
The app compares each country’s average economic level to Norway and displays the result as a calendar date. The date represents when, during the year, the average person in that country would reach their Norway-comparable annual income level.

Example:
If a country has 25% of Norway’s GNI per capita PPP, its comparison date is approximately day 91 of the year. The app should show this on a calendar as that country’s “Norway comparison day”.

Important:
Do NOT frame this as literally “people work for free”. Use careful wording:
“Norway comparison day”
“Income-equivalent date”
“Compared with Norway’s average income level”

Tech stack:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Recharts if charts are needed
- Python scripts for data fetching and preprocessing
- SQLite for MVP data storage

Data sources:
Use World Bank API indicators:
- GNI per capita, PPP, current international dollars: NY.GNP.PCAP.PP.CD
- GDP per capita, PPP, current international dollars: NY.GDP.PCAP.PP.CD
- Optional nominal comparison: GDP per capita, current US dollars

Core calculation:
For each country:

ratio = country_value / norway_value
day_of_year = round(ratio * 365)

Clamp day_of_year between 1 and 365.

If ratio >= 1:
Show that the country is equal to or above Norway on this metric.

Convert day_of_year to a calendar date.

Build these pages:

1. Home page
- Explain the concept clearly
- Show Norway as the benchmark
- Let user select metric:
  - GNI per capita PPP
  - GDP per capita PPP
  - GDP per capita nominal
- Let user select year where data exists

2. Calendar page
- Display a full-year calendar
- Place countries on their calculated comparison dates
- Allow filtering by continent/region
- Clicking a country opens a detail card

3. Country detail page or modal
Show:
- Country name
- Selected metric
- Country value
- Norway value
- Ratio to Norway
- Comparison date
- Data year
- Source
- Short interpretation written in plain language

4. Ranking page
- Table of all countries
- Columns:
  - Rank
  - Country
  - Value
  - Ratio to Norway
  - Comparison date
  - Data year
- Sortable columns
- Search field

5. Methodology page
Explain:
- What the metric means
- Why PPP is better than nominal exchange-rate comparison for living-standard comparisons
- Limitations:
  - GDP/GNI per capita is an average
  - It does not show inequality
  - It does not show individual wages
  - PPP is an estimate
  - Cost of living differs within countries
  - Norway is used as a benchmark, not as a moral standard

Design:
- Clean, modern, slightly editorial/newsroom style
- Use calendar visuals prominently
- Use cards, badges, and small explanatory notes
- Make the app feel suitable for media, education, and social sharing
- Make the data source and methodology transparent

Backend/data tasks:
Create a Python script:
- Fetch World Bank data for all countries for the selected indicators
- Fetch Norway’s value for the same indicators
- Calculate ratios and dates
- Store results in SQLite or JSON
- Handle missing data gracefully
- Include source metadata and data year

Frontend tasks:
- Create reusable components:
  - MetricSelector
  - YearSelector
  - CountryCard
  - CalendarView
  - RankingTable
  - MethodologyNote
- Use TypeScript types for CountryEconomicData
- Include loading states and missing-data states
- Make the UI responsive

Deliver a working MVP with clean code, clear folder structure, and comments where useful.