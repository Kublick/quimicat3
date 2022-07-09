import { Text } from '@nextui-org/react';
import React from 'react';
import { UserLayout } from '../../components/layout/UserLayout';

const SecurityPage = () => {
	return (
		<UserLayout title="Seguridad">
			<Text>Usuario autenticado</Text>
		</UserLayout>
	);
};

export default SecurityPage;
