$(document).ready(function () {
  // Configuración de DataTables y llamada al API
  $("#tablaDatos").DataTable({
    ajax: {
      url: "http://linux-vm12:5000/api/get_users",
    },
    error: function (xhr, status, error) {
      console.log("Error al obtener los datos del API:", error);
    },
    columns: [
      { data: "id" },
      { data: "nombre" },
      { data: "direccion" },
      { data: "contacto" },
    ],
  });

  $("#tablaHabitaciones").DataTable({
    ajax: {
      url: "http://linux-vm12:5000/api/get_apts",
    },
    error: function (xhr, status, error) {
      console.log("Error al obtener los datos del API:", error);
    },
    columns: [
      { data: "tipo" },
      { data: "caracteristicas" },
      { data: "precio" },
      { data: "estado" },
    ],
  });

  $("#tablaReservas").DataTable({
    ajax: {
      url: "http://linux-vm12:5000/api/get_reserves",
    },
    error: function (xhr, status, error) {
      console.log("Error al obtener los datos del API:", error);
    },
    columns: [
      { data: "id_cliente" },
      { data: "id_habitacion" },
      { data: "fecha_llegada" },
      { data: "fecha_salida" },
    ],
  });
});
