import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { Row, Col, Tooltip, Button, Table, Text } from '@nextui-org/react';
import React, { FC } from 'react';
import { Box } from '../../../styles/TableStyles';
import { IconButton } from '../../ui/utils/IconButton';

type Props = {
	rows: string[] | any;
	visible: boolean;
	setVisible: (visible: boolean) => void;
	setValorRango: (valorRango: []) => void;
	editValorRango?: any;
	setEditValorRango: (editValorRango: any) => void;
};

const columns = [
	{ name: 'Sexo', uid: 'sexo' },
	{ name: 'Unidad', uid: 'unidad' },
	{ name: 'Edad Mínima', uid: 'edadMinima' },
	{ name: 'Edad Máxima', uid: 'edadMaxima' },
	{ name: 'Ref Mínima', uid: 'refMinima' },
	{ name: 'Ref Máxima', uid: 'refMaxima' },
	{ name: 'Acciones', uid: 'actions' },
];

const PruebaNormalidadTable: FC<Props> = ({
	rows = [],
	visible,
	setVisible,
	setValorRango,
	editValorRango,
	setEditValorRango,
}) => {
	const renderCell = (item: any, columnKey: any) => {
		const cellValue = item[columnKey];
		switch (columnKey) {
			case 'sexo':
				return <Row>{item.sexo}</Row>;
			case 'unidad':
				return <Row>{item.unidad === '1' ? 'Años' : 'Días'} </Row>;
			case 'edadMinima':
				return <Row>{item.edadMinima}</Row>;
			case 'edadMaxima':
				return <Row>{item.edadMaxima}</Row>;
			case 'refMinima':
				return <Row>{item.refMinima}</Row>;
			case 'refMaxima':
				return <Row>{item.refMaxima}</Row>;
			case 'actions':
				return (
					<div className="flex justify-end">
						<Row css={{ maxWidth: '300px' }}>
							<Col>
								<Tooltip content="Editar">
									<IconButton
										type="button"
										onClick={() => handleEditItem!(item)}
									>
										<PencilIcon className="h-7 w-7" fill="#979797" />
									</IconButton>
								</Tooltip>
							</Col>
							<Col>
								<Tooltip content="Eliminar">
									<IconButton
										type="button"
										onClick={(e) => handleRemoveItem!(item.id)}
									>
										<TrashIcon className="h-7 w-7" fill="#FF0080" />
									</IconButton>
								</Tooltip>
							</Col>
						</Row>
					</div>
				);
			default:
				return cellValue;
		}
	};

	const handleRemoveItem = (id: string) => {
		const filter = rows.filter((item: any) => item.id !== id);
		setValorRango(filter);
	};

	const handleEditItem = (item: any) => {
		setEditValorRango(item);
		setVisible(true);
	};

	return (
		<>
			<Box css={{ d: 'flex', jc: 'space-between', my: 12 }}>
				<Text h4>Valores Normalidad</Text>
				<Button
					color="warning"
					flat
					onClick={() => setVisible(true)}
					disabled={rows.length >= 3}
				>
					Agregar
				</Button>
			</Box>

			<Table
				aria-label="Departamento Table"
				css={{
					height: 'auto',
					minWidth: '100%',
				}}
				selectionMode="none"
			>
				<Table.Header columns={columns}>
					{(column) => (
						<Table.Column
							key={column.uid}
							align={column.uid === 'actions' ? 'center' : 'start'}
						>
							{column.name}
						</Table.Column>
					)}
				</Table.Header>
				<Table.Body items={rows}>
					{(item) => (
						<Table.Row>
							{(columnKey) => (
								<Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
							)}
						</Table.Row>
					)}
				</Table.Body>
			</Table>
		</>
	);
};

export default PruebaNormalidadTable;
