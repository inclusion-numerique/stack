import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { siretRouter } from '@app/web/server/rpc/siret/siretRouter'
import { structuresRouter } from '@app/web/server/rpc/structures/structuresRouter'
import { usurpationRouter } from '@app/web/server/rpc/usurpation/usurpationRouter'
import { inscriptionRouter } from '@app/web/server/rpc/inscription/inscriptionRouter'
import { conseillersNumeriqueRouter } from '@app/web/server/rpc/conseillers-numerique/conseillersNumeriqueRouter'

export const appRouter = router({
  user: userRouter,
  inscription: inscriptionRouter,
  upload: uploadRouter,
  image: imageRouter,
  siret: siretRouter,
  structures: structuresRouter,
  usurpation: usurpationRouter,
  conseillersNumerique: conseillersNumeriqueRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
