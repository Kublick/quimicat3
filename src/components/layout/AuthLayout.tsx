import { Row } from '@nextui-org/react';
import Head from 'next/head';
import React, { FC } from 'react';

interface Props {
	title: string;
	children: React.ReactNode;
}

export const AuthLayout: FC<Props> = ({ title = '', children }) => {
	return (
		<>
			<Head>{title}</Head>
			<Row
				css={{
					dispay: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				{children}
			</Row>
		</>
	);
};
