import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  Input,
  Textarea,
  Button,
  Text,
  Grid,
  Loading,
  Checkbox,
} from "@nextui-org/react";
import { type GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { type FC, useState, type ChangeEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { NormalidadInputModal } from "../../../components/configuraciones/prueba/NormalidadInputModal";
import PruebaNormalidadTable from "../../../components/configuraciones/prueba/PruebaNormalidadTable";
import { UserLayout } from "../../../components/layout";
import {
  type IPrueba,
  pruebaValidation,
  type IPruebaValorRango,
} from "../../../intefaces";
import { SLabel, SSelect } from "../../../styles/SelectStyles";
import { Box, ErrorText } from "../../../styles/TableStyles";
import { trpc } from "../../../utils/trpc";
import { prisma } from "../../../server/db/client";
import { z } from "zod";
import { toast } from "react-toastify";

type Props = {
  mode: string;
  prueba: IPrueba;
};

const regexValidation = z.string().regex(/^c\w{8}\d+\w{4}\w{8}$/g);

const parameters = [
  { id: 1, parameter: "No" },
  { id: 2, parameter: "Si, Solo con venta individual" },
  { id: 3, parameter: "Si, Solo cuanbdo es parte de un perfil" },
  { id: 4, parameter: "Si, Siempre" },
];

const ConfiguracionPruebaById: FC<Props> = ({ mode = "new", prueba }) => {
  const router = useRouter();

  const { data: departamentos } =
    trpc.configuracion.getDepartamentos.useQuery();

  const { data: metodos } = trpc.configuracion.getMetodos.useQuery();
  const { data: muestras } = trpc.configuracion.getMuestras.useQuery();

  const createPrueba = trpc.configuracion.createPrueba.useMutation();
  const updatePrueba = trpc.configuracion.updatePrueba.useMutation();

  const [disabled, setDisabled] = useState(false);
  const [valorRango, setValorRango] = useState<IPruebaValorRango[]>([]);
  const [editValorRango, setEditValorRango] = useState<IPruebaValorRango[]>([]);
  const [normalidad, setNormalidad] = useState("");
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IPrueba>({
    defaultValues: {
      codigo: "",
      abreviatura: "",
      descripcion: "",
      titulo: "",
      hojaTrabajo: "",
      departamentoId: "",
      muestraId: "",
      metodoId: "",
      printMetodo: "",
      formula: "",
      printBold: "",
      unidades: "",
      sexo: "",
      tipoResultado: "",
      resultadoDefault: "",
      valorTipo: "",
      decimales: 0,
      indicaciones: "",
      notas: "",
      printNotas: "",
      notasInternas: "",
      tipoValorNormalidad: "",
      valorNormalidadTexto: "",
      valoresRangos: [],
      ventaIndividual: false,
      permitirAntibiograma: false,
    },
    mode: "onBlur",
    resolver: zodResolver(pruebaValidation),
  });

  useEffect(() => {
    if (prueba && mode === "edit") {
      reset(prueba as IPrueba);

      if (prueba.tipoValorNormalidad === "texto") {
        setNormalidad("texto");
      } else {
        setValorRango(prueba.valoresRangos);
        setNormalidad("numerico");
      }
    }
  }, [prueba, reset, mode]);

  console.log(errors);

  const onSubmit = async (data: IPrueba) => {
    setDisabled(true);
    let newData: IPrueba = {
      ...data,
      valoresRangos: [],
    };

    if (valorRango) {
      newData = {
        ...data,
        valoresRangos: [...valorRango],
      };
    }

    if (mode === "new") {
      createPrueba.mutateAsync(newData);
      toast.success("Prueba creada correctamente");
    }
    if (mode === "edit") {
      updatePrueba.mutateAsync(newData);
      toast.success("Prueba actualizada correctamente");
    }
    setTimeout(() => {
      setDisabled(false);
      reset();
      router.push("/configuracion/prueba");
    }, 2000);
  };

  if (!departamentos || !metodos || !muestras) {
    return (
      <UserLayout title="Metodo">
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
      </UserLayout>
    );
  }

  const handleValorNormalidad = (e: ChangeEvent<{ value: string }>) => {
    if (e.target.value === "texto") {
      setNormalidad("texto");
    }

    if (valorRango.length > 0 && e.target.value === "numerico") {
      setNormalidad("numerico");
      return;
    }

    if (e.target.value === "numerico") {
      setVisible(true);
      return;
    }
  };

  let textMode = "";

  switch (mode) {
    case "edit":
      textMode = "Editar Prueba";
      break;
    case "view":
      textMode = "Ver Prueba";
      break;
    default:
      textMode = "Registrar Prueba";
      break;
  }

  return (
    <UserLayout title="Pruebas">
      <Text h4>{textMode}</Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card
          css={{
            p: "1rem",
          }}
        >
          <Grid.Container gap={2}>
            <Grid xs={6}>
              <Card>
                <Box
                  css={{
                    d: "flex",
                    flexDirection: "column",
                    gap: "1.125rem",
                    p: "1rem",
                  }}
                >
                  <Input
                    bordered
                    label="Código"
                    {...register("codigo")}
                    helperText={errors?.codigo?.message}
                    helperColor="error"
                    color="primary"
                  />
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
                    label="Descripción"
                    {...register("descripcion")}
                    helperText={errors?.descripcion?.message}
                    helperColor="error"
                    color="primary"
                    fullWidth
                  />

                  <Input
                    bordered
                    label="Titulo"
                    {...register("titulo")}
                    helperText={errors?.titulo?.message}
                    helperColor="error"
                    color="primary"
                    fullWidth
                  />
                  <Input
                    bordered
                    label="Clave Hoja de Trabajo"
                    {...register("hojaTrabajo")}
                    color="primary"
                    fullWidth
                  />

                  <Box>
                    <SLabel css={{ ml: "6px" }}>Departamento</SLabel>
                    <SSelect {...register("departamentoId")}>
                      <option value="">Seleccione una opción</option>
                      {departamentos.map((departamento) => (
                        <option key={departamento.id} value={departamento.id}>
                          {departamento.nombre}
                        </option>
                      ))}
                    </SSelect>
                    {errors.departamentoId && (
                      <ErrorText>{errors.departamentoId?.message}</ErrorText>
                    )}
                  </Box>
                  <Box>
                    <SLabel css={{ ml: "6px" }}>Muestra</SLabel>
                    <SSelect {...register("muestraId")}>
                      <option value="">Seleccione una opción</option>
                      {muestras.map((muestra) => (
                        <option key={muestra.id} value={muestra.id}>
                          {muestra.descripcion} - {muestra.nombreTubo}
                        </option>
                      ))}
                    </SSelect>
                    {errors.muestraId && (
                      <ErrorText>{errors.muestraId?.message}</ErrorText>
                    )}
                  </Box>
                  <Box>
                    <SLabel css={{ ml: "6px" }}>Metodo</SLabel>
                    <SSelect {...register("metodoId")}>
                      <option value="">Seleccione una opcion</option>
                      {metodos.map((metodo) => (
                        <option key={metodo.id} value={metodo.id}>
                          {metodo.nombre}
                        </option>
                      ))}
                    </SSelect>
                    {errors.metodoId && (
                      <ErrorText>{errors.metodoId?.message}</ErrorText>
                    )}
                  </Box>
                  <Box>
                    <SLabel css={{ ml: "6px" }}>
                      Imprimir método en resultado
                    </SLabel>
                    <SSelect {...register("printMetodo")}>
                      <option value="">Seleccione una opcion</option>
                      {parameters.map((parameter) => (
                        <option key={parameter.id} value={parameter.parameter}>
                          {parameter.parameter}
                        </option>
                      ))}
                    </SSelect>
                    {errors.printMetodo && (
                      <ErrorText>{errors.printMetodo?.message}</ErrorText>
                    )}
                  </Box>
                  <Input
                    bordered
                    label="Formula"
                    {...register("formula")}
                    color="primary"
                    fullWidth
                  />

                  <Box>
                    <SLabel css={{ ml: "6px" }}>¿Imprimir en negritas?</SLabel>

                    <SSelect {...register("printBold")}>
                      <option value="">Seleccione una opcion</option>
                      {parameters.map((parameter) => (
                        <option key={parameter.id} value={parameter.parameter}>
                          {parameter.parameter}
                        </option>
                      ))}
                    </SSelect>
                    {errors.printBold && (
                      <ErrorText>{errors.printBold?.message}</ErrorText>
                    )}
                  </Box>
                  <Controller
                    name="permitirAntibiograma"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        label="¿Permite Antibiograma?"
                        isSelected={value}
                        onChange={onChange}
                      />
                    )}
                  />
                  <Controller
                    name="ventaIndividual"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox
                        label="¿Permitir Venta Individual?"
                        isSelected={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </Box>
              </Card>
            </Grid>

            <Grid xs={6}>
              <Card>
                <Box
                  css={{
                    d: "flex",
                    flexDirection: "column",
                    gap: "1.125rem",
                    p: "1rem",
                  }}
                >
                  <Input
                    bordered
                    label="Unidades"
                    {...register("unidades")}
                    helperText={errors?.unidades?.message}
                    helperColor="error"
                    color="primary"
                    fullWidth
                  />
                  <Box>
                    <SLabel css={{ ml: "6px" }}>Sexo</SLabel>
                    <SSelect {...register("sexo")}>
                      <option value="">Seleccione una opción</option>
                      <option value="A">Ambos</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </SSelect>
                    {errors.sexo && (
                      <ErrorText>{errors.sexo.message}</ErrorText>
                    )}
                  </Box>

                  <Box>
                    <SLabel css={{ ml: "6px" }}>Tipo de Resultado</SLabel>
                    <SSelect {...register("tipoResultado")}>
                      <option value="">Seleccione una opción</option>
                      <option value="numerico">Numerico</option>
                      <option value="texto">Texto</option>
                    </SSelect>
                    {errors.tipoResultado && (
                      <ErrorText>{errors.tipoResultado.message}</ErrorText>
                    )}
                  </Box>
                  <Input
                    bordered
                    label="Resultado default"
                    {...register("resultadoDefault")}
                    placeholder="Opcional"
                    color="primary"
                    fullWidth
                  />
                  <Box>
                    <SLabel css={{ ml: "6px" }}>Tipo de Valor</SLabel>
                    <SSelect {...register("valorTipo")}>
                      <option value="0">Abierto</option>
                      <option value="1">Restringido</option>
                    </SSelect>
                  </Box>
                  <Box>
                    <SLabel css={{ ml: "6px" }}>Decimales</SLabel>
                    <SSelect
                      {...register("decimales", { valueAsNumber: true })}
                    >
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </SSelect>
                  </Box>
                  <Textarea
                    bordered
                    label="Indicaciones"
                    {...register("indicaciones")}
                    color="primary"
                    fullWidth
                  />
                  <Textarea
                    bordered
                    label="Notas"
                    {...register("notas")}
                    color="primary"
                    fullWidth
                  />
                  <Box>
                    <SLabel css={{ ml: "6px" }}>
                      ¿Imprimir nota en resultado?
                    </SLabel>
                    <SSelect {...register("printNotas")}>
                      <option value="">Seleccione una opcion</option>
                      <option value="0">No</option>
                      <option value="1">
                        Imprimir solo cuando el parametro se vende individual
                      </option>
                      <option value="2">
                        Imprimir solo cuando es parte de un perfil
                      </option>
                      <option value="3">Imprimir Siempre</option>
                    </SSelect>
                    {errors.printNotas && (
                      <ErrorText>{errors.printNotas?.message}</ErrorText>
                    )}
                  </Box>
                  <Textarea
                    bordered
                    label="Notas Internas"
                    {...register("notasInternas")}
                    color="primary"
                    fullWidth
                  />

                  <Box>
                    <SLabel css={{ ml: "6px" }}>
                      Tipo de valor de normalidad
                    </SLabel>
                    <SSelect
                      {...register("tipoValorNormalidad")}
                      onChange={(e) => handleValorNormalidad(e)}
                    >
                      <option value="">Seleccione una opcion</option>
                      <option value="numerico">Numerico</option>
                      <option value="texto">Texto</option>
                    </SSelect>
                    {errors.tipoValorNormalidad && (
                      <ErrorText>
                        {errors.tipoValorNormalidad?.message}
                      </ErrorText>
                    )}
                  </Box>

                  {normalidad === "texto" && (
                    <Textarea
                      bordered
                      label="Texto Libre Valor Normalidad"
                      {...register("valorNormalidadTexto")}
                      color="primary"
                      fullWidth
                    />
                  )}
                </Box>
              </Card>
            </Grid>
          </Grid.Container>

          {valorRango.length > 0 && normalidad === "numerico" ? (
            <PruebaNormalidadTable
              rows={valorRango}
              visible={visible}
              setVisible={setVisible}
              setValorRango={setValorRango}
              editValorRango={editValorRango}
              setEditValorRango={setEditValorRango}
            />
          ) : null}

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
              onClick={() => router.push("/configuracion/prueba")}
            >
              Regresar
            </Button>
            <Button type="submit" css={{ mt: 24 }} disabled={disabled}>
              Guardar
            </Button>
          </Box>
        </Card>
      </form>

      <NormalidadInputModal
        visible={visible}
        setVisible={setVisible}
        valorRango={valorRango}
        setValorRango={setValorRango}
        editValorRango={editValorRango}
        setEditValorRango={setEditValorRango}
      />
    </UserLayout>
  );
};

export default ConfiguracionPruebaById;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id, view } = query;

  if (regexValidation.safeParse(id).success === true) {
    let prueba = await prisma.prueba.findFirst({
      where: {
        id: id as string,
      },
    });

    prueba = JSON.parse(JSON.stringify(prueba));

    return {
      props: {
        prueba,
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
