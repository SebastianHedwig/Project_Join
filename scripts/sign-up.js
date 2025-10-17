const nameInputRegex = /^[A-Za-zÄÖÜäöüß]+\s+[A-Za-zÄÖÜäöüß]+$/;

const nameInput = document.getElementById('name');
const nameWrapper = document.getElementById('name__wrapper');
const missmatchWarning = document.getElementById('pw-error-warning');
const pwWrapper = document.getElementById('password__wrapper');
const confirmPwWrapper = document.getElementById('confirm-pw__wrapper');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const signUpBtn = document.getElementById('sign-up-btn');
const checkbox = document.getElementById('check');
const email = document.getElementById("email");

password.addEventListener('click', setLockToNotVisible);
confirmPassword.addEventListener('click', setLockToNotVisible);

password.addEventListener('keyup', setLockIcon);
confirmPassword.addEventListener('keyup', setLockIcon);

let correctName = false;
let correctEmail = false;
let matchingPasswords = checkMatchingPasswords();
let checkboxChecked = false;

function setLockToNotVisible(event) {
    let passwordIcon = event.target.parentElement.querySelector('img');
    passwordIcon.src = '../assets/img/pw-not-visible.svg';
}

function setLockIcon(event) {
    if (event.target.value === "") {
        let passwordIcon = event.target.parentElement.querySelector('img');
        passwordIcon.src = "../assets/img/lock.svg";
    } else {
        setLockToNotVisible(event);
    }

}

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

function validateAndStyleNameInput(element) {
    let validInput = validateNameInput(element);
    if (element.value === "") {
        nameWrapper.classList.remove('error', 'valid-input');
    } else {
        toggleWrapperColor(validInput, nameWrapper);
    }
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

    console.log(isValidEmail(email));
    if (checkbox.checked &&
        validateNameInput(nameInput) &&
        checkMatchingPasswords() &&
        isValidEmail(email)
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

