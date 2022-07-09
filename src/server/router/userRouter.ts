import { createRouter } from './context';
import bcrypt from 'bcryptjs';
import { userValidationSchema } from '../../pages/auth/register';

export const userRouter = createRouter()
	.mutation('createUser', {
		input: userValidationSchema,
		async resolve({ input, ctx }) {
			const hashedPassword = await bcrypt.hash(input.password, 10);

			let newUser = {
				name: input.name,
				username: input.username,
				status: input.status,
				sucursalId: input.sucursal,
				profileId: input.profile,
				password: hashedPassword,
			};

			console.log(newUser);

			const user = await ctx.prisma.user.create({
				data: {
					...newUser,
				},
			});

			console.log(user);

			return user;
		},
	})
	.query('getAllUsers', {
		async resolve({ ctx }) {
			return await ctx.prisma.user.findMany();
		},
	});
