import { router } from '@app/web/server/rpc/createRouter'
import { imageRouter } from '@app/web/server/rpc/image/imageRouter'
import { resourceRouter } from '@app/web/server/rpc/resource/resourceRouter'
import { uploadRouter } from '@app/web/server/rpc/upload/uploadRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'
import { metaDataRouter } from './metaData/metaDataRouter'

export const appRouter = router({
  user: userRouter,
  resource: resourceRouter,
  metaData: metaDataRouter,
  upload: uploadRouter,
  image: imageRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
