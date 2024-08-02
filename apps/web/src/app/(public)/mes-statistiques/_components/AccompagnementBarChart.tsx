'use client'

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

export const AccompagnementBarChart = ({
  data,
}: {
  data: { label: string; count: number }[]
}) => (
  <ResponsiveContainer width="100%" height={240}>
    <BarChart
      data={data}
      margin={{ top: 5, right: 30, left: -20, bottom: -5 }}
      barSize={20}
    >
      <XAxis dataKey="label" scale="point" padding={{ left: 10, right: 10 }} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#009099" />
    </BarChart>
  </ResponsiveContainer>
)
