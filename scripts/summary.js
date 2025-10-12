
async function init() {
   await getData()
    greetingName();
}


function greetingName() {
   let greetingName = document.getElementById('greeting');
   if (users.length >= 0) {
    let userName = users[0]
    greetingName.innerHTML = `${userName.firstName} ${userName.lastName}` 
   }
}