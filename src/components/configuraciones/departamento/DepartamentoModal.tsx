import React, { type FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { trpc } from "../../../utils/trpc";
import { toast } from "react-toastify";
import { uiContext } from "../../../store/uiSlice";
import { departamentoValidation, type IDepartamento } from "../../../intefaces";

type Props = {
  mode?: "new" | "edit";
  departamento?: IDepartamento | null;
  setDepartamento: (departamento: IDepartamento | null) => void;
};

export const DepartamentoModal: FC<Props> = ({
  mode = "new",
  departamento,
  setDepartamento,
}) => {
  const utils = trpc.useContext();
  const { setShowModal } = uiContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IDepartamento>({
    defaultValues: {
      nombre: "",
    },
    mode: "onBlur",
    resolver: zodResolver(departamentoValidation),
  });

  const [disabled, setDisabled] = useState(false);

  const createDepartamento = trpc.configuracion.createDepartamento.useMutation({
    onSuccess: () => {
      utils.configuracion.getDepartamentos.invalidate();
    },
  });

  const updateDepartamento = trpc.configuracion.updateDepartamento.useMutation({
    onSuccess: () => {
      utils.configuracion.getDepartamentos.invalidate();
    },
  });

  if (departamento) {
    reset({ ...departamento });
    mode = "edit";
  }

  const onSubmit = (data: IDepartamento) => {
    setDisabled(true);

    if (mode === "new") {
      createDepartamento.mutateAsync(data);
      toast.success("Departamento creado correctamente");
    }

    if (mode === "edit") {
      updateDepartamento.mutateAsync(data);
      setDepartamento(null);
      toast.success("Departamento actualizado correctamente");
    }

    setShowModal(false);
    setDisabled(false);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Departamento";
      break;
    default:
      textMode = "Registrar Departamento";
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
          <div className="mt-4 flex justify-end gap-2">
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
