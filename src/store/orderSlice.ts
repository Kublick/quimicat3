import create from 'zustand';
import { IPaciente } from '../interfaces';
import { devtools } from 'zustand/middleware';

type IOrder = {
	selectPaciente: IPaciente | null;
	setSelectPaciente: (selectedPaciente: IPaciente | null) => void;

	selectCliente: string | null;
	setSelectCliente: (selectedCliente: string | null) => void;

	selectMedico: string | null;
	setSelectMedico: (selectedMedico: string | null) => void;

	selectTarifa: string | null;
	setSelectTarifa: (selectedTarifa: string | null) => void;
};

const orderContext = create<IOrder>()(
	devtools((set) => ({
		selectPaciente: null,
		setSelectPaciente: (selectedPaciente: IPaciente | null) =>
			set(() => ({ selectPaciente: selectedPaciente })),
		selectCliente: null,
		setSelectCliente: (selectedCliente: string | null) =>
			set(() => ({ selectCliente: selectedCliente })),
		selectMedico: null,
		setSelectMedico: (selectedMedico: string | null) =>
			set(() => ({ selectMedico: selectedMedico })),
		selectTarifa: null,
		setSelectTarifa: (selectedTarifa: string | null) =>
			set(() => ({ selectTarifa: selectedTarifa })),
	})),
);

export default orderContext;
