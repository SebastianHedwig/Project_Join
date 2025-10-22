
async function initSummary() {
   await getData();
    greetings();
    currentDate();
    countToDos();
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
        countingLoop(index, {toDos, done, urgent, inProgress, awaitingFeedback, tasksInBoard});
        tasksInBoard.innerHTML = index +1;
    }  
}

function countingLoop(index, counters) {
    if (tasks[index].taskState === "toDo") {
            counters.toDos.innerHTML = Number(counters.toDos.innerHTML) +1;
        } if (tasks[index].taskState === "done") {
            counters.done.innerHTML = Number(counters.done.innerHTML) +1;
        } if (tasks[index].priority === "urgent") {
            counters.urgent.innerHTML = Number(counters.urgent.innerHTML) +1;
        } if (tasks[index].taskState === "inProgress") {
            counters.inProgress.innerHTML = Number(counters.inProgress.innerHTML) +1;
        } if (tasks[index].taskState === "awaitingFeedback") {
            counters.awaitingFeedback.innerHTML = Number(counters.awaitingFeedback.innerHTML) +1;
        }   
}