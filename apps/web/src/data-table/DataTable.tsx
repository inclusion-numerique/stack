import React from 'react'
import classNames from 'classnames'
import {
  DataTableConfiguration,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import SortLink from '@app/web/app/(with-navigation)/administration/SortLink'
import { createSortLinkProps } from '@app/web/app/(with-navigation)/administration/createSortLinkProps'

const DataTable = <
  Data extends DataTableRow,
  Configuration extends DataTableConfiguration<Data>,
>({
  configuration,
  rows,
  className,
  tableClassName,
  searchParams,
  baseHref,
}: {
  rows: Data[]
  configuration: Configuration
  className?: string
  tableClassName?: string
  searchParams: DataTableSearchParams<Configuration>
  baseHref: string
}) => {
  const sortLinkProps = (
    sortParams: DataTableSearchParams<Configuration>,
    isDefault = false,
  ) =>
    createSortLinkProps({
      searchParams,
      sortParams,
      isDefault,
      baseHref,
    })

  return (
    <div className={classNames('fr-table', className)} data-fr-js-table="true">
      <table className={tableClassName} data-fr-js-table-element="true">
        <thead>
          <tr>
            {configuration.columns.map(
              ({
                name,
                header,
                sortable,
                defaultSortable,
                headerClassName,
              }) => (
                <th scope="col" key={name} className={headerClassName}>
                  {header}
                  {(!!defaultSortable || !!sortable) && (
                    <SortLink
                      {...sortLinkProps(
                        {
                          tri: name,
                        } as DataTableSearchParams<Configuration>,
                        defaultSortable,
                      )}
                    />
                  )}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={configuration.rowKey(row)}>
              {configuration.columns.map(
                ({ name, cellAsTh, cell, cellClassName }) => {
                  if (!cell) {
                    return null
                  }
                  const Component = cellAsTh ? 'th' : 'td'
                  return (
                    <Component className={cellClassName} key={name}>
                      {cell(row)}
                    </Component>
                  )
                },
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
