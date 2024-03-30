import { createOdtFile } from '@app/web/server/odt/createOdtFile'
import { MembreBeneficiaireDataForConvention } from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'
import { convention202406Content } from '@app/web/server/odt/convention202406/convention202406Content'
import { convention202406Styles } from '@app/web/server/odt/convention202406/convention202406Styles'
import imageA from '@app/web/server/odt/convention202406/Pictures/10000201000005DC000001D853CD6968'
import { convention202406Manifest } from '@app/web/server/odt/convention202406/convention202406Manifest'

export const generateConventionSubvention = async (
  data: MembreBeneficiaireDataForConvention,
) =>
  createOdtFile({
    content: convention202406Content(data),
    styles: convention202406Styles,
    manifest: convention202406Manifest,
    pictures: [
      // $> base64 image.png
      {
        name: '10000000000003200000012EED57178D.png',
        data: Buffer.from(imageA, 'base64'),
      },

      {
        name: '100000000000043800000167D46606F0.png',
        data: Buffer.from(imageA, 'base64'),
      },

      {
        name: '100000000000044A0000015D34F20EE6.png',
        data: Buffer.from(imageA, 'base64'),
      },

      {
        name: '10000201000005DC000001D853CD6968.png',
        data: Buffer.from(imageA, 'base64'),
      },
    ],
  })
