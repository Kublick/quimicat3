import * as React from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from './useRaisedShadow';

import { Button } from '@nextui-org/react';

interface Props {
	item: {
		value: string;
		label: string;
	};
	handleRemoveValue?: (e: any) => void;
}

export const Item = ({ item, handleRemoveValue }: Props) => {
	const y = useMotionValue(0);

	const boxShadow = useRaisedShadow(y);

	return (
		<Reorder.Item
			key={item.value}
			value={item}
			style={{ boxShadow, y, padding: '0.25rem 0.5rem' }}
		>
			<div className="flex items-center gap-2 justify-between">
				{item.label}
				<Button onClick={handleRemoveValue} name={item.value} auto>
					X
				</Button>
			</div>
		</Reorder.Item>
	);
};
