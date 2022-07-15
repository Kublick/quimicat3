import { PlusCircleIcon } from "@heroicons/react/solid";
import { Button } from "@nextui-org/react";
import router from "next/router";
import React from "react";
import { UserLayout } from "../../../components/layout";
import { SecurityProfileTable } from "../../../components/security/profile/SecurityProfileTable";
import { Box } from "../../../styles/TableStyles";

const SecurityProfilePage = () => {
  return (
    <UserLayout title="Perfiles de Usuario">
      <Box
        css={{
          display: "flex",
          justifyContent: "flex-end",
          mb: "1rem",
        }}
      >
        <Button
          auto
          icon={<PlusCircleIcon className="w-5 h-5" />}
          onClick={() => router.push("/security/profile/new?view=new")}
        >
          Crear Perfil
        </Button>
      </Box>
      <SecurityProfileTable />
    </UserLayout>
  );
};

export default SecurityProfilePage;