export const shortIdGenerator = (
  nombre: string,
  apellidos: string,
  fechaNacimiento: string,
  result: boolean
) => {
  let shortName = "";

  if (!result) {
    shortName =
      apellidos.substring(0, 2).toUpperCase() +
      nombre.substring(0, 2).toUpperCase();
  }
  if (result) {
    let name = "";
    let ape = "";
    for (let index = 0; index < 2; index++) {
      name =
        name +
        nombre.charAt(Math.floor(Math.random() * nombre.length)).toUpperCase();
      ape =
        ape +
        apellidos
          .charAt(Math.floor(Math.random() * apellidos.length))
          .toUpperCase();
    }
    shortName = ape + name;
  }
  const date =
    fechaNacimiento.substring(0, 4) +
    fechaNacimiento.substring(5, 7) +
    fechaNacimiento.substring(8, 10);
  return shortName + date;
};

export default shortIdGenerator;
