import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import ConfiguracionDepartamentoTable from "../../../components/configuraciones/departamento/ConfiguracionDepartamentoTable";
import { DepartamentoModal } from "../../../components/configuraciones/departamento/DepartamentoModal";
import { UserLayout } from "../../../components/layout";
import type { IDepartamento } from "../../../intefaces";
import { uiContext } from "../../../store/uiSlice";
import { Box } from "../../../styles/TableStyles";

const ConfiguacionesDepartamentoPage = () => {
  const { showModal, setShowModal } = uiContext();

  const [departamento, setDepartamento] = useState<IDepartamento | null>(null);

  return (
    <UserLayout title="Departamento">
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
          onClick={() => setShowModal(true)}
        >
          Crear Departamento
        </Button>
      </Box>
      <ConfiguracionDepartamentoTable setDepartamento={setDepartamento} />
      <Modal
        closeButton
        aria-labelledby="Departamento"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <DepartamentoModal
          setDepartamento={setDepartamento}
          departamento={departamento}
        />
      </Modal>
    </UserLayout>
  );
};

export default ConfiguacionesDepartamentoPage;
