import { router } from '@app/web/server/rpc/createRouter'
import { userRouter } from '@app/web/server/rpc/user/userRouter'

export const appRouter = router({
  user: userRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
