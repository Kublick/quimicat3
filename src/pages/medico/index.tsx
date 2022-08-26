import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { UserLayout } from "../../components/layout";
import MedicoInputModal from "../../components/medico/MedicoInputModal";
import { MedicoTable } from "../../components/medico/MedicoTable";
import { IMedico } from "../../intefaces";
import { Box } from "../../styles/TableStyles";

const MedicoPage = () => {
  const [medico, setMedico] = useState<IMedico | null>(null);
  const [showModalMedico, setShowModalMedico] = useState(false);

  return (
    <UserLayout title="Medico">
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
          onClick={() => setShowModalMedico(true)}
        >
          Crear Medico
        </Button>
      </Box>
      <MedicoTable setMedico={setMedico} />
      <Modal
        closeButton
        aria-labelledby="Departamento"
        open={showModalMedico}
        onClose={() => setShowModalMedico(false)}
      >
        <MedicoInputModal
          setMedico={setMedico}
          medico={medico}
          setShowModalMedico={setShowModalMedico}
        />
      </Modal>
    </UserLayout>
  );
};

export default MedicoPage;
