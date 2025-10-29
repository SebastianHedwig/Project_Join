const dialog = document.getElementById('dlg-box');
const contactList = document.querySelector('.contact-list');
const contactInfoCard = document.querySelector('.content-right__contact-info-card');
let contactName = document.getElementById('contact-name');
let contactMail = document.getElementById('contact-email');
let contactPhone = document.getElementById('contact-phone');
let contactProfilImg = document.querySelector('.header__contact-profil-img');
let showContact = false;
let userArrayGlobal = [];

window.addEventListener("resize", handleResizeScreen);
window.addEventListener("load", handleResizeScreen);

async function getDatafromFirebase() {
    try {
        let response = await fetch(DB_URL + "users/" + ".json");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let data = await response.json();
        let userArray = Object.values(data);
        userArrayGlobal = userArray;
        rawData = data;
        return userArray
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

async function deleteUser(userkeyToDelete) {
    try {
        const response = await fetch(DB_URL + "users/" + userkeyToDelete + ".json", {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Fehler beim Löschen: ${response.status}`);
        }
        console.log("User erfolgreich gelöscht!");
    } catch (error) {
        console.error(error);
    }
}

async function deleteUserFromDB() {
    getAndStoreUserId(contactName.innerText);
    await deleteUser(STORED_USER_KEY);
    renderContactList();
    setContactCardtoInvisible();
}

function getInitialLetters(array) {
    let initialLetters = [];
    for (let index = 0; index < array.length; index++) {
        let userNameInitialLetter = array[index].name[0];
        initialLetters.push(userNameInitialLetter);
    }
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


function renderContactsIntoSections(initialLettersArray, userArray) {
    initialLettersArray.forEach(letter => {
        let section = document.querySelector(`#initial-letter__wrapper-${letter}`);
        let filteredUsers = userArray.filter(user => user.name[0] === letter);
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
    let userArray = await getDatafromFirebase();
    contactList.innerHTML = "";
    let initialLettersArray = getInitialLetters(userArray);
    contactList.innerHTML += renderInitialLettersSections(initialLettersArray);
    renderContactsIntoSections(initialLettersArray, userArray);
    setEventlistenerEveryContact();
}

function setEventlistenerEveryContact() {
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
    console.log(userArrayGlobal);

    let userName = contactElement.querySelector('.contact-name').innerText;
    let email = contactElement.querySelector('.contact-email').innerText;
    let selectedUser = userArrayGlobal.find(user => user.name === userName);
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

function handleResizeScreen() {
    let isSmallScreen = window.innerWidth < 1025;
    handleContent(isSmallScreen);
}

function handleContent(isSmallScreen) {
    if (isSmallScreen && !showContact) {
        document.querySelector('.content-left').style.display = 'flex';
        document.querySelector('.content-right').style.display = 'none';
        showAddUserIconMoblie();
        showContact = false;
    } else if (isSmallScreen && showContact) {
        document.querySelector('.content-left').style.display = 'none';
        document.querySelector('.content-right').style.display = 'flex';
        showContact = true;
    } else {
        document.querySelector('.content-right').style.display = 'flex';
        document.querySelector('.content-left').style.display = 'flex';
    }
}

function showContactMobile() {
    if (window.innerWidth < 1025) {
        document.querySelector('.content-left').style.display = 'none';
        document.querySelector('.content-right').style.display = 'flex';
        document.querySelector('.add-user-icon').style.display = 'none';
        document.querySelector('.contacts-options-icon').style.display = 'flex';
        showContact = true;
    }

}

function showAddUserIconMoblie() {
    document.querySelector('.add-user-icon').style.display = 'flex';
}