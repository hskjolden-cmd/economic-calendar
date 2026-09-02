import Database from 'better-sqlite3';
import path from 'path';
import { MetricRecord } from '@/types';

// Connect to SQLite DB
const dbPath = path.resolve(process.cwd(), 'economic_data.db');
let db: Database.Database;

export function getDb() {
  if (!db) {
    db = new Database(dbPath, { readonly: true });
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
