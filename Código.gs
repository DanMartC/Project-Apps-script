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

/**
 *  Convierte un pdf a un google doc 
 *  @return {String}        - el ID del documento google doc
 */
function getInformationPDF() {
  const spsArch = SpreadsheetApp.openById('id').getSheetByName('Arch')
  var dataArch = spsArch.getDataRange().getValues();
  var lastRowA = spsArch.getLastRow();
  let files = DriveApp.getFolderById('id_folder').getFiles(); 
  let fileID = [], fileName = [];
  while (files.hasNext()){
    let file = files.next();
    fileName.push(file.getName());
    fileID.push(file.getId());
  }
  var arch = [], ids = [], k1, x;
  for (k1 = 1; k1 < lastRowA; k1++){arch.push(dataArch[k1][1].toString())}
  var notInFileName = fileName.filter(function(itm){ return arch.indexOf(itm) == -1; });
  for (x of notInFileName) {ids.push(fileID[fileName.indexOf(x)])}
  let newID = [];

  for(h of ids){
    var fileBlob = DriveApp.getFileById(h).getBlob();
    var resource = {
      title: fileBlob.getName(),
      parents: [{'id':'other_id'}],
      mimeType: fileBlob.getContentType()
    };
    var options = {ocr: true, supportsAllDrives: true};
    var docFile = Drive.Files.insert(resource, fileBlob, options);
    newID.push(docFile.id)
  }
}