import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input, Loading, Text } from "@nextui-org/react";
import { UserLayout } from "../../../components/layout";
import { IUser, userValidation } from "../../../intefaces/user";
import { SLabel, SSelect } from "../../../styles/SelectStyles";
import { Box } from "../../../styles/TableStyles";
import { trpc } from "../../../utils/trpc";

const NewUserPage = () => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);

  const { data: sucursales, error: sucursalError } = trpc.useQuery([
    "security.getSucursales",
  ]);
  const { data: profiles, error: profileError } = trpc.useQuery([
    "security.getProfiles",
  ]);

  const mutation = trpc.useMutation(["users.createUser"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      name: "",
      username: "",
      password: "",
      status: "activo",
      profileId: "",
      sucursalId: "",
    },
    mode: "onBlur",
    resolver: zodResolver(userValidation),
  });

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
    await mutation.mutateAsync(data);
    console.log(data);
  };

  return (
    <UserLayout title="Usuarios">
      <Text h4>Crear Usuarios</Text>
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
            />
            <Box>
              <SLabel>Status</SLabel>
              <SSelect {...register("status")}>
                <option value="active" defaultValue={"active"}>
                  Activo
                </option>
                <option value="inactive">Inactivo</option>
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
