
async function init() {
    await getData();
    assignedTo();
    setMinDueDate()
}


function changePriorityBtn(priorityBtn) {
    changePriorityBtnColor(priorityBtn.id);
    changePriorityBtnIcon(priorityBtn.id);  
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


function changePriorityBtnIcon(btn) {
        document.querySelectorAll('.priority-options-btn img').forEach(img => {
            img.src = img.dataset.default;
        });
    const selectedBtnIcon = document.getElementById(btn).querySelector('img');
        selectedBtnIcon.src = selectedBtnIcon.dataset.selected;
}


function setMinDueDate() {
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('due-date').setAttribute('min', today);
};

function assignedTo() {
    let select = document.getElementById('assigned-to');

    users.forEach(u =>{
        let opt = document.createElement('option');
        opt.value = u.id;
        opt.textContent= `${u.firstName} ${u.lastName}`;
        select.appendChild(opt);
    });
}


function createTask() {
    let newTask = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
    };
    tasks.push(newTask);
    console.log(tasks);
    
}