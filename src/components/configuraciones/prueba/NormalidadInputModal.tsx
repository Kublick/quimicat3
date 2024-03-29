import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Input, Button, Text } from "@nextui-org/react";
import React, { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  pruebaValorRangoValidation,
  type IPruebaValorRango,
} from "../../../intefaces/prueba";
import { SLabel, SSelect } from "../../../styles/SelectStyles";
import { Box, ErrorText } from "../../../styles/TableStyles";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setValorRango: (valorRango: []) => void;
  editValorRango?: any;
  setEditValorRango: (editValorRango: any) => void;
  valorRango: IPruebaValorRango[];
};

export const NormalidadInputModal: FC<Props> = ({
  visible,
  setVisible,
  setValorRango,
  editValorRango,
  valorRango,
}) => {
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IPruebaValorRango>({
    defaultValues: {
      id: "",
      sexo: "",
      unidad: "",
      edadMaxima: 0,
      edadMinima: 0,
      refMaxima: 0,
      refMinima: 0,
    },
    mode: "onBlur",
    resolver: zodResolver(pruebaValorRangoValidation),
  });

  useEffect(() => {
    reset({
      id: editValorRango.id,
      sexo: editValorRango.sexo,
      unidad: editValorRango.unidad,
      edadMinima: editValorRango.edadMinima,
      edadMaxima: editValorRango.edadMaxima,
      refMaxima: editValorRango.refMaxima,
      refMinima: editValorRango.refMinima,
    });
  }, [reset, editValorRango]);

  const closeHandler = () => {
    setError("");
    setVisible(false);
    reset();
  };

  console.log(errors);
  const onSubmit = (data: IPruebaValorRango) => {
    setError("");

    console.log(editValorRango);

    data.id = data.sexo;

    if (editValorRango) {
      const newValorRango = valorRango.filter(
        (valorRango) => valorRango.id !== editValorRango.id
      );
      const mapid = newValorRango
        .map((valorRango) => valorRango.id)
        .includes(data.sexo);
      if (mapid) {
        setError("Parametro ya existe en la lista!");
        return;
      }
      const update = [...newValorRango, data];
      setValorRango(update as any);
      reset();
      setVisible(false);
      return;
    }

    if (valorRango.length > 0) {
      if (!!valorRango.find((x) => x.id === data.sexo)) {
        setError("Parametro ya existe en la lista");
        return;
      }
    }

    let tableArray = [...(valorRango as []), data];

    setValorRango(tableArray as []);
    reset();
    setVisible(false);
  };

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={visible}
      onClose={closeHandler}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Valor Normalidad Numerico
          </Text>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Text h5 color="error" css={{ textAlign: "center" }}>
              {error}
            </Text>
          )}
          <Box
            css={{
              py: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <Box>
              <SLabel css={{ ml: "6px" }}>Sexo</SLabel>
              <SSelect {...register("sexo")}>
                <option value="">Seleccione una opción</option>
                <option value="Indistinto">Indistinto</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </SSelect>
              {errors.sexo && <ErrorText>{errors.sexo.message}</ErrorText>}
            </Box>
            <Box>
              <SLabel css={{ ml: "6px" }}>Unidad</SLabel>
              <SSelect {...register("unidad")}>
                <option value="">Seleccione una opción</option>
                <option value="1">1 (Años)</option>
                <option value="2">2 (Días)</option>
              </SSelect>
              {errors.sexo && <ErrorText>{errors.sexo.message}</ErrorText>}
            </Box>
            <Input
              bordered
              label="Edad Minima"
              {...register("edadMinima", { valueAsNumber: true })}
              helperText={errors?.edadMinima?.message}
              helperColor="error"
              color="primary"
            />
            <Input
              bordered
              label="Edad Maxima"
              {...register("edadMaxima", { valueAsNumber: true })}
              helperText={errors?.edadMaxima?.message}
              helperColor="error"
              color="primary"
            />

            <Input
              bordered
              label="Ref. Minima"
              {...register("refMinima", { valueAsNumber: true })}
              helperText={errors?.refMinima?.message}
              helperColor="error"
              color="primary"
            />
            <Input
              bordered
              label="Ref. Maxima"
              {...register("refMaxima", { valueAsNumber: true })}
              helperText={errors?.refMaxima?.message}
              helperColor="error"
              color="primary"
            />
          </Box>
        </Modal.Body>
        <Modal.Footer>
          <Button auto color="error" onClick={closeHandler}>
            Cancelar
          </Button>
          <Button
            auto
            type="submit"
            disabled={valorRango.length > 3 ? true : false}
          >
            Registrar
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
