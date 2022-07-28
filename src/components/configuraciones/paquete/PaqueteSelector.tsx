import React, { FC } from 'react';
import { IDepartamento, IMetodo, IPrueba } from '../../../intefaces';
import Select from 'react-select';
import { trpc } from '../../../utils/trpc';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { Box } from '../../../styles/TableStyles';
import { Button, Loading, styled, Text } from '@nextui-org/react';
import { StrictModeDroppable } from '../../ui/drag/Droppable';
import { UserLayout } from '../../layout';

type Props = {
	selected: any;
	setSelected: any;
	setValue: any;
};

export const PaqueteSelector: FC<Props> = ({
	selected,
	setSelected,
	setValue,
}) => {
	const { data: pruebas } = trpc.useQuery(['configuracion.getPruebas']);
	const { data: perfiles } = trpc.useQuery(['configuracion.getPerfiles']);

	if (!pruebas || !perfiles) {
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

	const optionsPruebas = pruebas.map((prueba) => ({
		value: prueba.id,
		label: `Prueba > ${prueba.departamento.nombre} > ${prueba.abreviatura} - ${prueba.titulo}`,
	}));

	const optionsPerfiles = perfiles.map((perfil) => ({
		value: perfil.id,
		label: `Perfil > ${perfil.codigo} - ${perfil.descripcion}`,
	}));

	const options = [...optionsPruebas, ...optionsPerfiles];

	function handleOnDragEnd(result: any) {
		if (!result.destination) return;
		const items = Array.from(selected);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setSelected(items);
	}

	function handleSelectChange(values: any) {
		setValue('testsToDo', values);
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
		background: isDragging ? `#0072F5` : '#fff',
		transition: 'background-color .8s ease-out',
		width: '75%',
		color: isDragging ? 'white' : 'black',
		padding: '0rem 1rem',
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
					placeholder="Seleccione una prueba / perfil"
					isMulti={true}
					value={selected}
					controlShouldRenderValue={false}
					onChange={handleSelectChange}
				/>
			</Box>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<StrictModeDroppable droppableId="perfiles">
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef}>
							{selected?.map(({ value, label }: any, index: any) => {
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
												<div className="grid grid-cols-5 items-center ">
													<p className="col-span-4 font-semibold text-xs">
														{label}
													</p>
													<div className="flex justify-center items-center">
														<Button
															name={value}
															size="sm"
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
