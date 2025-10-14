const select = document.getElementById("contact-select");
const searchInput = document.getElementById("contact-search");
const options = select.querySelector(".contact-options");
const listItems = options.querySelectorAll("li");

let isDropdownOpen = false;

/**
 * Öffnet oder schließt das Dropdown-Menü.
 * @param {boolean} [forceState] - Optionaler Zustand (true = öffnen, false = schließen)
 */
function toggleDropdown(forceState) {
  if (typeof forceState === "boolean") {
    isDropdownOpen = forceState;
  } else {
    isDropdownOpen = !isDropdownOpen;
  }
  options.style.display = isDropdownOpen ? "flex" : "none";
}

/**
 * Filtert die angezeigten Kontakte basierend auf dem Suchbegriff.
 * @param {string} term - Der aktuelle Suchbegriff (kleingeschrieben)
 */
function filterContacts(term) {
  listItems.forEach((listItem) => {
    const name = listItem.querySelector(".username").textContent.toLowerCase();
    listItem.style.display = name.includes(term) ? "flex" : "none";
  });
}

/**
 * Aktualisiert die Checkbox-Grafik beim Hover.
 * @param {HTMLImageElement} checkbox - Das Checkbox-Image-Element
 * @param {boolean} isChecked - Aktueller Check-Zustand
 * @param {boolean} isHovering - True, wenn sich Maus über Element befindet
 */
function updateCheckboxVisual(checkbox, isChecked, isHovering) {
  if (isHovering) {
    checkbox.src = isChecked
      ? "../assets/img/checkbox-unchecked-hover.svg"
      : "../assets/img/checkbox-checked-hover.svg";
  } else {
    checkbox.src = isChecked
      ? "../assets/img/checkbox-checked-white.svg"
      : "../assets/img/checkbox-unchecked.svg";
  }
}

/**
 * Initialisiert alle Checkbox-Events für Hover- und Click-Interaktionen.
 * - Hover zeigt Vorschau-Icon (was passieren würde).
 * - Klick toggelt den Checked-Status, aktualisiert das Icon
 *   und markiert die Zeile per .active.
 */
function initCheckboxHandlers() {
  listItems.forEach((listItem) => {
    const checkbox = listItem.querySelector(".checkbox");

    listItem.addEventListener("mouseenter", () => {
      updateCheckboxVisual(checkbox, checkbox.dataset.checked === "true", true);
    });

    listItem.addEventListener("mouseleave", () => {
      updateCheckboxVisual(checkbox, checkbox.dataset.checked === "true", false);
    });

    listItem.addEventListener("click", (event) => {
      event.stopPropagation();
      const isChecked = checkbox.dataset.checked === "true";
      checkbox.dataset.checked = !isChecked;
      updateCheckboxVisual(checkbox, !isChecked, false);
      listItem.classList.toggle("active", !isChecked);
    });
  });
}

/**
 * Initialisiert alle Events für Suchfeld & Dropdown-Steuerung.
 */
function initDropdownHandlers() {
  // Klick toggelt Dropdown
  searchInput.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleDropdown();
  });

  // Eingabe öffnet Dropdown und filtert Ergebnisse
  searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (!isDropdownOpen) toggleDropdown(true);
    filterContacts(searchTerm);
  });

  // Klick außerhalb schließt Dropdown
  document.addEventListener("click", (event) => {
    if (!select.contains(event.target)) toggleDropdown(false);
  });
}

// Initialisierung
initDropdownHandlers();
initCheckboxHandlers();
