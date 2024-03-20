<select id="fechaSelector"></select>;

const $select = document.getElementById("fechaSelector");

const today = new Date();

// Iterar para los últimos 7 días, empezando desde hoy
for (var i = 0; i <= 7; i++) {
  let date = new Date();
  date.setDate(today.getDate() - i);

  // Formatear la fecha (puedes personalizar el formato según tus necesidades)
  const formattedDate =
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    date.getFullYear();
  let option = document.createElement("option");
  option.value = formattedDate;
  option.text = formattedDate;
  $select.add(option);
}
