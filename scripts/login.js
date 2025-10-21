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

let DB_URL = 'https://join-25a0e-default-rtdb.europe-west1.firebasedatabase.app/users/.json';

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

async function makeallthis() {
    let email = document.getElementById('email');
    // let password = document.getElementById('password');
    let data = await getDataFromDB();
    let obj = data.find(o => o.email === email);

    console.log(obj);
}