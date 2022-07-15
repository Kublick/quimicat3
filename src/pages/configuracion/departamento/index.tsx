import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Card, Modal } from "@nextui-org/react";
import router from "next/router";
import React, { useState } from "react";
import ConfiguracionDepartamentoTable from "../../../components/configuraciones/departamento/ConfiguracionDepartamentoTable";
import { DepartamentoModal } from "../../../components/configuraciones/departamento/DepartamentoModal";
import { UserLayout } from "../../../components/layout";
import { IDepartamento } from "../../../intefaces/departamento";
import { Box } from "../../../styles/TableStyles";

const ConfiguacionesDepartamentoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [departamento, setDepartamento] = useState<IDepartamento | undefined>(
    undefined
  );

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
          icon={<PlusCircleIcon className="w-5 h-5" />}
          onClick={() => setShowModal(true)}
        >
          Crear Departamento
        </Button>
      </Box>
      <ConfiguracionDepartamentoTable
        setShowModal={setShowModal}
        setDepartamento={setDepartamento}
      />
      <Modal
        closeButton
        aria-labelledby="Departamento"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <DepartamentoModal
          setDepartamento={setDepartamento}
          setShowModal={setShowModal}
          departamento={departamento}
        />
      </Modal>
    </UserLayout>
  );
};

export default ConfiguacionesDepartamentoPage;
