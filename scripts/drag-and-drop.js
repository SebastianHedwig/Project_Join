let draggedTaskId = null;

let placeholder = document.createElement('div');
placeholder.className = "task task--placeholder"; 


function startDragging(id) {
    draggedTaskId = id;

    const taskCard = document.querySelector(`[onclick="renderTaskInfoDlg('${id}')"]`);
    if (taskCard) {
        taskCard.classList.add('dragging');

        const placeholderSize = taskCard.getBoundingClientRect();
        placeholder.style.height = `${placeholderSize.height}px`;
        placeholder.style.width = '100%';
    }
}

function stopDragging() {
    const taskCard = document.querySelector('.task.dragging');
    if (taskCard) {
        taskCard.classList.remove('dragging');
    }

    if (placeholder && placeholder.isConnected) {
        placeholder.remove();
    }

    draggedTaskId = null;
}

function allowDrop(event) {
    event.preventDefault();
    const col = event.currentTarget;
    if (!col.contains(placeholder)) {
        col.appendChild(placeholder);
    }
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
    stopDragging();
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

async function updateTaskStateInFirebase(taskId, newTaskState) {
    const url = `https://join-25a0e-default-rtdb.europe-west1.firebasedatabase.app/tasks/${taskId}.json`;

    await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskState: newTaskState }),
    });
}
