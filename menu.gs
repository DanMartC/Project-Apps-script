/**
 * Creamos un menΓΊ
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("π Nuevo")
  .addItem("π Crear Doc","getInformationPDF")
  .addItem("π Obetener Datos","completeTable")
  .addItem("π€ Enviar correo","documents")
  .addToUi()
}

