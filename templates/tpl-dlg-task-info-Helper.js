
function getPriorityImg(priority) {
  switch (priority) {
    case 'urgent':
      return '../assets/img/task-priority-urgent.svg';
    case 'medium':
      return '../assets/img/task-priority-medium.svg';
    case 'low':
      return '../assets/img/task-priority-low.svg';
  }
}


  function renderAssignedUsers(contacts = []) {
  if (!Array.isArray(contacts)) contacts = [];

  const validContacts = contacts.filter(id => id && id.trim() !== "");
  if (validContacts.length === 0) {
    return /*html*/ `
      <div class="dlg__user-box"><span>No users assigned</span></div>`;
  }

  return /*html*/ `
    <div id="assigned-user-list">
      ${contacts
        .map(id => {
          const name = getUserNameById(id);
          return /*html*/ `<div class="assigned-user-entry">${name}</div>`;
        })
        .join('')}
    </div>
  `;
}

function getCheckboxImgSrc(isChecked) {
  return /*html*/ `../assets/img/${isChecked ? 'checkbox-checked.svg' : 'checkbox-unchecked.svg'}`;
}

function renderSubtasks(subtasks = {}, taskId) {
  if (!subtasks || typeof subtasks !== 'object' || Object.keys(subtasks).length === 0) {
    return /*html*/ `<span class="dlg__main__task-subtask no-subtasks">No subtasks</span>`;
  }

  const entries = Object.entries(subtasks).sort(([a],[b])=>{
    const na = parseInt(a.replace('subtask',''),10);
    const nb = parseInt(b.replace('subtask',''),10);
    return (isNaN(na)||isNaN(nb)) ? 0 : na - nb;
  });

  return entries.map(([key, st]) => {
    if (!st || !st.task) return '';
    const checked = !!st.taskChecked;

    return /*html*/ `
      <div class="dlg__main__task-subtask"
          data-subtask-key="${key}"
          data-task-id="${taskId}">

        <div class="subtask-wrapper">
          <img class="checkbox"
              src="${getCheckboxImgSrc(checked)}"
              data-checked="${checked}"
              alt="checkbox"
              onmousedown="toggleSubtaskChecked('${taskId}','${key}', this.closest('.dlg__main__task-subtask')); return false;">
          <span class="subtask-text">${st.task}</span>
        </div>

        <div class="deletebox-wrapper">
          <div class="separator"></div>
          <img class="subtask-delete-btn"
              src="../assets/img/delete.svg"
              alt="delete subtask"
              onmousedown="deleteSubtask('${taskId}','${key}', this.closest('.dlg__main__task-subtask')); return false;">
        </div>

      </div>
    `;
  }).join('');
}