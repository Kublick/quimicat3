import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button, Spacer } from "@nextui-org/react";
import router from "next/router";
import React from "react";
import { ConfiguracionPruebaTable } from "../../../components/configuraciones/prueba/ConfiguracionPruebaTable";
import { UserLayout } from "../../../components/layout";
import { Box } from "../../../styles/TableStyles";

const ConfiguracionPruebaPage = () => {
  return (
    <UserLayout title="Pruebas">
      <Box
        css={{
          display: "flex",
          justifyContent: "flex-end",
          m: "1rem",
        }}
      >
        <Button
          auto
          icon={<PlusCircleIcon className="w-5 h-5" />}
          onClick={() => router.push("/configuracion/prueba/new?view=new")}
        >
          Crear Prueba
        </Button>
      </Box>
      <Spacer y={3} />
      <ConfiguracionPruebaTable />
    </UserLayout>
  );
};

export default ConfiguracionPruebaPage;
