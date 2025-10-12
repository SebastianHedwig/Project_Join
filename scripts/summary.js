
async function init() {
   await getData()
    greetings();
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
    greetingName.innerHTML = `${userName.firstName} ${userName.lastName}` 
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