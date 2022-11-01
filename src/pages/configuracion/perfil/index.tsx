import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import router from "next/router";
import React from "react";
import { ConfiguracionPerfilTable } from "../../../components/configuraciones/perfil/ConfiguracionPerfilTable";
import { UserLayout } from "../../../components/layout";
import { Box } from "../../../styles/TableStyles";

const PerfilPage = () => {
  return (
    <UserLayout title="Perfiles">
      <Box
        css={{
          display: "flex",
          justifyContent: "flex-end",
          m: "1rem",
        }}
      >
        <Button
          auto
          icon={<PlusCircleIcon className="h-5 w-5" />}
          onClick={() => router.push("/configuracion/perfil/new?view=new")}
        >
          Crear Perfil
        </Button>
      </Box>
      <ConfiguracionPerfilTable />
    </UserLayout>
  );
};

export default PerfilPage;
