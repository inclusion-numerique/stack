// TODO This @lb/web import is a cyclic dependency. See how to resolve this.
// eslint-disable-next-line import/no-extraneous-dependencies
import { getServerBaseUrl } from '@lb/web/utils/baseUrl'

export const emailAssetUrl = (assetPath: string): string =>
  `${getServerBaseUrl()}${assetPath}`
