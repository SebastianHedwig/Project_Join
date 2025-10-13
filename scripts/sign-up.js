function enableSignUpBtn() {
    // check all input fields for input and validity
    // check if checkbox is checked
    // remove .disabled-Class from button
}


function showSuccessfulSignUpMessage() {
    let body = document.querySelector('body');
    body.innerHTML += renderSuccessMessage();
    let successDlg = document.getElementById('dlg-box');
    successDlg.classList.remove('d-none');
    setTimeout(() => {
        successDlg.classList.remove('startposition');
    }, 10);
    moveUserBacktoLogin();
}

function moveUserBacktoLogin() {
    setTimeout(() => {
        window.location.href = '../index.html'
    }, 800);
}
