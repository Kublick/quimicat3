// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { authRouter } from "./auth";
import { userRouter } from "./userRouter";
import { securityRouter } from "./security";
import { configuracionRouter } from "./configuracionRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("security.", securityRouter)
  .merge("configuracion.", configuracionRouter)
  .merge("users.", userRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
