export const menuContents = [
  {
    id: 1,
    title: "Orden",
    feature: "orden",
    href: "/orden",
    menuItems: [],
    collapse: false,
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
      { id: 6, label: "Muestras", href: "/configuracion/muestra" },
      { id: 7, label: "Metodo", href: "/configuracion/metodo" },
      { id: 8, label: "Departamento", href: "/configuracion/departamento" },
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
