// eslint-disable-next-line import/no-relative-packages
import { prismaClient } from '../../../../apps/web/src/prismaClient'

/**
 * This module is used to avoid long imports from relative imports as typescript aliases do not works
 */

// eslint-disable-next-line unicorn/prefer-export-from
export const cypressPrismaClient = prismaClient
