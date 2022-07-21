import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Checkbox, Button, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UserLayout } from "../../../components/layout";
import { IProfile, profileValidation } from "../../../intefaces";
import { Box } from "../../../styles/TableStyles";
import { ProfileFeature } from "../../../components/security/profile/ProfileFeature";
import { GetServerSideProps } from "next";
import { prisma } from "../../../server/db/client";
import { z } from "zod";
import { trpc } from "../../../utils/trpc";
import { toast } from "react-toastify";

const regexValidation = z.string().regex(/^c\w{8}\d+\w{4}\w{8}$/g);

type Props = {
  profile: IProfile;
  mode: string;
};

const SecurityProfileById: FC<Props> = ({ profile, mode }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IProfile>({
    defaultValues: {
      nombre: "",
      enabledFeatures: {
        security: [],
        users: [],
        patients: [],
        config: [],
        cliente: [],
        medicos: [],
      },
    },
    mode: "onBlur",
    resolver: zodResolver(profileValidation),
  });

  console.log("errors", errors);

  useEffect(() => {
    if (profile) {
      reset({ ...profile });
    }
  }, [reset, profile]);

  const createProfile = trpc.useMutation(["security.createProfile"]);
  const updateProfile = trpc.useMutation(["security.profileUpdate"]);

  const onSubmit = async (data: IProfile) => {
    setDisabled(true);

    const enabledFeaturesHasItems = Object.entries(
      data.enabledFeatures as any
    ).reduce((acc: any, [key, value]: [any, any]) => {
      console.log("value", typeof value);
      return [...acc, ...value];
    }, []);

    if (enabledFeaturesHasItems.length === 0) {
      setError("Debe habilitar al menos una funcionalidad");
      console.log("Debe habilitar al menos una funcionalidad");
      return;
    }

    setError("");

    if (mode === "edit") {
      await updateProfile.mutateAsync(data);
      toast.success("Perfil actualizado");
    }

    if (mode === "new") {
      await createProfile.mutateAsync(data);
      toast.success("Perfil creado correctamente");
    }
    setTimeout(() => {
      setDisabled(false);
      router.push("/security/profile");
    }, 2000);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Perfil";
      break;

    case "new":
    default:
      textMode = "Nuevo Perfil";
      break;
  }

  return (
    <UserLayout title="Perfiles">
      <Text h4>{textMode}</Text>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Card
          css={{
            d: "flex",
            fd: "column",
            p: 20,
          }}
        >
          <Input
            bordered
            label="Nombre Perfil"
            {...register("nombre")}
            helperText={errors?.nombre?.message}
            helperColor="error"
            status={errors?.nombre ? "error" : "primary"}
            css={{ maxWidth: "30%" }}
            // disabled={mode === "view"}
          />

          <div className="grid grid-cols-3 mt-6">
            {ProfileFeature.map((feature) => (
              <Controller
                key={feature.id}
                control={control}
                name={`enabledFeatures.${feature.handler}`}
                render={({ field: { value, ...rest } }) => (
                  <div key={feature.id}>
                    <Checkbox.Group
                      {...rest}
                      value={value}
                      color="primary"
                      label={feature.name}
                      key={feature.id}
                      css={{ mt: 16 }}
                    >
                      {feature.options.map((option) => (
                        <Checkbox
                          value={option.value}
                          key={option.id}
                          //   isDisabled={mode === "view"}
                        >
                          {option.label}
                        </Checkbox>
                      ))}
                    </Checkbox.Group>
                  </div>
                )}
              />
            ))}
          </div>
          {error && (
            <Text
              color="error"
              css={{
                textAlign: "center",
                my: 12,
              }}
            >
              {error}
            </Text>
          )}
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
              onClick={() => router.push("/security/perfiles")}
            >
              Regresar
            </Button>
            <Button
              type="submit"
              css={{ mt: 24 }}
                disabled={disabled}
            >
              Guardar
            </Button>
          </Box>
        </Card>
      </form>
    </UserLayout>
  );
};

export default SecurityProfileById;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, view } = query;

  if (regexValidation.safeParse(id).success === true) {
    const profile = await prisma.profile.findFirst({
      where: {
        id: id as string,
      },
    });

    return {
      props: {
        profile,
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
