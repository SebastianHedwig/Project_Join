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
          const imgColour = getUserPicById(id);
          const userInitials = getUserInitialsById(id);
          return `<div class="task__assignments">
                      <div class="task__assignments-circle" style="background-color : ${imgColour}">${userInitials}</div>
                      <div class="assigned-user-entry">${name}</div>
                  </div>`;
        })  
        .join('')}
    </div>
  `;
}

function renderSubtasks(subtasks = []) {
  if (!Array.isArray(subtasks) || subtasks.length === 0) {
    return /*html*/ '<span class="dlg__main__task-subtask">No subtasks</span>';
  }

  return subtasks.map(sub => /*html*/ `
    <span class="dlg__main__task-subtask">
      <img src="../assets/img/checkbox-${sub.done ? 'checked' : 'unchecked'}.svg" alt="checkbox">
      ${sub.text}
    </span>
  `).join('');
}
