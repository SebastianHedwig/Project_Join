/**
 * InsertLoader
 * -------------
 * Lädt automatisch HTML-Inserts (z. B. Header/Footer) in Elemente mit [data-insert].
 * Nutzt MemoryCache + LocalStorage zur Performance-Optimierung.
 * Überprüft im Hintergrund auf neuere Versionen (stale-while-revalidate).
 */
const InsertLoader = (() => {
  /** @constant {string} CACHE_KEY - Schlüsselname für den localStorage-Cache */
  const CACHE_KEY = "html_insert_cache";

  /** @constant {number} CACHE_TTL_MS - Lebensdauer (Time To Live) des Caches in Millisekunden (24 Stunden) */
  const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

  /** @type {Map<string, string>} memoryCache - Kurzlebiger In-Memory-Cache für Inserts während der Laufzeit */
  const memoryCache = new Map();

  /** @type {Record<string, {html: string, timestamp: number, lastModified: string|null}>} localCache - Persistenter Cache aus localStorage */
  let localCache = loadLocalCache();

  /**
   * Lädt den Cache-Inhalt aus dem localStorage.
   * @returns {Record<string, any>} Gespeicherte Cache-Daten oder leeres Objekt.
   */
  function loadLocalCache() {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY)) || {};
    } catch {
      return {};
    }
  }

  /**
   * Speichert den aktuellen Cache-Zustand im localStorage.
   * @returns {void}
   */
  function saveLocalCache() {
    localStorage.setItem(CACHE_KEY, JSON.stringify(localCache));
  }

  /**
   * Prüft, ob ein Cache-Eintrag abgelaufen ist.
   * @param {{timestamp: number}} entry - Cache-Eintrag mit Zeitstempel.
   * @returns {boolean} true, wenn der Eintrag abgelaufen ist.
   */
  function isExpired(entry) {
    return !entry || Date.now() - entry.timestamp > CACHE_TTL_MS;
  }

  /**
   * Lädt HTML-Inhalt von einer URL.
   * @async
   * @param {string} url - URL der zu ladenden Datei.
   * @param {"no-cache"|"reload"|"force-cache"} [mode="no-cache"] - Cache-Modus für den Fetch-Request.
   * @returns {Promise<string>} Der geladene HTML-Text.
   * @throws {Error} Wenn die Anfrage fehlschlägt.
   */
  async function fetchHTML(url, mode = "no-cache") {
    const response = await fetch(url, { cache: mode });
    if (!response.ok) throw new Error(`Fehler beim Laden von ${url}: ${response.status}`);
    return await response.text();
  }

  /**
   * Speichert HTML-Inhalt im Cache (Memory + localStorage).
   * @param {string} url - URL des Inserts.
   * @param {string} html - HTML-Inhalt.
   * @param {string|null} lastModified - Letztes Änderungsdatum laut Server.
   * @returns {void}
   */
  function setCache(url, html, lastModified) {
    const cachedFile = { html, timestamp: Date.now(), lastModified };
    localCache[url] = cachedFile;
    memoryCache.set(url, html);
    saveLocalCache();
  }

  /**
   * Holt HTML-Inhalt aus dem Cache, falls vorhanden und nicht abgelaufen.
   * @param {string} url - URL des Inserts.
   * @returns {string|null} Der HTML-Inhalt oder null, wenn nicht vorhanden/gültig.
   */
  function getCachedHTML(url) {
    const cachedFile = localCache[url];
    if (cachedFile && !isExpired(cachedFile)) {
      memoryCache.set(url, cachedFile.html);
      return cachedFile.html;
    }
    return null;
  }

  /**
   * Lädt ein Insert neu vom Server und aktualisiert den Cache.
   * @async
   * @param {string} url - URL der Insert-Datei.
   * @param {HTMLElement} insertElement - Ziel-Element im DOM, in das der HTML-Inhalt geladen wird.
   * @returns {Promise<void>}
   */
  async function updateInsert(url, insertElement) {
    try {
      const html = await fetchHTML(url);
      const lastModified = await getLastModified(url);
      setCache(url, html, lastModified);
      if (insertElement) insertElement.innerHTML = html;
    } catch (error) {
      console.error(error);
      if (insertElement)
        insertElement.innerHTML = /*html*/ `<div style="color:red;">Fehler beim Laden von "${url}"</div>`;
    }
  }

  /**
   * Prüft im Hintergrund, ob eine neuere Version der Datei existiert, und aktualisiert bei Bedarf.
   * @async
   * @param {string} url - URL des Inserts.
   * @returns {Promise<void>}
   */
  async function backgroundRefresh(url) {
    try {
      const lastModified = await getLastModified(url);
      const cached = localCache[url];
      if (!cached || cached.lastModified !== lastModified) {
        await updateInsert(url);
      }
    } catch (error) {
      console.warn(`Background-Refresh für ${url} fehlgeschlagen`, error);
    }
  }

  /**
   * Fragt das "Last-Modified"-Datum einer Datei beim Server ab.
   * @async
   * @param {string} url - URL der zu prüfenden Datei.
   * @returns {Promise<string|null>} Letztes Änderungsdatum oder null, falls nicht vorhanden.
   */
  async function getLastModified(url) {
    try {
      const res = await fetch(url, { method: "HEAD", cache: "no-cache" });
      return res.headers.get("Last-Modified") || null;
    } catch {
      return null;
    }
  }

  /**
   * Lädt ein Insert entweder aus dem Cache oder direkt vom Server.
   * Führt bei Cache-Treffern einen stillen Hintergrund-Refresh aus.
   * @async
   * @param {string} url - URL der Insert-Datei.
   * @param {HTMLElement} insertElement - Ziel-Element, in das das HTML geladen wird.
   * @returns {Promise<void>}
   */
  async function fetchInsert(url, insertElement) {
    const cached = getCachedHTML(url);
    if (cached) {
      insertElement.innerHTML = cached;
      backgroundRefresh(url);
    } else {
      await updateInsert(url, insertElement);
    }
  }

  /**
   * Findet alle [data-insert]-Elemente auf der Seite und lädt deren Inhalte.
   * @async
   * @returns {Promise<void>}
   */
  async function loadInserts() {
    const inserts = document.querySelectorAll("[data-insert]");
    await Promise.all(
      Array.from(inserts).map(insertElement => {
        const url = insertElement.getAttribute("data-insert");
        return fetchInsert(url, insertElement);
      })
    );
  }

  /**
   * Löscht den gesamten Cache (Memory + localStorage).
   * @returns {void}
   */
  function clearCache() {
    localCache = {};
    memoryCache.clear();
    saveLocalCache();
    console.info("InsertLoader: Cache gelöscht");
  }

  /**
   * Lädt ein bestimmtes Insert-Element anhand des data-insert-Attributs.
   * @async
   * @param {HTMLElement} insertElement - Das Element mit data-insert
   * @returns {Promise<void>}
   */
  async function loadInsertByElement(insertElement) {
    const url = insertElement.getAttribute("data-insert");
    if (url) {
      await fetchInsert(url, insertElement);
    }
  }

  // Öffentliche Funktionen - jederzeit manuell und global abrufbar
  return { loadInserts, clearCache, loadInsertByElement };
})();

// Startet automatisch, sobald der DOM geladen ist
document.addEventListener("DOMContentLoaded", InsertLoader.loadInserts);
