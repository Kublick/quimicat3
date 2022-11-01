import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Input, Button, Text, Checkbox } from "@nextui-org/react";
import React, { type FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { type IMuestra, muestrasValidation } from "../../../intefaces";
import { uiContext } from "../../../store/uiSlice";
import { trpc } from "../../../utils/trpc";

type Props = {
  mode?: "new" | "edit";
  muestra: IMuestra | null;
  setMuestra: (muestra: IMuestra | null) => void;
};

export const MuestraModal: FC<Props> = ({
  mode = "new",
  muestra,
  setMuestra,
}) => {
  const utils = trpc.useContext();
  const { setShowModal } = uiContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IMuestra>({
    defaultValues: {
      clave: "",
      descripcion: "",
      nombreTubo: "",
      observaciones: "",
      barCode: false,
      excludeStatus: false,
      startAsPending: false,
    },
    mode: "onBlur",
    resolver: zodResolver(muestrasValidation),
  });

  const [disabled, setDisabled] = useState(false);

  const createMuestra = trpc.configuracion.createMuestra.useMutation({
    onSuccess: () => {
      utils.configuracion.getMuestras.invalidate();
    },
  });

  const updateMuestra = trpc.configuracion.updateMuestra.useMutation({
    onSuccess: () => {
      utils.configuracion.getMuestras.invalidate();
    },
  });

  useEffect(() => {
    if (muestra) {
      reset({ ...muestra });
    }
  }, [reset, muestra]);

  if (muestra) {
    mode = "edit";
  }

  const onSubmit = (data: IMuestra) => {
    setDisabled(true);

    if (mode === "new") {
      createMuestra.mutateAsync(data);
      toast.success("Muestra creada correctamente");
    }

    if (mode === "edit") {
      updateMuestra.mutateAsync(data);
      setMuestra(null);
      toast.success("Muestra actualizada correctamente");
    }

    setShowModal(false);
    setDisabled(false);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Muestra";
      break;
    default:
      textMode = "Registrar Muestra";
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
            label="Clave"
            {...register("clave")}
            helperText={errors?.clave?.message}
            helperColor="error"
            color="primary"
          />

          <Input
            bordered
            label="Descripción"
            {...register("descripcion")}
            helperText={errors?.descripcion?.message}
            helperColor="error"
            color="primary"
          />
          <Input
            bordered
            label="Nombre Tubo"
            {...register("nombreTubo")}
            helperText={errors?.nombreTubo?.message}
            helperColor="error"
            color="primary"
          />

          <Controller
            control={control}
            name={"barCode"}
            render={({ field: { value, ...rest } }) => (
              <Checkbox isSelected={value} {...rest}>
                ¿Imprímir código de barras?
              </Checkbox>
            )}
          />

          <Controller
            control={control}
            name={"excludeStatus"}
            render={({ field: { value, ...rest } }) => (
              <Checkbox isSelected={value} {...rest}>
                ¿Excluir estatus de muestras?
              </Checkbox>
            )}
          />

          <Controller
            control={control}
            name={"startAsPending"}
            render={({ field: { value, ...rest } }) => (
              <Checkbox isSelected={value} {...rest}>
                ¿Estatus de inicial de muestra como pendiente?
              </Checkbox>
            )}
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
