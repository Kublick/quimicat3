import { router } from "../trpc";
import { authRouter } from "./auth";
import { clienteRouter } from "./clienteRouter";
import { configuracionRouter } from "./configuracionRouter";
import { exampleRouter } from "./example";
import { medicoRouter } from "./medicoRouter";
import { pacienteRouter } from "./pacienteRouter";
import { securityRouter } from "./security";
import { userRouter } from "./userRouter";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  security: securityRouter,
  configuracion: configuracionRouter,
  users: userRouter,
  medico: medicoRouter,
  cliente: clienteRouter,
  paciente: pacienteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
