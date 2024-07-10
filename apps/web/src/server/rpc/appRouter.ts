import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { siretRouter } from '@app/web/server/rpc/siret/siretRouter'
import { structuresRouter } from '@app/web/server/rpc/structures/structuresRouter'
import { usurpationRouter } from '@app/web/server/rpc/usurpation/usurpationRouter'
import { inscriptionRouter } from '@app/web/server/rpc/inscription/inscriptionRouter'
import { conseillersNumeriqueRouter } from '@app/web/server/rpc/conseillers-numerique/conseillersNumeriqueRouter'
import { craRouter } from '@app/web/server/rpc/cra/craRouter'
import { beneficiairesRouter } from '@app/web/server/rpc/beneficiaires/beneficiairesRouter'
import { lieuActiviteRouter } from '@app/web/server/rpc/lieu-activite/lieuActiviteRouter'

export const appRouter = router({
  user: userRouter,
  inscription: inscriptionRouter,
  upload: uploadRouter,
  image: imageRouter,
  siret: siretRouter,
  structures: structuresRouter,
  beneficiaires: beneficiairesRouter,
  cra: craRouter,
  usurpation: usurpationRouter,
  conseillersNumerique: conseillersNumeriqueRouter,
  lieuActivite: lieuActiviteRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
