export interface MetricRecord {
  id: number;
  country_code: string;
  country_name: string;
  region: string;
  year: number;
  indicator: string;
  value: number;
  norway_value: number;
  ratio: number;
  comparison_day: number;
}
