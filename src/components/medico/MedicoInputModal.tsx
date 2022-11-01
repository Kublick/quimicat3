import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import React, { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { type IMedico, medicoValidation } from "../../intefaces";

import { trpc } from "../../utils/trpc";

type Props = {
  medico: IMedico | null;
  setMedico: (medico: IMedico | null) => void;
  mode?: "new" | "edit";
  setShowModalMedico: (showModalMedico: boolean) => void;
};

const MedicoInputModal: FC<Props> = ({
  medico,
  setMedico,
  mode = "new",
  setShowModalMedico,
}) => {
  const utils = trpc.useContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IMedico>({
    defaultValues: {
      nombre: "",
      especialidad: "",
      telefono: "",
      email: "",
    },
    mode: "onBlur",
    resolver: zodResolver(medicoValidation),
  });

  useEffect(() => {
    if (medico) {
      reset(medico);
    }
  }, [reset, medico]);

  if (medico) {
    mode = "edit";
  }

  const [disabled, setDisabled] = useState(false);

  const createMedico = trpc.medico.createMedico.useMutation({
    onSuccess: () => {
      utils.medico.invalidate();
    },
  });

  const updateMedico = trpc.medico.updateMedico.useMutation({
    onSuccess: () => {
      utils.medico.invalidate();
    },
  });

  const onSubmit = (data: IMedico) => {
    setDisabled(true);

    if (mode === "new") {
      createMedico.mutateAsync(data);
      toast.success("Médico creado correctamente");
    }

    if (mode === "edit") {
      updateMedico.mutateAsync(data);
      setMedico(null);
      toast.success("Medico actualizado correctamente");
    }

    setShowModalMedico(false);
    setDisabled(false);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Médico";
      break;
    default:
      textMode = "Registrar Médico";
      break;
  }

  return (
    <>
      <Modal.Header>
        <Text h4>{textMode}</Text>
      </Modal.Header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body
          css={{
            p: "2rem",
          }}
        >
          <Input
            bordered
            label="Nombre"
            {...register("nombre")}
            color="primary"
            helperText={errors?.nombre?.message}
            helperColor="error"
          />
          <Input
            bordered
            label="Especialidad"
            {...register("especialidad")}
            color="primary"
            helperText={errors?.especialidad?.message}
            helperColor="error"
          />
          <Input
            bordered
            label="Telefono"
            {...register("telefono")}
            color="primary"
            helperText={errors?.telefono?.message}
            helperColor="error"
          />
          <Input
            bordered
            label="Email"
            {...register("email")}
            color="primary"
            helperText={errors?.email?.message}
            helperColor="error"
          />

          <div className="mt-4 flex justify-end gap-2">
            <Button
              color="secondary"
              onClick={() => setShowModalMedico(false)}
              auto
            >
              Regresar
            </Button>
            <Button type="submit" disabled={disabled} auto>
              Guardar
            </Button>
          </div>
        </Modal.Body>
      </form>
    </>
  );
};

export default MedicoInputModal;
