
let greetingName = document.getElementById('greeting-name');
let greetingHeader = document.getElementById('greeting-header');

async function initSummary() {
    let users = await fetchAllUsers();
    let loggedInUser = extractActiveUserInfo(users);
    setGreetingHeader();
    setGreetingName(loggedInUser);
    currentDate();
    countToDos();
}


function setGreetingHeader() {
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

function setGreetingName(loggedInUser) {
    if (loggedInUser !== null) {
        greetingName.innerHTML = loggedInUser;
    } else {
        greetingName.innerHTML = "";
        greetingHeader.textContent = greetingHeader.textContent.replace(',', '!');
    }
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

function countToDos() {
    let awaitingFeedback = document.getElementById('awaiting-feedback');
    let inProgress = document.getElementById('in-progress-count');
    let tasksInBoard = document.getElementById('tasks-count');
    let done = document.getElementById('done-count');
    let toDos = document.getElementById('to-do-count');
    let urgent = document.getElementById('urgent-count');
    toDos.innerHTML = "0";
    done.innerHTML = "0";
    urgent.innerHTML = "0";
    tasksInBoard.innerHTML = "0";
    inProgress.innerHTML = "0";
    awaitingFeedback.innerHTML = "0";
    for (let index = 0; index < tasks.length; index++) {
        countingLoop(index, { toDos, done, urgent, inProgress, awaitingFeedback, tasksInBoard });
        tasksInBoard.innerHTML = index + 1;
    }
}

function countingLoop(index, counters) {
    if (tasks[index].taskState === "to-do") {
        counters.toDos.innerHTML = Number(counters.toDos.innerHTML) + 1;
    } if (tasks[index].taskState === "done") {
        counters.done.innerHTML = Number(counters.done.innerHTML) + 1;
    } if (tasks[index].priority === "urgent") {
        counters.urgent.innerHTML = Number(counters.urgent.innerHTML) + 1;
    } if (tasks[index].taskState === "in-progress") {
        counters.inProgress.innerHTML = Number(counters.inProgress.innerHTML) + 1;
    } if (tasks[index].taskState === "await-feedback") {
        counters.awaitingFeedback.innerHTML = Number(counters.awaitingFeedback.innerHTML) + 1;
    }
}