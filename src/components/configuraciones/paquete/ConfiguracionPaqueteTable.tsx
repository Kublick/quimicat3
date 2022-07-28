import { PencilIcon } from '@heroicons/react/solid';
import { Loading, Row, Col, Tooltip } from '@nextui-org/react';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/router';
import React from 'react';
import { IPaquete } from '../../../intefaces';
import { trpc } from '../../../utils/trpc';
import MasterTable from '../../ui/table/MasterTable';
import { IconButton } from '../../ui/utils/IconButton';

const ConfiguracionPaqueteTable = () => {
	const router = useRouter();

	const { data, isLoading } = trpc.useQuery(['configuracion.getPaquetes']);

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

	const columns: ColumnDef<Partial<IPaquete>>[] = [
		{
			accessorKey: 'abreviatura',
			header: () => 'Abreviatura',
			cell: (info) => info.getValue(),
		},

		{
			accessorKey: 'descripcion',
			header: () => 'Nombre',
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
		(item): Partial<IPaquete> => ({
			id: item.id || '',
			descripcion: item.descripcion || '',
			abreviatura: item.abreviatura || '',
		}),
	);

	const handleEdit = (id: string) => {
		router.push(`/configuracion/paquete/${id}?view=edit`);
	};

	return (
		<div>
			<MasterTable rows={rows} columns={columns} />
		</div>
	);
};

export default ConfiguracionPaqueteTable;
