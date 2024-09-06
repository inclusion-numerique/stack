'use client'

import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts'

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) =>
  active &&
  payload && (
    <ul className="fr-background-default--grey fr-p-1w fr-list-group fr-raw-list fr-tile--shadow">
      <li className="fr-text--bold">{label}</li>
      <li>
        Accompagnements :{' '}
        <span className="fr-text--bold">{payload[0].value}</span>
      </li>
    </ul>
  )

export const AccompagnementBarChart = ({
  data,
}: {
  data: { label: string; count: number }[]
}) => (
  <ResponsiveContainer width="100%" height={200}>
    <BarChart
      data={data}
      margin={{ top: 5, right: 30, left: -20, bottom: 0 }}
      barSize={16}
    >
      <XAxis
        dataKey="label"
        scale="point"
        tickMargin={10}
        padding={{ left: 10, right: 10 }}
      />
      <YAxis tickMargin={10} allowDecimals={false} />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="count" fill="#009099" radius={[10, 10, 0, 0]}>
        <LabelList
          dataKey="count"
          position="top"
          formatter={(count: number) => (count === 0 ? '' : count)}
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
)
