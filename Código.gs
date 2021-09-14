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
 */
function getInformationPDF() {
  // Nos conectamos con la hoja "Arch"
  const spsArch = SpreadsheetApp.openById('id').getSheetByName('Arch')
  // Obtenemos los datos
  var dataArch = spsArch.getDataRange().getValues();
  // Ùltima fila
  var lastRowA = spsArch.getLastRow();
  // Obtenemos los archivos de esa carpeta
  let files = DriveApp.getFolderById('id_folder').getFiles(); 
  // Creamos dos listas vacias.
  let fileID = [], fileName = [];
  // Empezamos a iterar para obtener el nombre y el ID de los pdf's
  while (files.hasNext()){
    let file = files.next();
    // Agregamos a nuestra lista
    fileName.push(file.getName());
    fileID.push(file.getId());
  }
  var arch = [], ids = [], k1, x;
  // Creamos una lista y agrgamos los nombres de los archivos.
  for (k1 = 1; k1 < lastRowA; k1++){arch.push(dataArch[k1][1].toString())}
  // Obtener los nombres que no estàn en la lista arch.
  var notInFileName = fileName.filter(function(a){ return arch.indexOf(a) == -1; });
  // despuès obtener los id's de los nombres que se enceuntràn en notInFileName
  for (x of notInFileName) {ids.push(fileID[fileName.indexOf(x)])}
  let newID = [];
  // Aquì empezaremos a convertir los pdf's en google docs
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
  // Todos los valores que obtuvimos, seràn "pegados" en la hoja Arch
  for(var js = 0; js < ids.length; js++){
    spsArch.getRange(lastRowA+js+1, 1).setValue(lastRowA+js);
    spsArch.getRange(lastRowA+js+1, 2).setValue(notInFileName[js]);
    spsArch.getRange(lastRowA+js+1, 3).setValue(ids[js]);
    spsArch.getRange(lastRowA+js+1, 4).setValue(newID[js]);
  }
}