import { beneficiairesRouter } from '@app/web/server/rpc/beneficiaires/beneficiairesRouter'
import { conseillersNumeriqueRouter } from '@app/web/server/rpc/conseillers-numerique/conseillersNumeriqueRouter'
import { craRouter } from '@app/web/server/rpc/cra/craRouter'
import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { inscriptionRouter } from '@app/web/server/rpc/inscription/inscriptionRouter'
import { mediateursRouter } from '@app/web/server/rpc/mediateur/mediateursRouter'
import { lieuActiviteRouter } from '@app/web/server/rpc/lieu-activite/lieuActiviteRouter'
import { apiClientRouter } from '@app/web/server/rpc/apiClient/apiClientRouter'
import { assistantRouter } from '@app/web/server/rpc/assistant/assistantRouter'
import { rdvServicePublicRouter } from '@app/web/server/rpc/rdv-service-public/rdvServicePublicRouter'
import { siretRouter } from '@app/web/server/rpc/siret/siretRouter'
import { structuresRouter } from '@app/web/server/rpc/structures/structuresRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { usurpationRouter } from '@app/web/server/rpc/usurpation/usurpationRouter'

export const appRouter = router({
  user: userRouter,
  inscription: inscriptionRouter,
  upload: uploadRouter,
  image: imageRouter,
  siret: siretRouter,
  structures: structuresRouter,
  beneficiaires: beneficiairesRouter,
  mediateur: mediateursRouter,
  cra: craRouter,
  usurpation: usurpationRouter,
  conseillersNumerique: conseillersNumeriqueRouter,
  lieuActivite: lieuActiviteRouter,
  apiClient: apiClientRouter,
  assistant: assistantRouter,
  rdvServicePublic: rdvServicePublicRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
