import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { Button, Spacer } from "@nextui-org/react";
import { useRouter } from "next/router";
import { UserLayout } from "../../../components/layout";
import { SecurityUsersTable } from "../../../components/security/users/SecurityUsersTable";
import { Box } from "../../../styles/TableStyles";

const SecurityUsersPage = () => {
  const router = useRouter();

  return (
    <UserLayout title="Usuarios">
      <Box
        css={{
          display: "flex",
          justifyContent: "flex-end",
          mb: "1rem",
        }}
      >
        <Button
          auto
          icon={<PlusCircleIcon className="h-5 w-5" />}
          onClick={() => router.push("/security/users/new?view=new")}
        >
          Crear Usuario
        </Button>
      </Box>
      <Spacer y={3} />
      <SecurityUsersTable />
    </UserLayout>
  );
};

export default SecurityUsersPage;
