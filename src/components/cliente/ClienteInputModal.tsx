import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Input, Button, Text, Loading } from "@nextui-org/react";
import React, { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { type ICliente, clienteValidation } from "../../intefaces";
import { SLabel, SSelect } from "../../styles/SelectStyles";
import { Box } from "../../styles/TableStyles";
import { trpc } from "../../utils/trpc";

type Props = {
  cliente: ICliente | null;
  setCliente: (cliente: ICliente | null) => void;
  mode?: "new" | "edit";
  setShowClienteModal: (showClienteModal: boolean) => void;
};

export const ClienteInputModal: FC<Props> = ({
  cliente,
  setCliente,
  mode = "new",
  setShowClienteModal,
}) => {
  const utils = trpc.useContext();

  const [disabled, setDisabled] = useState(false);

  const { data } = trpc.configuracion.getTarifas.useQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICliente>({
    defaultValues: {
      nombre: "",
      abreviatura: "",
      email: "",
      telefono: "",
      direccion: "",
      tipo: "",
      rfc: "",
      tarifaId: "",
    },
    mode: "onBlur",
    resolver: zodResolver(clienteValidation),
  });

  const createCliente = trpc.cliente.createCliente.useMutation({
    onSuccess: () => {
      utils.cliente.invalidate();
    },
  });

  const updateCliente = trpc.cliente.updateCliente.useMutation({
    onSuccess: () => {
      utils.cliente.invalidate();
    },
  });

  useEffect(() => {
    if (cliente) {
      reset(cliente);
    }
  }, [reset, cliente]);

  if (cliente) {
    mode = "edit";
  }

  console.log(cliente);

  if (!data) {
    return (
      <Loading
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Cargando Datos
      </Loading>
    );
  }

  const onSubmit = (data: ICliente) => {
    setDisabled(true);

    if (mode === "new") {
      createCliente.mutateAsync(data);
      toast.success("Cliente creado correctamente");
    }

    if (mode === "edit") {
      updateCliente.mutateAsync(data);
      setCliente(null);
      toast.success("Cliente actualizado correctamente");
    }

    setShowClienteModal(false);
    setDisabled(false);
  };

  console.log(mode);

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Cliente";
      break;
    default:
      textMode = "Registrar Cliente";
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
            label="Abreviatura"
            {...register("abreviatura")}
            color="primary"
            helperText={errors?.abreviatura?.message as string}
            helperColor="error"
          />
          <Input
            bordered
            label="Nombre"
            {...register("nombre")}
            color="primary"
            helperText={errors?.nombre?.message}
            helperColor="error"
          />

          <SLabel>Tarifa</SLabel>
          <SSelect {...register("tarifaId")}>
            <option value="">Seleccione una tarifa</option>
            {data.map((tarifa) => (
              <option key={tarifa.id} value={tarifa.id}>
                {tarifa.nombre}
              </option>
            ))}
          </SSelect>

          <Input
            bordered
            label="Email"
            {...register("email")}
            color="primary"
            helperText={errors?.email?.message}
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
            label="Direccion"
            {...register("direccion")}
            color="primary"
            helperText={errors?.telefono?.message}
            helperColor="error"
          />
          <Box>
            <SLabel>Tipo</SLabel>
            <SSelect {...register("tipo")}>
              <option value="credito">Crédito</option>
              <option value="efectivo">Efectivo</option>
            </SSelect>
          </Box>

          <Input
            bordered
            label="RFC"
            {...register("rfc")}
            color="primary"
            helperText={errors?.telefono?.message}
            helperColor="error"
          />

          <div className="mt-4 flex justify-end gap-2">
            <Button
              color="secondary"
              onClick={() => setShowClienteModal(false)}
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
