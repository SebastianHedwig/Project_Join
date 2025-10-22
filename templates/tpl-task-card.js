function getTasksTemplate(task) {
  return /*html*/ `
    <div class="task" draggable="true" ondragstart="startDragging('${task.id}')" onclick='renderTaskInfoDlg(${JSON.stringify(task)})'>
      <span class="task__category">${task.category}</span>
      <div class="task__content-metadata-box">
        <span class="task__title">${task.title}</span>
        <span class="task__description">${task.description}</span>
      </div>
      <div class="task__subtasks-and-progressbar-box">
        <span class="task__progressbar" style="--progress: 33.3333%;"></span>
        <span class="task__subtasks">1 / 3 Subtasks</span>
      </div>
      <div class="task__assignment-and-priority-box">
        <div class="task__assignments">
          <!-- user images nur zur Veranschaulichung -->
          <img class="user-img" src="../assets/img/user-img-anna.svg" alt="User Image or initials">
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
            alt="${task.priority} priority icon"
          >
        </div>
      </div>
    </div>
  `;
}
