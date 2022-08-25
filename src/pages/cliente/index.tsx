import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { ClienteInputModal } from "../../components/cliente/ClienteInputModal";
import ClienteTable from "../../components/cliente/ClienteTable";
import { UserLayout } from "../../components/layout";
import { ICliente } from "../../intefaces";
import { uiContext } from "../../store/uiSlice";
import { Box } from "../../styles/TableStyles";

const ClientePage = () => {
  const { showModal, setShowModal } = uiContext();

  const [showClienteModal, setShowClienteModal] = useState(false);

  const [cliente, setCliete] = useState<ICliente | null>(null);

  return (
    <UserLayout title="Clientes">
      <Box
        css={{
          display: "flex",
          justifyContent: "flex-end",
          mb: "1rem",
          mr: "1rem",
        }}
      >
        <Button
          auto
          icon={<PlusCircleIcon className="w-5 h-5" />}
          onClick={() => setShowClienteModal(true)}
        >
          Crear Cliente
        </Button>
      </Box>
      <ClienteTable setCliente={setCliete} />

      <Modal
        closeButton
        aria-labelledby="Departamento"
        open={showClienteModal}
        onClose={() => setShowClienteModal(false)}
      >
        <ClienteInputModal
          setCliente={setCliete}
          cliente={cliente}
          setShowClienteModal={setShowClienteModal}
        />
      </Modal>
    </UserLayout>
  );
};

export default ClientePage;
