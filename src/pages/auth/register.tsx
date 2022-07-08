import { Button, Card, Input } from '@nextui-org/react';
import React from 'react';
import { useForm, UseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { trpc } from '../../utils/trpc';
import { zodResolver } from '@hookform/resolvers/zod';

export const userValidationSchema = z.object({
	name: z.string().min(3),
	email: z.string().min(3),
	password: z.string().min(3).max(12),
});

const RegisterUser = () => {
	function useZodForm<TSchema extends z.ZodType>(
		props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
			schema: TSchema;
		},
	) {
		const form = useForm<TSchema['_input']>({
			...props,
			resolver: zodResolver(props.schema, undefined, {
				rawValues: true,
			}),
		});

		return form;
	}

	const methods = useZodForm({
		schema: userValidationSchema,
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	console.log(methods.formState.errors);

	const mutation = trpc.useMutation(['users.createUser']);

	console.log(typeof methods.formState.errors.email?.message);

	return (
		<form
			onSubmit={methods.handleSubmit(async (values) => {
				await mutation.mutateAsync(values);
				methods.reset();
			})}
		>
			<Card>
				<div className="flex flex-col justify-center items-center gap-4">
					<Input
						label="Nombre"
						type="text"
						className="bg-slate-200 "
						{...methods.register('name')}
					/>
					<Input
						label="Email"
						type="text"
						className="bg-slate-200 "
						{...methods.register('email')}
						helperText={methods.formState.errors.email?.message}
					/>

					<Input
						label="Password"
						type="password"
						className="bg-slate-200 "
						{...methods.register('password')}
					/>
					<Button type="submit">Submit</Button>
				</div>
			</Card>
		</form>
	);
};

export default RegisterUser;
