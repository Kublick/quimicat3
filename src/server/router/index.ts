// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { authRouter } from "./auth";
import { userRouter } from "./userRouter";
import { securityRouter } from "./security";
import { configuracionRouter } from "./configuracionRouter";
import { medicoRouter } from "./medicoRouter";
import { clienteRouter } from "./clienteRouter";
import { pacienteRouter } from "./pacienteRouter";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("security.", securityRouter)
  .merge("configuracion.", configuracionRouter)
  .merge("users.", userRouter)
  .merge("medico.", medicoRouter)
  .merge("cliente.", clienteRouter)
  .merge("paciente.", pacienteRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
