let currentUserEditId = "";

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
            currentUserEditId = key;
        }
    }
}

async function closeDlgAndSaveData(){
    removeAnimationClass();
    await saveChangesToFirebase();
    renderContactList();
}

async function saveChangesToFirebase() {
    let user = currentUserEditId;
    let multipatch = {
        "name": "Marvin Lenhart",
        "email": "testtest.neu@example.com",
        "phone": "69696969"
    };

    const response = await fetch(DB_URL + "users/" + user + ".json", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(multipatch)
    });

    const data = await response.json();
    console.log('Gespeichert:', data);
}


