/** Ésta función realiza las siguientes actividades:
 *  1) Obtine el conjunto de datos de las hojas Arch y Datos
 */

function completeTable(){
  const spsArch = SpreadsheetApp.openById('id1').getSheetByName('Arch');
  const spsDatos = SpreadsheetApp.openById('id2').getSheetByName('Datos');
  var lastRowA = spsArch.getLastRow();
  var lastRowD = spsDatos.getLastRow();
  var dataArch = spsArch.getDataRange().getValues();
  var data = spsDatos.getDataRange().getValues();

  var docName = [], folio = [], k, j;
  for (k = 1; k < lastRowD; k++){folio.push(data[k][6].toString() + '.pdf')}
  for (j = 1; j < lastRowA; j++) {docName.push(dataArch[j][1].toString());}
  var unchosen = docName.filter(function(itm){ return folio.indexOf(itm) == -1; });

  var ks = 1;
  for(g of unchosen){
    var textFinder = spsArch.createTextFinder(g);
    var search_row = textFinder.findNext().getRow();
    var id = dataArch[search_row-1][3];
    var doc = DocumentApp.openById(id);
    var fullName = doc.getBody().getChild(10).getText().split(':')[1];
    var course = doc.getBody().getChild(17).getText().split(':')[1];
    var studentType = doc.getBody().getChild(19).getText().split(':')[1];
    var payment = doc.getBody().getChild(20).getText().split(':')[1].split('*')[0];
    var mail = doc.getBody().getChild(15).getText().split(':');
    spsDatos.getRange(lastRowD+ks, 1).setValue(lastRowD+ks-1);
    spsDatos.getRange(lastRowD+ks, 2).setValue(fullName);
    spsDatos.getRange(lastRowD+ks, 3).setValue(course);
    spsDatos.getRange(lastRowD+ks, 4).setValue(studentType);
    spsDatos.getRange(lastRowD+ks, 5).setValue(payment);
    spsDatos.getRange(lastRowD+ks, 6).setValue(mail);
    spsDatos.getRange(lastRowD+ks, 7).setValue(g.split('.')[0])
    ks+=1;
  }

  var uselessfiles = DriveApp.getFolderById("id3").getFiles();
  while(uselessfiles.hasNext()) {uselessfiles.next().setTrashed(true)}
}
