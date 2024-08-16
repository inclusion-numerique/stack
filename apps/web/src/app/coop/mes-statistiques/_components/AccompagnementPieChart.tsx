'use client'

import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts'

export const AccompagnementPieChart = ({
  data,
  size,
  width = 24,
  colors = [],
  className,
}: {
  data: { label: string; count: number; proportion: number }[]
  size: number
  width?: number
  colors?: string[]
  className?: string
}) => (
  <ResponsiveContainer width={size} height={size} className={className}>
    <PieChart>
      <Pie
        dataKey="count"
        isAnimationActive
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={size / 2 - width}
        outerRadius={size / 2}
      >
        {data.map((item, index) => (
          <Cell key={item.label} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
)
