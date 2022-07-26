import React, { FC } from 'react';
import { IDepartamento, IMetodo, IPrueba } from '../../../intefaces';
import Select from 'react-select';
import { trpc } from '../../../utils/trpc';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { Box } from '../../../styles/TableStyles';
import { Button, styled, Text } from '@nextui-org/react';
import { StrictModeDroppable } from '../../ui/drag/Droppable';

type Props = {
	selected: any;
	setSelected: any;
};

export const PruebasSelector: FC<Props> = ({ selected, setSelected }) => {
	const { data: pruebasPerfil } = trpc.useQuery([
		'configuracion.getPruebasPerfil',
	]);

	if (!pruebasPerfil) {
		return <p>Cargando...</p>;
	}

	const options = pruebasPerfil.map((prueba) => ({
		value: prueba.id,
		label: `${prueba.departamento.nombre} > ${prueba.abreviatura} - ${prueba.metodo.nombre}`,
	}));

	function handleOnDragEnd(result: any) {
		if (!result.destination) return;
		const items = Array.from(selected);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setSelected(items);

		setDragged(false);
	}

	function handleSelectChange(values: any) {
		setSelected(values);
	}

	function handleRemoveValue(e: any) {
		const { name: buttonName } = e.currentTarget;
		const newSelected = selected.filter(
			(item: any) => item.value !== buttonName,
		);
		setSelected(newSelected);
	}

	const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
		background: isDragging ? `#0072F5` : 'white',
		opacity: isDragging ? 0.2 : 1,
		width: '75%',
		color: isDragging ? 'white' : 'black',
		padding: '0.5rem',
		borderRadius: '0.5rem',
		...draggableStyle,
	});

	return (
		<>
			<Box
				css={{
					d: 'flex',
					jc: 'space-between',
					alignItems: 'center',
					p: '1rem',
				}}
			>
				<Text h5>Pruebas del Perfil</Text>
				<Select
					options={options}
					instanceId="perfiles"
					className="w-1/2"
					menuPosition="absolute"
					placeholder="Seleccione una prueba"
					isMulti={true}
					value={selected}
					controlShouldRenderValue={false}
					onChange={handleSelectChange}
				/>
			</Box>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<StrictModeDroppable droppableId="perfiles">
					{(provided) => (
						<ul
							className=""
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{selected.map(({ value, label }: any, index: any) => {
								return (
									<Draggable key={value} draggableId={value} index={index}>
										{(provided, snapshot) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={getItemStyle(
													snapshot.isDragging,
													provided.draggableProps.style,
												)}
											>
												<div className="grid grid-cols-5  ">
													<p className="col-span-4">{label}</p>
													<div className="flex justify-center items-center">
														<Button
															name={value}
															color="error"
															onClick={handleRemoveValue}
															auto
														>
															X
														</Button>
													</div>
												</div>
											</li>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</ul>
					)}
				</StrictModeDroppable>
			</DragDropContext>
		</>
	);
};
