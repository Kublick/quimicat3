import { useState } from "react";
import { Button, Card, Input, Loading, Spacer } from "@nextui-org/react";
import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { trpc } from "../../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthLayout } from "../../components/layout";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import { SLabel, SSelect } from "../../styles/SelectStyles";
import { Box } from "../../styles/TableStyles";
import { useRouter } from "next/router";
import { userValidation } from "../../intefaces/user";

const RegisterUser = () => {
  const [showError, setShowError] = useState(false);

  const router = useRouter();

  function useZodForm<TSchema extends z.ZodType>(
    props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
      schema: TSchema;
    }
  ) {
    const form = useForm<TSchema["_input"]>({
      ...props,
      resolver: zodResolver(props.schema, undefined, {
        rawValues: true,
      }),
    });
    return form;
  }

  const methods = useZodForm({
    schema: userValidation,
    defaultValues: {
      name: "",
      password: "",
      status: "activo",
      sucursalId: "",
      profileId: "",
    },
  });

  const { data: sucursales } = trpc.useQuery(["security.getSucursales"]);
  const { data: profiles } = trpc.useQuery(["security.getProfiles"]);

  const mutation = trpc.useMutation(["users.createUser"]);

  if (!sucursales || !profiles) {
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

  return (
    <AuthLayout title="Registro de Usuarios">
      <form
        onSubmit={methods.handleSubmit(async (values) => {
          console.log(values);
          await mutation.mutateAsync(values);
          methods.reset();
        })}
      >
        <Card
          css={{
            d: "flex",
            fd: "column",
            p: 20,
            maxWidth: "720px",
          }}
        >
          {showError && (
            <Card color="error" css={{ my: 20 }}>
              <p className="inline-flex items-center justify-center gap-4 text-sm">
                <ExclamationCircleIcon className="w-5 h-5" />
                {showError}
              </p>
            </Card>
          )}
          <Input
            bordered
            label="Nombre del Empleado"
            {...methods.register("name")}
            helperText={methods.formState.errors?.name?.message}
            helperColor="error"
            status={methods.formState.errors?.name ? "error" : "primary"}
          />
          <Spacer y={1} />
          <Input
            bordered
            label="Nombre del Usuario"
            {...methods.register("username")}
            helperText={methods.formState.errors?.username?.message}
            helperColor="error"
            status={methods.formState.errors?.username ? "error" : "primary"}
          />
          <Spacer y={1} />
          <Input
            bordered
            label="Password"
            type="password"
            {...methods.register("password")}
            helperText={methods.formState.errors?.password?.message}
            helperColor="error"
            status={methods.formState.errors?.password ? "error" : "primary"}
          />
          <Spacer y={1} />
          <SLabel>Status</SLabel>
          <SSelect {...methods.register("status")}>
            <option value="active" defaultValue={"active"}>
              Activo
            </option>
            <option value="inactive">Inactivo</option>
          </SSelect>
          <Spacer y={1} />
          <SLabel aria-label="perfil">Perfil</SLabel>
          <SSelect {...methods.register("profileId")} name="profile">
            <option value="">Seleccione un perfil</option>
            {profiles.map((perfil) => (
              <option key={perfil.id} value={perfil.id}>
                {perfil.nombre}
              </option>
            ))}
          </SSelect>
          <Spacer y={1} />
          <SLabel>Sucursal</SLabel>
          <SSelect {...methods.register("sucursalId")}>
            <option value="">Seleccione un sucursal</option>
            {sucursales.map((sucursal) => (
              <option key={sucursal.id} value={sucursal.id}>
                {sucursal.nombre}
              </option>
            ))}
          </SSelect>
          <Spacer y={1.5} />
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
            <Button
              type="submit"
              css={{ mt: 24 }}
              // disabled={mode === 'view' || disabled}
            >
              Guardar
            </Button>
          </Box>
        </Card>
      </form>
    </AuthLayout>
  );
};

export default RegisterUser;
