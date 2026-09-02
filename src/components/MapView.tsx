'use client';

import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { MetricRecord } from '@/types';
import { getRegionColor } from '@/lib/colors';

const geoUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";

export function MapView({ 
  data, 
  metricName,
  benchmarkCode = 'NOR',
  benchmarkName = 'Norway',
  indicatorCode,
}: { 
  data: MetricRecord[], 
  metricName: string,
  benchmarkCode?: string,
  benchmarkName?: string,
  indicatorCode: string,
}) {
  // Color scale based on the ratio to benchmark
  const colorScale = scaleLinear<string>()
    .domain([0, 0.25, 0.5, 1, 1.5])
    .range(["#fca5a5", "#fdba74", "#fef08a", "#86efac", "#166534"]);

  const dataMap = useMemo(() => {
    const map = new Map<string, MetricRecord>();
    data.forEach(d => {
      map.set(d.country_code, d);
    });
    return map;
  }, [data]);

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4 relative w-full h-[700px] flex flex-col">
      <div className="flex justify-between items-center mb-4 z-10 relative px-2">
        <h3 className="font-semibold text-slate-700">Global Map: {metricName} relative to {benchmarkName}</h3>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span>0%</span>
          <div className="w-48 h-3 rounded bg-gradient-to-r from-red-300 via-orange-300 via-yellow-200 to-green-300"></div>
          <span>100%</span>
        </div>
      </div>
      
      <div className="flex-1 w-full bg-slate-50/50 rounded-lg overflow-hidden relative border">
        <ComposableMap
          projectionConfig={{
            scale: 140,
          }}
          className="w-full h-full"
        >
          <ZoomableGroup>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = geo.id;
                  const d = dataMap.get(countryCode);
                  const isBenchmark = countryCode === benchmarkCode;
                  
                  const tooltipText = d 
                    ? `${d.country_name}: ${(d.ratio * 100).toFixed(1)}% of ${benchmarkName} (${d.value.toLocaleString()})` 
                    : `${geo.properties.name}: No data`;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      data-tooltip-id="map-tooltip"
                      data-tooltip-content={tooltipText}
                      fill={isBenchmark ? '#15803d' : (d ? colorScale(d.ratio) : "#e2e8f0")}
                      stroke="#ffffff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#3b82f6", outline: "none", cursor: "pointer" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        <Tooltip id="map-tooltip" className="z-50 rounded shadow-lg bg-slate-800 text-white" />
      </div>
    </div>
  );
}
