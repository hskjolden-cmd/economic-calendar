
import path from 'path';
import { MetricRecord } from '@/types';

// Connect to SQLite DB
const dbPath = path.resolve(process.cwd(), 'economic_data.db');
let db: any;

export function getDb() {
  if (!db) {
    if (typeof window === 'undefined') {
      const BetterSqlite3 = require('better-sqlite3');
      db = new BetterSqlite3(dbPath, { readonly: true });
    } else {
      throw new Error('Database access is not available on client side');
    }
  }
  return db;
}

export function getYears(): number[] {
  const db = getDb();
  const stmt = db.prepare('SELECT DISTINCT year FROM metrics ORDER BY year DESC');
  const rows = stmt.all() as { year: number }[];
  return rows.map((r) => r.year);
}

export function getCountries(): { code: string; name: string }[] {
  const db = getDb();
  const stmt = db.prepare('SELECT DISTINCT country_code as code, country_name as name FROM metrics ORDER BY name ASC');
  return stmt.all() as { code: string; name: string }[];
}

export function getMetrics(year: number, indicator: string): MetricRecord[] {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM metrics WHERE year = ? AND indicator = ? ORDER BY ratio DESC');
  return stmt.all(year, indicator) as MetricRecord[];
}

export function getCountryData(country_code: string, year: number, indicator: string): MetricRecord | undefined {
  const db = getDb();
  const stmt = db.prepare('SELECT * FROM metrics WHERE country_code = ? AND year = ? AND indicator = ?');
  return stmt.get(country_code, year, indicator) as MetricRecord | undefined;
}

// Count how many countries have data for a given year and indicator
export function countCountriesWithData(year: number, indicator: string): number {
  const db = getDb();
  const stmt = db.prepare('SELECT COUNT(DISTINCT country_code) as cnt FROM metrics WHERE year = ? AND indicator = ?');
  const row = stmt.get(year, indicator) as { cnt: number };
  return row.cnt;
}

// Get the latest year with data for a specific country and indicator
export function getLatestAvailableYear(countryCode: string, indicator: string): number | null {
  const db = getDb();
  const stmt = db.prepare('SELECT year FROM metrics WHERE country_code = ? AND indicator = ? ORDER BY year DESC LIMIT 1');
  const row = stmt.get(countryCode, indicator) as { year: number } | undefined;
  return row ? row.year : null;
}

// Get latest available year for each country for a given indicator (single efficient query)
export function getLatestAvailableYearForCountries(indicator: string): Record<string, number> {
  const db = getDb();
  const stmt = db.prepare('SELECT country_code, MAX(year) as year FROM metrics WHERE indicator = ? GROUP BY country_code');
  const rows = stmt.all(indicator) as { country_code: string; year: number }[];
  const result: Record<string, number> = {};
  rows.forEach(r => {
    result[r.country_code] = r.year;
  });
  return result;
}

