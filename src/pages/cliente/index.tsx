import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { ClienteInputModal } from "../../components/cliente/ClienteInputModal";
import ClienteTable from "../../components/cliente/ClienteTable";
import { UserLayout } from "../../components/layout";
import type { ICliente } from "../../intefaces";
import { Box } from "../../styles/TableStyles";

const ClientePage = () => {
  const [showClienteModal, setShowClienteModal] = useState(false);

  const [cliente, setCliente] = useState<ICliente | null>(null);

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
          icon={<PlusCircleIcon className="h-5 w-5" />}
          onClick={() => setShowClienteModal(true)}
        >
          Crear Cliente
        </Button>
      </Box>
      <ClienteTable setCliente={setCliente} />

      <Modal
        closeButton
        aria-labelledby="Departamento"
        open={showClienteModal}
        onClose={() => setShowClienteModal(false)}
      >
        <ClienteInputModal
          setCliente={setCliente}
          cliente={cliente}
          setShowClienteModal={setShowClienteModal}
        />
      </Modal>
    </UserLayout>
  );
};

export default ClientePage;
