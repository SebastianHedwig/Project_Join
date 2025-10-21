
async function initBoard() {
    await getData();
    loadTasks();
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