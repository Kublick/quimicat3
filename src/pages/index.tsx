import { Text } from '@nextui-org/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { UserLayout } from '../components/layout';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	return (
		<UserLayout title="Lab Blancarte">
			<Text>Seleccione una opcion</Text>
		</UserLayout>
	);
};

export default Home;
