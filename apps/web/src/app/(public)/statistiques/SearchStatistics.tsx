'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import Card from '@app/web/components/Card'

const barColors = [
  {
    barFill: 'var(--blue-france-sun-113-625)',
    activeBarFill: 'var(--blue-france-sun-113-625-hover)',
  },
  {
    barFill: 'var(--blue-ecume-925-125-active)',
    activeBarFill: 'var(--blue-ecume-850-200)',
  },
  {
    barFill: 'var(--blue-cumulus-925-125)',
    activeBarFill: 'var(--blue-cumulus-925-125-active)',
  },
]

const SearchStatistics = <T extends object>({
  data,
  title,
  xAxisDataKey,
  barsDataKey,
  legend = [],
}: {
  data: T[]
  title: string
  xAxisDataKey: string
  barsDataKey: string[]
  legend?: { label: string; value: string }[]
}) => (
  <Card title={<h3 className="fr-h5">{title}</h3>} titleAs="div">
    <div style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{}}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey} interval={0} fontSize={10} />
          <YAxis width={30} fontSize={10} />
          {barsDataKey.map((barDataKey, index) => (
            <Bar
              key={barDataKey}
              stackId="stack-0"
              barSize={35}
              dataKey={barDataKey}
              fill={barColors[index].barFill}
              activeBar={<Rectangle fill={barColors[index].activeBarFill} />}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
    {legend.length > 0 && (
      <div className="fr-text--sm fr-mt-2w fr-mb-0">
        {legend.map((item, index) => (
          <div
            key={item.label}
            className="fr-flex fr-justify-content-space-between"
          >
            <span>
              <span
                className="ri-checkbox-blank-circle-fill fr-mr-1w"
                aria-hidden="true"
                style={{ color: barColors[index].barFill }}
              />
              {item.label}
            </span>
            <span className="fr-text--bold">{item.value}</span>
          </div>
        ))}
      </div>
    )}
  </Card>
)

export default SearchStatistics
