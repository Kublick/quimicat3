import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IMedico, medicoValidation, metodoValidation } from "../../intefaces";
import { uiContext } from "../../store/uiSlice";
import { trpc } from "../../utils/trpc";

type Props = {
  medico: IMedico | null;
  setMedico: (medico: IMedico | null) => void;
  mode?: "new" | "edit";
};

const MedicoInputModal: FC<Props> = ({ medico, setMedico, mode = "new" }) => {
  const utils = trpc.useContext();
  const { setShowModal } = uiContext();

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

  const [disabled, setDisabled] = useState(false);

  const createMedico = trpc.useMutation(["medico.createMedico"], {
    onSuccess: () => {
      utils.invalidateQueries("medico.getMedicos");
    },
  });

  const updateMedico = trpc.useMutation(["medico.updateMedico"], {
    onSuccess: () => {
      utils.invalidateQueries("medico.getMedicos");
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
      toast.success("Metodo actualizado correctamente");
    }

    setShowModal(false);
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

          <div className="flex justify-end gap-2 mt-4">
            <Button color="secondary" onClick={() => setShowModal(false)} auto>
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
