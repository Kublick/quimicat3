import { Button } from '@nextui-org/react';
import { ColumnDef, RowData } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

import { UserLayout } from '../../../components/layout';
import { PrecioTable } from '../../../components/ui/table/PreciosTarifaTable';

import { trpc } from '../../../utils/trpc';

type TableTypes = {
	id: string;
	precio: number;
	name: string;
	description: string;
};

const TarifaControlPage = () => {
	const tarifas = trpc.useQuery(['configuracion.getTarifas']);
	const [select, setSelect] = useState<any>('');

	const { data: tarifaControl, isLoading } = trpc.useQuery(
		['configuracion.getItemsTarifas', { tarifaId: select }],
		{
			enabled: select !== '',
		},
	);

	const updatePrecio = trpc.useMutation(['configuracion.updatePrecio']);

	if (tarifas.isLoading && isLoading) return <div>Cargando...</div>;

	const rows = tarifaControl?.map((prueba) => ({
		id: prueba.id,
		precio: prueba.precio,
		name:
			prueba.item.prueba?.descripcion ||
			prueba.item.perfil?.descripcion ||
			prueba.item.paquete?.descripcion ||
			'',
		description: prueba.item.prueba
			? 'Prueba'
			: prueba.item.perfil
			? 'Perfil'
			: 'Paquete',
	}));

	const handleManualSubmit = (data: any) => {
		const pricesData = data.map((item: any) => ({
			id: item.id,
			precio: Number(item.precio),
		}));

		updatePrecio.mutateAsync(pricesData);
	};

	return (
		<UserLayout title="Control de Tarifas">
			<div className="flex gap-4">
				{tarifas.data?.map((tarifa) => (
					<Button
						key={tarifa.id}
						onClick={() => {
							setSelect(tarifa.id);
						}}
					>
						{tarifa.nombre}
					</Button>
				))}
			</div>

			<h1>Tarifa Control</h1>

			{rows && (
				<PrecioTable rows={rows} handleManualSubmit={handleManualSubmit} />
			)}
		</UserLayout>
	);
};

export default TarifaControlPage;
