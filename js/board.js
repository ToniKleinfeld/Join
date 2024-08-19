
function initBoard() {
    renderMainContent();
}


function renderMainContent() {
    let content = document.getElementById('tabelleCard');
    content.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i];
        console.log(element);
    }
}


function addCategoryContainer(){

}

