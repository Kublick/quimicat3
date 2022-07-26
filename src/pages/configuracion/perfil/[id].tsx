import { zodResolver } from '@hookform/resolvers/zod';
import {
	Button,
	Card,
	Checkbox,
	Input,
	Loading,
	Text,
	Textarea,
} from '@nextui-org/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserLayout } from '../../../components/layout';
import { IPerfil, IPrueba, perfilValidation } from '../../../intefaces';
import { SLabel, SSelect } from '../../../styles/SelectStyles';
import { Box, ErrorText } from '../../../styles/TableStyles';
import { trpc } from '../../../utils/trpc';
import { prisma } from '../../../server/db/client';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { PruebasSelector } from '../../../components/configuraciones/perfil/PruebasSelector';

const regexValidation = z.string().regex(/^c\w{8}\d+\w{4}\w{8}$/g);

type Props = {
	perfil: IPerfil;
	mode?: string;
};

const PerfilPageById: FC<Props> = ({ perfil, mode }) => {
	const router = useRouter();
	const { data: metodos } = trpc.useQuery(['configuracion.getMetodos']);
	const { data: pruebas } = trpc.useQuery(['configuracion.getPruebasPerfil']);
	const createPerfil = trpc.useMutation(['configuracion.createPerfil']);
	const updatePerfil = trpc.useMutation(['configuracion.updatePerfil']);

	const [disabled, setDisabled] = useState(false);
	const [selected, setSelected] = useState<IPrueba[]>([]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		control,
	} = useForm<IPerfil>({
		defaultValues: {
			codigo: '',
			abreviatura: '',
			descripcion: '',
			titulo: '',
			metodoId: '',
			ventaIndividual: false,
			sexo: '',
			notas: '',
			notasInternas: '',
			alineacion: 'izquierda',
		},
		mode: 'onBlur',
		resolver: zodResolver(perfilValidation),
	});

	useEffect(() => {
		if (perfil) {
			reset(perfil);
		}
	}, [reset, perfil]);

	console.log(errors);

	console.log({ selected });

	const onSubmit = async (data: IPerfil) => {
		setDisabled(true);

		if (selected) {
			data = { ...data, testsToDo: selected };
		}

		if (mode === 'new') {
			createPerfil.mutateAsync(data);
			toast.success('Perfil creado correctamente');
		}

		if (mode === 'edit') {
			updatePerfil.mutateAsync(data);
			toast.success('Perfil editado correctamente');
		}

		setTimeout(() => {
			setDisabled(false);
			router.push('/configuracion/perfil');
		}, 2000);
	};

	if (!metodos) {
		return (
			<UserLayout title="Metodo">
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
			</UserLayout>
		);
	}

	let textMode = '';

	switch (mode) {
		case 'edit':
			textMode = 'Editar Perfil';
			break;
		default:
			textMode = 'Registrar Perfil';
			break;
	}

	return (
		<UserLayout title="Perfil">
			<Text h4>{textMode}</Text>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box></Box>
				<Card
					css={{
						p: '1rem',
					}}
				>
					<Box
						css={{
							d: 'grid',
							gridTemplateColumns: '1fr 1fr',
							gap: '1.125rem',
						}}
					>
						<Box
							css={{
								d: 'flex',
								flexDirection: 'column',
								gap: '1.125rem',
							}}
						>
							<Input
								bordered
								label="Código"
								{...register('codigo')}
								helperText={errors?.codigo?.message}
								helperColor="error"
								color="primary"
							/>
							<Input
								bordered
								label="Abreviatura"
								{...register('abreviatura')}
								helperText={errors?.abreviatura?.message}
								helperColor="error"
								color="primary"
								fullWidth
							/>

							<Input
								bordered
								label="Descripción"
								{...register('descripcion')}
								helperText={errors?.descripcion?.message}
								helperColor="error"
								color="primary"
								fullWidth
							/>

							<Input
								bordered
								label="Titulo"
								{...register('titulo')}
								helperText={errors?.titulo?.message}
								helperColor="error"
								color="primary"
								fullWidth
							/>
							<Box>
								<SLabel css={{ ml: '6px' }}>Metodo</SLabel>
								<SSelect {...register('metodoId')}>
									<option value="">Seleccione una opcion</option>
									{metodos.map((metodo) => (
										<option key={metodo.id} value={metodo.id}>
											{metodo.nombre}
										</option>
									))}
								</SSelect>
								{errors.metodoId && (
									<ErrorText>{errors.metodoId?.message}</ErrorText>
								)}
							</Box>
							<Controller
								name="ventaIndividual"
								control={control}
								rules={{ required: true }}
								render={({ field: { value, onChange } }) => (
									<Checkbox
										label="¿Permitir Venta Individual?"
										isSelected={value}
										onChange={onChange}
									/>
								)}
							/>
						</Box>
						<Box
							css={{
								d: 'flex',
								flexDirection: 'column',
								gap: '1rem',
							}}
						>
							<Box>
								<SLabel css={{ ml: '6px' }}>Sexo</SLabel>
								<SSelect {...register('sexo')}>
									<option value="">Seleccione una opción</option>
									<option value="A">Ambos</option>
									<option value="M">Masculino</option>
									<option value="F">Femenino</option>
								</SSelect>
								{errors.sexo && <ErrorText>{errors.sexo.message}</ErrorText>}
							</Box>
							<Textarea
								bordered
								label="Notas"
								{...register('notas')}
								color="primary"
								fullWidth
							/>
							<Textarea
								bordered
								label="Notas Internas"
								{...register('notasInternas')}
								color="primary"
								fullWidth
							/>
							<Box>
								<SLabel css={{ ml: '6px' }}>
									Alineacion del titulo en reporte
								</SLabel>
								<SSelect {...register('alineacion')}>
									<option value="izquierda">Izquierda</option>
									<option value="centro">Centro</option>
									<option value="derecha">Derecha</option>
								</SSelect>
							</Box>
						</Box>
					</Box>
					<Box
						css={{
							d: 'flex',
							justifyContent: 'flex-end',
							gap: '16px',
							mt: '16px',
						}}
					>
						<Button
							type="button"
							css={{ mt: 24 }}
							color="secondary"
							onClick={() => router.push('/configuracion/perfil')}
						>
							Regresar
						</Button>
						<Button type="submit" css={{ mt: 24 }} disabled={disabled}>
							Guardar
						</Button>
					</Box>
				</Card>
				<PruebasSelector selected={selected} setSelected={setSelected} />
			</form>
		</UserLayout>
	);
};

export default PerfilPageById;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { id, view } = query;

	if (regexValidation.safeParse(id).success === true) {
		const perfil = await prisma.perfil.findFirst({
			where: {
				id: id as string,
			},
		});

		return {
			props: {
				perfil,
				mode: 'edit',
			},
		};
	}

	if (view === 'new') {
		return {
			props: {
				mode: 'new',
			},
		};
	}

	return {
		props: {},
		redirect: {
			destination: '/',
		},
	};
};
