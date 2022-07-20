import React from 'react';
import { trpc } from '../../../utils/trpc';

export const ConfiguracionPruebaTable = () => {
	const { data } = trpc.useQuery(['configuracion.getPruebas']);

	return (
		<div>
			<h1>ConfiguracionPruebaTable</h1>
		</div>
	);
};
