function getPlaceholderTpl() {
  return /*html*/ `
      <div class="no-tasks-placeholder">No active tasks</div>
    `
}


function getBoardHeadDesktop() {
  return /*html*/ `
    <h1>Board</h1>
    <div class="task-search-and-add">
      <div class="board__head__searchbox">
        <input id="search-tasks" type="search" placeholder="Find Task">
        <img class="search-btn" src="../assets/img/search.svg" onclick="focusInput()"
              alt="icon of an magnifying glass for better descripe of the search field">
      </div>
        <span id="add-task-btn" class="add-task-btn filled-btn" onclick="renderAddTaskDlg()">Add
          Task
        <img src="../assets/img/add.svg" alt="Add Task Button">
      </span>
    </div>
        `
}

function getAddTaskBtnMobile() {
  return /*html*/ `
  <div class="board__head--mobile">
  <h1>Board</h1>
  <span id="add-task-btn" class="add-task-btn filled-btn" onclick="renderAddTaskDlg()">
        <img src="../assets/img/add.svg" alt="Add Task Button">
      </span>
  </div>
  <div class="board__head__searchbox">
        <input id="search-tasks" type="search" placeholder="Find Task">
        <img class="search-btn" src="../assets/img/search.svg" onclick="focusInput()"
              alt="icon of an magnifying glass for better descripe of the search field">
      </div>`
}

