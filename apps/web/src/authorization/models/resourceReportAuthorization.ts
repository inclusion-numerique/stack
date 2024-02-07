export const ResourceReportPermissions = {
  ReportResource: 'ReportResource',
} as const

export type ResourceReportPermission =
  (typeof ResourceReportPermissions)[keyof typeof ResourceReportPermissions]
