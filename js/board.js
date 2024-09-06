const typeColors = {
    "technical task": '#1fd7c1',
    "user story": '#0038ff',
};


const initialColors = {
    "EM": '#1fd7c1',
    "MB": '#462f8a',
    "AM": '#ff7a00',
    "SM": '#00bee8',
    "BZ": '#6e52ff',
    "AS": '#9327ff',
    "DE": '#fc71ff',
    "EF": '#ffbb2b',
    "TW": '#ff4646',
}

let currentDraggedElement;

function initBoard() {
    // renderMainContent();
    updateTaskTable('to do', 'tableToDo');
    updateTaskTable('in progress', 'tableInProgress');
    updateTaskTable('Await feedback', 'tableAwaitFeedback');
    updateTaskTable('Done', 'tableDone');
}


function updateTaskTable(status, tableId) {
    const filteredTasks = tasks.filter(t => t.progress === status);  // Filtert die Aufgaben nach dem gegebenen Status.
    const tableElement = document.getElementById(tableId);  // Holt das HTML-Element der Tabelle anhand der übergebenen ID.
    tableElement.innerHTML = '';

    if (filteredTasks.length == 0) {  // Überprüft, ob es Aufgaben im gefilterten Status gibt.
        tableElement.innerHTML = showNoTaskContainerHTML('status');
    } else {
        for (let index = 0; index < filteredTasks.length; index++) {
            let indexOfTask = tasks.indexOf(filteredTasks[index]);  // Findet den Index der Aufgabe im ursprünglichen `tasks`-Array.
            let element = filteredTasks[index];

            tableElement.innerHTML += renderCardHTML(element, indexOfTask);
            renderAssignedContacs(indexOfTask,element,'assignedusers')
            getTypeLabelBoardColor(indexOfTask, 'labelBoardCard');
            calcTotalSubtask(indexOfTask,element);
        }
    }
}

function renderAssignedContacs(i,users,path) {
    const assignedcontacts = document.getElementById(`${path}${i}`)
    
    for (let index = 0; index < users['Assigned To'].length; index++) {
        const name = users['Assigned To'][index];  
        const shortname = shortNames(name);
        const color =  getColorOfContact(name);
        
        assignedcontacts.innerHTML +=  renderAssignedContactsSmallCard(color,shortname);
    }    
}

function choosePrioSymbol(priority) {
    // let chosedSymbol = document.getElementById('priorityImage').src;
    if (priority === 'Low') {
        return './assets/icons/priority-low.svg';
    } else if (priority === 'Medium') {
        return './assets/icons/priority-equal.svg';
    } else if (priority === 'Urgent') {
        return './assets/icons/priority-hight.svg';
    }
}


function openAddTaskDialog() {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    addTaskOverlay.style.display = 'flex';
}

function closeAddTaskDialog() {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    addTaskOverlay.style.display = 'none';
}

function getTypeLabelBoardColor(indexOfTask, labelBoardID) {
    let color = tasks[indexOfTask]['category'];
    let bgcolor = typeColors[color.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden
    document.getElementById(labelBoardID + indexOfTask).style.backgroundColor = bgcolor;
}


function showTaskOverlay(indexOfTask) {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';

    document.getElementById('overlay').innerHTML = rendertaskOverlayHTML(indexOfTask);
    tableAssignedTo(indexOfTask);
    listSubtasks(indexOfTask);
    getTypeLabelBoardColor(indexOfTask, 'labelOverlay');
}


function closeTaskOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}


function tableAssignedTo(indexOfTask) {
    let tableAssigned = document.getElementById('tableAssignedTo');
    tableAssigned.innerHTML = '';

    for (let index = 0; index < tasks[indexOfTask]['Assigned To'].length; index++) {
        const assignedToName = tasks[indexOfTask]['Assigned To'][index];

        tableAssigned.innerHTML += /*html*/`
            <div class="assigned-row-overlay">
                <span class="circle circle-in-progress">EM</span>
                <span>${assignedToName}</span>
            </div>
            `;
    }
}

function calcTotalSubtask(indexOfTask,task) {
    let subtask = task['subtask'];
    let cardSubtask = document.getElementById(`cardSubtasks${indexOfTask}`);
    let amount = 0;

    cardSubtask.innerHTML = '';

    if (subtask !== '') {
        subtask.forEach(element => {if(element.state == true) {amount++             
        }                
        }); 
        
        cardSubtask.innerHTML = totalSubtaskHTML(amount,subtask.length);
        calcProgressbarSubtasks(indexOfTask,task);  
    } else {
        document.getElementById(`progressbar${indexOfTask}`).classList.add('d-none')
    }
}

function calcProgressbarSubtasks(indexOfTask,task) {
    let subtask = task['subtask'];

    if (subtask.length !== '') {
        console.log(indexOfTask, 'true');
        // console.log(subtask);
        for (let i = 0; i < subtask.length; i++) {
            const element = subtask[i].state;
            console.log(element);
            if (element) {

            } else {

            }
        }
    } else {
        console.log(indexOfTask, 'false');
    }
}


// function calcProgressbarSubtasks(indexOfTask) {
// let numberOfSubtask = tasks[indexOfTask]['subtask'];

// if (!Array.isArray(numberOfSubtask) || !numberOfSubtask.length ) {     // hier wird geprüft, ob es den Subtask-Array gibt.
//     console.log(indexOfTask, 'true');    
// } else {
//     console.log(indexOfTask, 'false');
// }
// }


function listSubtasks(indexOfTask) {
    let subtask = document.getElementById('formSubtasks');
    subtask.innerHTML = '';

    if (tasks[indexOfTask]['subtask']) {
        for (let i = 0; i < tasks[indexOfTask]['subtask'].length; i++) {
            const element = tasks[indexOfTask]?.['subtask'][i] || '';

            subtask.innerHTML += /*html*/`
            <div class="checkbox-title-container">
                <input onclick="isChecked(${i})" class="checkbox" type="checkbox" id="checkbox${i}" name="checkbox${i}" value="checkboxSubtask${indexOfTask}${i}" />
                <label for="checkbox${i}">${element.title}</label>
            </div>
            `;
        }
    } else {
        return false;
    }
}

// function isChecked(index) {
//     let isChecked = document.getElementById(`checkbox${index}`).checked;
//     let subtask = tasks[index]['subtask'];

//     if (isChecked) {
//         for (let i = 0; i < subtask.length; i++) {
//             const element = subtask[i];
//             console.log(element.state);
//         }
//     } else {
//         // console.log(`Checkbox${index}: `, isChecked);
//         console.log('Kein Haken');
//     }
// }


function rendertaskOverlayHTML(indexOfTask) {
    return /*html*/`
    <div class="task-overlay-container">
        <div class="user-story-close-container">
            <div id="labelOverlay${indexOfTask}" class="user-story-overlay">${tasks[indexOfTask]['category']}</div>
            <img onclick="closeTaskOverlay()" src="./assets/icons/close.svg" alt="">
        </div>
        <h1>${tasks[indexOfTask]['title']}</h1>
        <p class="content-overlay">${tasks[indexOfTask]['description']}</p>
        <div class="date-overlay">
            <span>Due date:</span>
            <span>${tasks[indexOfTask]['duedate']}</span>
        </div>
        <div class="priority-overlay">
            <span>Priority:</span>
            <div>
                <span>${tasks[indexOfTask]['prio']}</span>
                <img src="${choosePrioSymbol(tasks[indexOfTask]['prio'])}" alt="">
            </div>
        </div>
        <div>
            <div class="assigned-grid-overlay">
                <div>Assigned To:</div>
                <!--liste der ausgewählten namen-->
                <div id="tableAssignedTo"></div>
            </div>
        </div>
        <div>
            <div class="subtasks-grid-overlay">
                <div>Subtasks:</div>
                <form id="formSubtasks" action="">
                    <!-- <div class="checkbox-title-container">
                        <input class="checkbox" type="checkbox" id="checkbox1" name="toDo" value="" />
                        <label for="checkbox1">Implement Recipe Recommendation</label>
                    </div>
                    <div class="checkbox-title-container">
                        <input class="checkbox" type="checkbox" id="checkbox2" name="toDo" value="" />
                        <label for="checkbox2">Start Page Layout</label>
                    </div> -->
                </form>
            </div>
        </div>
        <div class="delete-edit-container">
            <img class="trash-delete" src="./assets/icons/trash-board.svg" alt="">
            <span>Delete</span>
            <img class="line-vertical" src="./assets/icons/line-vertical.svg" alt="">
            <img class="trash-delete" src="./assets/icons/edit.svg" alt="">
            <span>Edit</span>
        </div>
    </div>
`;
}


function startDragging(i) {
    currentDraggedElement = i;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    updateTaskTable('To do', 'tableToDo');
    updateTaskTable('in progress', 'tableInProgress');
    updateTaskTable('Await feedback', 'tableAwaitFeedback');
    updateTaskTable('Done', 'tableDone');
}

// function renderMainContent() {
//     let content = document.getElementById('tabelToDo');
//     content.innerHTML = '';

//     for (let i = 0; i < tasks.length; i++) {
//         const element = tasks[i];

//         // firstLastInitial(i);
//         getTypeLabelBoardColor(element, i);
//         getTypeInitialColor(element['Assigned To'], i);
//     }

// }
