import * as React from 'react';
import { useMotionValue, Reorder } from 'framer-motion';
import { useRaisedShadow } from './useRaisedShadow';

import { Button } from '@nextui-org/react';
import { XCircleIcon } from '@heroicons/react/solid';

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
			style={{ boxShadow, y, padding: '0.25rem 0.5rem', cursor: 'pointer' }}
		>
			<div className="flex items-center gap-2 justify-between">
				{item.label}
				<Button
					onClick={handleRemoveValue}
					name={item.value}
					auto
					css={{
						all: 'unset',
					}}
					icon={
						<XCircleIcon className="text-red-600 h-6 w-6 cursor-pointer hover:text-red-800" />
					}
				/>
			</div>
		</Reorder.Item>
	);
};
