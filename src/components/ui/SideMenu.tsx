import { Card } from '@nextui-org/react';
import { menuContents } from './MenuContent';
import MenuDropDown from './MenuDropDown';

export const SideMenu = () => {
	return (
		<Card
			css={{
				position: 'sticky',
				top: '12px',
				mt: '12px',
				minHeight: 'calc(100vh - 28px)',
				width: '250px',
				py: 8,
				mx: 8,
				background: 'linear-gradient(195deg, #42424a, #191919)',
			}}
		>
			<h3 className="text-white text-center">Menu</h3>
			<MenuDropDown data={menuContents} />
		</Card>
	);
};
