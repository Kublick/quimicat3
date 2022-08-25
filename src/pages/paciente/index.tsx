import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Modal } from "@nextui-org/react";
import React, { useState } from "react";
import { UserLayout } from "../../components/layout";
import { PacienteInputModal } from "../../components/paciente/PacienteInputModal";
import { PacienteTable } from "../../components/paciente/PacienteTable";
import { IMedico, IPaciente } from "../../intefaces";
import { Box } from "../../styles/TableStyles";

const PacientePage = () => {
  const [showModalPaciente, setShowModalPaciente] = useState(false);
  const [paciente, setPaciente] = useState<IPaciente | null>(null);

  return (
    <UserLayout title="Pacientes">
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
          onClick={() => setShowModalPaciente(true)}
        >
          Crear Paciente
        </Button>
      </Box>
      <PacienteTable setPaciente={setPaciente} />
      <Modal
        closeButton
        aria-labelledby="Departamento"
        open={showModalPaciente}
        onClose={() => setShowModalPaciente(false)}
        width="600px"
      >
        <PacienteInputModal
          setPaciente={setPaciente}
          paciente={paciente}
          setShowModalPaciente={setShowModalPaciente}
        />
      </Modal>
    </UserLayout>
  );
};

export default PacientePage;
