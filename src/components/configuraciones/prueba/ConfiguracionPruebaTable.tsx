import { PencilIcon } from '@heroicons/react/solid';
import { Col, Loading, Row, Tooltip } from '@nextui-org/react';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import { IPrueba } from '../../../intefaces';
import { trpc } from '../../../utils/trpc';
import MasterTable from '../../ui/table/MasterTable';
import { IconButton } from '../../ui/utils/IconButton';
import { useRouter } from 'next/router';

export const ConfiguracionPruebaTable = () => {
	const router = useRouter();
	const { data, isLoading } = trpc.useQuery(['configuracion.getPruebas']);

	if (isLoading || !data) {
		return (
			<Loading
				css={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				Cargando Datos
			</Loading>
		);
	}

	const columns: ColumnDef<Partial<IPrueba>>[] = [
		{
			accessorKey: 'codigo',
			header: () => 'Codigo',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'abreviatura',
			header: () => 'Abreviatura',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'departamentoId',
			header: () => 'Departamento',
			cell: (info) => info.getValue(),
		},
		{
			accessorKey: 'id',
			header: 'Acciones',
			cell: (info) => {
				return (
					<Row css={{ minWidth: '120px' }}>
						<Col css={{ d: 'flex', jc: 'center' }}>
							<Tooltip content="Editar">
								<IconButton onClick={() => handleEdit(info.getValue())}>
									<PencilIcon className="h-7 w-7" fill="#979797" />
								</IconButton>
							</Tooltip>
						</Col>
					</Row>
				);
			},
		},
	];

	const rows = data.map(
		(item): Partial<IPrueba> => ({
			id: item.id || '',
			codigo: item.codigo || '',
			descripcion: item.descripcion || '',
			abreviatura: item.abreviatura || '',
			departamentoId: item.departamento.nombre || '',
		}),
	);

	const handleEdit = (id: string) => {
		router.push(`/configuracion/prueba/${id}?view=edit`);

		// setMuestra(select[0] as IMuestra);
		// setShowModal(true);
	};

	return (
		<div>
			<MasterTable rows={rows} columns={columns} />
		</div>
	);
};
