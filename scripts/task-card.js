function getCheckedSubtaskCount(task) {
  if (!task?.subtasks || typeof task.subtasks !== 'object') return 0;
  return Object.values(task.subtasks).filter(st => st && st.taskChecked === true).length;
}

function getTotalSubtaskCount(task) {
  if (!task?.subtasks || typeof task.subtasks !== 'object') return 0;
  return Object.keys(task.subtasks).length;
}

function getSubtaskProgressPercent(task) {
  const total = getTotalSubtaskCount(task);
  const checked = getCheckedSubtaskCount(task);
  if (total === 0) return 0;
  return (checked / total) * 100;
}

