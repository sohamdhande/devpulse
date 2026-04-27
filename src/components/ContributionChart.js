"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ContributionChart({ data }) {
  if (!data?.length) return <div className="font-mono text-sm text-dim-text">No contribution data</div>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap="20%">
          <XAxis
            dataKey="month"
            tick={{ fill: "#8c8c8c", fontSize: 10, fontFamily: "'Space Mono', monospace" }}
            axisLine={{ stroke: "#2d2d2d" }}
            tickLine={false}
            dy={10}
          />
          <Tooltip cursor={{ fill: "#1a1a1a" }} />
          <Bar dataKey="commits" fill="#00fa85" radius={[0, 0, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
