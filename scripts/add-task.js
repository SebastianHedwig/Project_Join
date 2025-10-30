
let chosenPriority = "medium";

window.addEventListener("resize", relocateRequiredInfo);
window.addEventListener("load", relocateRequiredInfo);

async function initAddTask() {
  await getData();                         // users/tasks laden
  await waitFor('.contact-options'); // Wartet, bis das Insert geladen ist
  populateAssignmentListFromFirebase({ assignedContacts: [] });
  initSubtaskInput();
  initSubtaskHandlers();
  initSubtaskIconButtons();
}

// Helper: wartet, bis ein Selector im DOM existiert
function waitFor(selector) {
  return new Promise(resolve => {
    const el = document.querySelector(selector);
    if (el) return resolve(el);
    const obs = new MutationObserver(() => {
      const el2 = document.querySelector(selector);
      if (el2) {
        obs.disconnect();
        resolve(el2);
      }
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  });
}

function changePriorityBtn(priorityBtn) {
  changePriorityBtnColor(priorityBtn.id);
  changePriorityBtnIcon(priorityBtn.id);
  chosenPriority = priorityBtn.id
  console.log(chosenPriority);
}

function changePriorityBtnColor(btn) {
  const colors = {
    urgent: '#FF3D00',
    medium: '#FFA700',
    low: '#7AE229'
  };
  ['urgent', 'medium', 'low'].forEach(btn => {
    document.getElementById(btn).style.backgroundColor = "#FFFFFF";
    document.getElementById(btn).style.color = "#000000";
  });
  const selectedBtn = document.getElementById(btn);
  selectedBtn.style.backgroundColor = colors[selectedBtn.id];
  selectedBtn.style.color = "#FFFFFF";
}

function resetPriorityButtons() {
  ['urgent', 'medium', 'low'].forEach(id => {
    const btn = document.getElementById(id);
    btn.style.backgroundColor = "#FFFFFF";
    btn.style.color = "#000000";
    btn.querySelector('img').src = btn.querySelector('img').dataset.default;
  });
  chosenPriority = "medium";
}

function changePriorityBtnIcon(btn) {
  if (event) event.stopPropagation();
  document.querySelectorAll('.priority-options-btn img').forEach(img => {
    img.src = img.dataset.default;
  });
  const selectedBtnIcon = document.getElementById(btn).querySelector('img');
  selectedBtnIcon.src = selectedBtnIcon.dataset.selected;
}

function assignedTo() {
  let select = document.getElementById('assigned-to');
  users.forEach(u => {
    let opt = document.createElement('option');
    opt.value = u.id;
    opt.textContent = `${u.name}`;
    select.appendChild(opt);
  });
}

window.handleCreateTask = function handleCreateTask(event) {
  event.preventDefault();

  const form = event.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  createTask();
  form.reset();
  resetPriorityButtons();
}

async function createTask() {

  const taskStateRef = document.getElementById('task-state').value;

  let newTask = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    dueDate: document.getElementById('due-date').value,
    assignedContacts: getSelectedAssignmentIds(),
    category: getSelectedCategoryText(),
    subtasks: collectSubtasksFromEditDialog(),
    priority: chosenPriority,
    taskState: taskStateRef
  };

  const key = await getNextTaskKey();
  await saveTaskToFirebase(newTask, key);

  showAlertOverlay();
  console.log(tasks);
}

function showAlertOverlay() {
  const overlay = document.getElementById('alert-overlay');
  overlay.classList.remove('d-none');
}

function closeAlertOverlay() {
  const overlay = document.getElementById('alert-overlay');
  overlay.classList.add('d-none');
  window.location.reload();
}

function goToBoard() {
  window.location.href = './board.html';
}

function getSelectedUserIds(selectId = 'assigned-to') {
  return Array.from(document.getElementById(selectId).selectedOptions).map(option => option.value);
}

function getSelectedCategoryText(selId = 'category') {
  const el = document.getElementById(selId);
  return el.options[el.selectedIndex].value;
}


function formatCategory(category) {
  return category
    .replace(/([A-Z])/g, ' $1')        // fügt Leerzeichen vor Großbuchstaben ein
    .replace(/^./, str => str.toUpperCase()); // macht den ersten Buchstaben groß
}


function buildSubtasksObject(inputId = 'subtasks') {
  const inputValue = document.getElementById(inputId).value;
  const arr = inputValue.split(',').map(t => t.trim()).filter(Boolean);
  return Object.fromEntries(arr.map((task, i) => [
    `subtask${i}`, { task, taskChecked: false }
  ]));
}

function clearTask() {
  const form = document.getElementById('task-form');
  form.reset();
  resetPriorityButtons();
}

function relocateRequiredInfo() {
  const isSmallScreen = window.innerWidth < 1025;
  let currentPath = window.location.pathname;
  let relativePath = '/pages/add-task.html';
  if (currentPath.endsWith(relativePath)) {
    toggleFirstInfoBox(isSmallScreen);
    toggleSecondInfoBox(isSmallScreen);
  }
}

function toggleFirstInfoBox(isSmallScreen) {
  let requiredInfo = document.getElementById('required');
  if (isSmallScreen) {
    requiredInfo.classList.add('d-none');
  } else {
    requiredInfo.classList.remove('d-none');
  }
}

function toggleSecondInfoBox(isSmallScreen) {
  let requiredInfoDisplayed = document.getElementById('required-mobile');
  let rightColumn = document.querySelector('.add-task__right-column');
  if (isSmallScreen && !requiredInfoDisplayed) {
    let insertHTML = getFieldRequiredInfo();
    rightColumn.innerHTML += insertHTML;
  } else if (!isSmallScreen && requiredInfoDisplayed) {
    requiredInfoDisplayed.remove();
  }
}