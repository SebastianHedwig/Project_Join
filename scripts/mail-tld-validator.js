// ============================================================
// mail-tld-validator.js
// ------------------------------------------------------------
// Lädt aktuelle IANA-TLDs, cached sie, prüft E-Mail-Syntax + TLD
// und zeigt Live-Validierung im Eingabefeld an.
// ============================================================

const IANA_URL = "https://data.iana.org/TLD/tlds-alpha-by-domain.txt";
const CACHE_KEY = "iana_tlds";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 Stunden
const FALLBACK_TLDS = ["com", "net", "org", "de", "io", "app"];

/**
 * Lädt aktuelle TLDs von der IANA-Liste.
 * @returns {Promise<string[]>} Liste aller gültigen TLDs in Kleinbuchstaben.
 */
async function fetchTlds() {
  try {
    const response = await fetch(IANA_URL);
    if (!response.ok) throw new Error("IANA fetch failed");
    const text = await response.text();
    return text
      .split("\n")
      .filter(line => line && !line.startsWith("#"))
      .map(line => line.toLowerCase());
  } catch {
    return FALLBACK_TLDS;
  }
}

/**
 * Speichert eine TLD-Liste im localStorage mit Zeitstempel.
 * @param {string[]} tlds - Die TLD-Liste, die gespeichert werden soll.
 */
function saveTldsToCache(tlds) {
  const data = { tlds, time: Date.now() };
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
}

/**
 * Liest TLDs aus dem Cache, falls sie noch gültig sind.
 * @returns {string[] | null} Gecachte TLDs oder null, wenn abgelaufen.
 */
function getCachedTlds() {
  const cache = localStorage.getItem(CACHE_KEY);
  if (!cache) return null;
  const { tlds, time } = JSON.parse(cache);
  return Date.now() - time < CACHE_TTL ? tlds : null;
}

/**
 * Holt TLDs aus Cache oder lädt neue von IANA.
 * @returns {Promise<string[]>} Eine gültige TLD-Liste.
 */
async function loadTlds() {
  const cached = getCachedTlds();
  if (cached) return cached;
  const latestTlds = await fetchTlds();
  saveTldsToCache(latestTlds);
  return latestTlds;
}

/**
 * Prüft eine E-Mail-Adresse auf Syntax und TLD.
 * @param {string} email - Die zu prüfende E-Mail-Adresse.
 * @returns {Promise<boolean>} True, wenn die E-Mail gültig ist.
 */
async function isValidEmail(email) {
  const tlds = await loadTlds();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!regex.test(email)) return false;
  const tld = email.split(".").pop().toLowerCase();
  return tlds.includes(tld);
}

/**
 * Initialisiert die Live-Validierung für das E-Mail-Eingabefeld.
 * 
 * Prüft bei jeder Eingabe, ob die E-Mail gültig ist (Syntax + TLD).
 * Zeigt bei ungültigen Eingaben eine Fehlermeldung an.
 * Entfernt Rahmen & Meldung, wenn das Feld leer ist.
 */
function initEmailValidation() {
  const email = document.getElementById("email");
  const msg = document.getElementById("msg");
  const validEmail = document.getElementById("valid-email");

  email.addEventListener("input", async () => {
    const value = email.value.trim();

    // Wenn Feld leer ist → neutraler Zustand (kein Rand, keine Meldung)
    if (!value) {
      validEmail.style.border = "";
      msg.style.display = "none";
      return;
    }

    // Prüfe E-Mail, wenn Text vorhanden
    const valid = await isValidEmail(value);
    validEmail.style.border = valid
      ? "1px solid var(--color-success)"
      : "1px solid var(--color-error)";
    msg.style.display = valid ? "none" : "inline";
  });
}

/**
 * Aktiviert die Live-E-Mail-Validierung nach dem Laden des DOM.
 */
window.addEventListener("DOMContentLoaded", initEmailValidation);
