const nameInputRegex = /^[A-ZÄÖÜ][a-zäöüß]{1,}(?:[-'][A-ZÄÖÜ][a-zäöüß]+)?\s[A-ZÄÖÜ][a-zäöüß]{2,}(?:[-'][A-ZÄÖÜ][a-zäöüß]+)?$/;

let nameInput = document.getElementById('name');
let nameWrapper = document.getElementById('name__wrapper');
let missmatchWarning = document.getElementById('pw-error-warning');
let pwWrapper = document.getElementById('password__wrapper');
let confirmPwWrapper = document.getElementById('confirm-pw__wrapper');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm-password');
let signUpBtn = document.getElementById('sign-up-btn');
let checkbox = document.getElementById('check');

function detectChange(element) {
    if (confirmPassword.value !== "") {
        checkMatchingPasswords();
    }
}

function validateNameInput(element) {
    let inputName = element.value;
    let test = nameInputRegex.test(inputName);
    return test
}

function validateAndStyleInput(element) {
    let validInput = validateNameInput(element);
    if (element.value === "") {
        nameWrapper.classList.remove('error', 'valid-input')
    } else { toggleWrapperColor(validInput, nameWrapper) }
}

function toggleWrapperColor(validInput, elementById) {
    elementById.classList.toggle('error', !validInput);
    elementById.classList.toggle('valid-input', validInput);
}

function checkMatchingPasswords() {
    if (confirmPassword.value === "") {
        setPwInputsBack();
        return false
    } else if (password.value === confirmPassword.value) {
        setPwInputstoSuccess();
        return true
    }
    else {
        setPwInputstoError();
        return false
    }
}

function setPwInputsBack() {
    missmatchWarning.style.visibility = "hidden";
    pwWrapper.classList.remove('valid-input', 'error');
    confirmPwWrapper.classList.remove('valid-input', 'error');
}

function setPwInputstoSuccess() {
    missmatchWarning.style.visibility = "hidden";
    pwWrapper.classList.add('valid-input');
    confirmPwWrapper.classList.add('valid-input');
}

function setPwInputstoError() {
    missmatchWarning.style.visibility = "visible";
    pwWrapper.classList.remove('valid-input');
    confirmPwWrapper.classList.remove('valid-input');
    confirmPwWrapper.classList.add('error');
}

function enableSignUpBtn() {
    signUpBtn.setAttribute('aria-disabled', 'false');
    signUpBtn.classList.remove('disabled');
}

function disableSignUpBtn() {
    signUpBtn.setAttribute('aria-disabled', 'true');
    signUpBtn.classList.add('disabled');
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

function checkIfEverythingIsFilledIn() {
    // funktioniert bisher nur wenn checkbox als letztes gedrückt wird ---------------------

    if (checkbox.checked &&
        validateNameInput(nameInput) &&
        checkMatchingPasswords() &&
        document.getElementById("valid-email").style.border == "1px solid var(--color-success)"
    ) { enableSignUpBtn() } else { disableSignUpBtn() }
}

function setPasswordVisibility(clickedElement) {
    let wrapper = clickedElement.parentElement;
    let passwordInput = wrapper.querySelector('input');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    clickedElement.src =
        passwordInput.type === 'password'
            ? '../assets/img/pw-not-visible.svg'
            : '../assets/img/pw-visible.svg';
}

