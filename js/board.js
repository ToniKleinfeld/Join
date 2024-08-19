
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

function fillTheTask(){
    titlr = document.getElementById('enterATitle');
    console.log(titlr.value);
    
}
