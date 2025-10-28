window.addEventListener("resize", handleResizeScreen);
window.addEventListener("load", handleResizeScreen);

let logoAdded = false;
let helpAdded = false;

function handleResizeScreen() {
    let isSmallScreen = window.innerWidth < 1025;
    handleLogo(isSmallScreen);
    handleHelp(isSmallScreen);
}

function handleLogo(isSmallScreen) {
    if (isSmallScreen && !logoAdded) {
        document.getElementById('page-title').innerHTML = getJoinLogo();
        logoAdded = true;
    } else if (!isSmallScreen && logoAdded) {
        document.getElementById('join-logo')?.remove();
        logoAdded = false;
    }
}

function handleHelp(isSmallScreen) {
    if (isSmallScreen && !helpAdded) {
        document.querySelector('.user-drop-down-menu')
            .insertAdjacentHTML('afterbegin', getLinkToHelp());
        helpAdded = true;
    } else if (!isSmallScreen && helpAdded) {
        document.getElementById('link-to-help')?.remove();
        helpAdded = false;
    }
}