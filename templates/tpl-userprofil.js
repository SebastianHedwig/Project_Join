// How it works:
// cx and cy define the circle’s center.
// The text’s x and y match those coordinates.
// text-anchor="middle" centers horizontally.
// dominant-baseline="middle" centers vertically.

function getBigUserProfilImg() {
    return /*html*/ `
    <svg width="120" height="120">
        <circle id="colored-circle" cx="60" cy="60" r="60" fill="lightblue" stroke="var(--color-white)" stroke-width="2" />
        <text id="user-initials" x="60" y="65" text-anchor="middle" dominant-baseline="middle" font-size="47" font-weight="500" fill="var(--color-white)">
            AM
        </text>
    </svg>
    `
}

function getSmallUserProfilImg(profilImgColor) {
    return /*html*/ `
    <svg width="42" height="42">
        <circle id="colored-circle" cx="21" cy="21" r="21" fill="${profilImgColor}" stroke="var(--color-white)" stroke-width="2" />
        <text id="user-initials" x="21" y="22" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="var(--color-white)">
            AM
        </text>
    </svg>
    `
}


function getUserInitialLetterSortingTpl() {
        return /*html*/ `
    <div>
        <p class="contact-list__initial-letter">M</p>
    </div>
    `
}

function getUserContactListItemTpl(username, email, profilImgColor) {
    let userImg = getSmallUserProfilImg(profilImgColor);
    return /*html*/ `
    <div class="contact-list__item" onclick="showContactDetailsinCard(event.currentTarget)">
        <div id="user-profil-img__wrapper">${userImg}
        </div>
            <div>
                <p class="contact-name">${username}</p>
                <p class="contact-email">${email}</p>
            </div>
    </div>
    `
    
}


