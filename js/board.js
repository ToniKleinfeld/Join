
function initBoard() {
    // renderMainContent();
    // fillTheTask();
}


function renderMainContent() {
    let content = document.getElementById('tabelleCard');
    content.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        console.log(element);
    }
}


function fillTask() {
    let title = document.getElementById('enterATitle');
    let description = document.getElementById('enterADescription');
    let selectContact = document.getElementById('selectContacts');
    let date = document.getElementById('iputDate');
    let category = document.getElementById('category');
    let subtasks = document.getElementById('subtasks');

    document.getElementById('prioUrgendBtn').onclick = function () {
        console.log('Urgent button clicked');
    };

    document.getElementById('prioMediumBtn').onclick = function () {
        console.log('Medium button clicked');
    };

    document.getElementById('prioLowBtn').onclick = function () {
        console.log('Low button clicked');
    };


    console.log(title.value);
    console.log(selectContact.value);
    console.log(description.value);
    console.log(date.value);
    console.log(category.value);
    console.log(subtasks.value);

}

function openAddTaskDialog() {
    let overlay = document.getElementById('addTaskOverlay');
    overlay.style.display = 'flex';
}

function closeTaskDialog() {
    let overlay = document.getElementById('addTaskOverlay');
    overlay.style.display = 'none';
}


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData('text');
    ev.target.appendChild(document.getElementById(data));
}