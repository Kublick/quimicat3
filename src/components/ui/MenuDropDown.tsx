import Link from 'next/link';
import { Button, Collapse } from '@nextui-org/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { useMenuToggle } from '../../hooks/useMenuToogle';

type MenuContents = {
	id: number;
	title: string;
	feature: string;
	collapse: boolean;
	href: string;
	menuItems: {
		id: number;
		label: string;
		href: string;
	}[];
};

type Props = {
	data: MenuContents[];
};

const MenuDropDown: FC<Props> = ({ data }) => {
	const router = useRouter();

	const [isEnabled] = useMenuToggle();

	if (isEnabled === undefined) return <p>Loading</p>;

	return (
		<>
			{data.map(({ id, title, menuItems, feature, href, collapse }) => (
				<div key={id}>
					{href === '' ? (
						<>
							{isEnabled(feature) && (
								<Collapse.Group>
									<Collapse
										title={title}
										arrowIcon={<ChevronUpIcon className="w-6 h-6 text-white" />}
										css={{
											'.nextui-collapse-title': {
												fontSize: '1.0rem',
												fontWeight: '$semibold',
												color: '$white',
												padding: '0rem 1rem',
											},
											'.nextui-collapse-arrow': {
												padding: '0rem 1rem',
											},
											'&[data-state="open"]': {
												'.nextui-collapse-title-content-right ': {
													svg: {
														transform: 'rotateZ(-180deg) ',
													},
												},
											},
										}}
									>
										{menuItems.map((item) => (
											<div key={item.id} className="my-4">
												<Link key={item.id} href={item.href}>
													<button
														className={`${
															router.pathname === item.href
																? 'bg-menu-selected text-white'
																: 'bg-slate-200 '
														} w-full cursor-pointer p-2 border-none rounded-lg hover:opacity-90`}
													>
														{item.label}
													</button>
												</Link>
											</div>
										))}
									</Collapse>
								</Collapse.Group>
							)}
						</>
					) : (
						<>
							<Link key={id} href={href}>
								<Button
									css={{
										bg:
											router.pathname === href
												? 'rgb(52, 71, 103)'
												: 'transparent',
										d: 'flex',
										width: '100%',
										justifyContent: 'left',
										color: 'white',
										fontSize: '1.0rem',
										padding: '0px 28px',
										height: '64px',
									}}
									auto

									// className={`${
									//   router.pathname === href
									//     ? "bg-menu-selected text-white "
									//     : "bg-transparent text-white font-semibold"
									// } w-full cursor-pointer p-2 border-none rounded-lg hover:opacity-90 text-left ml-5`}
								>
									{title}
								</Button>
							</Link>
						</>
					)}
				</div>
			))}
		</>
	);
};

export default MenuDropDown;
