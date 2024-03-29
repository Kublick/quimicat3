import React, { type FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input, Loading, Text } from "@nextui-org/react";
import { toast } from "react-toastify";
import { UserLayout } from "../../../components/layout";
import { type IUser, userValidation } from "../../../intefaces";
import { SLabel, SSelect } from "../../../styles/SelectStyles";
import { Box } from "../../../styles/TableStyles";
import { trpc } from "../../../utils/trpc";
import { z } from "zod";
import { prisma } from "../../../server/db/client";
import type { GetServerSideProps } from "next";

const regexValidation = z.string().regex(/^c\w{8}\d+\w{4}\w{8}$/g);

type Props = {
  user: IUser;
  mode: string;
};

const NewUserPage: FC<Props> = ({ user, mode }) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>({
    defaultValues: {
      name: "",
      username: "",
      status: "activo",
      password: "",
      profileId: "",
      sucursalId: "",
    },
    mode: "onBlur",
    resolver: zodResolver(userValidation),
  });

  const { data: sucursales, error: sucursalError } =
    trpc.security.getSucursales.useQuery();

  const { data: profiles, error: profileError } =
    trpc.security.getProfiles.useQuery();

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        password: "1234",
      });
    }
  }, [user, reset]);

  const createUser = trpc.users.createUser.useMutation();

  const updateUser = trpc.users.updateUser.useMutation();

  if (!sucursales || !profiles) {
    return (
      <UserLayout title="Registro de Usuarios">
        <Box
          css={{
            d: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Loading>Cargando Datos ...</Loading>
        </Box>
      </UserLayout>
    );
  }

  if (sucursalError || profileError) {
    return (
      <UserLayout title="Registro de Usuarios">
        <Text h4>Error al cargar los datos</Text>
      </UserLayout>
    );
  }

  const onSubmit = async (data: IUser) => {
    setDisabled(true);
    if (mode === "new") {
      await createUser.mutateAsync(data);
      toast.success("Usuario creado correctamente");
    }

    if (mode === "edit") {
      const updateUserData = {
        id: data.id || "",
        name: data.name,
        username: data.username,
        status: data.status as "activo" | "inactivo",
        profileId: data.profileId,
        sucursalId: data.sucursalId,
      };
      await updateUser.mutateAsync(updateUserData);
      toast.success("Usuario actualizado correctamente");
    }

    setTimeout(() => {
      setDisabled(false);
      router.push("/security/users");
    }, 2000);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Usuario";
      break;

    default:
      textMode = "Registrar Usuario";
      break;
  }

  return (
    <UserLayout title="Usuarios">
      <Text h4>{textMode}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          css={{
            d: "flex",
            jc: "center",
            mt: 24,
          }}
        >
          <Card
            css={{
              d: "flex",
              fd: "column",
              p: 20,
              maxWidth: "720px",
              gap: "2rem",
            }}
          >
            <Input
              bordered
              label="Nombre del Empleado"
              {...register("name")}
              helperText={errors?.name?.message}
              helperColor="error"
              status={errors?.name ? "error" : "primary"}
            />
            <Input
              bordered
              label="Nombre del Usuario"
              {...register("username")}
              helperText={errors?.username?.message}
              helperColor="error"
              status={errors?.username ? "error" : "primary"}
            />
            <Input
              bordered
              label="Password"
              type="password"
              {...register("password")}
              helperText={errors?.password?.message}
              helperColor="error"
              status={errors?.password ? "error" : "primary"}
              disabled={mode === "edit"}
            />
            <Box>
              <SLabel>Status</SLabel>
              <SSelect {...register("status")}>
                <option value="activo" defaultValue={"activo"}>
                  Activo
                </option>
                <option value="inactivo">Inactivo</option>
              </SSelect>
            </Box>
            <Box>
              <SLabel>Perfil</SLabel>
              <SSelect {...register("profileId")}>
                <option value="">Seleccione un perfil</option>
                {profiles.map((perfil) => (
                  <option key={perfil.id} value={perfil.id}>
                    {perfil.nombre}
                  </option>
                ))}
              </SSelect>
            </Box>
            <Box>
              <SLabel>Sucursal</SLabel>
              <SSelect {...register("sucursalId")}>
                <option value="">Seleccione un sucursal</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal.id} value={sucursal.id}>
                    {sucursal.nombre}
                  </option>
                ))}
              </SSelect>
            </Box>
            <Box
              css={{
                d: "flex",
                justifyContent: "flex-end",
                gap: "16px",
                mt: "16px",
              }}
            >
              <Button
                type="submit"
                css={{ mt: 24 }}
                color="secondary"
                onClick={() => router.push("/security/users")}
              >
                Regresar
              </Button>
              <Button type="submit" css={{ mt: 24 }} disabled={disabled}>
                Guardar
              </Button>
            </Box>
          </Card>
        </Box>
      </form>
    </UserLayout>
  );
};

export default NewUserPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, view } = query;

  if (regexValidation.safeParse(id).success === true) {
    let user = await prisma.user.findFirst({
      where: {
        id: id as string,
      },
    });

    user = JSON.parse(JSON.stringify(user));

    return {
      props: {
        user,
        mode: "edit",
      },
    };
  }

  if (view === "new") {
    return {
      props: {
        mode: "new",
      },
    };
  }

  return {
    props: {},
    redirect: {
      destination: "/",
    },
  };
};
