import { Loading } from "@nextui-org/react";
import { useRouter } from "next/router";
import { IUser } from "../../../intefaces/user";
import { trpc } from "../../../utils/trpc";
import MasterTable from "../../ui/table/MasterTable";
import columns from "./userColumns";

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
