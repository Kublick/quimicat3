import { PencilIcon } from "@heroicons/react/20/solid";
import { Col, Loading, Row, Tooltip } from "@nextui-org/react";
import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { type IProfile } from "../../../intefaces/profile";
import { trpc } from "../../../utils/trpc";
import MasterTable from "../../ui/table/MasterTable";
import { IconButton } from "../../ui/utils/IconButton";

export const SecurityProfileTable = () => {
  const router = useRouter();

  const { data, isLoading } = trpc.security.getProfiles.useQuery();

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

  const columns: ColumnDef<IProfile>[] = [
    {
      accessorKey: "nombre",
      header: () => "Descripción",
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
    (item): IProfile => ({
      id: item.id || "",
      nombre: item.nombre,
    })
  );

  const handleEdit = (id: string) => {
    router.push(`/security/profile/${id}?view=edit`);
  };

  return (
    <>
      <MasterTable rows={rows} columns={columns} />
    </>
  );
};
