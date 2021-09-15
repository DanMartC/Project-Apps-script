/**
 *  Ésta función realiza las siguientes actividades:
 *  1) Obtine los nombres e Id's de los archivos (Pdfs) que se encuentrán en la carpeta
 *  2) Compara los id's que se encuentrán en la hoja "Arch" con los que obtuvimos anteriormente (para no repetirlos)
 *  3) Después de obtener los Id's no repetidos, estos los ocuparemos para convertir de un pdf a un Google Doc
 *  4) Obtiene el Id del nuevo documento creado (Google Doc)
 *  5) Por último estos valores los "Imprimimos" en la hoja Arch
 */
function getInformationPDF() {
  /** Primera sección.
   *  Variables:
   *    - spsArch   := Conectarse con la Hoja 'Arch'
   *    - dataArch  := Obtener los datos de la hoja
   *    - lastRowA  := Obtiene la última fila 
   *    - files     := Obtiene los archivos que se encuentrán en la carpeta
   *    - fileID    := Insertaremos en la lista los Id's de los archivos
   *    - fileName  := Insertaremos en la lista los Nombres de los archivos
   */
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

  /** Segunda Sección.
   *  Variables:
   *    - arch          := Lista donse se insertarán los nombres de los pdfs que se encuentrán en la columna 1 de la hoja Arch.
   *    - notInFileName := Obtiene los nombres no repetidos entre fileName y arch, después nos regresa los indices de la lista fileName
   *    - ids           := Obtiene los Id's de los pdfs con respecto a los índices encontrados anteriormente con notInFileName
   */

  var arch = [], ids = [], k1, x;
  for (k1 = 1; k1 < lastRowA; k1++){arch.push(dataArch[k1][1].toString())}
  var notInFileName = fileName.filter(function(a){ return arch.indexOf(a) == -1; });
  for (x of notInFileName) {ids.push(fileID[fileName.indexOf(x)])}

  /** Tercera Sección.
   * 
   */

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

  /** Cuarta Sección.
   * Ésta última sección sólo será para "Imprimir" las varibles obtenidas anteriormente en la hoja Arch
   */

  for(var js = 0; js < ids.length; js++){
    spsArch.getRange(lastRowA+js+1, 1).setValue(lastRowA+js);
    spsArch.getRange(lastRowA+js+1, 2).setValue(notInFileName[js]);
    spsArch.getRange(lastRowA+js+1, 3).setValue(ids[js]);
    spsArch.getRange(lastRowA+js+1, 4).setValue(newID[js]);
  }
}