export const REGION_COLORS: Record<string, string> = {
  'Latin America & Caribbean': 'bg-pink-500 hover:bg-pink-600',
  'South Asia': 'bg-orange-500 hover:bg-orange-600',
  'Sub-Saharan Africa': 'bg-red-500 hover:bg-red-600',
  'Europe & Central Asia': 'bg-blue-500 hover:bg-blue-600',
  'Middle East & North Africa': 'bg-amber-500 hover:bg-amber-600',
  'East Asia & Pacific': 'bg-emerald-500 hover:bg-emerald-600',
  'North America': 'bg-indigo-500 hover:bg-indigo-600',
};

export const DEFAULT_COLOR = 'bg-slate-500 hover:bg-slate-600';

export function getRegionColor(region: string) {
  const normalized = region.trim();
  for (const key of Object.keys(REGION_COLORS)) {
    if (normalized.includes(key)) return REGION_COLORS[key];
  }
  return DEFAULT_COLOR;
}
