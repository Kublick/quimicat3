import { FC } from 'react';
import { Modal, Button, Text, Row } from '@nextui-org/react';

type Props = {
	visible: boolean;
	setVisible: (visible: boolean) => void;
	handleConfirm: () => void;
	handleCancel: () => void;
	message: string;
	confirmText?: string;
	cancelText?: string;
	confirmButtonColor: any;
	cancelButtonColor: any;
};

export const ConfirmationModal: FC<Props> = ({
	visible,
	setVisible,
	handleConfirm,
	handleCancel,
	message,
	cancelText = 'Cancelar',
	confirmText = 'Confirmar',
	confirmButtonColor = 'primary',
	cancelButtonColor = 'error',
}): JSX.Element => {
	const confirmHandler = () => {
		console.log('confirmando accion');
		handleConfirm();
		// setVisible(!visible);
		return;
	};

	const cancelHandler = () => {
		handleCancel();
		return;
	};

	return (
		<div>
			<Modal
				closeButton
				aria-label="modal-title"
				open={visible}
				onClose={() => setVisible(false)}
				aria-labelledby="modal-title"
			>
				<Modal.Body>
					<Row justify="space-between">
						<Text size="lg">{message}</Text>
					</Row>
				</Modal.Body>
				<Modal.Footer>
					<Button auto color={cancelButtonColor} onClick={cancelHandler}>
						{cancelText}
					</Button>
					<Button auto color={confirmButtonColor} onClick={confirmHandler}>
						{confirmText}
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
