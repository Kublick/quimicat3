import { Button, Input } from '@nextui-org/react';
import { ColumnDef, RowData } from '@tanstack/react-table';
import React, { useEffect, useState } from 'react';

import { UserLayout } from '../../../components/layout';

import PreciosTarifaTable from '../../../components/ui/table/PreciosTarifaTable';
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

	const [items, setItems] = useState<any[]>([]);

	if (tarifas.isLoading && isLoading) return <div>Cargando...</div>;

	const onSubmit = (data: any) => {
		console.log(data);

		// let newArray = Object.entries(data).map((entry) => ({
		// 	id: entry[0],
		// 	precio: Number(entry[1]),
		// }));

		// console.log(newArray);
	};

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

	const columns: ColumnDef<TableTypes>[] = [
		{
			accessorKey: 'description',
			header: () => 'Descripcion',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'name',
			header: 'Nombre',

			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'precio',
			header: () => 'Precio',
			cell: (info) => info.getValue(),
		},
	];

	const handleManualSubmit = (data: any) => {
		console.log('manual submit', items);
	};

	console.log(items);

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

			{rows && <PreciosTarifaTable columns={columns} rows={rows} />}
			{/* {rows?.map((tests, i) => (
					<div key={tests.id} className="grid grid-cols-3 gap-2 ">
						<p className="">{tests.description}</p>

						<Input label={`${tests.name}`} {...register(`${tests.id}`)} />
					</div>
				))} */}
			<Button type="submit" onClick={handleManualSubmit} css={{ mt: '2rem' }}>
				Guardar
			</Button>
		</UserLayout>
	);
};

export default TarifaControlPage;
