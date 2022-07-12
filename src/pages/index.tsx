import { Text } from "@nextui-org/react";
import type { NextPage } from "next";
import { UserLayout } from "../components/layout";
import { GetServerSideProps } from "next";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

const Home: NextPage = () => {
  return (
    <UserLayout title="Lab Blancarte">
      <Text>Seleccione una opcion</Text>
    </UserLayout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session === null) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  return {
    props: {},
  };
};
