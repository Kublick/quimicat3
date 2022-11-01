import { PencilIcon } from "@heroicons/react/20/solid";
import { Loading, Row, Col, Tooltip } from "@nextui-org/react";
import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";
import React from "react";
import { type IPerfil } from "../../../intefaces";
import { trpc } from "../../../utils/trpc";
import MasterTable from "../../ui/table/MasterTable";
import { IconButton } from "../../ui/utils/IconButton";

export const ConfiguracionPerfilTable = () => {
  const router = useRouter();
  const { data, isLoading } = trpc.configuracion.getPerfiles.useQuery();

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

  const columns: ColumnDef<Partial<IPerfil>>[] = [
    {
      accessorKey: "codigo",
      header: () => "Codigo",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "abreviatura",
      header: () => "Abreviatura",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "metodoId",
      header: () => "Metodo",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "descripcion",
      header: () => "Nombre",
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
    (item): Partial<IPerfil> => ({
      id: item.id || "",
      codigo: item.codigo || "",
      descripcion: item.descripcion || "",
      abreviatura: item.abreviatura || "",
      metodoId: item.metodo.nombre || "",
    })
  );

  const handleEdit = (id: string) => {
    router.push(`/configuracion/perfil/${id}?view=edit`);
  };

  return (
    <div>
      <MasterTable rows={rows} columns={columns} />
    </div>
  );
};
