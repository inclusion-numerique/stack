import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { siretRouter } from '@app/web/server/rpc/siret/siretRouter'
import { structuresRouter } from '@app/web/server/rpc/structures/structuresRouter'
import { usurpationRouter } from '@app/web/server/rpc/usurpation/usurpationRouter'

export const appRouter = router({
  user: userRouter,
  upload: uploadRouter,
  image: imageRouter,
  siret: siretRouter,
  structures: structuresRouter,
  usurpation: usurpationRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
