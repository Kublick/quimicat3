import { signIn } from 'next-auth/react';

import { useForm } from 'react-hook-form';
import { trpc } from '../../utils/trpc';

type FormData = {
	name: string;
	email: string;
	password: string;
};

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: FormData) => {
		const { name, email, password } = data;
		const res = await signIn('credentials', {
			name,
			password,
			email,
			redirect: false,
		});

		console.log(res);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col justify-center items-center gap-4">
				<label>Usuario</label>
				<input type="text" className="bg-slate-200 " {...register('name')} />
				<label>email</label>
				<input type="text" className="bg-slate-200 " {...register('email')} />
				<label>password</label>
				<input
					type="password"
					className="bg-slate-200 "
					{...register('password')}
				/>
				<button type="submit">Submit</button>
			</div>
		</form>
	);
};

export default Login;
