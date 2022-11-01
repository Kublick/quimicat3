import React, { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { trpc } from "../../../utils/trpc";
import { toast } from "react-toastify";
import { uiContext } from "../../../store/uiSlice";
import { type IMetodo, metodoValidation } from "../../../intefaces";

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

  const createMetodo = trpc.configuracion.createMetodo.useMutation({
    onSuccess: () => {
      //invalidate cache
      utils.configuracion.getMetodos.invalidate();
    },
  });

  const updateMetodo = trpc.configuracion.updateMetodo.useMutation({
    onSuccess: () => {
      //invalidate cache
      utils.configuracion.getMetodos.invalidate();
    },
  });

  useEffect(() => {
    reset({ ...metodo });
  }, [reset, metodo]);

  if (metodo) {
    mode = "edit";
  }

  const onSubmit = (data: IMetodo) => {
    setDisabled(true);

    if (mode === "new") {
      createMetodo.mutateAsync(data);
      toast.success("Metodo creado correctamente");
    }

    if (mode === "edit") {
      updateMetodo.mutateAsync(data);
      setMetodo(null);
      toast.success("Metodo actualizado correctamente");
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
