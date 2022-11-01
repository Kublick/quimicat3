import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button } from "@nextui-org/react";
import router from "next/router";
import React from "react";
import ConfiguracionPaqueteTable from "../../../components/configuraciones/paquete/ConfiguracionPaqueteTable";
import { UserLayout } from "../../../components/layout";
import { Box } from "../../../styles/TableStyles";

const PaquetePage = () => {
  return (
    <UserLayout title="Paquetes">
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
          onClick={() => router.push("/configuracion/paquete/new?view=new")}
        >
          Crear Paquete
        </Button>
      </Box>
      <ConfiguracionPaqueteTable />
    </UserLayout>
  );
};

export default PaquetePage;
