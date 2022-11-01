import React, { type FC, useEffect, useState } from "react";

import Select from "react-select";
import { trpc } from "../../../utils/trpc";
import { Box } from "../../../styles/TableStyles";
import { Text } from "@nextui-org/react";
import { Reorder } from "framer-motion";
import { Item } from "../../ui/drag/Item";

type Props = {
  selected: any;
  setSelected: any;
  setValue: any;
};

export const PruebasSelector: FC<Props> = ({
  selected,
  setSelected,
  setValue,
}) => {
  const { data: pruebasPerfil } =
    trpc.configuracion.getPruebasPerfil.useQuery();

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (pruebasPerfil) {
      setItems(selected);
    }
  }, [pruebasPerfil, selected]);

  if (!pruebasPerfil) {
    return <p>Cargando...</p>;
  }

  const options = pruebasPerfil.map((prueba) => ({
    value: prueba.id,
    label: `${prueba.departamento.nombre} > ${prueba.abreviatura} - ${prueba.titulo}`,
  }));

  function handleSelectChange(values: any) {
    setValue("testsToDo", values);
    setSelected(values);
    setItems(values);
  }

  const reorderItem = (values: any) => {
    setItems(values);
  };

  function handleRemoveValue(e: any) {
    const { name: buttonName } = e.currentTarget;
    const newSelected = items.filter((item: any) => item.value !== buttonName);
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
          placeholder="Seleccione una prueba"
          isMulti={true}
          value={selected}
          controlShouldRenderValue={false}
          onChange={handleSelectChange}
        />
      </Box>
      {items && (
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
      )}
    </>
  );
};
