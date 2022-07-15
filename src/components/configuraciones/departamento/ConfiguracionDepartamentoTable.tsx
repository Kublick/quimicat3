import { PencilIcon } from "@heroicons/react/solid";
import { Col, Loading, Row, Tooltip } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { IDepartamento } from "../../../intefaces";
import { uiContext } from "../../../store/uiSlice";
import { trpc } from "../../../utils/trpc";
import MasterTable from "../../ui/table/MasterTable";
import { IconButton } from "../../ui/utils/IconButton";

type Props = {
  setDepartamento: (departamento: IDepartamento) => void;
};

const ConfiguracionDepartamentoTable: FC<Props> = ({ setDepartamento }) => {
  const { setShowModal } = uiContext();
  const { data, isLoading } = trpc.useQuery(["configuracion.getDepartamentos"]);

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

  const columns: ColumnDef<IDepartamento>[] = [
    {
      accessorKey: "nombre",
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
    (item): IDepartamento => ({
      id: item.id || "",
      nombre: item.nombre || "",
    })
  );

  const handleEdit = (id: string) => {
    const select = rows.filter((item) => item.id === id);
    setDepartamento(select[0] as IDepartamento);
    setShowModal(true);
  };

  return (
    <div>
      <MasterTable rows={rows} columns={columns} />
    </div>
  );
};

export default ConfiguracionDepartamentoTable;
