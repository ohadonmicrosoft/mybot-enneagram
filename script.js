/************************************************
  script.js - "בוט אניאגרם" בעברית
  קורא פרמטרים (?type=... &secondary=...) ומציג טקסט מותאם
************************************************/

/**
 * טקסט לדוגמה לכל טיפוס עיקרי (A–I).
 * ניתן להרחיב ולהוסיף פירוט רב יותר.
 */
const primaryTypeTexts = {
  A: "טיפוס A - הפרפקציוניסט: אוהב סדר ונהלים, בעל מצפון גבוה ורצון לשלמות.",
  B: "טיפוס B - המטפל: אמפתי, דואג מאוד לאחר, ושואב סיפוק מנתינה.",
  C: "טיפוס C - ההישגי: חי בתחרות, שואף תמיד להיות מספר 1 ולהשיג יעדים.",
  D: "טיפוס D - האינדיבידואליסט: רגיש, יצירתי, מעמיק, מחפש את המשמעות והייחוד.",
  E: "טיפוס E - המומחה: חוקר, אוסף מידע, רוצה להבין הכול לעומק לפני פעולה.",
  F: "טיפוס F - הנאמן: מסור לקבוצה, מחפש ביטחון וודאות, נוטה לחשש במצבי אי-ידיעה.",
  G: "טיפוס G - הנהנתן: נהנה מהרפתקאות, מגוון, וכיף. בורח משעמום וממחויבות ארוכה.",
  H: "טיפוס H - המנהיג: אסרטיבי, לא חושש מעימות, אוהב להוביל ולקחת שליטה.",
  I: "טיפוס I - המשכין שלום: סבלני, נמנע מעימותים, מחפש הרמוניה ושקט סביבו."
};

/**
 * טקסט לכל טיפוס משני (A–I).
 */
const secondaryTypeTexts = {
  A: "נטייה לפרפקציוניזם בסגנון משני, רצון לשמור על סטנדרטים גם ברקע.",
  B: "מוסיף עומק של נתינה ודאגה לאחרים, צורך חזק באהבה והערכה.",
  C: "שואף להישגים והכרה, משלים את שאר התכונות בדרייב חזק להצלחה.",
  D: "רגישות גבוהה, יצירתיות וביטוי אישי גם בתור משני.",
  E: "סקרנות ומחקר מעמיק - צורך להבין לפני שמתקדם.",
  F: "רמה עמוקה של נאמנות וקושי באי-ודאות, חשש מביקורת.",
  G: "רצון לגיוון, שמחה וחידוש; משלים את שאר האופי בתשוקה לכיף.",
  H: "אסרטיביות נוספת ברקע, צורך לשלוט או להגן בכל מצב.",
  I: "משכין שלום נוסף, שומר על הרמוניה ואווירה נינוחה."
};

/**
 * פונקציה לחילוץ ערכי פרמטר ב-URL
 * למשל: ?type=A&secondary=F => getQueryParam("type") => "A"
 */
function getQueryParam(paramName) {
  const url = new URL(window.location.href);
  return url.searchParams.get(paramName);
}

/**
 * הפונקציה הראשית שתופעל ברגע טעינת העמוד (DOMContentLoaded).
 * היא מזהה את הטיפוס העיקרי והמשני, ומציגה בלוקים עם טקסט מתאים.
 */
function displayResults() {
  // שליפה של פרמטרים מה-URL
  const primary = getQueryParam("type");       // למשל "A"
  const secondary = getQueryParam("secondary");// למשל "F"

  const resultsBox = document.getElementById("resultsBox");
  if (!resultsBox) return; // אם לא מוצא את האזור, לא נעשה כלום

  // אם אין "type", נצא עם הודעה
  if (!primary) {
    resultsBox.innerHTML = `
      <div class="type-block">
        <h2>לא נמצאו נתונים</h2>
        <p>נא לוודא שהגעת דרך קישור מתאים (למשל ?type=A&secondary=F)</p>
      </div>
    `;
    return;
  }

  // טקסטים מהאובייקטים
  const primaryText = primaryTypeTexts[primary.toUpperCase()] || "טיפוס לא מוכר.";
  let secondaryText = "";
  if (secondary) {
    secondaryText = secondaryTypeTexts[secondary.toUpperCase()] || "טיפוס משני לא מוכר.";
  }

  // בונים HTML להצגת הטיפוס העיקרי
  let html = `
    <div class="type-block">
      <h2>טיפוס עיקרי: ${primary.toUpperCase()}</h2>
      <div class="type-content">
        ${primaryText}
      </div>
    </div>
  `;

  // אם קיים secondary, נוסיף בלוק משני
  if (secondary) {
    html += `
      <div class="type-block secondary-block">
        <h3>טיפוס משני: ${secondary.toUpperCase()}</h3>
        <div class="type-content">
          ${secondaryText}
        </div>
      </div>
    `;
  }

  // הוספת פסקה תחתונה
  html += `
    <div class="footer-note">
      <p>זכרו שכולנו משלבים תכונות שונות, אבל הטיפוס העיקרי והמשני מראים את הצדדים הדומיננטיים שלכם כרגע.</p>
    </div>
  `;

  // מציבים את התוכן ב-DIV
  resultsBox.innerHTML = html;
}

// מפעילים את הפונקציה ברגע שהדף נטען
document.addEventListener("DOMContentLoaded", displayResults);
