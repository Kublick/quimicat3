import create from 'zustand';
import { IPerfil } from '../interfaces';

type Perfil = {
	perfil: IPerfil;
	setPerfil: (perfil: IPerfil) => void;
	perfiles: IPerfil[];
};

export const securityContext = create<Perfil>()((set) => ({
	perfiles: [],
	perfil: {
		_id: '',
		name: '',
		enabledFeatures: [],
		menuFeatures: [],
	},
	setPerfil: (perfil: IPerfil) => set((state) => ({ perfil })),
	setPerfiles: (perfiles: IPerfil[]) => set((state) => ({ perfiles })),
}));
