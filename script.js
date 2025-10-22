function displayDlg() {
    const dlg = document.getElementById('dlg-box');
    const overlay = document.getElementById('overlay');
    dlg.classList.remove('d-none');
    overlay.classList.remove('d-none');
}

function hideDlg() {
    const dlg = document.getElementById('dlg-box');
    dlg.classList.add('d-none');
    dlg.classList.remove('dlg-add-task');
    document.getElementById('overlay').classList.add('d-none');
}

function getUserNameInitials(userName) {
    return userName
        .split(' ')
        .filter(Boolean)
        .map(word => word[0].toUpperCase())
        .join('');
}

function setMinDueDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('due-date').setAttribute('min', today);
};