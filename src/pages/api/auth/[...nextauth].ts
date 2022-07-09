import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../server/db/client';
import { dbUser } from '../../../db';

export const authOptions: NextAuthOptions = {
	// Configure one or more authentication providers
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				name: {
					label: 'Usuario',
					type: 'text',
					placeholder: 'Ingresa tu usuario',
				},
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Enter your email',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Enter your password',
				},
			},
			async authorize(credentials, _req) {
				const user = await dbUser.checkUserPassword(
					credentials!.email,
					credentials!.password,
				);

				console.log(user);

				if (!user) return null;
				return user;
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
	},
	session: {
		maxAge: 4000 * 60 * 60,
		strategy: 'jwt',
		updateAge: 1000 * 60 * 4,
	},
	callbacks: {
		async jwt({ token, account, user }) {
			if (account) {
				token.accessToken = account.access_token;
				switch (account.type) {
					case 'credentials':
						token.user = user;
						break;
				}
			}
			return token;
		},
		async session({ session, token }) {
			session.accessToken = token.accessToken;
			session.user = token.user as any;
			return session;
		},
	},
};

export default NextAuth(authOptions);
