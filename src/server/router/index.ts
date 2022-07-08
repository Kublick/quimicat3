// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { exampleRouter } from './example';
import { authRouter } from './auth';
import { userRouter } from './userRouter';

export const appRouter = createRouter()
	.transformer(superjson)
	.merge('example.', exampleRouter)
	.merge('users.', userRouter)
	.merge('auth.', authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
