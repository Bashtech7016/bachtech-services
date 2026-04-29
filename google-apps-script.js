// =============================================
// BASHTECH — Google Apps Script
// ضع هذا الكود في Google Apps Script
// =============================================
// خطوات الإعداد:
// 1. اذهب إلى: script.google.com
// 2. اضغط New Project
// 3. احذف الكود القديم والصق هذا الكود
// 4. اضغط Deploy → New Deployment
// 5. اختر: Web App
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. اضغط Deploy وانسخ الـ URL
// 9. الصق الـ URL في لوحة التحكم → Google Sheets URL
// =============================================

const SHEET_NAME = "Leads"; // اسم الورقة

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
                  || SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add header if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["التاريخ", "الاسم", "الهاتف", "المدينة", "الجهاز", "Disque dur", "السعر"]);
      sheet.getRange(1, 1, 1, 7).setFontWeight("bold").setBackground("#0369a1").setFontColor("#ffffff");
    }

    sheet.appendRow([
      data.date || new Date().toLocaleString("ar"),
      data.name || "—",
      data.phone || "—",
      data.city || "—",
      data.model || "PS4",
      data.hdd || "—",
      data.price || "—"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({status: "ok"}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({status: "error", msg: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Bashtech API is running ✅")
    .setMimeType(ContentService.MimeType.TEXT);
}
