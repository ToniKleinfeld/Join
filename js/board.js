
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


function fillTheTask() {
    let title = document.getElementById('enterATitle');
    console.log(title.value);

}

function openAddTaskDialog() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    // document.getElementById('overlayTask').classList.add('contentcontainer');
}