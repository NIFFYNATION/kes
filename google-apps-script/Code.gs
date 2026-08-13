const SHEET_NAME = "Registrations";
const SECRET_PROPERTY = "REGISTRATION_SECRET";
const HEADERS = [
  "Registered At",
  "Designation",
  "Full Name",
  "Email",
  "Phone",
  "Location",
  "Business / Brand",
  "Business Stage",
  "Learning Goal",
  "Attended KES Before",
  "Financial Support Interest",
  "T-shirt Interest (₦7,500)",
  "Source",
];

/** Run once from Apps Script to prepare the spreadsheet. */
function initializeRegistrationSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  sheet
    .getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setBackground("#061A5B")
    .setFontColor("#FFFFFF")
    .setFontWeight("bold");

  sheet.setFrozenRows(1);
  [170, 120, 190, 230, 170, 180, 210, 180, 320, 170, 190, 200, 160].forEach(
    (width, index) => sheet.setColumnWidth(index + 1, width),
  );
  sheet.getRange("A:A").setNumberFormat("yyyy-mm-dd hh:mm:ss");

  return { ok: true, spreadsheetUrl: spreadsheet.getUrl() };
}

/** Run once and paste the same value used for GOOGLE_SHEETS_SECRET. */
function configureRegistrationSecret() {
  const ui = SpreadsheetApp.getUi();
  const prompt = ui.prompt(
    "Registration security key",
    "Paste the GOOGLE_SHEETS_SECRET value, then select OK.",
    ui.ButtonSet.OK_CANCEL,
  );

  if (prompt.getSelectedButton() !== ui.Button.OK) return;

  const value = prompt.getResponseText().trim();
  if (value.length < 32) {
    ui.alert("Use a random security key of at least 32 characters.");
    return;
  }

  PropertiesService.getScriptProperties().setProperty(SECRET_PROPERTY, value);
  ui.alert("Registration security key saved.");
}

function doGet() {
  return jsonResponse({ ok: true, service: "KES 2026 registrations" });
}

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    if (!lock.tryLock(10000)) {
      return jsonResponse({
        ok: false,
        code: "busy",
        message: "Registration service is busy. Please retry.",
      });
    }

    const payload = parseRequest(event);
    const configuredSecret = PropertiesService.getScriptProperties().getProperty(
      SECRET_PROPERTY,
    );

    if (!configuredSecret || payload.token !== configuredSecret) {
      return jsonResponse({
        ok: false,
        code: "unauthorized",
        message: "Unauthorized request.",
      });
    }

    const registration = validateRegistration(payload.registration);
    const sheet = getRegistrationSheet();

    if (emailExists(sheet, registration.email)) {
      return jsonResponse({
        ok: false,
        code: "duplicate",
        message: "This email is already registered.",
      });
    }

    sheet.appendRow([
      new Date(),
      safeCell(registration.designation),
      safeCell(registration.fullName),
      safeCell(registration.email),
      safeCell(registration.phone),
      safeCell(registration.location),
      safeCell(registration.businessName),
      safeCell(registration.businessStage),
      safeCell(registration.hopeToLearn),
      safeCell(registration.attendedKesBefore),
      safeCell(registration.financialSupportInterest),
      safeCell(registration.tshirtInterest),
      safeCell(registration.source),
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({
      ok: false,
      code: "invalid_request",
      message: error instanceof Error ? error.message : "Invalid request.",
    });
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}

function parseRequest(event) {
  if (!event || !event.postData || !event.postData.contents) {
    throw new Error("Missing request body.");
  }

  return JSON.parse(event.postData.contents);
}

function validateRegistration(value) {
  if (!value || typeof value !== "object") {
    throw new Error("Missing registration data.");
  }

  const registration = {
    designation: requiredChoice(value.designation, "Designation", [
      "mr", "mrs", "miss", "ms", "dr", "prof", "pastor", "reverend",
      "apostle", "chief", "engineer", "barrister", "nurse", "other",
    ]),
    fullName: requiredText(value.fullName, "Full name", 120),
    email: requiredText(value.email, "Email", 254).toLowerCase(),
    phone: requiredText(value.phone, "Phone", 40),
    location: requiredText(value.location, "Location", 160),
    businessName: optionalText(value.businessName, 160),
    businessStage: optionalText(value.businessStage, 80),
    hopeToLearn: requiredText(value.hopeToLearn, "Learning goal", 1000),
    attendedKesBefore: requiredChoice(value.attendedKesBefore, "Previous attendance", ["yes", "no"]),
    financialSupportInterest: requiredChoice(value.financialSupportInterest, "Financial support interest", ["yes", "no"]),
    tshirtInterest: requiredChoice(value.tshirtInterest, "T-shirt interest", ["yes", "no"]),
    source: optionalText(value.source, 80) || "kes-2026-website",
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email)) {
    throw new Error("Invalid email address.");
  }

  return registration;
}

function requiredText(value, label, maxLength) {
  const text = optionalText(value, maxLength);
  if (!text) throw new Error(`${label} is required.`);
  return text;
}

function requiredChoice(value, label, choices) {
  const text = requiredText(value, label, 80);
  if (!choices.includes(text)) throw new Error(`${label} is invalid.`);
  return text;
}

function optionalText(value, maxLength) {
  if (value === undefined || value === null) return "";
  if (typeof value !== "string") throw new Error("Invalid field value.");

  const text = value.trim();
  if (text.length > maxLength) throw new Error("Field value is too long.");
  return text;
}

function getRegistrationSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error("Run initializeRegistrationSheet before accepting registrations.");
  }
  return sheet;
}

function emailExists(sheet, email) {
  if (sheet.getLastRow() < 2) return false;

  return Boolean(
    sheet
      .getRange(2, 4, sheet.getLastRow() - 1, 1)
      .createTextFinder(email)
      .matchEntireCell(true)
      .matchCase(false)
      .findNext(),
  );
}

/** Prevent submitted values from becoming spreadsheet formulas. */
function safeCell(value) {
  return /^[=+\-@]/.test(value) ? `'${value}` : value;
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
