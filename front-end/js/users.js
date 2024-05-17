$(document).ready(function () {
  let crudAction = "edit";

  var table = $("#tablaUsuarios").DataTable({
    ajax: {
      url: "http://linux-vm12:5000/api/get_users", // Cambia esto por la URL de tu API
    },
    columns: [
      { data: "id" },
      { data: "nombre" },
      { data: "direccion" },
      { data: "contacto" },
     
      {
        data: null,
        defaultContent:
          "<div class='text-center'>" +
          "<button type='button' class='btn btn-info btn-sm btnEdit'><i class='bi bi-pencil'></i></button>&nbsp;" +
          "<button type='button' class='btn btn-danger btn-sm btnDelete'><i class='bi bi-trash3'></i></button>" +
          "</div>",
      },
    ],
  });

  $("#btn-add-new").click(function () {
    crudAction = "new";
    $("form").get(0).reset();

    $("#nombre").prop("readonly", false);
    $("#apellido").prop("readonly", false);
    $("#email").prop("readonly", false);
    $("#contrasena").prop("readonly", false);
    $("#password").prop("readonly", false);
    $("#rol").prop("readonly", false);

    updateModal("Añadir Usuario");
  });

  $("#tablaUsuarios tbody").on("click", ".btnEdit", function () {
    var data = table.row($(this).parents("tr")).data(); // Get ROW DATA in TABLE

    setDataElementsReadOnly(data, false);
    fillForm(data);
    crudAction = "edit";

    // $("#modalTitle").text("Editar Usuario");
    // $("#modalBody").text(
    //   `¿Deseas editar al usuario ${data.nombre} ${data.apellido}?`
    // );
    updateModal("Editar Usuario");
  });

  $("#tablaUsuarios tbody").on("click", ".btnDelete", function () {
    var data = table.row($(this).parents("tr")).data(); // Get ROW DATA in TABLE

    setDataElementsReadOnly(data, true);
    fillForm(data);
    crudAction = "delete";

    $("#modalTitle").text("Eliminar Usuario");
    $("#modalMessages").html(
      '<div class="alert alert-danger" role="alert">' +
        `¿Estás segur@ que quieres eliminar al usuario <strong>${data.nombre} ${data.apellido}</strong>?` +
        "</div>"
    );

    $("#btn-modal-crud-action").addClass("btn-danger");
    $("#btn-modal-crud-action").removeClass("btn-primary");
    $("#btn-modal-crud-action").text("Borrar");

    $("#actionModal").modal("show");
  });

  $("#btn-modal-crud-action").click(function () {
    // alert(crudAction);
    if (crudAction === "new") {
      // Execute REST API to INSERT
    } else if (crudAction === "edit") {
      // Execute REST API to EDIT
    } else {
      // if crudAction === "delete";
      // Execute REST API to DELETE
    }
    $("#actionModal").modal("hide");
  });

  function updateModal(title) {
    $("#modalTitle").text(title);

    $("#btn-modal-crud-action").addClass("btn-primary");
    $("#btn-modal-crud-action").removeClass("btn-danger");
    $("#btn-modal-crud-action").text("Guardar");

    $("#actionModal").modal("show");
  }
});
