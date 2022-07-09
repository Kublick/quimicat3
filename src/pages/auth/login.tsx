import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import { trpc } from '../../utils/trpc';

type FormData = {
	name: string;
	email: string;
	password: string;
	username: string;
};

const Login = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			username: '',
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

		if (res?.ok) {
			router.push('/');
		}

		console.log(res);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col justify-center items-center gap-4">
				<label>Usuario</label>
				<input
					type="text"
					className="bg-slate-200 "
					{...register('username')}
				/>
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
