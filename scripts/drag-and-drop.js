let draggedTaskId = null;


function startDragging(id) {
    draggedTaskId = id;
}

function allowDrop(event) {
    event.preventDefault();
}

async function moveTo(event) {
    event.preventDefault();
    
    if (!draggedTaskId) return;

    const targetColumn = event.currentTarget.id;
    const newTaskState = mapColumnIdToTaskState(targetColumn);
    if (!newTaskState) return;

    await updateTaskStateInFirebase(draggedTaskId, newTaskState);
    await getData();
    loadTasks();
    updateAllPlaceholders();
}

function mapColumnIdToTaskState(columnId) {
    const map = {
        'to-do-tasks': 'to-do',
        'in-progress-tasks': 'in-progress',
        'await-feedback-tasks': 'await-feedback',
        'done-tasks': 'done'
    };
    return map[columnId];
}

async function updateTaskStateInFirebase(taskId, newState) {
    const url = `https://join-25a0e-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`;

    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskState: newState }),
    });
}
