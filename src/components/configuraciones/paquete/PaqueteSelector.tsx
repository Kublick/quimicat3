import React, { FC, useEffect, useState } from "react";
import Select from "react-select";
import { trpc } from "../../../utils/trpc";
import { Box } from "../../../styles/TableStyles";
import { Button, Loading, styled, Text } from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { Item } from "../../ui/drag/Item";

type Props = {
  selected: any;
  setSelected: any;
  setValue: any;
};

export const PaqueteSelector: FC<Props> = ({
  selected,
  setSelected,
  setValue,
}) => {
  const { data: pruebas } = trpc.useQuery(["configuracion.getPruebas"]);
  const { data: perfiles } = trpc.useQuery(["configuracion.getPerfiles"]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (pruebas && perfiles) {
      setItems(selected);
    }
  }, [pruebas, perfiles, selected]);

  if (!pruebas || !perfiles) {
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

  const optionsPruebas = pruebas.map((prueba) => ({
    value: prueba.id,
    label: `Prueba > ${prueba.departamento.nombre} > ${prueba.abreviatura} - ${prueba.titulo}`,
  }));

  const optionsPerfiles = perfiles.map((perfil) => ({
    value: perfil.id,
    label: `Perfil > ${perfil.codigo} - ${perfil.descripcion}`,
  }));

  const options = [...optionsPruebas, ...optionsPerfiles];

  function handleSelectChange(values: any) {
    setValue("testsToDo", values);
    setSelected(values);
  }

  const reorderItem = (values: any) => {
    setItems(values);
  };

  function handleRemoveValue(e: any) {
    const { name: buttonName } = e.currentTarget;
    const newSelected = selected.filter(
      (item: any) => item.value !== buttonName
    );
    setItems(newSelected);
    setSelected(newSelected);
  }

  return (
    <>
      <Box
        css={{
          d: "flex",
          jc: "space-between",
          alignItems: "center",
          p: "1rem",
        }}
      >
        <Text h5>Pruebas del Perfil</Text>
        <Select
          options={options}
          instanceId="perfiles"
          className="w-1/2"
          menuPosition="absolute"
          placeholder="Seleccione una prueba / perfil"
          isMulti={true}
          value={selected}
          controlShouldRenderValue={false}
          onChange={handleSelectChange}
        />
      </Box>
      <Reorder.Group
        axis={"y"}
        values={items}
        onReorder={(values) => reorderItem(values)}
      >
        {items.map((item: any) => (
          <div key={item.value}>
            <Item
              key={item.value}
              item={item}
              handleRemoveValue={handleRemoveValue}
            />
          </div>
        ))}
      </Reorder.Group>
    </>
  );
};
