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
    updateTableHTML();
}

function openAddTaskDialog() {
    let overlay = document.getElementById('addTaskOverlay');
    overlay.style.display = 'flex';
}

function closeTaskDialog() {
    let overlay = document.getElementById('addTaskOverlay');
    overlay.style.display = 'none';
}

function calcProgressbarSubtasks() {

}

function renderMainContent() {
    let content = document.getElementById('tabelToDo');
    content.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];

        // firstLastInitial(i);
        content.innerHTML += renderCardHTML(i);
        getTypeColor(element, i);
        getTypeInitialColor(element['Assigned To'], i);
    }

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


function renderCardHTML(element, i) {

    return /*html*/`
    <div id="cardContainer${i}" class="card-container" draggable="true" ondragstart="startDragging(${element['id']})">
        <div class="card">
            <div class="frame-119">
                <div id="labelBoardCard${i}" class="label-board-card">
                    <div id="cardTaskCategory" class="user-story">
                        ${element['progress']}
                    </div>
                </div>
                <div class="frame-114">
                    <div id="cardTitle" class="title">${element['title']}</div>
                    <div id="cardDescription" class="card-description">${element['description']}</div>
                </div>
                <div class="progress">
                    <div class="progressbar">
                        <div class="filler"></div>
                    </div>
                    <div id="cardSubtasks" class="card-subtasks"> 0/2 Subtask</div>
                </div>
                <div class="circle-prio-container">
                    <div id="initialsContainer" class="circle-container">
                        <div id="initial${i}" class="circle circle-to-do">${initialsArray[i][0]}</div>
                        <div id="initial${i}" class="circle circle-to-do">${initialsArray[i][1]}</div>
                        <div id="initial${i}" class="circle circle-to-do">${initialsArray[i]?.[2] || ''}</div>
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


function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}

function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    updateTableHTML();
}


function updateTableHTML() {
    let toDo = tasks.filter(t => t.progress == 'to do')
    document.getElementById('tabelToDo').innerHTML = '';

    for (let index = 0; index < toDo.length; index++) {
        firstLastInitial(index);
        const element = toDo[index];
        document.getElementById('tabelToDo').innerHTML += renderCardHTML(element);

    }


    let inProgress = tasks.filter(t => t.progress == 'in progress')
    document.getElementById('tableInProgress').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        firstLastInitial(index);
        const element = inProgress[index];
        document.getElementById('tableInProgress').innerHTML += renderCardHTML(element, index);

    }


    let awaitFeedback = tasks.filter(t => t.progress == 'Await feedback')
    document.getElementById('tableAwaitFeedback').innerHTML = '';

    for (let index = 0; index < awaitFeedback.length; index++) {
        firstLastInitial(index);
        const element = awaitFeedback[index];
        document.getElementById('tableAwaitFeedback').innerHTML += renderCardHTML(element, index);

    }


    let done = tasks.filter(t => t.progress == 'Done')
    document.getElementById('tableDone').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        firstLastInitial(index);
        const element = done[index];
        document.getElementById('tableDone').innerHTML += renderCardHTML(element, index);

    }
}