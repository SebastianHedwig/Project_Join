  const selectBox = document.getElementById("contacts-select-box");
  const selectContacts = document.getElementById("select-contacts");

  selectBox.addEventListener("click", () => {
    selectContacts.style.display =
      selectContacts.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".contacts-selection")) {
      selectContacts.style.display = "none";
    }
  });

  const updateLabel = () => {
    const selected = Array.from(
      selectContacts.querySelectorAll("input:checked")
    ).map((cb) => cb.value.charAt(0).toUpperCase() + cb.value.slice(1));

    selectBox.textContent =
      selected.length > 0
        ? selected.join(", ")
        : "Select contacts to assign";
  };

  selectContacts.addEventListener("change", updateLabel);