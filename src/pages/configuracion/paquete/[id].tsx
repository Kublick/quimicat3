import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Input, Text, Textarea } from "@nextui-org/react";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PaqueteSelector } from "../../../components/configuraciones/paquete/PaqueteSelector";
import { UserLayout } from "../../../components/layout";
import { type IPaquete, paqueteValidation } from "../../../intefaces";
import { Box } from "../../../styles/TableStyles";
import { trpc } from "../../../utils/trpc";
import { prisma } from "../../../server/db/client";
import { z } from "zod";
import { toast } from "react-toastify";

type Props = {
  paquete: IPaquete;
  mode?: string;
};

const regexValidation = z.string().regex(/^c\w{8}\d+\w{4}\w{8}$/g);

const PaqueteById: FC<Props> = ({ paquete, mode }) => {
  const router = useRouter();

  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const createPaquete = trpc.configuracion.createPaquete.useMutation();
  const updatePaquete = trpc.configuracion.updatePaquete.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IPaquete>({
    defaultValues: {
      abreviatura: "",
      descripcion: "",
      indicaciones: "",
      notasInternas: "",
      testsToDo: [],
    },
    mode: "onBlur",
    resolver: zodResolver(paqueteValidation),
  });

  useEffect(() => {
    if (paquete) {
      reset(paquete);
    }
    setSelected(paquete?.testsToDo as any);
  }, [reset, paquete]);

  const onSubmit = async (data: IPaquete) => {
    setDisabled(true);

    if (mode === "new") {
      createPaquete.mutateAsync(data);
      toast.success("Paquete creado correctamente");
    }

    if (mode === "edit") {
      updatePaquete.mutateAsync(data);
      toast.success("Paquete editado correctamente");
    }

    setTimeout(() => {
      setDisabled(false);
      router.push("/configuracion/paquete");
    }, 2000);
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Paquete";
      break;
    default:
      textMode = "Registrar Paquete";
      break;
  }

  return (
    <UserLayout title="Paquete">
      <Text h4>{textMode}</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          css={{
            p: "1rem",
          }}
        >
          <Input
            bordered
            label="Abreviatura"
            {...register("abreviatura")}
            helperText={errors?.abreviatura?.message}
            helperColor="error"
            color="primary"
            fullWidth
          />
          <Input
            bordered
            label="Descripcion"
            {...register("descripcion")}
            helperText={errors?.abreviatura?.message}
            helperColor="error"
            color="primary"
            fullWidth
          />
          <Textarea
            bordered
            label="Indicaciones Internas"
            {...register("indicaciones")}
            helperText={errors?.abreviatura?.message}
            helperColor="error"
            color="primary"
            fullWidth
          />
          <Textarea
            bordered
            label="Notas Internas"
            {...register("notasInternas")}
            helperText={errors?.abreviatura?.message}
            helperColor="error"
            color="primary"
            fullWidth
          />

          <Box
            css={{
              d: "flex",
              justifyContent: "flex-end",
              gap: "16px",
              mt: "16px",
            }}
          >
            <Button
              type="button"
              css={{ mt: 24 }}
              color="secondary"
              onClick={() => router.push("/configuracion/paquete")}
            >
              Regresar
            </Button>
            <Button type="submit" css={{ mt: 24 }} disabled={disabled}>
              Guardar
            </Button>
          </Box>
        </Card>
        <PaqueteSelector
          selected={selected}
          setSelected={setSelected}
          setValue={setValue}
        />
      </form>
    </UserLayout>
  );
};

export default PaqueteById;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, view } = query;

  if (regexValidation.safeParse(id).success === true) {
    let paquete = await prisma.paquete.findFirst({
      where: {
        id: id as string,
      },
    });

    paquete = JSON.parse(JSON.stringify(paquete));

    return {
      props: {
        paquete,
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
