
function getTaskInfoDlgTpl() {
    return /*html*/ `
        <header class="dlg__header">
                <span class="dlg__header_task-category">User Story</span>
                <img class="dlg__close-btn" src="../assets/img/close-delete-cross.svg" onclick="hideDlg()" alt="small cross as close button">
            </header>
            <main class="dlg__main">
                <span class="dlg__main__task-title">Kochwelt bla Blubb! & noch mehr Rezepte</span>
                <span class="dlg__main__task-description">Rezepte und son kram und noch bissel mehr Text, damit sich das Ticket
                    auch lohnt</span>
                <div class="dlg__main__task__due-date">
                    <span class="dlg__main__task__due-date-span">Due date:</span>
                    <span class="dlg__main__task__due-date-value">10/10/2025</span>
                </div>
                <div class="dlg__main_task-priority-box"> 
                    <span class="dlg__main_task-priority-title">Priority:</span>
                    <img id="priority" class="dlg_main_task-priority" src="../assets/img/task-priority-medium.svg"
                        alt="image of prioritylevel">
                </div>
                <div class="dlg__main__task-assignments">
                    <span class="dlg__main__assignments-title">Assigned to:</span>
                    <div class="dlg__user-box"> <!-- user images nur zur veranschaulichung. wird später mit JS gerendert -->
                        <img class="dlg__user-img" id="A" src="../assets/img/user-img-anna.svg"
                            alt="User Image or initials">
                        <span class="dlg__user-name">User 1</span>
                    </div>
                    <div class="dlg__user-box">
                        <img class="dlg__user-img" id="B" src="../assets/img/user-img-david.svg"
                            alt="User Image or initials">
                        <span class="dlg__user-name">User 2</span>
                    </div>
                    <div class="dlg__user-box">
                        <img class="dlg__user-img" id="C" src="../assets/img/user-img-sofia.svg"
                            alt="User Imare or initials">
                        <span class="dlg__user-name">User 3</span>
                    </div>
                </div>
                <div class="dlg__main__task-subtask-box">
                    <span class="dlg__main__task-subtask-title">Subtasks:</span>
                    <div></div>
                    <span class="dlg__main__task-subtask"><img src="../assets/img/checkbox-unchecked.svg" alt="checkbox">Subtask
                        Text</span>
                    <span class="dlg__main__task-subtask"><img src="../assets/img/checkbox-unchecked.svg" alt="checkbox">Subtask
                        Text</span>
                    <span class="dlg__main__task-subtask"><img src="../assets/img/checkbox-unchecked.svg" alt="checkbox">Subtask
                        Text</span>
                </div>
            </main>
            <footer class="dlg__footer">
                <div class="dlg__footer__options-box">
                    <img class="delete-btn" src="../assets/img/delete-with-text.svg" alt="image of an Garbage can">
                    <span class="separator"></span>
                    <img class="edit-btn" src="../assets/img/edit-with-text.svg" onclick="renderTaskEditDlg()" alt="image of an pencil">
                </div>
            </footer>
    `
}

function getTaskEditDlgTpl() {
    return /*html*/ `
        <header class="dlg-edit__header">
            <img class="dlg-edit__close-btn" src="../assets/img/close-delete-cross.svg" onclick="hideDlg()" alt=" small cross as close button">
        </header>
        <main class="dlg-edit__main overflow-y">
            <div class="dlg-edit__main__title-box">
                <span class="dlg-edit__main__task-title">Title</span>
                <input id="title-input" class="dlg-edit__input-text" type="text" placeholder="Enter a Title">
            </div>
            <div class="dlg-edit__main__description-box">
                <span class="dlg-edit__main__task-description">Description</span>
                <textarea id="descriptions-input" class="dlg-edit__textarea" type="text" placeholder="Enter a Description"></textarea>
            </div>
            <div class="dlg-edit__main__due-date-box" onclick="setMinDueDate()">
                <span class="dlg-edit__main__due-date-title">Due Date</span>
                <input type="date" id="due-date" class="dlg-edit__input-text">
            </div>
            <div class="dlg-edit__main__task-priority-options-box">
                <span class="dlg-edit__main__task-priority-title bold">Priority</span>
                <div class="dlg-edit__main__task-priority-btn-box">
                    <div class="priority-options-btn" id="urgent" onclick="changePriorityBtn(this)">Urgent 
                        <img src="../assets/img/priority-urgent.svg"
                            data-default="../assets/img/priority-urgent.svg"
                            data-selected="../assets/img/priority-urgent-active.svg"
                            alt="urgent">
                    </div>
                    <div class="priority-options-btn" id="medium" onclick="changePriorityBtn(this)">Medium 
                        <img src="../assets/img/priority-medium.svg"
                            data-default="../assets/img/priority-medium.svg"
                            data-selected="../assets/img/priority-medium-active.svg"
                            alt="medium">
                    </div>
                    <div class="priority-options-btn" id="low" onclick="changePriorityBtn(this)">Low 
                        <img src="../assets/img/priority-low.svg"
                            data-default="../assets/img/priority-low.svg"
                            data-selected="../assets/img/priority-low-active.svg"
                            alt="low">
                    </div>
                </div>
            </div>
            <div class="dlg-edit__main__task-assignments-box">
                <span class="dlg-edit__main__assignments-title">Assigned to</span>
                    <div class="contacts-selection" id="contact-select">
                    <div class="search-wrapper">
                        <input type="text" id="contact-search" class="selector" placeholder="Search contacts to assign..." autocomplete="off"/>
                    </div>
                        <ul class="contact-options">
                            <li data-user="anna">
                                <div class="user-selection-field">
                                    <svg width="32" height="32" viewBox="0 0 42 42">
                                        <circle cx="21" cy="21" r="20" fill="#3b82f6" stroke="white" stroke-width="2" />
                                        <text x="21" y="23" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="white" font-family="sans-serif">A</text>
                                    </svg>
                                    <span class="username">Anna</span>
                                </div>
                                <img class="checkbox" src="../assets/img/checkbox-unchecked.svg" alt="checkbox" data-checked="false">
                            </li>

                            <li data-user="ben">
                                <div class="user-selection-field">
                                    <svg width="32" height="32" viewBox="0 0 42 42">
                                        <circle cx="21" cy="21" r="20" fill="#10b981" stroke="white" stroke-width="2" />
                                        <text x="21" y="23" text-anchor="middle" dominant-baseline="middle"font-size="12" fill="white" font-family="sans-serif">B</text>
                                    </svg>
                                    <span class="username">Ben</span>
                                </div>
                                 <img class="checkbox" src="../assets/img/checkbox-unchecked.svg" alt="checkbox" data-checked="false">
                            </li>

                            <li data-user="clara">
                                <div class="user-selection-field">
                                    <svg width="32" height="32" viewBox="0 0 42 42">
                                        <circle cx="21" cy="21" r="20" fill="#f97316" stroke="white" stroke-width="2" />
                                        <text x="21" y="23" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="white" font-family="sans-serif">C</text>
                                    </svg>
                                    <span class="username">Clara</span>
                                </div>
                                <img class="checkbox" src="../assets/img/checkbox-unchecked.svg" alt="checkbox" data-checked="false">
                            </li>

                            <li data-user="basti">
                                <div class="user-selection-field">
                                    <svg width="32" height="32" viewBox="0 0 42 42">
                                        <circle cx="21" cy="21" r="20" fill="#f97316" stroke="white" stroke-width="2" />
                                        <text x="21" y="23" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="white" font-family="sans-serif">B</text>
                                    </svg>
                                    <span class="username">Basti</span>
                                </div>
                                <img class="checkbox" src="../assets/img/checkbox-unchecked.svg" alt="checkbox" data-checked="false">
                            </li>

                            <li data-user="sascha">
                                <div class="user-selection-field">
                                    <svg width="32" height="32" viewBox="0 0 42 42">
                                        <circle cx="21" cy="21" r="20" fill="#f97316" stroke="white" stroke-width="2" />
                                        <text x="21" y="23" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="white" font-family="sans-serif">S</text>
                                    </svg>
                                    <span class="username">Sascha</span>
                                </div>

                                <img class="checkbox" src="../assets/img/checkbox-unchecked.svg" alt="checkbox" data-checked="false">
                            </li>

                            <li data-user="marvin">
                                <div class="user-selection-field">
                                    <svg width="32" height="32" viewBox="0 0 42 42">
                                        <circle cx="21" cy="21" r="20" fill="#f97316" stroke="white" stroke-width="2" />
                                        <text x="21" y="23" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="white" font-family="sans-serif">M</text>
                                    </svg>
                                    <span class="username">Marvin</span>
                                </div>

                                <img class="checkbox" src="../assets/img/checkbox-unchecked.svg" alt="checkbox" data-checked="false">
                            </li>
                        </ul>
                    </div>

                <div class="dlg-edit__main__assigned-user-container">
                    <div class="dlg-edit__user-box">
                        <img class="dlg__user-img" id="A" src="../assets/img/user-img-anna.svg" alt="User Image or initials">
                    </div>
                    <div class="dlg-edit__user-box">
                        <img class="dlg__user-img" id="B" src="../assets/img/user-img-david.svg" alt="User Image or initials">
                    </div>
                    <div class="dlg-edit__user-box">
                        <img class="dlg__user-img" id="C" src="../assets/img/user-img-sofia.svg" alt="User Imare or initials">
                    </div>
                </div>
            </div>
            <div class="dlg-edit__main__subtasks-box">
                <div class="dlg-edit__main__add-subtask-box" >
                    <span class="dlg-edit__main__subtask-title">Subtasks</span>
                    <input id="subtask-input" class="dlg-edit__input-text" type="text" placeholder="Add new Subtask">
                </div>
                    <ul class="dlg-edit__subtask-list">
                        <li class="dlg-edit__main__subtask">• Subtask Text                          
                                <div class="subtask-edit-box">
                                    <img class="subtask-edit-box__edit-img" src="../assets/img/edit.svg">
                                    <div class="separator"></div>
                                    <img class="subtask-edit-box__delete-img" src="../assets/img/delete.svg">
                            </div>
                        </li>
                        <li class="dlg-edit__main__subtask">• Subtask Text                          
                            <div class="subtask-edit-box">
                                <img class="subtask-edit-box__edit-img" src="../assets/img/edit.svg">
                                <div class="separator"></div>
                                <img class="subtask-edit-box__delete-img" src="../assets/img/delete.svg">
                            </div>
                        </li>
                        <li class="dlg-edit__main__subtask">• Subtask Text                          
                            <div class="subtask-edit-box">
                                <img class="subtask-edit-box__edit-img" src="../assets/img/edit.svg">
                                <div class="separator"></div>
                                <img class="subtask-edit-box__delete-img" src="../assets/img/delete.svg">
                            </div>
                        </li>
                    </ul>
            </div>
        </main>
        <footer class="dlg-edit__footer">
            <div class="dlg-edit__footer__discard-btn filled-btn" onclick="renderTaskInfoDlg()">Discard</div>
            <div class="dlg-edit__footer__save-btn filled-btn">SAVE</div>
        </footer>
    `
}

function getAddTaskDlgTpl() {
    return /*html*/ `
        <header class="dlg-edit__header dlg-add-task-header">
            <img class="dlg-edit__close-btn" src="../assets/img/close-delete-cross.svg" onclick="hideDlg()" alt=" small cross as close button">
        </header>
        <div data-insert="add-task-insert.html"></div>
    `
}