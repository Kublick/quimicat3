import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { ConfiguracionMuestraTable } from "../../../components/configuraciones/muestra/ConfiguracionMuestraTable";
import { MuestraModal } from "../../../components/configuraciones/muestra/MuestraModal";
import { UserLayout } from "../../../components/layout";
import { type IMuestra } from "../../../intefaces";
import { uiContext } from "../../../store/uiSlice";
import { Box } from "../../../styles/TableStyles";

const ConfiguracionMuestraPage = () => {
  const { showModal, setShowModal } = uiContext();
  const [muestra, setMuestra] = useState<IMuestra | null>(null);
  return (
    <UserLayout title="Muestras">
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
          Crear Muestra
        </Button>
      </Box>
      <ConfiguracionMuestraTable setMuestra={setMuestra} />
      <Modal
        closeButton
        aria-labelledby="Muestras"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <MuestraModal setMuestra={setMuestra} muestra={muestra} />
      </Modal>
    </UserLayout>
  );
};

export default ConfiguracionMuestraPage;
