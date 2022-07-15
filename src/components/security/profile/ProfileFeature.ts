type PerfilFeaturesType = {
  id: string;
  name: string;
  handler: HandlerType;
  options: {
    id: string;
    value: string;
    label: string;
  }[];
};

type HandlerType =
  | "security"
  | "users"
  | "patients"
  | "config"
  | "medicos"
  | "cliente";

export const ProfileFeature: PerfilFeaturesType[] = [
  {
    id: "1",
    name: "Seguridad",
    handler: "security",
    options: [
      { id: "1", value: "showPerfil", label: "Ver Perfil" },
      {
        id: "2",
        value: "addUpdatePerfil",
        label: "Agregar / Edición Perfiles",
      },
      { id: "3", value: "deletePerfil", label: "Eliminar Perfil" },
    ],
  },
  {
    name: "Usuarios",
    id: "2",
    handler: "users",
    options: [
      { id: "1", value: "showUsers", label: "Ver Usuarios" },
      { id: "2", value: "addUpdateUsers", label: "Agregar / Edición Usuarios" },
      { id: "3", value: "deleteUsers", label: "Eliminar Usuarios" },
    ],
  },
  {
    name: "Pacientes",
    id: "3",
    handler: "patients",
    options: [
      { id: "1", value: "showPatients", label: "Ver Pacientes" },
      {
        id: "2",
        value: "addUpdatePatients",
        label: "Agregar / Edición Pacientes",
      },
      { id: "3", value: "deletePatients", label: "Eliminar Pacientes" },
    ],
  },
  {
    name: "Configuracion",
    id: "4",
    handler: "config",
    options: [
      { id: "1", value: "showConfigPerfiles", label: "Ver Perfiles" },
      {
        id: "2",
        value: "addUpdateConfigPerfiles",
        label: "Agregar / Edición Perfiles",
      },
      { id: "4", value: "deleteConfigPerfiles", label: "Eliminar Perfiles" },
      { id: "5", value: "showConfigPruebas", label: "Ver Pruebas" },
      {
        id: "6",
        value: "addUpdateConfigPruebas",
        label: "Agregar / Edición Pruebas",
      },
      { id: "7", value: "deleteConfigPrueba", label: "Eliminar Pruebas" },
      { id: "8", value: "configDepartamento", label: "Departamentos" },
      { id: "9", value: "configMetodo", label: "Metodos" },
    ],
  },
  {
    name: "Medicos",
    id: "5",
    handler: "medicos",
    options: [
      { id: "1", value: "showMedicos", label: "Ver Medicos" },
      {
        id: "2",
        value: "addUpdateMedicos",
        label: "Agregar / Edición Medicos",
      },
    ],
  },
  {
    name: "Clientes",
    id: "6",
    handler: "cliente",
    options: [
      { id: "1", value: "showClientes", label: "Ver Clientes" },
      {
        id: "2",
        value: "addUpdateClientes",
        label: "Agregar / Edición Clientes",
      },
    ],
  },
];
