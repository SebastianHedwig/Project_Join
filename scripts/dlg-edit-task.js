function getSelectedPriorityFromEditDialog() {
  // Deine Buttons bekommen via changePriorityBtn vermutlich eine aktive Klasse.
  // Fallback: finde den Button mit data-selected aktuell aktivem Icon (wenn Du das so steuerst).
  const active = document.querySelector('.dlg-edit__main__task-priority-btn-box .priority-options-btn.active');
  if (active && active.id) return active.id; // 'urgent' | 'medium' | 'low'

  // Fallback 2: prüfe ob eines der IMG gerade das "selected"-Icon zeigt
  const btns = document.querySelectorAll('.dlg-edit__main__task-priority-btn-box .priority-options-btn');
  for (const btn of btns) {
    const img = btn.querySelector('img');
    if (img && img.getAttribute('src') === img.getAttribute('data-selected')) {
      return btn.id;
    }
  }
  return null;
}


async function saveEditedTask(taskId) {
  // --- 0) Title-Validierung: roter Rand + Fehlermeldung unter dem Input ---
  const titleInput = document.getElementById('title-input');
  const titleBox = titleInput?.closest('.dlg-edit__main__title-box');
  const existingError = titleBox?.querySelector('.error-msg');

  // Vorherigen Fehlerzustand säubern
  if (existingError) existingError.remove();
  if (titleInput) {
    titleInput.classList.remove('input--validation-modifier');
    titleInput.removeAttribute('required');
  }

  const title = (titleInput?.value || '').trim();

  if (!title) {
    if (titleInput) {
      // required setzen, damit :invalid greift
      titleInput.setAttribute('required', 'required');
      titleInput.classList.add('input--validation-modifier');
      titleInput.reportValidity?.();
    }
    if (titleBox) {
      const msg = document.createElement('span');
      msg.className = 'error-msg';
      msg.textContent = 'Title is required.';
      titleBox.appendChild(msg);
    }
    return; // Speichern abbrechen
  }

  try {
    // --- 1) Restliche Eingaben aus Dialog einsammeln ---
    const description = (document.getElementById('descriptions-input')?.value || '').trim();
    const dueDate = (document.getElementById('due-date')?.value || '').trim();
    const priority = getSelectedPriorityFromEditDialog();

    // assignedContacts: exakt was im Dialog selektiert ist (leer => [])
    const assignedContacts = getSelectedAssignmentIds();

    // --- 2) Alten Task aus globalem Array holen (für Merge & KEEP-Logik) ---
    const oldTask = tasks.find(t => t.id === taskId) || {};

    // --- 3) Subtasks aus DOM sammeln, mit KEEP der taskChecked-Werte ---
    // Wir lesen nur finale (nicht edit-mode) Einträge, bauen eine flache Liste der Texte,
    // und erzeugen subtask0..n. Für jeden neuen Text: wenn im oldTask ein Subtask mit gleichem Text existiert,
    // übernehmen wir dessen taskChecked, sonst default false.
    function collectSubtasksPreserveChecked(oldTaskObj) {
      const list = document.querySelector('.dlg-edit__subtask-list');
      if (!list) return {};

      const items = Array.from(list.querySelectorAll('li')).filter(li => !li.classList.contains('edit-mode'));

      // Map alter Texte -> checked
      const oldCheckedByText = {};
      if (oldTaskObj && oldTaskObj.subtasks && typeof oldTaskObj.subtasks === 'object') {
        Object.values(oldTaskObj.subtasks).forEach(st => {
          if (st && typeof st.task === 'string') {
            const key = st.task.trim();
            if (key) oldCheckedByText[key] = !!st.taskChecked;
          }
        });
      }

      const result = {};
      let idx = 0;

      items.forEach(li => {
        // text extrahieren (Bullet/Spaces entfernen)
        let text = '';
        const tn = Array.from(li.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
        if (tn && tn.nodeValue) {
          text = tn.nodeValue.replace('•', '').trim();
        } else {
          text = (li.textContent || '').replace('•', '').trim();
        }
        if (!text) return;

        const wasChecked = oldCheckedByText[text] === true;
        result[`subtask${idx}`] = { task: text, taskChecked: wasChecked };
        idx++;
      });

      return result;
    }

    const subtasks = collectSubtasksPreserveChecked(oldTask);

    // --- 4) Merge vorbereiten: nur Felder aus dem Dialog überschreiben ---
    // category, taskState etc. bleiben unberührt (Option 1)
    const merged = {
      ...oldTask,
      title,
      description,
      dueDate,
      ...(priority ? { priority } : {}), // nur setzen, wenn eine gewählt ist
      assignedContacts,                   // Full overwrite
      subtasks                            // Full overwrite
    };

    // id nicht ins Firebase-Objekt schreiben
    const { id, ...payload } = merged;

    // --- 5) PUT nach Firebase ---
    const url = `https://join-25a0e-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`Save failed: ${res.status} ${res.statusText}`);

    // --- 6) Board aktualisieren & Daten neu laden ---
    await getData();
    loadTasks();
    updateAllPlaceholders();

    // --- 7) Frischen Task finden und Info-Dialog anzeigen (Edit-Dialog wird ersetzt) ---
    const freshTask = tasks.find(t => t.id === taskId);
    if (freshTask) {
      renderTaskInfoDlg(freshTask);
    } else {
      hideDlg(); // fallback
    }

  } catch (err) {
    console.error('Fehler beim Speichern:', err);
    // Keinen alert(), wie besprochen — Logs reichen
  }
}


