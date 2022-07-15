import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import ConfiguracionDepartamentoTable from "../../../components/configuraciones/departamento/ConfiguracionDepartamentoTable";
import { ConfiguracionMetodoTable } from "../../../components/configuraciones/metodo/ConfiguracionMetodoTable";
import { MetodoModal } from "../../../components/configuraciones/metodo/MetodoModal";
import { UserLayout } from "../../../components/layout";
import { IMetodo } from "../../../intefaces/metodo";
import { uiContext } from "../../../store/uiSlice";
import { Box } from "../../../styles/TableStyles";

const ConfiguracionMetodoPage = () => {
  const { showModal, setShowModal } = uiContext();
  const [metodo, setMetodo] = useState<IMetodo | null>(null);

  return (
    <UserLayout title="Metodos">
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
          onClick={() => setShowModal(true)}
        >
          Crear Metodo
        </Button>
      </Box>
      <ConfiguracionMetodoTable setMetodo={setMetodo} />
      <Modal
        closeButton
        aria-labelledby="Departamento"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <MetodoModal setMetodo={setMetodo} metodo={metodo} />
      </Modal>
    </UserLayout>
  );
};

export default ConfiguracionMetodoPage;
