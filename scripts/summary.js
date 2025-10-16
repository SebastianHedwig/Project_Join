
async function init() {
   await getData();
    greetings();
    currentDate();
}


function greetings() {
    greetingHeader();
    greetingName();
}


function greetingName() {
   let greetingName = document.getElementById('greeting-name');
   greetingName.innerHTML = "";
   if (users.length > 0) {
    let userName = users[0]
    greetingName.innerHTML = `${userName.name}` 
   }
}


function greetingHeader() {
    let greetingHeader = document.getElementById('greeting-header');
    
    let hour = new Date().getHours();
    let greetingText = "";
    if (hour < 12) {
        greetingText = "Good morning,"
    } else if (hour < 18) {
        greetingText = "Good afternoon,"
    } else {
        greetingText = "Good evening,"
    }
    greetingHeader.textContent = greetingText;
}


function currentDate() {
    const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    let date = document.getElementById('current-date');
    let currentDate = new Date();
        let day = currentDate.getDate();
        let month = months[currentDate.getMonth()];
        let year = currentDate.getFullYear();

    let completeDate = `${month} ${day}, ${year}`;
    date.textContent = completeDate;
}