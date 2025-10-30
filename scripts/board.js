const columnMap = {
  'to-do': 'to-do-tasks',
  'in-progress': 'in-progress-tasks',
  'await-feedback': 'await-feedback-tasks',
  'done': 'done-tasks',
};

async function initBoard() {
  await getData();
  loadTasks();
  updateAllPlaceholders();
}

async function renderTaskInfoDlg(taskId) {
  await getData();
  const task = tasks.find(t => t.id === taskId);
  if (!task) return console.warn('Task not found:', taskId);

  const dlgBox = document.getElementById("dlg-box");
  dlgBox.innerHTML = getTaskInfoDlgTpl(task);
  displayDlg();
}

async function renderTaskEditDlg(taskId) {
  await getData();
  const task = tasks.find(t => t.id === taskId);
  if (!task) return console.warn('Task not found:', taskId);

  const dlgBox = document.getElementById("dlg-box");
  dlgBox.innerHTML = getTaskEditDlgTpl(task);
  displayDlg();

  initSubtaskInput();
  initSubtaskIconButtons();
  initSubtaskHandlers();
  fillEditFormWithTaskData(task);
  populateAssignmentListFromFirebase(task);
}

async function renderAddTaskDlg(defaultTaskState = "to-do") {
  const addTaskDlgRef = document.getElementById("dlg-box");

  addTaskDlgRef.classList.add("dlg-add-task");
  addTaskDlgRef.innerHTML = "";
  addTaskDlgRef.innerHTML = getAddTaskDlgTpl(defaultTaskState);

  const insertElement = addTaskDlgRef.querySelector("[data-insert]");
  await InsertLoader.loadInsertByElement(insertElement);

  await waitFor('.contact-options');
  populateAssignmentListFromFirebase({ assignedContacts: [] });
  displayDlg();
}

function loadTasks() {
  Object.values(columnMap).forEach(id => {
    document.getElementById(id).innerHTML = '';
  });

  tasks.forEach(task => {
    const columnId = columnMap[task.taskState];
    if (columnId) {
      document.getElementById(columnId).innerHTML += getTasksTemplate(task);
    }
  });

  updateAllPlaceholders();
}

async function deleteTask(taskId) {
  try {
    const url = `https://join-25a0e-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`;
    
    const response = await fetch(url, {
      method: 'DELETE'});

    if (!response.ok) {
      throw new Error(`Fehler beim Löschen: ${response.status}`)}

    console.log(`Task ${taskId} erfolgreich gelöscht`);

    await getData();
    loadTasks();
    updateAllPlaceholders();
    hideDlg();

  } catch (error) {
    console.error('Fehler beim Löschen des Tasks:', error);}
}

function updateColumnPlaceholder(columnId) {
  const column = document.getElementById(columnId);
  if (!column) return;

  const hasTasks = column.querySelector(".task");
  const existingPlaceholder = column.querySelector(".no-tasks-placeholder");

  if (hasTasks && existingPlaceholder) {
    existingPlaceholder.remove();
    return;
  }

  if (!hasTasks && !existingPlaceholder) {
    const placeholderEl = createElementFromHTML(getPlaceholderTpl());
    column.appendChild(placeholderEl);
  }
}

function createElementFromHTML(html) {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function updateAllPlaceholders() {
  updateColumnPlaceholder("to-do-tasks");
  updateColumnPlaceholder("in-progress-tasks");
  updateColumnPlaceholder("await-feedback-tasks");
  updateColumnPlaceholder("done-tasks");
}

function fillEditFormWithTaskData(task) {
  document.getElementById('title-input').value = task.title || '';
  document.getElementById('descriptions-input').value = task.description || '';
  document.getElementById('due-date').value = task.dueDate || '';

  const priorityBtn = document.getElementById(task.priority);
  if (priorityBtn) {
    changePriorityBtn(priorityBtn);
  }

  const ul = document.querySelector('.dlg-edit__subtask-list');
  if (ul) {
    ul.innerHTML = '';
    if (task.subtasks && typeof task.subtasks === 'object') {
      Object.values(task.subtasks).forEach(subtask => {
        if (subtask && subtask.task) {
          ul.insertAdjacentHTML('beforeend', getSubtaskTpl(subtask.task));
        }
      });
    }
  }
}

function getUserNameById(id) {
  const user = users.find(user => user.id === id);
  return user ? user.name : "Unknown User";
}

function getUserPicById(id) {
  const user = users.find(user => user.id === id);
  return user ? user.profilImgColor : null;
}

function getUserInitialsById(id) {
  const user = users.find(u => u.id === id);
  if (!user || !user.name) return "";
  return user.name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase())
    .join("");
}