
let chosenPriority = "medium";


async function initAddTask() {
    await getData();
    assignedTo();
}


function changePriorityBtn(priorityBtn) {
    changePriorityBtnColor(priorityBtn.id);
    changePriorityBtnIcon(priorityBtn.id);
    chosenPriority = priorityBtn.id
    console.log(chosenPriority); 
}


function changePriorityBtnColor(btn) {
    const colors = {
        urgent: '#FF3D00',
        medium: '#FFA700',
        low: '#7AE229'
    };
    ['urgent', 'medium', 'low'].forEach(btn => {
        document.getElementById(btn).style.backgroundColor = "#FFFFFF";
        document.getElementById(btn).style.color = "#000000";
    });
       const selectedBtn = document.getElementById(btn);
         selectedBtn.style.backgroundColor = colors[selectedBtn.id];
         selectedBtn.style.color = "#FFFFFF";
}

function resetPriorityButtons() {
    ['urgent', 'medium', 'low'].forEach(id => {
        const btn = document.getElementById(id);
        btn.style.backgroundColor = "#FFFFFF";
        btn.style.color = "#000000";
        btn.querySelector('img').src = btn.querySelector('img').dataset.default;
    });
    chosenPriority = "medium";
}


function changePriorityBtnIcon(btn) {
        document.querySelectorAll('.priority-options-btn img').forEach(img => {
            img.src = img.dataset.default;
        });
    const selectedBtnIcon = document.getElementById(btn).querySelector('img');
        selectedBtnIcon.src = selectedBtnIcon.dataset.selected;
}


function assignedTo() {
    let select = document.getElementById('assigned-to');
    users.forEach(u =>{
        let opt = document.createElement('option');
        opt.value = u.id;
        opt.textContent= `${u.name}`;
        select.appendChild(opt);
    });
}


window.handleCreateTask = function handleCreateTask(event) {
  event.preventDefault(); // Browser-Reload verhindern

  const form = event.target;

  // Prüft alle required-Felder (title, due-date, category)
  if (!form.checkValidity()) {
    form.reportValidity(); // Zeigt native Fehlermeldungen an
    return;
  }

  createTask();
  form.reset();
  resetPriorityButtons();
  alert('You added a new task!');
}


async function createTask() {

    let newTask = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        dueDate: document.getElementById('due-date').value,
        assignedContacts: getSelectedUserIds(),
        category: getSelectedCategoryText(),
        subtasks: buildSubtasksObject(),
        priority: chosenPriority,
        taskState: 'toDo'
    };
    const key = await getNextTaskKey();
    await saveTaskToFirebase(newTask, key);
    window.location.reload();
    console.log(tasks);
}

function getSelectedUserIds(selectId = 'assigned-to') {
  return Array.from(document.getElementById(selectId).selectedOptions).map(o => o.value);
}

function getSelectedCategoryText(selId = 'category') {
  const el = document.getElementById(selId);
  return el.options[el.selectedIndex].text;
}

function buildSubtasksObject(inputId = 'subtasks') {
  const inputValue = document.getElementById(inputId).value;
  const arr = inputValue.split(',').map(t => t.trim()).filter(Boolean);
  return Object.fromEntries(arr.map((task, i) => [
    `subtask${i}`, { task, taskChecked: false }
  ]));
}


function clearTask() {
  const form = document.getElementById('task-form');
  form.reset();
  resetPriorityButtons();
}