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
    // updateTableHTML();
    updateTaskTable(tasks, 'To do', 'tableToDo');
    updateTaskTable(tasks, 'in progress', 'tableInProgress');
    updateTaskTable(tasks, 'Await feedback', 'tableAwaitFeedback');
    updateTaskTable(tasks, 'Done', 'tableDone');
}


function openAddTaskDialog() {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    addTaskOverlay.style.display = 'flex';
}


function closeTaskDialog() {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    addTaskOverlay.style.display = 'none';
}


function calcProgressbarSubtasks() {
}

// function renderMainContent() {
//     let content = document.getElementById('tabelToDo');
//     content.innerHTML = '';

//     for (let i = 0; i < tasks.length; i++) {
//         const element = tasks[i];

//         // firstLastInitial(i);
//         content.innerHTML += renderCardHTML(i);
//         getTypeColor(element, i);
//         getTypeInitialColor(element['Assigned To'], i);
//     }

// }

function getInitialColor(initial) {
    return initialColors[initial] || '#A8A878'; // Standardfarbe, falls Initiale nicht gefunden
}


function getTypeInitialColor(task, i) {
    let initials = initialsArray[i]; // Holt das Initialen-Array für den aktuellen Task
    let color = initials.length > 0 ? initials[0] : ''; // Nimmt die erste Initiale (oder einen Fallback)
    let bgcolor = getInitialColor(color);
    document.getElementById(`initial${i}`).style.backgroundColor = bgcolor;
}


function getTypeColor(task, i) {
    let color = task['category'];
    let bgcolor = typeColors[color.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden
    document.getElementById(`labelBoardCard${i}`).style.backgroundColor = bgcolor;
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


function showNoTaskContainer(text) {
    return /*html*/`
        <div class="no-tasks-container">No tasks ${text}</div>
    `;
}

function updateTaskTable(tasks, status, tableId) {
    const filteredTasks = tasks.filter(t => t.progress === status);
    const tableElement = document.getElementById(tableId);
    tableElement.innerHTML = '';

    if (filteredTasks.length == 0) {
        tableElement.innerHTML = showNoTaskContainer('status');
    } else {
        for (let index = 0; index < filteredTasks.length; index++) {
            firstLastInitial(index);
            const element = filteredTasks[index];
            tableElement.innerHTML += renderCardHTML(element, index);
        }
    }
}

// function updateTableHTML() {

//     let toDo = tasks.filter(t => t.progress === 'To do');
//     document.getElementById('tableToDo').innerHTML = '';

//     if (toDo.length == 0) {
//         document.getElementById('tableToDo').innerHTML = showNoTaskContainer('To do');
//     } else {
//         for (let index = 0; index < toDo.length; index++) {
//             firstLastInitial(index);
//             const element = toDo[index];
//             document.getElementById('tableToDo').innerHTML += renderCardHTML(element, index);
//         }
//     }


//     let inProgress = tasks.filter(t => t.progress === 'in progress');
//     document.getElementById('tableInProgress').innerHTML = '';

//     if (inProgress.length == 0) {
//         document.getElementById('tableInProgress').innerHTML = showNoTaskContainer('In progress');
//     } else {
//         for (let index = 0; index < inProgress.length; index++) {
//             firstLastInitial(index);
//             const element = inProgress[index];
//             document.getElementById('tableInProgress').innerHTML += renderCardHTML(element, index);

//         }
//     }


//     let awaitFeedback = tasks.filter(t => t.progress === 'Await feedback');
//     document.getElementById('tableAwaitFeedback').innerHTML = '';

//     if (awaitFeedback.length == 0) {
//         document.getElementById('tableAwaitFeedback').innerHTML = showNoTaskContainer('Await feedback');
//     } else {
//         for (let index = 0; index < awaitFeedback.length; index++) {
//             firstLastInitial(index);
//             const element = awaitFeedback[index];
//             document.getElementById('tableAwaitFeedback').innerHTML += renderCardHTML(element, index);

//         }
//     }


//     let done = tasks.filter(t => t.progress === 'Done');
//     document.getElementById('tableDone').innerHTML = '';

//     if (done.length == 0) {
//         document.getElementById('tableDone').innerHTML = showNoTaskContainer('Done');
//     } else {
//         for (let index = 0; index < done.length; index++) {
//             firstLastInitial(index);
//             const element = done[index];
//             document.getElementById('tableDone').innerHTML += renderCardHTML(element, index);

//         }
//     }
// }


function renderCardHTML(element, i) {

    return /*html*/`
    <div onclick="showTaskOverlay(${element['id']})" class="card-container" draggable="true" ondragstart="startDragging(${element['id']})">
        <div class="card">
            <div class="frame-119">
                <div class="label-board-card">
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
                        <div class="filler"></div>
                    </div>
                    <div class="card-subtasks"> 0/2 Subtask</div>
                </div>
                <div class="circle-prio-container">
                    <div class="circle-container">
                        <div class="circle circle-to-do">${initialsArray[i][0]}</div>
                        <div class="circle circle-to-do">${initialsArray[i][1]}</div>
                        <div class="circle circle-to-do">${initialsArray[i]?.[2] || ''}</div>
                    </div>
                    <div class="priority-symbols">
                        <img src="./assets/icons/priority-hight.svg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <br>
    `;
}

function showTaskOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';

    document.getElementById('overlay').innerHTML = rendertaskOverlayHTML();
}

function rendertaskOverlayHTML() {
    return /*html*/`
    <div class="task-overlay-container">
        <div class="user-story-close-container">
            <div class="user-story-overlay">User Story</div>
            <img onclick="closeTaskOverlay()" src="./assets/icons/close.svg" alt="">
        </div>
        <h1>Kochwelt Page & Recipe Recommender</h1>
        <p class="content-overlay">Build start page with recipe recommendation...</p>
        <div class="date-overlay">
            <span>Due date:</span>
            <span>11/08/2024</span>
        </div>
        <div class="priority-overlay">
            <span>Priority:</span>
            <div>
                <span>Medium</span>
                <img src="./assets/icons/priority-equal.svg" alt="">
            </div>
        </div>
        <div>
            <div class="assigned-grid-overlay">
                <div>Assigned To:</div>
                <div class="assigned-row-overlay"><span class="circle circle-in-progress">EM</span><span>Emanuell
                        Mauer</span></div>
                <div class="assigned-row-overlay"><span class="circle circle-in-progress">MB</span><span>Marcel
                        Bauer</span></div>
                <div class="assigned-row-overlay"><span class="circle circle-in-progress">AM</span><span>Anton
                        Mayer</span></div>
            </div>
        </div>
        <div>
            <div class="subtasks-grid-overlay">
                <div>Subtasks</div>
                <form action="">
                    <div class="checkbox-title-container">
                        <input class="checkbox" type="checkbox" id="checkbox1" name="toDo" value="" />
                        <label for="checkbox1">Implement Recipe Recommendation</label>
                    </div>
                    <div class="checkbox-title-container">
                        <input class="checkbox" type="checkbox" id="checkbox2" name="toDo" value="" />
                        <label for="checkbox2">Start Page Layout</label>
                    </div>
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


function closeTaskOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    // updateTableHTML();
    updateTaskTable(tasks, 'To do', 'tableToDo');
    updateTaskTable(tasks, 'in progress', 'tableInProgress');
    updateTaskTable(tasks, 'Await feedback', 'tableAwaitFeedback');
    updateTaskTable(tasks, 'Done', 'tableDone');
}