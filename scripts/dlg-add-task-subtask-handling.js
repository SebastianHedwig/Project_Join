
function initSubtaskInput() {
  const subtaskInputRef = document.getElementById('subtask-input');
  const subtaskListRef = document.querySelector('.dlg-edit__subtask-list');

  if (!subtaskInputRef || !subtaskListRef) return;

  subtaskInputRef.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && subtaskInputRef.value.trim() !== '') {
      event.preventDefault();
      const subtaskHTML = getSubtaskTpl(subtaskInputRef.value.trim());
      subtaskListRef.insertAdjacentHTML('beforeend', subtaskHTML);
      subtaskInputRef.value = '';
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      subtaskInputRef.value = '';
      subtaskInputRef.blur();
    }
  });
}

function initSubtaskHandlers() {
  const subtaskListRef = document.querySelector('.dlg-edit__subtask-list');
  if (!subtaskListRef) return;

  subtaskListRef.addEventListener('click', (event) => {
    const listItem = event.target.closest('.dlg-edit__main__subtask.edit-mode');
    if (listItem) {
      const input = listItem.querySelector('.edit-input');
      if (input) {
        input.focus();
        input.select();
      }
    }

    handleSubtaskEdit(event);
    handleSubtaskConfirm(event);
    handleSubtaskDelete(event);

  });
}

function initSubtaskIconButtons() {
  const subtaskInputRef = document.getElementById('subtask-input');
  const confirmRef = document.querySelector('.subtask-input__confirm-img');
  const cancelRef = document.querySelector('.subtask-input__cancel-img');
  const subtaskListRef = document.querySelector('.dlg-edit__subtask-list');

  if (confirmRef) {
    confirmRef.addEventListener('mousedown', (event) => {
      event.preventDefault();
      if (subtaskInputRef.value.trim() !== '') {
        const subtaskHTML = getSubtaskTpl(subtaskInputRef.value.trim());
        subtaskListRef.insertAdjacentHTML('beforeend', subtaskHTML);
        subtaskInputRef.value = '';
        subtaskInputRef.focus();
      }
    });
  }

  if (cancelRef) {
    cancelRef.addEventListener('mousedown', (event) => {
      event.preventDefault();
      subtaskInputRef.value = '';
      subtaskInputRef.focus();
    });
  }

  subtaskInputRef.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      subtaskInputRef.value = '';
    }
  });
}

function handleSubtaskEdit(event) {
  const target = event?.target;
  if (!target) return;

  if (target.classList.contains('subtask-edit-box__delete-img')) return;

  const listItem = target.closest('li');
  if (!listItem || listItem.classList.contains('edit-mode')) return;

  const isEditTrigger =
    target.classList.contains('subtask-edit-box__edit-img') ||
    target.closest('.dlg-edit__main__subtask');

  if (!isEditTrigger) return;

  const textNode = Array.from(listItem.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
  const currentText = textNode?.nodeValue?.replace('•', '').trim() || '';

  const newHTML = getEditSubtaskTpl(currentText);
  listItem.insertAdjacentHTML('afterend', newHTML);
  listItem.remove();

  const subtaskList = document.querySelector('.dlg-edit__subtask-list');
  const newListItem = subtaskList.querySelector('li:last-child');
  const input = newListItem.querySelector('input');

  if (input) {
    input.focus();
    input.select();

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        newListItem.remove();
        const originalHTML = getSubtaskTpl(currentText);
        subtaskList.insertAdjacentHTML('beforeend', originalHTML);
      }
    });
  }
}

function handleSubtaskDelete(event) {
  const deleteBtn = event.target.closest('.subtask-edit-box__delete-img');
  if (!deleteBtn) return;

  const listItem = deleteBtn.closest('li');
  if (listItem) listItem.remove();
}

function handleSubtaskConfirm(event) {
  const target = event.target;
  if (!target.classList.contains('subtask-edit-box__confirm-img')) return;

  const listItem = target.closest('li');
  if (!listItem) return;

  const input = listItem.querySelector('input');
  if (!input) return;

  const newText = input.value.trim();
  if (!newText) return;

  const newHTML = getSubtaskTpl(newText);

  listItem.insertAdjacentHTML('afterend', newHTML);
  listItem.remove();
}

function collectSubtasksFromEditDialog() {
  const list = document.querySelector('.dlg-edit__subtask-list');
  if (!list) return {};

  const items = Array.from(list.querySelectorAll('li')).filter(li => !li.classList.contains('edit-mode'));

  const subtasksObj = {};
  items.forEach((li, index) => {

    let text = '';
    const textNode = Array.from(li.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode && textNode.nodeValue) {
      text = textNode.nodeValue.replace('•', '').trim();
    } else {
      text = (li.textContent || '').replace('•', '').trim();
    }

    if (text) {
      subtasksObj[`subtask${index}`] = {
        task: text,
        taskChecked: false
      };
    }
  });

  return subtasksObj;
}