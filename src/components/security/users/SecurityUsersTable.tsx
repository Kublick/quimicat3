import { PencilIcon } from "@heroicons/react/solid";
import { Col, Loading, Row, Tooltip } from "@nextui-org/react";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/router";
import { IUser } from "../../../intefaces/user";
import { trpc } from "../../../utils/trpc";
import MasterTable from "../../ui/table/MasterTable";
import { IconButton } from "../../ui/utils/IconButton";

export const SecurityUsersTable = () => {
  const router = useRouter();

  const { data, isLoading } = trpc.useQuery(["security.getUsers"]);

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

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: "name",
      header: () => "Nombre",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "username",
      header: () => "Usuario",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "role",
      header: () => "Rol",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "profileId",
      header: () => "Perfil",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "sucursalId",
      header: "Sucursal",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
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
                <IconButton onClick={() => handleEditUser(info.getValue())}>
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
    (item): IUser => ({
      id: item.id || "",
      name: item.name || "",
      username: item.username || "",
      profileId: item.Profile?.nombre || "",
      role: item.role || "",
      status: item.status as "activo" | "inactivo",
      sucursalId: item.Sucursal?.nombre || "",
      password: "",
    })
  );

  const handleEditUser = (id: string) => {
    router.push(`/security/users/${id}?view=edit`);
  };

  return (
    <div>
      <MasterTable rows={rows} columns={columns} />
    </div>
  );
};
