// src/app/components/BarGraph.js
"use client";

import { Card } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const BarGraph = ({ title, data, xAxisKey, dataKeys, colors }) => {
  return (
    <Card title={title} className="mt-4">
      <ResponsiveContainer width="100%" height={550}>
        <BarChart data={data}>
          <XAxis dataKey={xAxisKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Bar key={key} dataKey={key} fill={colors[index]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BarGraph;
