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
let initialsArray = [];



function initBoard() {
    // renderMainContent();
    updateTaskTable(tasks, 'To do', 'tableToDo');
    updateTaskTable(tasks, 'in progress', 'tableInProgress');
    updateTaskTable(tasks, 'Await feedback', 'tableAwaitFeedback');
    updateTaskTable(tasks, 'Done', 'tableDone');
}


function updateTaskTable(tasks, status, tableId) {
    const filteredTasks = tasks.filter(t => t.progress === status);  // Filtert die Aufgaben nach dem gegebenen Status.
    const tableElement = document.getElementById(tableId);  // Holt das HTML-Element der Tabelle anhand der übergebenen ID.
    tableElement.innerHTML = '';

    if (filteredTasks.length == 0) {  // Überprüft, ob es Aufgaben im gefilterten Status gibt.
        tableElement.innerHTML = showNoTaskContainer('status');
    } else {
        for (let index = 0; index < filteredTasks.length; index++) {
            let indexOfTask = tasks.indexOf(filteredTasks[index]);  // Findet den Index der Aufgabe im ursprünglichen `tasks`-Array.
            firstLastInitial(index);
            let element = filteredTasks[index];
            tableElement.innerHTML += renderCardHTML(element, index, indexOfTask);
            // getTypeLabelBoardColor(element, indexOfTask);
            getTypeLabelBoardColor(indexOfTask, 'labelBoardCard');
            calcProgressbarSubtasks(indexOfTask);
            choosePrioSymbol(element['prio']);
        }
    }
}


function showNoTaskContainer(text) {
    return /*html*/`
        <div class="no-tasks-container">No tasks ${text}</div>
    `;
}


function firstLastInitial(i) {
    let fullNames = tasks[i]['Assigned To'];  // Array von vollständigen Namen
    let initials = [];  // Initialen-Array für diese spezielle Gruppe von Namen

    fullNames.forEach(fullName => {
        let nameParts = fullName.split(" ");   // Trenne den vollen Namen in Vorname und Nachname
        // Hole den ersten Buchstaben von Vorname und Nachname
        let firstInitial = nameParts[0].charAt(0);
        let lastInitial = nameParts[1].charAt(0);

        initials.push(firstInitial + lastInitial);   // Füge Initialen in das spezielle Initialen-Array ein
    }
    );

    initialsArray.push(initials);  // Füge das spezifische Initialen-Array in das übergeordnete Array ein
    // console.log("Initialien-Arrays: ", initialsArray);  // Ausgabe des übergeordneten Initialen-Arrays
}


function renderCardHTML(element, i, indexOfTask) {
    return /*html*/`
    <div onclick="showTaskOverlay(${indexOfTask})" class="card-container" draggable="true" ondragstart="startDragging(${indexOfTask})">
        <div class="card">
            <div class="frame-119">
                <div id="labelBoardCard${indexOfTask}" class="label-board-card">
                    <div class="user-story">
                        ${element['category']}
                    </div>
                </div>
                <div class="title-description-container">
                    <div class="title">${element['title']}</div>
                    <div class="card-description">${element['description']}</div>
                </div>
                <div class="progress">
                    <div class="progressbar">
                        <div id="fillerProgressbar${indexOfTask}" class="filler"></div>
                    </div>
                    <div id="cardSubtasks${indexOfTask}" class="card-subtasks"> 0/2 Subtask</div>
                </div>
                <div class="circle-prio-container">
                    <div class="circle-container">
                        <div class="circle circle-to-do">${initialsArray[i][0]}</div>
                        <div class="circle circle-to-do">${initialsArray[i][1]}</div>
                        <div class="circle circle-to-do">${initialsArray[i]?.[2] || ''}</div>
                    </div>
                    <div class="priority-symbols">
                        <img src="${choosePrioSymbol(element['prio'])}">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    `;
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


function getInitialColor(initial) {
    return initialColors[initial] || '#A8A878'; // Standardfarbe, falls Initiale nicht gefunden
}


function getTypeInitialColor(task, i) {
    let initials = initialsArray[i]; // Holt das Initialen-Array für den aktuellen Task
    let color = initials.length > 0 ? initials[0] : ''; // Nimmt die erste Initiale (oder einen Fallback)
    let bgcolor = getInitialColor(color);
    document.getElementById(`initial${i}`).style.backgroundColor = bgcolor;
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


function calcProgressbarSubtasks(indexOfTask) {
let numberOfSubtask = tasks[indexOfTask]['subtask'];
// console.log('Number of subtask',numberOfSubtask);

if (!Array.isArray(numberOfSubtask) || !numberOfSubtask.length ) {     // hier wird geprüft, ob es den Subtask-Array gibt.
    console.log(indexOfTask, 'true');
    
} else {
    console.log(indexOfTask, 'false');
    
}

}


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

function isChecked(index) {
    let isChecked = document.getElementById(`checkbox${index}`).checked;
    let subtask = tasks[index]['subtask'];

    if (isChecked) {
        for (let i = 0; i < subtask.length; i++) {
            const element = subtask[i];
            console.log(element.state);
        }
    } else {
        // console.log(`Checkbox${index}: `, isChecked);
        console.log('Kein Haken');
    }
}


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
    updateTaskTable(tasks, 'To do', 'tableToDo');
    updateTaskTable(tasks, 'in progress', 'tableInProgress');
    updateTaskTable(tasks, 'Await feedback', 'tableAwaitFeedback');
    updateTaskTable(tasks, 'Done', 'tableDone');
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
