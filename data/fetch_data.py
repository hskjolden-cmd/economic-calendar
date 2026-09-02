import requests
import sqlite3
import math
from datetime import datetime, timedelta

# Indicators mapping
INDICATORS = {
    'gni_ppp': 'NY.GNP.PCAP.PP.CD',
    'gdp_ppp': 'NY.GDP.PCAP.PP.CD',
    'gdp_nom': 'NY.GDP.PCAP.CD'
}

START_YEAR = 2015
END_YEAR = datetime.now().year - 1
YEARS = f"{START_YEAR}:{END_YEAR}"
DB_PATH = 'economic_data.db'

def fetch_indicator_data(indicator_code):
    url = f"https://api.worldbank.org/v2/country/all/indicator/{indicator_code}?format=json&per_page=5000&date={YEARS}&source=2"
    response = requests.get(url)
    if response.status_code != 200:
        print(f"Failed to fetch data for {indicator_code}")
        return []
    
    data = response.json()
    if len(data) < 2:
        return []
    
    return data[1]

def get_countries_info():
    url = "https://api.worldbank.org/v2/country/all?format=json&per_page=5000&source=2"
    response = requests.get(url)
    data = response.json()
    if len(data) < 2:
        return {}
    
    countries = {}
    for item in data[1]:
        # Filter out aggregates, keep only actual countries (region.id != 'NA')
        if item['region']['id'] != 'NA':
            countries[item['id']] = {
                'name': item['name'],
                'region': item['region']['value']
            }
    return countries

def main():
    print("Fetching countries info...")
    countries = get_countries_info()
    
    raw_data = {} # (country_code, year, indicator_key) -> value
    
    for key, code in INDICATORS.items():
        print(f"Fetching data for {key} ({code})...")
        items = fetch_indicator_data(code)
        for item in items:
            country_code = item['countryiso3code']
            if not country_code or country_code not in countries:
                continue
            
            value = item['value']
            if value is None:
                continue
            
            year = int(item['date'])
            raw_data[(country_code, year, key)] = value

    # Create SQLite DB
    print("Creating SQLite database...")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            country_code TEXT,
            country_name TEXT,
            region TEXT,
            year INTEGER,
            indicator TEXT,
            value REAL,
            norway_value REAL,
            ratio REAL,
            comparison_day INTEGER
        )
    ''')
    cursor.execute('DELETE FROM metrics') # Clear existing data
    
    # Process data and calculate ratios
    norway_code = 'NOR'
    
    records_to_insert = []
    
    # We need to process by year and indicator
    for year in range(START_YEAR, END_YEAR + 1):
        for ind_key in INDICATORS.keys():
            # Get Norway value for this year and indicator
            norway_val = raw_data.get((norway_code, year, ind_key))
            if not norway_val:
                continue
            
            for country_code in countries.keys():
                val = raw_data.get((country_code, year, ind_key))
                if val is None:
                    continue
                
                ratio = val / norway_val
                day_of_year = round(ratio * 365)
                # Clamp day_of_year between 1 and 365
                day_of_year = max(1, min(365, day_of_year))
                
                records_to_insert.append((
                    country_code,
                    countries[country_code]['name'],
                    countries[country_code]['region'],
                    year,
                    ind_key,
                    val,
                    norway_val,
                    ratio,
                    day_of_year
                ))
    
    cursor.executemany('''
        INSERT INTO metrics (
            country_code, country_name, region, year, indicator, 
            value, norway_value, ratio, comparison_day
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', records_to_insert)
    
    conn.commit()
    
    # Add indexes for performance
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_year ON metrics (year)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_indicator ON metrics (indicator)')
    
    conn.close()
    
    print(f"Saved {len(records_to_insert)} records to {DB_PATH}")

if __name__ == "__main__":
    main()
