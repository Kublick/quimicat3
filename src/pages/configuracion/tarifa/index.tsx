import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { ConfiguracionTarifaTable } from "../../../components/configuraciones/tarifa/ConfiguracionTarifaTable";

import TarifaModal from "../../../components/configuraciones/tarifa/TarifaModal";
import { UserLayout } from "../../../components/layout";
import { ITarifa } from "../../../intefaces";
import { uiContext } from "../../../store/uiSlice";
import { Box } from "../../../styles/TableStyles";

const TarifaPage = () => {
  const { showModal, setShowModal } = uiContext();
  const [tarifa, setTarifa] = useState<ITarifa | null>(null);
  return (
    <UserLayout title="Tarifas">
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
          Crear Tarifa
        </Button>
      </Box>

      <ConfiguracionTarifaTable setTarifa={setTarifa} />

      <Modal
        closeButton
        aria-labelledby="Tarifa"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <TarifaModal setTarifa={setTarifa} tarifa={tarifa} />
      </Modal>
    </UserLayout>
  );
};

export default TarifaPage;
