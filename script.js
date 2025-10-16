function displayDlg() {
    document.getElementById('dlg-box').classList.remove('d-none');
}

function hideDlg() {
    document.getElementById('dlg-box').classList.add('d-none');
}

function getUserNameInitials(userName) {
    // feature noch einbauen: nur erstes und letztes wort wählen
    return userName
        .split(' ')
        .filter(Boolean)
        .map(word => word[0].toUpperCase())
        .join('');
}

