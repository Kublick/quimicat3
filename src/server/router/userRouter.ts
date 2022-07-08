import { z } from 'zod';
import { createRouter } from './context';
import bcrypt from 'bcryptjs';
import { userValidationSchema } from '../../pages/auth/register';

export const userRouter = createRouter()
	.mutation('createUser', {
		input: userValidationSchema,
		async resolve({ input, ctx }) {
			const hashedPassword = await bcrypt.hash(input.password, 10);
			const user = await ctx.prisma.user.create({
				data: {
					...input,
					password: hashedPassword,
				},
			});
			return user;
		},
	})
	.query('getAllUsers', {
		async resolve({ ctx }) {
			return await ctx.prisma.user.findMany();
		},
	});
