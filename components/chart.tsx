"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
} from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/chart"

type ChartType = "bar" | "line" | "pie"

interface Props {
  type: ChartType
  data: any[]
  dataKey: string
  valueKey: string
  config?: Record<string, { label?: string; color?: string }>
}

export function Chart({
  type,
  data,
  dataKey,
  valueKey,
  config = {},
}: Props) {
  return (
    <ChartContainer config={config}>
      <>
        {type === "bar" && (
          <BarChart data={data}>
            <XAxis dataKey={dataKey} />
            <YAxis />
            <ChartTooltip />
            <ChartLegend />
            <Bar dataKey={valueKey}>
              {data.map((entry, index) => (
                <Cell key={`bar-${index}`} fill={config[entry[dataKey]]?.color} />
              ))}
            </Bar>
          </BarChart>
        )}

        {type === "line" && (
          <LineChart data={data}>
            <XAxis dataKey={dataKey} />
            <YAxis />
            <ChartTooltip />
            <ChartLegend />
            <Line
              type="monotone"
              dataKey={valueKey}
              stroke="#4f46e5"
              strokeWidth={2}
            />
          </LineChart>
        )}

        {type === "pie" && (
          <PieChart>
            <ChartTooltip />
            <ChartLegend />
            <Pie
              data={data}
              dataKey={valueKey}
              nameKey={dataKey}
              outerRadius={80}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={config[entry[dataKey]]?.color} />
              ))}
            </Pie>
          </PieChart>
        )}
      </>
    </ChartContainer>
  )
}
