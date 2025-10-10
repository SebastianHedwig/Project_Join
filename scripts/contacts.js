const addContactDlg = document.getElementById('add-contact-dialog');
const contactListItems = document.querySelectorAll('.contact-list__item');
const contactInfoCard = document.querySelector('.content-right__contact-info-card');
let contactProfilImg = document.getElementById('contact-profil-img');
let contactName = document.getElementById('contact-name');
let contactMail = document.getElementById('contact-email');
let contactPhone = document.getElementById('contact-phone');


function openDlg() {
    addContactDlg.showModal();
    addContactDlg.style.visibility = "visible";
    
}

function closeDlg() {
    addContactDlg.close();
    addContactDlg.style.visibility = "hidden";
}

function displayAddContactDlg() {
    addContactDlg.innerHTML = renderAddContactDlg();
    openDlg();
}

function displayEditContactDlg() {
    addContactDlg.innerHTML = renderEditContactDlg();
    document.getElementById("contact-dlg-profil-img").src = contactProfilImg.src;
    document.getElementById("contact-dlg-name-input").value = contactName.innerHTML;
    document.getElementById("contact-dlg-email-input").value = contactMail.innerHTML;
    document.getElementById("contact-dlg-phone-input").value = contactPhone.innerHTML;
    openDlg();
}

function setContactCardtoVisible() {
    contactInfoCard.style.visibility = "visible";
}

function clearContactInfoCard() {
    contactProfilImg.src = "../assets/img/unknownuser.png";
    contactName.innerText = "";
    contactMail.innerText = "";
    contactPhone.innerText = "";
}

function showContactDetailsinCard(selectedContact) {
    let contactInfo = getContactInfofromContactlistandDB(selectedContact);
    clearContactInfoCard(); // vlt nicht nötig
    setContactInfoIntoCard(contactInfo);
    setContactCardtoVisible();
}

function getContactInfofromContactlistandDB(contactElement) {
    let img = contactElement.querySelector('img').src;
    let name = contactElement.querySelector('.contact-name').innerText;
    let email = contactElement.querySelector('.contact-email').innerText;
    // fetch phone form DB
    // let phone = call fetching function
    // add phone to return
    return { img, name, email };
}

function setContactInfoIntoCard({ img, name, email, phone }) {
    contactProfilImg.src = img;
    contactName.innerText = name;
    contactMail.innerText = email;
    // contactPhone.innerText = phone;
}

contactListItems.forEach(item => {
    item.addEventListener('click', (event) => showContactDetailsinCard(event.currentTarget));
});