import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { formulaireGouvernanceRouter } from '@app/web/server/rpc/user/formulaireGouvernanceRouter'
import { dataRouter } from '@app/web/server/rpc/data/dataRouter'

export const appRouter = router({
  user: userRouter,
  upload: uploadRouter,
  image: imageRouter,
  formulaireGouvernance: formulaireGouvernanceRouter,
  data: dataRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
