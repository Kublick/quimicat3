import { PencilIcon } from "@heroicons/react/solid";
import { Col, Loading, Row, Tooltip } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import React, { FC } from "react";
import { ITarifa } from "../../../intefaces";
import { uiContext } from "../../../store/uiSlice";
import { CancelIcon, ConfirmIcon } from "../../../styles/TableStyles";
import { trpc } from "../../../utils/trpc";
import MasterTable from "../../ui/table/MasterTable";
import { IconButton } from "../../ui/utils/IconButton";

type Props = {
  setTarifa: (metodo: ITarifa) => void;
};

export const ConfiguracionTarifaTable: FC<Props> = ({ setTarifa }) => {
  const { setShowModal } = uiContext();

  const { data, isLoading } = trpc.useQuery(["configuracion.getTarifas"]);

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

  const columns: ColumnDef<ITarifa>[] = [
    {
      accessorKey: "nombre",
      header: () => "Nombre",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "descripcion",
      header: () => "Descripción",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "isDefault",
      header: () => "Es Default",
      cell: (info) => (info.getValue() ? <ConfirmIcon /> : <CancelIcon />),
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

  const handleEdit = (id: string) => {
    const select = rows.filter((item) => item.id === id);
    setTarifa(select[0] as ITarifa);
    setShowModal(true);
  };

  const rows = data.map(
    (item): ITarifa => ({
      id: item.id || "",
      nombre: item.nombre || "",
      descripcion: item.descripcion || "",
      isDefault: item.isDefault || false,
    })
  );

  return (
    <div>
      <MasterTable rows={rows} columns={columns} />
    </div>
  );
};
