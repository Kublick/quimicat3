import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { trpc } from "../../../utils/trpc";
import { toast } from "react-toastify";
import { uiContext } from "../../../store/uiSlice";
import { IMetodo, metodoValidation } from "../../../intefaces/metodo";

type Props = {
  mode?: "new" | "edit";
  metodo: IMetodo | null;
  setMetodo: (metodo: IMetodo | null) => void;
};

export const MetodoModal: FC<Props> = ({ mode = "new", metodo, setMetodo }) => {
  const utils = trpc.useContext();
  const { setShowModal } = uiContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IMetodo>({
    defaultValues: {
      nombre: "",
    },
    mode: "onBlur",
    resolver: zodResolver(metodoValidation),
  });

  const [disabled, setDisabled] = useState(false);

  const createDepartamento = trpc.useMutation(["configuracion.createMetodo"], {
    onSuccess: () => {
      //invalidate cache
      utils.invalidateQueries("configuracion.getMetodos");
    },
  });

  const updateDepartamento = trpc.useMutation(["configuracion.updateMetodo"], {
    onSuccess: () => {
      //invalidate cache
      utils.invalidateQueries("configuracion.getMetodos");
    },
  });

  if (metodo) {
    reset({ ...metodo });
    mode = "edit";
  }

  const onSubmit = (data: IMetodo) => {
    setDisabled(true);

    if (mode === "new") {
      createDepartamento.mutateAsync(data);
      toast.success("Departamento creado correctamente");
    }

    if (mode === "edit") {
      updateDepartamento.mutateAsync(data);
      setMetodo(null);
      toast.success("Departamento actualizado correctamente");
    }

    setShowModal(false);
    setDisabled(false);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Metodo";
      break;
    default:
      textMode = "Registrar Metodo";
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
