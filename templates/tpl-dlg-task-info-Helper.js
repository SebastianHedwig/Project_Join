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
  if (!Array.isArray(contacts) || contacts.length === 0) {
    return /*html*/ '<div class="dlg__user-box"><span class="dlg__user-name">No users assigned</span></div>';
  }

  return contacts.map(userId => /*html*/ `
    <div class="dlg__user-box">
      <img class="dlg__user-img" src="../assets/img/user-img-${userId}.svg" alt="User ${userId}">
      <span class="dlg__user-name">${userId}</span>
    </div>
  `).join('');
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
