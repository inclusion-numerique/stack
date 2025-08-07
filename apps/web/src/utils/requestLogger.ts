import type { NextRequest } from 'next/server'
import { ServerWebAppConfig } from '../ServerWebAppConfig'
import { output } from './output'

type RequestLogData = {
  timestamp: string
  method: string
  url: string
  path: string
  query: Record<string, string>
  ip: string | null
  userAgent: string | null
  referer: string | null
  host: string | null
  contentType: string | null
  contentLength: string | null
  acceptLanguage: string | null
  acceptEncoding: string | null
  cfConnectingIp: string | null
  cfIpcountry: string | null
  cfRay: string | null
  xForwardedFor: string | null
  xRealIp: string | null
  xClientIp: string | null
  xForwardedProto: string | null
  xForwardedHost: string | null
  xRequestedWith: string | null
  secFetchDest: string | null
  secFetchMode: string | null
  secFetchSite: string | null
  secFetchUser: string | null
  secChUa: string | null
  secChUaMobile: string | null
  secChUaPlatform: string | null
  dnt: string | null
  saveData: string | null
  viewportWidth: string | null
  deviceMemory: string | null
  ect: string | null
  rtt: string | null
  downlink: string | null
  responseTime?: number
  statusCode?: number
  error?: string
}

/**
 * Extract client IP address from various headers
 * Prioritizes Cloudflare headers, then standard proxy headers
 */
function extractClientIp(request: NextRequest): string | null {
  // Standard proxy headers
  const xRealIp = request.headers.get('x-real-ip')
  if (xRealIp) return xRealIp

  const xClientIp = request.headers.get('x-client-ip')
  if (xClientIp) return xClientIp

  const xForwardedFor = request.headers.get('x-forwarded-for')
  if (xForwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return xForwardedFor.split(',')[0].trim()
  }

  const xClusterClientIp = request.headers.get('x-cluster-client-ip')
  if (xClusterClientIp) return xClusterClientIp

  // Fallback to connection remote address (if available)
  return null
}

/**
 * Extract structured request data for logging
 */
function extractRequestData(
  request: NextRequest,
): Omit<RequestLogData, 'timestamp' | 'responseTime' | 'statusCode' | 'error'> {
  const url = new URL(request.url)

  return {
    method: request.method,
    url: request.url,
    path: url.pathname,
    query: Object.fromEntries(url.searchParams.entries()),
    ip: extractClientIp(request),
    userAgent: request.headers.get('user-agent'),
    referer: request.headers.get('referer'),
    host: request.headers.get('host'),
    contentType: request.headers.get('content-type'),
    contentLength: request.headers.get('content-length'),
    acceptLanguage: request.headers.get('accept-language'),
    acceptEncoding: request.headers.get('accept-encoding'),
    cfConnectingIp: request.headers.get('cf-connecting-ip'),
    cfIpcountry: request.headers.get('cf-ipcountry'),
    cfRay: request.headers.get('cf-ray'),
    xForwardedFor: request.headers.get('x-forwarded-for'),
    xRealIp: request.headers.get('x-real-ip'),
    xClientIp: request.headers.get('x-client-ip'),
    xForwardedProto: request.headers.get('x-forwarded-proto'),
    xForwardedHost: request.headers.get('x-forwarded-host'),
    xRequestedWith: request.headers.get('x-requested-with'),
    secFetchDest: request.headers.get('sec-fetch-dest'),
    secFetchMode: request.headers.get('sec-fetch-mode'),
    secFetchSite: request.headers.get('sec-fetch-site'),
    secFetchUser: request.headers.get('sec-fetch-user'),
    secChUa: request.headers.get('sec-ch-ua'),
    secChUaMobile: request.headers.get('sec-ch-ua-mobile'),
    secChUaPlatform: request.headers.get('sec-ch-ua-platform'),
    dnt: request.headers.get('dnt'),
    saveData: request.headers.get('save-data'),
    viewportWidth: request.headers.get('viewport-width'),
    deviceMemory: request.headers.get('device-memory'),
    ect: request.headers.get('ect'),
    rtt: request.headers.get('rtt'),
    downlink: request.headers.get('downlink'),
  }
}

/**
 * Log structured request data for Kibana consumption
 * Outputs JSON-formatted logs that can be easily parsed and analyzed
 */
export function logRequest(
  request: NextRequest,
  options?: {
    responseTime?: number
    statusCode?: number
    error?: string
  },
) {
  if (!ServerWebAppConfig.enableRequestLogging) return
  const requestData = extractRequestData(request)
  const logData: RequestLogData = {
    timestamp: new Date().toISOString(),
    ...requestData,
    ...options,
  }

  // Output as JSON for structured logging in Kibana
  output.info(
    JSON.stringify({
      type: 'request',
      ...logData,
    }),
  )
}

/**
 * Log request start (useful for timing requests)
 */
export function logRequestStart(request: NextRequest) {
  if (!ServerWebAppConfig.enableRequestLogging) return
  const requestData = extractRequestData(request)

  output.info(
    JSON.stringify({
      type: 'request_start',
      timestamp: new Date().toISOString(),
      ...requestData,
    }),
  )
}

/**
 * Log request end with timing and status
 */
export function logRequestEnd(
  request: NextRequest,
  responseTime: number,
  statusCode: number,
  error?: string,
) {
  if (!ServerWebAppConfig.enableRequestLogging) return
  const requestData = extractRequestData(request)

  output.info(
    JSON.stringify({
      type: 'request_end',
      timestamp: new Date().toISOString(),
      ...requestData,
      responseTime,
      statusCode,
      ...(error && { error }),
    }),
  )
}
