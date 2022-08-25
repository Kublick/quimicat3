import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Card, Loading, Modal, Text } from "@nextui-org/react";
import { UserLayout } from "../../components/layout";
import { Box } from "../../styles/TableStyles";
import { trpc } from "../../utils/trpc";
import Select from "react-select";
import { IOrden, IPaciente, ordenValidation } from "../../intefaces";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uiContext } from "../../store/uiSlice";
import { PacienteInputModal } from "../../components/paciente/PacienteInputModal";
import paciente from "../paciente";
import { useState } from "react";

const OrdenesRegistro = () => {
  const { showModal, setShowModal } = uiContext();

  const [showModalPaciente, setShowModalPaciente] = useState(false);
  const [paciente, setPaciente] = useState<IPaciente | null>(null);

  const { data: pacientes, isLoading: pacienteIsLoading } = trpc.useQuery([
    "paciente.getPacientes",
  ]);
  const { data: cliente, isLoading: clienteIsLoading } = trpc.useQuery([
    "cliente.getClientes",
  ]);

  const { data: medico, isLoading: medicoIsLoading } = trpc.useQuery([
    "medico.getMedicos",
  ]);

  const { data: tarifa, isLoading: tarifaIsLoading } = trpc.useQuery([
    "configuracion.getTarifas",
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    control,
  } = useForm<IOrden>({
    defaultValues: {
      id: "",
      notas: "",
      tarifaId: "",
      tipo: "",
      clienteId: "",
      pacienteId: "",
      medicoId: "",
      orderGeneratorId: "",
      fecha: "",
      folioCliente: "",
    },
    mode: "onBlur",
    // resolver: zodResolver(ordenValidation),
  });

  if (pacienteIsLoading || !pacientes || !cliente || !medico || !tarifa) {
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

  const optionsPacientes = pacientes.map((paciente) => ({
    value: paciente.id,
    label: `${paciente.clave} - ${paciente.nombre} ${paciente.apellidos}`,
  }));

  const optionsCliente = cliente.map((cliente) => ({
    value: cliente.id,
    label: `${cliente.nombre}`,
  }));

  const optionsMedico = medico.map((medico) => ({
    value: medico.id,
    label: `${medico.nombre}`,
  }));

  const optionsTarifa = tarifa.map((tarifa) => ({
    value: tarifa.id,
    label: `${tarifa.nombre}`,
  }));

  const onSubmit = (data: IOrden) => {
    console.log(data);
  };

  return (
    <UserLayout title="Registro de Ordenes">
      <Modal
        closeButton
        aria-labelledby="Departamento"
        open={showModalPaciente}
        onClose={() => setShowModalPaciente(false)}
        width="600px"
      >
        <PacienteInputModal
          setPaciente={setPaciente}
          paciente={paciente}
          setShowModalPaciente={setShowModalPaciente}
        />
      </Modal>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          css={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "$12",
          }}
        >
          <Card
            css={{
              gridColumn: "span 2 / span 2",
              p: "1rem",
            }}
          >
            <Text small css={{ ml: "$2", pb: "$2" }} color="primary">
              Cliente
            </Text>
            <Box
              css={{
                d: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "$12",
              }}
            >
              <Controller
                name="clienteId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsCliente as any}
                    className="flex-1"
                    placeholder="Buscar Cliente"
                    //    onChange={handleSelectChange}
                  />
                )}
              />
              <Button
                auto
                icon={<PlusCircleIcon className="w-5 h-5" />}
                onClick={() => setShowModal(true)}
              />
            </Box>

            <Text
              small
              css={{
                ml: "$2",
                pb: "$2",
                pt: "$8",
              }}
              color="primary"
            >
              Paciente
            </Text>
            <Box
              css={{
                d: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "$12",
              }}
            >
              <Controller
                name="pacienteId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsPacientes as any}
                    className="flex-1"
                    placeholder="Buscar Paciente"
                  />
                )}
              />

              <Button
                auto
                icon={<PlusCircleIcon className="w-5 h-5" />}
                onClick={() => setShowModalPaciente(true)}
              />
            </Box>
            <Text
              small
              css={{
                ml: "$2",
                pt: "$8",
                pb: "$2",
              }}
              color="primary"
            >
              Médico
            </Text>
            <Box
              css={{
                d: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "$12",
              }}
            >
              <Controller
                name="medicoId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsMedico as any}
                    className="flex-1"
                    placeholder="Buscar Medico"
                  />
                )}
              />

              <Button
                auto
                icon={<PlusCircleIcon className="w-5 h-5" />}
                //   onClick={() => setShowModal(true)}
              />
            </Box>

            <Text
              small
              css={{
                mt: "$4",
                pt: "$4",
                pb: "$2",
              }}
              color="primary"
            >
              Tarifa
            </Text>
            <Box
              css={{
                d: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "$12",
              }}
            >
              <Controller
                name="tarifaId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsTarifa as any}
                    className="flex-1"
                    placeholder="Buscar Tarifa"
                  />
                )}
              />

              <Button
                disabled
                css={{
                  opacity: 0,
                }}
                auto
                icon={<PlusCircleIcon className="w-5 h-5" />}
                //   onClick={() => setShowModal(true)}
              />
            </Box>
            <Box
              css={{
                height: "200px",
              }}
            />
          </Card>
          <Box>
            <Card
              css={{
                p: "1rem",
              }}
            >
              <Box
                css={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                }}
              >
                <Text>Orden</Text>
                <Text>--Nuevo--</Text>
                <Text>Tipo</Text>
                <Text>Rutina</Text>
              </Box>
            </Card>
          </Box>
        </Box>
        <Button type="submit">Registrar</Button>
      </form>
    </UserLayout>
  );
};

export default OrdenesRegistro;
