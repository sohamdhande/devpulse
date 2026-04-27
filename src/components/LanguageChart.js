"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function LanguageChart({ data }) {
  if (!data?.length) return <div className="font-mono text-sm text-dim-text">No language data</div>;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => {
              const colors = ["#00fa85", "#ffffff", "#aaaaaa", "#777777", "#444444", "#222222"];
              return <Cell key={`cell-${i}`} fill={colors[i % colors.length]} />;
            })}
          </Pie>
          <Tooltip itemStyle={{ color: "#fff" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
