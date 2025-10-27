const email = document.getElementById('email');
const emailWrapper = document.getElementById('email__wrapper');
const password = document.getElementById('password');
const passwordWrapper = document.getElementById('password__wrapper');
const errorMsg = document.getElementById('pw-error-warning');
const passwordIcon = document.getElementById('password-icon');
const logo = document.getElementById('joinlogo');
const headerSignup = document.querySelector('.header__signup');
const main = document.querySelector('main');
let rawData;
email.addEventListener('keyup', clearLoginError());
password.addEventListener('keyup', () => {
    clearLoginError();
    updatePasswordLockIcon();
});

window.addEventListener('load', () => {
    setTimeout(() => {
        main.classList.remove('invisible');
        headerSignup.classList.remove('invisible');
    }, 600);
    setTimeout(() => {
        logo.classList.remove('start');
    }, 200);
});

async function fetchData() {
    try {
        const response = await fetch(DB_URL + "users/" + ".json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        rawData = await response.json();
        return rawData
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return null;
    }
}

async function attemptLogin() {
    let data = await fetchData();
    let dataArray = Object.values(data)
    let existingUser = dataArray.find(user => user.email === email.value);
    if (existingUser == undefined) {
        showLoginError();
    }
    else {
        verifyPassword(existingUser);
        getAndStoreUserId(existingUser.name);
        let multipatch = {
            "loggedIn": true,
        };
        saveChangesToDB(multipatch);
        window.location.href = "./pages/summary.html"
    }
}

async function verifyPassword(existingUser) {
    if (existingUser.password !== password.value) {
        showLoginError();
    }
}

function showLoginError() {
    errorMsg.style.visibility = "visible";
    emailWrapper.classList.add('error');
    passwordWrapper.classList.add('error');
}

function clearLoginError() {
    errorMsg.style.visibility = "hidden";
    emailWrapper.classList.remove('error');
    passwordWrapper.classList.remove('error');
}

function togglePasswordVisibility() {
    password.type = password.type === 'password' ? 'text' : 'password';
    togglePasswordIcon();
}

function updatePasswordLockIcon() {
    if (password.value === "") {
        passwordIcon.src = "../assets/img/lock.svg";
    } else {
        togglePasswordIcon();
    }
}

function togglePasswordIcon() {
    if (password.type === 'password') {
        passwordIcon.src = '../assets/img/pw-not-visible.svg';
    }
    else {
        passwordIcon.src = '../assets/img/pw-visible.svg';
    }
}