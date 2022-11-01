import { PencilIcon } from "@heroicons/react/20/solid";
import { Loading, Row, Col, Tooltip } from "@nextui-org/react";
import { type ColumnDef } from "@tanstack/react-table";
import React, { type FC } from "react";
import { type IMuestra } from "../../../intefaces";
import { uiContext } from "../../../store/uiSlice";
import { CancelIcon, ConfirmIcon } from "../../../styles/TableStyles";
import { trpc } from "../../../utils/trpc";
import MasterTable from "../../ui/table/MasterTable";
import { IconButton } from "../../ui/utils/IconButton";

type Props = {
  setMuestra: (muestra: IMuestra) => void;
};

export const ConfiguracionMuestraTable: FC<Props> = ({ setMuestra }) => {
  const { setShowModal } = uiContext();

  const { data, isLoading } = trpc.configuracion.getMuestras.useQuery();

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

  const columns: ColumnDef<IMuestra>[] = [
    {
      accessorKey: "clave",
      header: () => "Clave",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "descripcion",
      header: () => "Descripción",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "nombreTubo",
      header: () => "Nombre del Tubo",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "barCode",
      header: () => "¿Imprimir Código de Barras?",
      cell: (info) => (info.getValue() ? <ConfirmIcon /> : <CancelIcon />),
    },
    {
      accessorKey: "excludeStatus",
      header: () => "¿Excluir status de Muestra?",
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
    (item): IMuestra => ({
      id: item.id || "",
      clave: item.clave || "",
      descripcion: item.descripcion || "",
      nombreTubo: item.nombreTubo || "",
      barCode: item.barCode,
      excludeStatus: item.excludeStatus,
      observaciones: item.observaciones || "",
      startAsPending: item.startAsPending,
    })
  );

  const handleEdit = (id: string) => {
    const select = rows.filter((item) => item.id === id);
    setMuestra(select[0] as IMuestra);
    setShowModal(true);
  };

  return (
    <>
      <MasterTable rows={rows} columns={columns} />
    </>
  );
};
