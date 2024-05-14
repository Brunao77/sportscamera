

export const convertirFormatoFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  const diaFormateado = dia < 10 ? `0${dia}` : dia;
  const mesFormateado = mes < 10 ? `0${mes}` : mes;

  const fechaFormateada = `${diaFormateado}/${mesFormateado}/${anio}`;

  return fechaFormateada;
};

export const getLastDays = () => {
  const today = new Date();
  const dates = [];
  // Iterar para los últimos 7 días, empezando desde hoy
  for (let i = 0; i <= 7; i++) {
    let date = new Date();
    date.setDate(today.getDate() - i);

    // Formatear la fecha (puedes personalizar el formato según tus necesidades)
    const formattedDate = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2)
     
    dates.push({ value: formattedDate, text: formattedDate });
  }
  return dates;
};

