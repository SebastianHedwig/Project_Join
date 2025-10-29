function getTasksTemplate(task) {
  // Progress berechnen
  const totalSubtasks  = getTotalSubtaskCount(task);
  const doneSubtasks   = getCheckedSubtaskCount(task);
  const percent        = getSubtaskProgressPercent(task);

  const hasSubtasks = totalSubtasks > 0;
  const progressHtml = hasSubtasks
    ? getProgressbarAndTaskInfoTpl(percent, doneSubtasks, totalSubtasks)
    : '';

  // Assigned Users (alle anzeigen). Unterstützt Array oder Objekt.
  const assignedContactsArr = Array.isArray(task.assignedContacts)
    ? task.assignedContacts
    : (task.assignedContacts && typeof task.assignedContacts === 'object'
        ? Object.values(task.assignedContacts).filter(Boolean)
        : []);

  const assignedUsersHtml = assignedContactsArr
    .map(id => {
      const u = users.find(x => x.id === id);
      return u ? getAssignedUserInCardTpl(u) : '';
    })
    .join('');

  // Kategorie-Klassen
  const categoryMap = {
    userStory: 'task__category',
    technicalTask: 'task__category2'
  };
  const categoryClass = categoryMap[task.category] || 'task__category';

  // Template
  return /*html*/ `
    <div class="task" draggable="true"
         ondragstart="startDragging('${task.id}')"
         onclick="renderTaskInfoDlg('${task.id}')">

      <span class="${categoryClass}">${formatCategory(task.category)}</span>

      <div class="task__content-metadata-box">
        <span class="task__title">${task.title || ''}</span>
        <span class="task__description">${task.description || ''}</span>
      </div>

      <div class="task__subtasks-and-progressbar-box">
        ${progressHtml}
      </div>

      <div class="task__assignment-and-priority-box">
        <div class="task__assignments">
          ${assignedUsersHtml}
        </div>
        <div class="task__priority">
          <img 
            src="${
              task.priority === 'urgent'
                ? '../assets/img/priority-urgent.svg'
                : task.priority === 'medium'
                ? '../assets/img/priority-medium.svg'
                : '../assets/img/priority-low.svg'
            }"
            alt="${task.priority} priority icon">
        </div>
      </div>
    </div>
  `;
}



// MUSS NOCH REFACTORED WERDEN