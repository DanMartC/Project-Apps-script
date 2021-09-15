/**
 * Creamos un menú
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu("😒 Nuevo")
  .addItem("👍 Crear Doc","getInformationPDF")
  .addItem("👌 Obetener Datos","completeTable")
  .addItem("🤞 Enviar correo","documents")
  .addToUi()
}

