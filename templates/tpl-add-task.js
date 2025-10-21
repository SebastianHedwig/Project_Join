function getTasksTemplate(index) {
    return `<div class="task" onclick="renderTaskInfoDlg()">
                                    <span class="task__category">${tasks[index].category}</span>
                                    <div class="task__content-metadata-box">
                                        <span class="task__title">${tasks[index].title}</span>
                                        <span class="task__description">${tasks[index].description}</span>
                                    </div>
                                    <div class="task__subtasks-and-progressbar-box">
                                        <span class="task__progressbar" style="--progress: 33.3333%;"></span>
                                        <span class="task__subtasks"> 1 / 3 Subtasks</span>
                                    </div>
                                    <div class="task__assignment-and-priority-box">
                                        <div class="task__assignments">
                                            <!-- user images nur zur veranschaulichung. wird später mit JS gerendert -->
                                            <img class="user-img" id="" src="../assets/img/user-img-anna.svg"
                                                alt="User Image or initials">
                                            <img class="user-img" id=""
                                                src="../assets/img/user-img-david.svg" alt="User Image or initials">
                                            <img class="user-img" id=""
                                                src="../assets/img/user-img-sofia.svg" alt="User Imare or initials">
                                        </div>
                                        <div class="task__priority">
                                            <img id="priority" class="task_priority" src="../assets/img/priority-medium.svg"
                                                alt="image of prioritylevel">
                                        </div>`
}