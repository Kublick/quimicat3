import { useState } from "react";
import { trpc } from "../../utils/trpc";
import Select from "react-select";

import { Box } from "../../styles/TableStyles";
import { Button, Card, Loading, Modal, Text } from "@nextui-org/react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import type { ICliente, IMedico, IOrden, IPaciente } from "../../intefaces";
import { useForm, Controller } from "react-hook-form";
import { uiContext } from "../../store/uiSlice";
import { PacienteInputModal } from "../../components/paciente/PacienteInputModal";
import { ClienteInputModal } from "../../components/cliente/ClienteInputModal";
import MedicoInputModal from "../../components/medico/MedicoInputModal";
import { UserLayout } from "../../components/layout";

const OrdenesRegistro = () => {
  const { showModal, setShowModal } = uiContext();

  const [showModalPaciente, setShowModalPaciente] = useState(false);
  const [paciente, setPaciente] = useState<IPaciente | null>(null);

  const [showClienteModal, setShowClienteModal] = useState(false);
  const [cliente, setCliente] = useState<ICliente | null>(null);

  const [showModalMedico, setShowModalMedico] = useState(false);
  const [medico, setMedico] = useState<IMedico | null>(null);

  const { data: pacientes, isLoading: pacienteIsLoading } =
    trpc.paciente.getPacientes.useQuery();

  console.log(pacientes);

  const { data: clientes, isLoading: clienteIsLoading } =
    trpc.cliente.getClientes.useQuery();

  const { data: medicos, isLoading: medicoIsLoading } =
    trpc.medico.getMedicos.useQuery();

  const { data: tarifas, isLoading: tarifaIsLoading } =
    trpc.configuracion.getTarifas.useQuery();

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

  if (pacienteIsLoading || !pacientes || !clientes || !medicos || !tarifas) {
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

  const optionsCliente = clientes.map((cliente) => ({
    value: cliente.id,
    label: `${cliente.nombre}`,
  }));

  const optionsMedico = medicos.map((medico) => ({
    value: medico.id,
    label: `${medico.nombre}`,
  }));

  const optionsTarifa = tarifas.map((tarifa) => ({
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
        aria-labelledby="pacientemodal"
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
      <Modal
        closeButton
        aria-labelledby="clientemodal"
        open={showClienteModal}
        onClose={() => setShowClienteModal(false)}
      >
        <ClienteInputModal
          setCliente={setCliente}
          cliente={cliente}
          setShowClienteModal={setShowClienteModal}
        />
      </Modal>
      <Modal
        closeButton
        aria-labelledby="medicomodal"
        open={showModalMedico}
        onClose={() => setShowModalMedico(false)}
      >
        <MedicoInputModal
          setMedico={setMedico}
          medico={medico}
          setShowModalMedico={setShowModalMedico}
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
                  />
                )}
              />
              <Button
                auto
                icon={<PlusCircleIcon className="h-5 w-5" />}
                onClick={() => setShowClienteModal(true)}
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
                icon={<PlusCircleIcon className="h-5 w-5" />}
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
                icon={<PlusCircleIcon className="h-5 w-5" />}
                onClick={() => setShowModalMedico(true)}
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
                icon={<PlusCircleIcon className="h-5 w-5" />}
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
