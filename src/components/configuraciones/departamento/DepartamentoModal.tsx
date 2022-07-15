import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import {
  departamentoValidation,
  IDepartamento,
} from "../../../intefaces/departamento";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, Text } from "@nextui-org/react";
import { trpc } from "../../../utils/trpc";
import { toast } from "react-toastify";

type Props = {
  setShowModal: (showModal: boolean) => void;
  mode?: "new" | "edit";
  departamento?: IDepartamento | null;
  setDepartamento: (departamento: IDepartamento | null) => void;
};

export const DepartamentoModal: FC<Props> = ({
  setShowModal,
  mode = "new",
  departamento,
  setDepartamento,
}) => {
  const utils = trpc.useContext();

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

  const createDepartamento = trpc.useMutation(
    ["configuracion.createDepartamento"],
    {
      onSuccess: () => {
        //invalidate cache
        utils.invalidateQueries("configuracion.getDepartamentos");
      },
    }
  );

  const updateDepartamento = trpc.useMutation(
    ["configuracion.updateDepartamento"],
    {
      onSuccess: () => {
        //invalidate cache
        utils.invalidateQueries("configuracion.getDepartamentos");
      },
    }
  );

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
