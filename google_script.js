function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    const rowData = [
      data.timestamp,
      data.email,
      data.telefono, 
      data.age,
      data.diet,
      data.exercise,
      data.sleep,
      data.stress,
      data.smoking,
      data.alcohol,
      data.skinType,
      data.concerns,
      data.routine,
      data.products,
      data.goals,
      data.timeline,
      data.additionalInfo,
      data.conditions,
      data.medications,
      data.allergies,
      data.selectedProtocol
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, row: sheet.getLastRow()}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
