import { PencilIcon } from "@heroicons/react/solid";
import { Col, Loading, Row, Tooltip } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { ICliente, IMetodo } from "../../intefaces";
import { uiContext } from "../../store/uiSlice";
import { trpc } from "../../utils/trpc";
import MasterTable from "../ui/table/MasterTable";
import { IconButton } from "../ui/utils/IconButton";

type Props = {
  setCliente: (cliente: ICliente | null) => void;
};

interface IClienteTableProps extends ICliente {
  tarifa: string;
}

const ClienteTable: FC<Props> = ({ setCliente }) => {
  const { setShowModal } = uiContext();

  const { data, isLoading } = trpc.useQuery(["cliente.getClientes"]);

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

  const columns: ColumnDef<Partial<IClienteTableProps>>[] = [
    {
      accessorKey: "abreviatura",
      header: () => "Clave",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "nombre",
      header: () => "Nombre",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "email",
      header: () => "email",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "telefono",
      header: () => "Telefono",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "tarifa",
      header: () => "Tarifa",
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
    (item): IClienteTableProps => ({
      id: item.id || "",
      abreviatura: item.abreviatura || "",
      nombre: item.nombre || "",
      email: item.email || "",
      telefono: item.telefono || "",
      tarifaId: item.tarifaId || "",
      tarifa: item.tarifa.nombre || "",
      direccion: item.direccion || "",
      rfc: item.rfc || "",
      tipo: item.tipo || "",
    })
  );

  const handleEdit = (id: string) => {
    const select = rows.filter((item) => item.id === id);
    setCliente(select[0] as ICliente);
    setShowModal(true);
  };

  return (
    <>
      <MasterTable rows={rows} columns={columns} />
    </>
  );
};

export default ClienteTable;
