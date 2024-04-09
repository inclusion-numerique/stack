import { createOdtFile } from '@app/web/server/odt/createOdtFile'
import {
  MembreBeneficiaireDataForConvention,
  postProcessMembreBeneficiaireDataForConvention,
} from '@app/web/gouvernance/getMembreBeneficiaireDataForConvention'
import { convention202406Content } from '@app/web/server/odt/convention202406/convention202406Content'
import imageA from '@app/web/server/odt/convention202406/Pictures/10000201000005DC000001D853CD6968'
import imageB from '@app/web/server/odt/convention202406/Pictures/10000000000003200000012EED57178D'
import imageC from '@app/web/server/odt/convention202406/Pictures/100000000000043800000167D46606F0'
import imageD from '@app/web/server/odt/convention202406/Pictures/100000000000044A0000015D34F20EE6'

import { convention202406Manifest } from '@app/web/server/odt/convention202406/convention202406Manifest'
import { convention202406Styles } from '@app/web/server/odt/convention202406/convention202406Styles'
import { conventionFormation202406Manifest } from '@app/web/server/odt/convention202406/conventionFormation202406Manifest'
import { conventionFormation202406Styles } from '@app/web/server/odt/convention202406/conventionFormation202406Styles'
import { conventionFormation202406Content } from '@app/web/server/odt/convention202406/conventionFormation202406Content'

export const generateConventionSubvention = async (
  data: MembreBeneficiaireDataForConvention,
) =>
  data.beneficiaireFormation && data.membre.beneficiaireSubventions.length === 0
    ? createOdtFile({
        content: conventionFormation202406Content(
          postProcessMembreBeneficiaireDataForConvention(data),
        ),
        styles: conventionFormation202406Styles,
        manifest: conventionFormation202406Manifest,
        pictures: [
          // $> base64 image.png
          {
            name: '10000000000003200000012EED57178D.png',
            data: Buffer.from(imageB, 'base64'),
          },

          {
            name: '100000000000043800000167D46606F0.png',
            data: Buffer.from(imageC, 'base64'),
          },
          {
            name: '10000201000005DC000001D853CD6968.png',
            data: Buffer.from(imageA, 'base64'),
          },
        ],
      })
    : createOdtFile({
        content: convention202406Content(
          postProcessMembreBeneficiaireDataForConvention(data),
        ),
        styles: convention202406Styles,
        manifest: convention202406Manifest,
        pictures: [
          // $> base64 image.png
          {
            name: '10000000000003200000012EED57178D.png',
            data: Buffer.from(imageB, 'base64'),
          },

          {
            name: '100000000000043800000167D46606F0.png',
            data: Buffer.from(imageC, 'base64'),
          },

          {
            name: '100000000000044A0000015D34F20EE6.png',
            data: Buffer.from(imageD, 'base64'),
          },

          {
            name: '10000201000005DC000001D853CD6968.png',
            data: Buffer.from(imageA, 'base64'),
          },
        ],
      })
