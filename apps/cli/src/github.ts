import { Octokit } from 'octokit'

export const owner = 'inclusion-numerique'
export const repo = process.env.NEXT_PUBLIC_APP_SLUG || ''

let octokit: Octokit

// Lazily validate env and instanciate octokit
export const getOctokit = (): Octokit => {
  if (!octokit) {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
      throw new Error('Missing GITHUB_TOKEN env variable for authentication')
    }
    octokit = new Octokit({ auth: token })
  }

  return octokit
}
