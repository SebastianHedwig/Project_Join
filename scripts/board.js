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

function renderTaskInfoDlg(task) {
  const taskInfoDlgRef = document.getElementById("dlg-box");
  taskInfoDlgRef.innerHTML = "";
  // hier muss noch Firebase rein
  taskInfoDlgRef.innerHTML = getTaskInfoDlgTpl(task);
  displayDlg();
}

function renderTaskEditDlg(task) {
  const taskEditDlgRef = document.getElementById("dlg-box");
  taskEditDlgRef.innerHTML = "";
  taskEditDlgRef.innerHTML = getTaskEditDlgTpl(task);

  displayDlg();
  contactAssign.init();
  initSubtaskInput();
  initSubtaskIconButtons();
  initSubtaskHandlers();
  fillEditFormWithTaskData(task);
}

async function renderAddTaskDlg(defaultTaskState = "to-do") {
  const addTaskDlgRef = document.getElementById("dlg-box");

  addTaskDlgRef.classList.add("dlg-add-task");
  addTaskDlgRef.innerHTML = "";
  addTaskDlgRef.innerHTML = getAddTaskDlgTpl(defaultTaskState);

  const insertElement = addTaskDlgRef.querySelector("[data-insert]");
  await InsertLoader.loadInsertByElement(insertElement);
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
  // den rest muss man dann hier noch einfügen,
  // sobald mit firebase alles klappt bezüglich der subtasks und assignet usern.
}

function getUserNameById(id) {
  const user = users.find(u => u.id === id);
  return user ? user.name : "Unknown User";
}