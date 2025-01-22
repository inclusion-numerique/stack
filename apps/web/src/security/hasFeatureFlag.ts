import { User, type UserFeatureFlag } from '@prisma/client'

export const hasFeatureFlag = (
  user: Pick<User, 'featureFlags'>,
  featureFlag: UserFeatureFlag,
) => user.featureFlags.includes(featureFlag)
