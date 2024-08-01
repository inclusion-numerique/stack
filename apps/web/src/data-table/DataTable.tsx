import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import {
  DataTableConfiguration,
  DataTableRow,
  DataTableSearchParams,
} from '@app/web/data-table/DataTableConfiguration'
import { createSortLinkProps } from '@app/web/data-table/createSortLinkProps'
import SortLink from '@app/web/data-table/SortLink'
import styles from './DataTable.module.css'

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
                ({ name, cellAsTh, cell, cellClassName }, columnIndex) => {
                  if (!cell) {
                    return null
                  }
                  const Component = cellAsTh ? 'th' : 'td'

                  const child = configuration.rowLink ? (
                    // The row is a link. In html we are required to add <a> to individual tds for accessible and correct html
                    <Link
                      key={`${name}_link`}
                      {...configuration.rowLink(row)}
                      tabIndex={columnIndex === 0 ? undefined : -1}
                      className={classNames(styles.cellLink, cellClassName)}
                    >
                      {cell(row)}
                    </Link>
                  ) : (
                    cell(row)
                  )

                  return (
                    <Component
                      className={classNames(
                        {
                          [styles.cellLinkContainer]: !!configuration.rowLink,
                        },
                        !!cellClassName && !configuration.rowLink
                          ? cellClassName
                          : undefined,
                      )}
                      key={name}
                    >
                      {child}
                    </Component>
                  )
                },
              )}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={configuration.columns.length}>Aucun résultat</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
