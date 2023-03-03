const removeDateFromFilename = (fileName) => {
  if (!fileName) return "";
  //Regular expresion que selecciona las fechas en el formato de nuestro back.
  const dateRegex = /^\w+-\w+-\d{1,2}-\d{4}-/gi;
  //Nombre del archivo de la entry con la fecha eliminada.
  const datelessFilename = fileName.replace(dateRegex, "");
  return datelessFilename;
};
export default removeDateFromFilename;
