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

