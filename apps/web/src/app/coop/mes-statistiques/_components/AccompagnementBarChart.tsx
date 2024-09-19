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
      margin={{ top: 5, right: 30, left: -20, bottom: 10 }}
      barSize={16}
    >
      <XAxis
        className="fr-text--sm fr-text--medium"
        dataKey="label"
        scale="point"
        tick={{ dy: 10 }}
        padding={{ left: 10, right: 10 }}
        tickLine={false}
        angle={-45}
        interval={data.length > 12 ? 2 : 0}
      />
      <YAxis
        className="fr-text--sm fr-text--medium"
        tickMargin={10}
        allowDecimals={false}
        interval="preserveStartEnd"
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="count" fill="#009099" radius={[10, 10, 0, 0]}>
        <LabelList
          dataKey="count"
          position="top"
          style={{ fontSize: 14, fontWeight: 'bold' }}
          formatter={(count: number) => (count === 0 ? '' : count)}
        />
      </Bar>
    </BarChart>
  </ResponsiveContainer>
)
