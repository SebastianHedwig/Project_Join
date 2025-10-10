function enableSignUpBtn(){
// check all input fields for input and validity
// check if checkbox is checked
// remove .disabled-Class from button
}


function showSuccessfulSignUpMessage() {
    const body = document.querySelector('body');
    body.innerHTML += renderSuccessMessage();
    const successDlg = document.getElementById('success-dialog');
    successDlg.showModal();
    moveUserBacktoLogin();
}

function moveUserBacktoLogin() {
    setTimeout(() => {
        window.location.href = '../index.html'
    }, 800);
}
