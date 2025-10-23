let storedUserKey = "";

function renderAddContactDlg() {
    dialog.innerHTML = getAddContactDlgTpl();
    showDlgWtihAnimation()
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
    showDlgWtihAnimation();
    getAndStoreUserId(userName);
}

function showDlgWtihAnimation() {
    displayDlg();
    setTimeout(() => {
        dialog.classList.add('show');
    }, 100);
}

function removeAnimationClass() {
    dialog.classList.remove('show');
    setTimeout(() => {
        hideDlg();
    }, 300);
}

function getAndStoreUserId(userName) {
    for (const key in rawData) {
        if (rawData[key].name === userName) {
            storedUserKey = key;
        }
    }
}

async function saveChangesToDB(multipatch) {
    let user = storedUserKey;
    let response = await fetch(DB_URL + "users/" + user + ".json", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(multipatch)
    });
    let data = await response.json();
    console.log('Gespeichert:', data);
}

function setMultipatch() {
    let nameValue = document.getElementById("contact-dlg-name-input").value;
    let emailValue = document.getElementById("contact-dlg-email-input").value;
    let phoneValue = document.getElementById("contact-dlg-phone-input").value;
    let multipatch = {
        "name": nameValue,
        "email": emailValue,
        "phone": phoneValue
    };
    return multipatch
}

async function closeDlgAndSaveData() {
    removeAnimationClass();
    let multipatch = setMultipatch();
    await saveChangesToDB(multipatch);
    renderContactList();
    setContactCardtoInvisible();
}

async function putNewContactToDB() {
    let addUserName = document.getElementById('contact-dlg-name-input').value;
    let addEmail = document.getElementById('contact-dlg-email-input').value;
    let addPhone = document.getElementById('contact-dlg-phone-input').value;
    let key = generateUserId(addUserName);
    let data = createDataObjectAddContact(addUserName, addEmail, addPhone);
    await pushDataToDB(key, data);
    removeAnimationClass();
    renderContactList();
    setContactCardtoInvisible();
}

function createDataObjectAddContact(addUserName, addEmail, addPhone) {
    let modifiedUserName = capitalizeInitials(addUserName)
    let color = getRandomColor();
    let data = {
        name: modifiedUserName,
        email: addEmail,
        password: "",
        phone: addPhone,
        profilImgColor: color,
        loggedIn: false,
    }
    return data
}


