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

function doNotClose(event) {
    event.stopPropagation();       
  }

function getTypeLabelBoardColor(indexOfTask, labelBoardID) {
    let color = tasks[indexOfTask]['category'];
    let bgcolor = typeColors[color.toLowerCase()] || '#A8A878'; // Standardfarbe, falls Typ nicht gefunden
    document.getElementById(labelBoardID + indexOfTask).style.backgroundColor = bgcolor;
}


function showTaskOverlay(indexOfTask) {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'flex';

    overlay.innerHTML = rendertaskOverlayHTML(indexOfTask);
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
        const name = tasks[indexOfTask]['Assigned To'][index];  
        const shortname = shortNames(name);
        console.log(shortname)
        const color =  getColorOfContact(name);

        tableAssigned.innerHTML += renderAssignedNamesAndColorsBigCard(name,color,shortname);
    }
}

function calcTotalSubtask(indexOfTask,task) {
    let subtask = task['subtask'];
    let cardSubtask = document.getElementById(`cardSubtasks${indexOfTask}`);
    let amount = 0;

    cardSubtask.innerHTML = '';

    if (subtask !== '') {
        subtask.forEach(element => {if(element.state == true) {amount++}                
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

            subtask.innerHTML +=  renderSubTasksBigCars(i,element,indexOfTask)
        }
    } else {
        return false;
    }
}


function checkboxcheck(check,i) {
    if (check == true) {
        return 'checked' 
    }
}

function startDragging(i) {
    currentDraggedElement = i;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(progress) {
    tasks[currentDraggedElement]['progress'] = progress;
    updateTaskTable('to do', 'tableToDo');
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
