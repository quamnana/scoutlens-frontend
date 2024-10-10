// src/app/components/PlayerMap.js
"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Tooltip } from "antd";

// GeoJSON for world map (you can find a suitable world-geojson file online)
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const PlayerMap = ({ data }) => {
  // Define a scale for coloring countries based on the number of players
  const colorScale = scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.players))])
    .range(["#e0f3f3", "#084081"]);

  return (
    <div className="mt-4">
      <ComposableMap projectionConfig={{ scale: 200 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryData = data.find(
                (country) => country.name === geo.properties.name
              );

              const playerCount = countryData ? countryData.players : 0;

              return (
                <Tooltip
                  key={geo.rsmKey}
                  title={`${geo.properties.name}: ${playerCount} players`}
                >
                  <Geography
                    geography={geo}
                    fill={colorScale(playerCount)}
                    stroke="#FFF"
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#00c4cc", outline: "none" },
                      pressed: { outline: "none" },
                    }}
                  />
                </Tooltip>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default PlayerMap;
