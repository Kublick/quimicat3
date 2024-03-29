export const menuContents = [
  {
    id: 1,
    title: "Ordenes",
    feature: "orden",
    href: "",
    menuItems: [
      { id: 1, label: "Registro", href: "/ordenes/registro" },
      { id: 2, label: "Consulta", href: "/ordenes/consulta" },
      {
        id: 3,
        label: "Registro Resultado",
        href: "/ordenes/registroresultado",
      },
      { id: 4, label: "Cobranza Pendiente", href: "/ordenes/cobranza" },
      { id: 5, label: "Estatus", href: "/ordenes/status" },
      { id: 6, label: "Pendientes", href: "/ordenes/pendientes" },
    ],
  },
  {
    id: 6,
    title: "Pacientes",
    feature: "pacientes",
    href: "/paciente",
    menuItems: [],
    collapse: false,
  },
  {
    id: 2,
    title: "Clientes",
    feature: "cliente",
    href: "/cliente",
    menuItems: [],
    collapse: false,
  },
  {
    id: 3,
    title: "Medicos",
    feature: "medicos",
    href: "/medico",
    menuItems: [],
    collapse: false,
  },
  {
    id: 4,
    title: "Configuracion",
    feature: "config",
    href: "",
    menuItems: [
      { id: 1, label: "Perfiles", href: "/configuracion/perfil" },
      { id: 2, label: "Pruebas", href: "/configuracion/prueba" },
      { id: 3, label: "General", href: "/configuracion/general" },
      { id: 4, label: "Tarifas", href: "/configuracion/tarifa" },
      { id: 5, label: "Paquetes", href: "/configuracion/paquete" },
      { id: 6, label: "Precios", href: "/configuracion/controltarifa" },
      { id: 7, label: "Muestras", href: "/configuracion/muestra" },
      { id: 8, label: "Metodo", href: "/configuracion/metodo" },
      { id: 9, label: "Departamento", href: "/configuracion/departamento" },
    ],
    collapse: true,
  },
  {
    id: 5,
    title: "Seguridad",
    feature: "security",
    href: "",
    menuItems: [
      { id: 1, label: "Usuarios", href: "/security/users" },
      { id: 2, label: "Perfiles", href: "/security/profile" },
    ],
    collapse: true,
  },
];
