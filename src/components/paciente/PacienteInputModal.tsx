import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Input,
  Button,
  Text,
  Loading,
  Textarea,
} from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { IPaciente, pacienteValidation } from "../../intefaces";
import { SLabel, SSelect } from "../../styles/SelectStyles";
import { Box } from "../../styles/TableStyles";
import { trpc } from "../../utils/trpc";

type Props = {
  setPaciente: (paciente: IPaciente | null) => void;
  paciente: IPaciente | null;
  mode?: "new" | "edit";
  setShowModalPaciente: (showModalPaciente: boolean) => void;
};

export const PacienteInputModal: FC<Props> = ({
  setPaciente,
  paciente,
  mode = "new",
  setShowModalPaciente,
}) => {
  const utils = trpc.useContext();
  const [disabled, setDisabled] = useState(false);
  const { data: clientes } = trpc.useQuery(["cliente.getClientes"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPaciente>({
    defaultValues: {
      clave: "",
      clienteId: "",
      nombre: "",
      apellidos: "",
      genero: "",
      fechaNacimiento: "",
      celular: "",
      comentarios: "",
      tutor: "",
      emailResultados: "",
      direccion: "",
    },
    mode: "onBlur",
    resolver: zodResolver(pacienteValidation),
  });

  useEffect(() => {
    if (paciente) {
      reset({
        ...paciente,
        fechaNacimiento: paciente.fechaNacimiento
          ? paciente.fechaNacimiento.toString()
          : "",
      });
    }
  }, [reset, paciente]);

  if (paciente) {
    mode = "edit";
  }

  const createPaciente = trpc.useMutation(["paciente.createPaciente"], {
    onSuccess: () => {
      utils.invalidateQueries("paciente.getPacientes");
    },
  });

  const updatePaciente = trpc.useMutation(["paciente.updatePaciente"], {
    onSuccess: () => {
      utils.invalidateQueries("paciente.getPacientes");
    },
  });

  if (!clientes) return <Loading> Cargando Datos </Loading>;

  const onSubmit = (data: IPaciente) => {
    setDisabled(true);

    if (mode === "new") {
      createPaciente.mutateAsync(data);
      toast.success("Paciente creado correctamente");
    }

    if (mode === "edit") {
      updatePaciente.mutateAsync(data);
      setPaciente(null);
      toast.success("Metodo actualizado correctamente");
    }

    setShowModalPaciente(false);
    setDisabled(false);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Paciente";
      break;
    default:
      textMode = "Registrar Paciente";
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Input
            bordered
            label="Clave"
            {...register("clave")}
            color="primary"
            disabled={true}
            fullWidth
          />

          <Box
            css={{
              width: "100%",
            }}
          >
            <SLabel>Cliente</SLabel>
            <SSelect {...register("clienteId")}>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </option>
              ))}
            </SSelect>
          </Box>

          <div className="grid grid-cols-2 gap-6">
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
              label="Apellidos"
              {...register("apellidos")}
              color="primary"
              helperText={errors?.apellidos?.message}
              helperColor="error"
            />
            <Box>
              <SLabel>Genero</SLabel>
              <SSelect {...register("genero")}>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                {/* ErrorMessage */}
              </SSelect>
            </Box>

            <Input
              bordered
              label="Fecha de Nacimiento"
              type="date"
              {...register("fechaNacimiento")}
              color="primary"
              helperText={errors?.fechaNacimiento?.message}
              helperColor="error"
            />
            <Input
              bordered
              label="Celular"
              {...register("celular")}
              color="primary"
            />
            <Input
              bordered
              label="Email"
              {...register("emailResultados")}
              color="primary"
            />
          </div>
          <Input
            bordered
            label="Direccion"
            {...register("direccion")}
            color="primary"
          />
          <Input
            bordered
            label="Tutor"
            {...register("tutor")}
            color="primary"
          />
          <Textarea
            bordered
            label="Comentarios"
            {...register("comentarios")}
            color="primary"
          />
        </Modal.Body>
        <div className="flex justify-end gap-2 px-4 py-4 mt-4">
          <Button color="secondary" onClick={() => setShowModalPaciente(false)}>
            Regresar
          </Button>
          <Button type="submit" disabled={disabled}>
            Guardar
          </Button>
        </div>
      </form>
    </>
  );
};
