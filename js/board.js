const typeColors = {
    "technical task": '#1fd7c1',
    "user story": '#0038ff',
};

let currentDraggedElement;
let initials = [];




function initBoard() {
    renderMainContent();
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
        // console.log(element);

        content.innerHTML += renderCardHTML(i);
        getTypeColor(element, i);
        firstLastInitial(i);
        // console.log(i);
    }

}

function renderCardHTML(i) {
    return /*html*/`
    <div id="cardContainer${i}" class="card-container" draggable="true" ondragstart="startDragging(${i})">
        <div class="card">
            <div class="frame-119">
                <div id="labelBoardCard${i}" class="label-board-card">
                    <div id="cardTaskCategory" class="user-story">
                        ${tasks[i]['category']}
                    </div>
                </div>
                <div class="frame-114">
                    <div id="cardTitle" class="title">${tasks[i]['title']}</div>
                    <div id="cardDescription" class="card-description">${tasks[i]['description']}</div>
                </div>
                <div class="progress">
                    <div class="progressbar">
                        <div class="filler"></div>
                    </div>
                    <div id="cardSubtasks" class="card-subtasks"> 0/2 Subtask</div>
                </div>
                <div class="circle-prio-container">
                    <div class="circle-container">
                        <div id="initial${i}" class="circle circle-to-do"></div>
                        <!-- <div class="circle circle-to-do">DE</div>
                        <div class="circle circle-to-do">EF</div> -->
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


function getTypeColor(task, i) {
    let color = task['category'];
    let bgcolor = typeColors[color.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden
    document.getElementById(`labelBoardCard${i}`).style.backgroundColor = bgcolor;
}


function firstLastInitial(i) {
    let fullNames = tasks[i]['Assigned To'];  // Array von vollständigen Namen
    console.log("Namensliste ", fullNames);

    fullNames.forEach(fullName => {

        let nameParts = fullName.split(" ");   // Trenne den vollen Namen in Vorname und Nachname

        // Hole den ersten Buchstaben von Vorname und Nachname
        let firstInitial = nameParts[0].charAt(0);
        let lastInitial = nameParts[1].charAt(0);

        initials.push(firstInitial + lastInitial);   // Ausgabe der Initialen
        
        // console.log("Initialien: ", firstInitial + lastInitial);
    });

}


// function fillTask() {
//     let title = document.getElementById('enterATitle');
//     let description = document.getElementById('enterADescription');
//     let selectContact = document.getElementById('selectContacts');
//     let date = document.getElementById('iputDate');
//     let category = document.getElementById('category');
//     let subtasks = document.getElementById('subtasks');

//     document.getElementById('prioUrgendBtn').onclick = function () {
//         console.log('Urgent button clicked');
//     };

//     document.getElementById('prioMediumBtn').onclick = function () {
//         console.log('Medium button clicked');
//     };

//     document.getElementById('prioLowBtn').onclick = function () {
//         console.log('Low button clicked');
//     };


//     console.log(title.value);
//     console.log(selectContact.value);
//     console.log(description.value);
//     console.log(date.value);
//     console.log(category.value);
//     console.log(subtasks.value);

// }



function allowDrop(ev) {
    ev.preventDefault();
}

function startDragging(id) {
    currentDraggedElement = id;
}

function moveTo(category) {
    document.getElementById('category').classList('tabelle-card') = category;
}
// function drag(ev) {
//     ev.dataTransfer.setData('text', ev.target.id);
// }

// function drop(ev) {
//     ev.preventDefault();
//     let data = ev.dataTransfer.getData('text');
//     ev.target.appendChild(document.getElementById(data));
// }