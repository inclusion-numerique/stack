'use client'

import {
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from 'recharts'

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) =>
  active &&
  payload &&
  payload.length > 1 && (
    <div className="fr-background-default--grey fr-p-1w fr-list-group fr-tile--shadow fr-whitespace-nowrap">
      {payload[0].name} :{' '}
      <span className="fr-text--bold">{payload[0].value}</span>
    </div>
  )

export const AccompagnementPieChart = ({
  data,
  size,
  isAnimationActive = true,
  width = 24,
  colors = [],
  className,
}: {
  data: { label: string; count: number; proportion: number }[]
  size: number
  isAnimationActive?: boolean
  width?: number
  colors?: string[]
  className?: string
}) => (
  <ResponsiveContainer width={size} height={size} className={className}>
    <PieChart>
      <Pie
        strokeWidth={0}
        dataKey="count"
        nameKey="label"
        isAnimationActive={isAnimationActive}
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
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  </ResponsiveContainer>
)
