import { PencilIcon } from "@heroicons/react/20/solid";
import { Loading, Row, Col, Tooltip } from "@nextui-org/react";
import { type ColumnDef } from "@tanstack/react-table";
import React, { type FC } from "react";
import type { IPaciente } from "../../intefaces";
import { uiContext } from "../../store/uiSlice";
import { trpc } from "../../utils/trpc";
import MasterTable from "../ui/table/MasterTable";
import { IconButton } from "../ui/utils/IconButton";

type Props = {
  setPaciente: (paciente: IPaciente | null) => void;
};

export const PacienteTable: FC<Props> = ({ setPaciente }) => {
  const { setShowModal } = uiContext();

  const { data, isLoading } = trpc.paciente.getPacientes.useQuery();

  if (isLoading || !data) {
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

  const columns: ColumnDef<IPaciente>[] = [
    {
      accessorKey: "clave",
      header: () => "Clave",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "nombre",
      header: () => "Nombre",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "apellidos",
      header: () => "Apellidos",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "celular",
      header: () => "Telefono",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "genero",
      header: () => "Genero",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "fechaNacimiento",
      header: () => "Fecha Nacimiento",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "emailResultados",
      header: () => "Email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "tutor",
      header: () => "Tutor",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "id",
      header: "Acciones",
      cell: (info) => {
        return (
          <Row css={{ minWidth: "120px" }}>
            <Col css={{ d: "flex", jc: "center" }}>
              <Tooltip content="Editar">
                <IconButton onClick={() => handleEdit(String(info.getValue()))}>
                  <PencilIcon className="h-7 w-7" fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      },
    },
  ];

  const rows = data.map(
    (item): IPaciente => ({
      id: item.id || "",
      clave: item.clave || "",
      clienteId: item.clienteId || "",
      nombre: item.nombre || "",
      apellidos: item.apellidos || "",
      genero: item.genero || "",
      fechaNacimiento:
        item.fechaNacimiento.toISOString().substring(0, 10) || "",
      celular: item.celular || "",
      comentarios: item.comentarios || "",
      tutor: item.tutor || "",
      emailResultados: item.emailResultados || "",
      direccion: item.direccion || "",
    })
  );

  const handleEdit = (id: string) => {
    const select = rows.filter((item) => item.id === id);
    setPaciente(select[0] as IPaciente);
    setShowModal(true);
  };

  return (
    <>
      <MasterTable rows={rows} columns={columns} />
    </>
  );
};
