function enableSignUpBtn(){
// check all input fields for input and validity
// check if checkbox is checked
// remove .disabled-Class from button
}


function showSuccessfulSignUpMessage() {
    let body = document.querySelector('body');
    body.innerHTML += renderSuccessMessage();
    let successDlg = document.getElementById('success-message');
    successDlg.showModal();
    successDlg.classList.remove('startposition');
    moveUserBacktoLogin();
}

function moveUserBacktoLogin() {
    setTimeout(() => {
        window.location.href = '../index.html'
    }, 800);
}
