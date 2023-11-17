import { formulaireGouvernanceRouter } from '@app/web/server/rpc/formulaireGouvernance/formulaireGouvernanceRouter'
import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { dataRouter } from '@app/web/server/rpc/data/dataRouter'
import { gouvernanceRouter } from '@app/web/server/rpc/gouvernance/gouvernanceRouter'
import { siretRouter } from '@app/web/server/rpc/data/siretRouter'

export const appRouter = router({
  user: userRouter,
  upload: uploadRouter,
  image: imageRouter,
  formulaireGouvernance: formulaireGouvernanceRouter,
  gouvernance: gouvernanceRouter,
  data: dataRouter,
  siret: siretRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
