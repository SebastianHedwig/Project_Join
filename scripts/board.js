
async function initBoard() {
    await getData();
    loadTasks();
    updateAllPlaceholders();
}

function renderTaskInfoDlg() {
    const taskInfoDlgRef = document.getElementById("dlg-box");
    taskInfoDlgRef.innerHTML = "";
    // hier muss erst noch ein Fetch rein
    taskInfoDlgRef.innerHTML = getTaskInfoDlgTpl();
    displayDlg();
}

function renderTaskEditDlg() {
  const taskEditDlgRef = document.getElementById("dlg-box");
  taskEditDlgRef.innerHTML = "";
  // hier muss erst noch ein Fetch rein
  taskEditDlgRef.innerHTML = getTaskEditDlgTpl();
  
  displayDlg();
  contactAssign.init();
  initSubtaskInput();
  initSubtaskIconButtons();
  initSubtaskHandlers();
}

async function renderAddTaskDlg() {
    const addTaskDlgRef = document.getElementById("dlg-box");
    addTaskDlgRef.classList.add("dlg-add-task");
    addTaskDlgRef.innerHTML = "";
    // hier muss erst noch ein Fetch rein
    addTaskDlgRef.innerHTML = getAddTaskDlgTpl();

    const insertElement = addTaskDlgRef.querySelector('[data-insert]');
    await InsertLoader.loadInsertByElement(insertElement);
    displayDlg();
}

function loadTasks() {
    
    for (let index = 0; index < tasks.length; index++) {
        document.getElementById('to-do-tasks').innerHTML += getTasksTemplate(index);
    }
}

function updateColumnPlaceholder(columnId) {
  const column = document.getElementById(columnId);
  if (!column) return;

  const hasTasks = column.querySelector('.task');

  const existingPlaceholder = column.querySelector('.no-tasks-placeholder');
  if (hasTasks && existingPlaceholder) {
    existingPlaceholder.remove();
  }

  if (!hasTasks && !existingPlaceholder) {
    column.insertAdjacentHTML('beforeend', getPlaceholderTpl());
  }
}

function updateAllPlaceholders() {
  updateColumnPlaceholder('to-do-tasks');
  updateColumnPlaceholder('in-progress-tasks');
  updateColumnPlaceholder('await-feedback-tasks');
  updateColumnPlaceholder('done-tasks');
}