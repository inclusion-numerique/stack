import { Octokit } from '@octokit/rest'

export const owner = 'inclusion-numerique'
export const repo = process.env.NEXT_PUBLIC_APP_SLUG || ''

const token = process.env.GITHUB_TOKEN

if (!token) {
  throw new Error(
    'Missing GITHUB_TOKEN env variable for octokit authentication',
  )
}

export const octokit = new Octokit({ auth: token })
