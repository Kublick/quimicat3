import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, Input, Modal, Text } from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ITarifa, tarifaValidation } from "../../../intefaces";
import { uiContext } from "../../../store/uiSlice";
import { trpc } from "../../../utils/trpc";

type Props = {
  mode?: "new" | "edit";
  tarifa: ITarifa | null;
  setTarifa: (tarifa: ITarifa | null) => void;
};

const TarifaModal: FC<Props> = ({ mode = "new", tarifa, setTarifa }) => {
  const utils = trpc.useContext();
  const [disabled, setDisabled] = useState(false);
  const { setShowModal } = uiContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ITarifa>({
    defaultValues: {
      nombre: "",
      descripcion: "",
      isDefault: false,
    },
    mode: "onBlur",
    resolver: zodResolver(tarifaValidation),
  });

  const createTarifa = trpc.useMutation(["configuracion.createTarifa"], {
    onSuccess: () => {
      //invalidate cache
      utils.invalidateQueries("configuracion.getTarifas");
    },
  });

  const updateTarifa = trpc.useMutation(["configuracion.updateTarifa"], {
    onSuccess: () => {
      //invalidate cache
      utils.invalidateQueries("configuracion.getTarifas");
    },
  });

  useEffect(() => {
    reset({ ...tarifa });
  }, [reset, tarifa]);

  if (tarifa) {
    mode = "edit";
  }

  const onSubmit = (data: ITarifa) => {
    setDisabled(true);
    if (mode === "new") {
      createTarifa.mutateAsync(data);
      toast.success("Tarifa creada correctamente");
    }
    if (mode === "edit") {
      updateTarifa.mutateAsync(data);
      toast.success("Tarifa actualizada correctamente");
    }
    setShowModal(false);
    setDisabled(false);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Tarifa";
      break;
    default:
      textMode = "Registrar Tarifa";
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
            label="Descripcion"
            {...register("descripcion")}
            color="primary"
            helperText={errors?.nombre?.message}
            helperColor="error"
          />
          <Controller
            name="isDefault"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                label="¿Es Default?"
                isSelected={value}
                onChange={onChange}
              />
            )}
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

export default TarifaModal;
