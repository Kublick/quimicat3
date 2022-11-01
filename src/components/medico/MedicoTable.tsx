import { PencilIcon } from "@heroicons/react/20/solid";
import { Loading, Row, Col, Tooltip } from "@nextui-org/react";
import { type ColumnDef } from "@tanstack/react-table";
import React, { type FC } from "react";
import { type IMedico } from "../../intefaces";
import { uiContext } from "../../store/uiSlice";
import { trpc } from "../../utils/trpc";
import MasterTable from "../ui/table/MasterTable";
import { IconButton } from "../ui/utils/IconButton";

type Props = {
  setMedico: (medico: IMedico) => void;
};

export const MedicoTable: FC<Props> = ({ setMedico }) => {
  const { setShowModal } = uiContext();
  const { data, isLoading } = trpc.medico.getMedicos.useQuery();

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

  const columns: ColumnDef<IMedico>[] = [
    {
      accessorKey: "nombre",
      header: () => "Nombre",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "especialidad",
      header: () => "Especialidad",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "telefono",
      header: () => "Telefono",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: () => "Email",
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
                <IconButton onClick={() => handleEdit(info.getValue())}>
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
    (item): IMedico => ({
      id: item.id || "",
      nombre: item.nombre || "",
      especialidad: item.especialidad || "",
      telefono: item.telefono || "",
      email: item.email || "",
    })
  );

  const handleEdit = (id: string) => {
    const select = rows.filter((item) => item.id === id);
    setMedico(select[0] as IMedico);
    setShowModal(true);
  };

  return (
    <div>
      <MasterTable rows={rows} columns={columns} />
    </div>
  );
};
