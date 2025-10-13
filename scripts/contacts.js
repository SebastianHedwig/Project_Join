const dialog = document.getElementById('dlg-box');
const contactList = document.querySelector('.contact-list');
const contactInfoCard = document.querySelector('.content-right__contact-info-card');
let contactName = document.getElementById('contact-name');
let contactMail = document.getElementById('contact-email');
let contactPhone = document.getElementById('contact-phone');
let contactProfilImg = document.querySelector('header__contact-profil-img');


async function renderContactList(){
    await getData();
    contactList.innerHTML = "";
    let list = "";
    for (let index = 2; index < users.length; index++) {
        let user = users[index];
        let username = user.name;
        let email = user.email;
        let profilImgColor = user.profilImgColor;
        list += getUserContactListItemTpl(username, email, profilImgColor);
    }
    contactList.innerHTML = list;
}

function renderAddContactDlg() {
    dialog.innerHTML = getAddContactDlgTpl();
    displayDlg();
}

function renderEditContactDlg() {
    dialog.innerHTML = getEditContactDlgTpl();
    document.getElementById("contact-dlg-profil-img").src = contactProfilImg.src;
    document.getElementById("contact-dlg-name-input").value = contactName.innerHTML;
    document.getElementById("contact-dlg-email-input").value = contactMail.innerHTML;
    document.getElementById("contact-dlg-phone-input").value = contactPhone.innerHTML;
    displayDlg();
}

function setContactCardtoVisible() {
    contactInfoCard.style.visibility = "visible";
}

function setContactCardtoInvisible() {
    contactInfoCard.style.visibility = "hidden";
}

function showContactDetailsinCard(selectedContact) {
    let contactInfo = getContactInfofromContactlistandDB(selectedContact);
    setContactInfoIntoCard(contactInfo);
    setContactCardtoVisible();
}

function getContactInfofromContactlistandDB(contactElement) {
    let name = contactElement.querySelector('.contact-name').innerText;
    let email = contactElement.querySelector('.contact-email').innerText;
    let selectedUser = users.find(user => user.name === name);
    let phone = selectedUser.phone;
    let profilImgColor = selectedUser.profilImgColor;
    return {name, email, phone, profilImgColor};
}

function setContactInfoIntoCard({name, email, phone, profilImgColor}) {
    contactProfilImg.innerHTML = getBigUserProfilImg();
    contactName.innerText = name;
    contactMail.innerText = email;
    contactPhone.innerText = phone;
    document.getElementById('user-initials').textContent = getUserNameInitials(name);
    document.getElementById('colored-circle').setAttribute('fill', profilImgColor)
}

function getUserNameInitials(userName) {
    return userName
        .split(' ')                 
        .filter(Boolean)            
        .map(word => word[0].toUpperCase()) 
        .join('');                  
}

function insertUserProfilImg(element) {
    document.querySelector('.contact-info-card__header').innerHTML += getUserProfilImg();
}
