function changePriorityBtn(priorityBtn) {
    changePriorityBtnColor(priorityBtn.id);
    changePriorityBtnIcon(priorityBtn.id);
}


function changePriorityBtnColor(btn) {
    const colors = {
        urgent: '#FF3D00',
        medium: '#FFA800',
        low: '#7AE229'
    };
    ['urgent', 'medium', 'low'].forEach(id => {
        document.getElementById(id).style.backgroundColor = "#FFFFFF";
        document.getElementById(id).style.color = "#000000";
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