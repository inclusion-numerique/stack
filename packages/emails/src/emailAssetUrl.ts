// TODO This @stack/web import is a cyclic dependency. See how to resolve this.
// eslint-disable-next-line import/no-extraneous-dependencies
import { getServerBaseUrl } from '@stack/web/utils/baseUrl'

export const emailAssetUrl = (assetPath: string): string =>
  `${getServerBaseUrl()}${assetPath}`
