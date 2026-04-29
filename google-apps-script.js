const SHEET_NAME = "Leads";

function doPost(e) {
  return handleRequest(e, "post");
}

function doGet(e) {
  return handleRequest(e, "get");
}

function handleRequest(e, method) {
  try {
    let data = {};
    
    if(method === "post" && e.postData){
      data = JSON.parse(e.postData.contents);
    } else if(e.parameter){
      data = e.parameter;
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
                  || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["التاريخ", "الاسم", "الهاتف", "المدينة", "الجهاز", "Disque dur", "السعر"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#0369a1").setFontColor("#ffffff");
    }

    if(data.name || data.phone){
      sheet.appendRow([
        data.date || new Date().toLocaleString("ar"),
        data.name || "—",
        data.phone || "—",
        data.city || "—",
        data.model || "PS4",
        data.hdd || "—",
        data.price || "—"
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({status: "ok"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: "error", msg: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
