import NextAuth from 'next-auth';
import { IPerfil, ISucursal } from '../interfaces';

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			name: string;
			role: string;
			username: string;
			enabledFeatures: [];
		};
	}
}
