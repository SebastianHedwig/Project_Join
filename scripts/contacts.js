const dialog = document.getElementById('dlg-box');
const contactList = document.querySelector('.contact-list');
const contactInfoCard = document.querySelector('.content-right__contact-info-card');
let contactName = document.getElementById('contact-name');
let contactMail = document.getElementById('contact-email');
let contactPhone = document.getElementById('contact-phone');
let contactProfilImg = document.querySelector('.header__contact-profil-img');


function getInitialLetters() {
    let initialLetters = [];
    users.forEach(user => {
        let userNameInitialLetter = user.name[0];
        initialLetters.push(userNameInitialLetter);
    })
    initialLetters.sort();
    let uniqueLetters = [...new Set(initialLetters)];
    return uniqueLetters
}

function renderInitialLettersSections(initialLettersArray) {
    let initialLetterSections = "";
    initialLettersArray.forEach(letter => {
        initialLetterSections += getUserInitialLetterSectionTpl(letter);
    })
    return initialLetterSections
}


function renderContactsIntoSections(initialLettersArray) {
    initialLettersArray.forEach(letter => {
        let section = document.querySelector(`#initial-letter__wrapper-${letter}`);
        let filteredUsers = users.filter(user => user.name[0] === letter);
        filteredUsers.forEach(user => {
            let userName = user.name;
            let email = user.email;
            let profilImgColor = user.profilImgColor;
            let userInitals = getUserNameInitials(userName);
            let userImg = getMediumUserProfilImg(profilImgColor, userInitals);
            let userHTML = getUserContactListItemTpl(userName, email, userImg);
            section.insertAdjacentHTML("beforeend", userHTML);
        })
    })
}


async function renderContactList() {
    await getData();
    contactList.innerHTML = "";
    let initialLettersArray = getInitialLetters();
    contactList.innerHTML += renderInitialLettersSections(initialLettersArray);
    renderContactsIntoSections(initialLettersArray);
    // __________________________________________________________________________________auslagern
    let contactListItems = document.querySelectorAll('.contact-list__item');

    contactListItems.forEach(item => {
        item.addEventListener('click', () => {
            contactListItems.forEach(i => {
                i.classList.remove('selected');
                i.querySelector('.contact-name').style.color = 'var(--color-black)';
                i.querySelector('circle').classList.remove('colored-circle__selected');
            });
            item.classList.add('selected');
            let contactName = item.querySelector('.contact-name');
            contactName.style.color = 'var(--color-white)';
            item.querySelector('circle').classList.add('colored-circle__selected');
        })
    })
}

function renderAddContactDlg() {
    dialog.innerHTML = getAddContactDlgTpl();
    displayDlg();
}

function renderEditContactDlg() {
    dialog.innerHTML = getEditContactDlgTpl();
    document.getElementById("contact-dlg-name-input").value = contactName.innerHTML;
    document.getElementById("contact-dlg-email-input").value = contactMail.innerHTML;
    document.getElementById("contact-dlg-phone-input").value = contactPhone.innerHTML;
    let userName = contactName.innerHTML;
    let profilImgColor = document.getElementById('colored-circle__big').getAttribute('fill');
    let userInitals = getUserNameInitials(userName);
    document.querySelector('.profil-img__wrapper').innerHTML = getBigUserProfilImg(profilImgColor, userInitals);
    displayDlg();
}

function setContactCardtoVisible() {
    contactInfoCard.classList.remove('invisible');
    contactInfoCard.style.visibility = 'visible';
}

function setContactCardtoInvisible() {
    contactInfoCard.classList.add('invisible');
}

function showContactDetailsinCard(selectedContact) {

    let contactInfo = getContactInfofromContactlistandDB(selectedContact);
    setContactInfoIntoCard(contactInfo);
    setContactCardtoVisible();
}

function getContactInfofromContactlistandDB(contactElement) {
    let userName = contactElement.querySelector('.contact-name').innerText;
    let email = contactElement.querySelector('.contact-email').innerText;
    let selectedUser = users.find(user => user.name === userName);
    let phone = selectedUser.phone;
    let profilImgColor = selectedUser.profilImgColor;
    return { userName, email, phone, profilImgColor };
}

function setContactInfoIntoCard({ userName, email, phone, profilImgColor }) {
    contactName.innerText = userName;
    contactMail.innerText = email;
    contactPhone.innerText = phone;
    let userInitals = getUserNameInitials(userName);
    contactProfilImg.innerHTML = getBigUserProfilImg(profilImgColor, userInitals);
}
