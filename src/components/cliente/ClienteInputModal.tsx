import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Input, Button, Text, Loading } from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { clienteValidation, ICliente } from "../../intefaces";
import { uiContext } from "../../store/uiSlice";
import { SLabel, SSelect } from "../../styles/SelectStyles";
import { trpc } from "../../utils/trpc";

type Props = {
  cliente: ICliente | null;
  setCliente: (cliente: ICliente | null) => void;
  mode?: "new" | "edit";
};

export const ClienteInputModal: FC<Props> = ({
  cliente,
  setCliente,
  mode = "new",
}) => {
  const utils = trpc.useContext();
  const { setShowModal } = uiContext();

  const [disabled, setDisabled] = useState(false);

  const { data } = trpc.useQuery(["configuracion.getTarifas"]);

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

  const createCliente = trpc.useMutation(["cliente.createCliente"], {
    onSuccess: () => {
      utils.invalidateQueries("cliente.getClientes");
    },
  });

  const updateCliente = trpc.useMutation(["cliente.updateCliente"], {
    onSuccess: () => {
      utils.invalidateQueries("cliente.getClientes");
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

    setShowModal(false);
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
            helperText={errors?.abreviatura?.message}
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

          <SLabel>Tipo</SLabel>
          <SSelect {...register("tipo")}>
            <option value="credito">Crédito</option>
            <option value="efectivo">Efectivo</option>
          </SSelect>

          <Input
            bordered
            label="RFC"
            {...register("rfc")}
            color="primary"
            helperText={errors?.telefono?.message}
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
