import { styled, Text, Divider, Avatar } from '@nextui-org/react';
import { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { SideMenu } from '../ui/SideMenu';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { authContext } from '../../store/authContext';
import { uiContext } from '../../store/uiSlice';
import { AvatarComponent } from '../ui/Avatar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
	children: React.ReactNode;
	title: string;
};

const Div = styled('div', {
	margin: '12px 12px',
});

const DivContainer = styled('div', {
	display: 'flex',
});

const DivAvatar = styled('div', {
	width: '100%',
	display: 'flex',
	margin: '12px 12px',
	paddingRight: '12px',
	justifyContent: 'space-between',
	alignItems: 'center',
	position: 'sticky',
	top: '0px',
});

const Content = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
});

const DivTitle = styled('div', {
	display: 'flex',
	alignItems: 'center',
	length: 0,
	gap: '4px',
});

export const UserLayout: NextPage<Props> = ({ children, title }) => {
	const { data: session, status } = useSession();
	const router = useRouter();

	const { setFeatures, setMenuFeatures } = uiContext();
	const { setUser, user } = authContext();

	useEffect(() => {
		if (session && status === 'authenticated') {
			const enabledFeaturesHasItems = Object.entries(
				session.user.enabledFeatures,
			).reduce((acc, [_, value]: any): any => {
				return [...acc, ...value];
			}, []);
			console.log(
				'🚀 ~ file: UserLayout.tsx ~ line 70 ~ useEffect ~ enabledFeaturesHasItems ',
				enabledFeaturesHasItems,
			);

			const menuFeature = Object.entries(session.user.enabledFeatures).map(
				([key, value]: any) => {
					if (value.length !== 0) {
						return key;
					}
				},
			);
			console.log(
				'🚀 ~ file: UserLayout.tsx ~ line 77 ~ useEffect ~ menuFeature',
				menuFeature,
			);

			setMenuFeatures(menuFeature);
			setFeatures(enabledFeaturesHasItems);
		}
	}, [session, setFeatures, setUser, status, setMenuFeatures, user]);

	if (status === 'unauthenticated' || session === null) {
		router.push('/auth/login');
	}

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<DivContainer>
				<div className="">
					<SideMenu />
				</div>
				<Content>
					<div className="sticky top-0 bg-white z-[99]">
						<DivAvatar>
							<div className="flex gap-4 items-center">
								<Text h3>Lab Blancarte</Text>
								<Text h5 color="primary">
									({user?.sucursal?.name}){' '}
								</Text>
							</div>
							<DivTitle>
								{session && (
									<>
										<Text
											h4
											css={{
												color: '$primary',
												padding: '0 12px',
											}}
										>
											{/* <AvatarComponent name={user?.name} /> */}
										</Text>
									</>
								)}
							</DivTitle>
						</DivAvatar>
						<Divider />
					</div>
					<Div>{children}</Div>
					<ToastContainer />
				</Content>
			</DivContainer>
		</>
	);
};
