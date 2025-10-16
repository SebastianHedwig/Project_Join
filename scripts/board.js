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