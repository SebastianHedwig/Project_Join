const DB_URL = 'https://join-25a0e-default-rtdb.europe-west1.firebasedatabase.app/users/.json';
const email = document.getElementById('email');
const emailWrapper = document.getElementById('email__wrapper');
const password = document.getElementById('password');
const passwordWrapper = document.getElementById('password__wrapper');
const errorMsg = document.getElementById('pw-error-warning');
const passwordIcon = document.getElementById('password-icon');

email.addEventListener('keyup', resetInputsBorders);
password.addEventListener('keyup', () => {
    resetInputsBorders();
    setPasswordLockIcon();
});


window.addEventListener('load', () => {
    const logo = document.getElementById('joinlogo');
    const headerSignup = document.querySelector('.header__signup');
    const main = document.querySelector('main');
    setTimeout(() => {
        main.classList.remove('invisible');
        headerSignup.classList.remove('invisible');
    }, 600);
    setTimeout(() => {
        logo.classList.remove('start');
    }, 200);
});

async function getDataFromDB() {
    try {
        const response = await fetch(DB_URL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

async function validateLoginData() {
    let data = await getDataFromDB();
    let dataArray = Object.values(data)
    let existingUser = dataArray.find(user => user.email === email.value);
    if (existingUser == undefined) {
        setInputsToError();
    }
    else {
        checkPassword(existingUser)
    }
}



function checkPassword(existingUser) {
    if (existingUser.password === password.value) {
        window.location.href = "./pages/summary.html"
    } else {
        setInputsToError();
    }
}

function setInputsToError() {
    errorMsg.style.visibility = "visible";
    emailWrapper.classList.add('error');
    passwordWrapper.classList.add('error');
}

function resetInputsBorders() {
    errorMsg.style.visibility = "hidden";
    emailWrapper.classList.remove('error');
    passwordWrapper.classList.remove('error');
}

function togglePasswordIcon() {
    if (password.type === 'password') {
        passwordIcon.src = '../assets/img/pw-not-visible.svg';
    }
    else {
        passwordIcon.src = '../assets/img/pw-visible.svg';
    }
}

function changeInputType() {
    password.type = password.type === 'password' ? 'text' : 'password';
    togglePasswordIcon();
}

function setPasswordLockIcon() {
    if (password.value === "") {
        passwordIcon.src = "../assets/img/lock.svg";
    } else {
        togglePasswordIcon();
    }
}