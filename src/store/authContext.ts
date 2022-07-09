import create from 'zustand';
import { IUser } from '../interfaces';

type IUserState = {
	user: IUser | null;
	enabledF: string[];
	setUser: (user: IUser | null) => void;
	setEnabledF: (features: string[]) => void;
	loggedIn: boolean;
	setLoggedIn: (loggedIn: boolean) => void;
};

export const authContext = create<IUserState>((set) => ({
	user: null,
	enabledF: [],
	loggedIn: false,
	setUser: (user: IUser | null) => set((state) => ({ user })),
	setEnabledF: (features: string[]) => set((state) => ({ enabledF: features })),
	setLoggedIn: (loggedIn: boolean) => set((state) => ({ loggedIn })),
}));
