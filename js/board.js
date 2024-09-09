const typeColors = {
    "technical task": '#1fd7c1',
    "user story": '#0038ff',
};

let currentDraggedElement;

function initBoard() {
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
            renderAssignedContacs(indexOfTask, element, 'assignedusers')
            getTypeLabelBoardColor(indexOfTask, 'labelBoardCard');
            calcTotalSubtask(indexOfTask, element);
        }
    }
}


function filterTask() {
    let search = document.getElementById('searchInput').value.toLowerCase().trim();
    console.log(search);

    
    for (let index = 0; index < tasks.length; index++) {
        const description = tasks[index].description;
        const title = tasks[index].title;

        if (description.toLowerCase().includes(search) || title.toLowerCase().includes(search) ) {
            console.log(description);
            console.log(title);
        }
    }
}


function renderAssignedContacs(i, users, path) {
    const assignedcontacts = document.getElementById(`${path}${i}`)

    for (let index = 0; index < users['Assigned To'].length; index++) {
        const name = users['Assigned To'][index];
        const shortname = shortNames(name);
        const color = getColorOfContact(name);

        assignedcontacts.innerHTML += renderAssignedContactsSmallCard(color, shortname);
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

    addTaskOverlay.innerHTML = renderAddtaskformHTML();
    addTaskOverlay.style.display = 'flex';    
}

function closeAddTaskDialog() {
    let addTaskOverlay = document.getElementById('addTaskOverlay');
    addTaskOverlay.style.display = 'none';
    addTaskOverlay.innerHTML = '';
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
    overlay.innerHTML = '';
    reseteditArray();
}


function tableAssignedTo(indexOfTask) {
    let tableAssigned = document.getElementById('tableAssignedTo');
    tableAssigned.innerHTML = '';

    for (let index = 0; index < tasks[indexOfTask]['Assigned To'].length; index++) {
        const name = tasks[indexOfTask]['Assigned To'][index];
        const shortname = shortNames(name);
        const color = getColorOfContact(name);

        tableAssigned.innerHTML += renderAssignedNamesAndColorsBigCard(name, color, shortname);
    }
}

function calcTotalSubtask(indexOfTask, task) {
    const subtask = task['subtask'];
    const cardSubtask = document.getElementById(`cardSubtasks${indexOfTask}`);
    let amount = 0;

    cardSubtask.innerHTML = '';

    if (subtask !== '') {
        subtask.forEach(element => {
            if (element.state == true) { amount++ }
        });

        cardSubtask.innerHTML = totalSubtaskHTML(amount, subtask.length);
        calcProgressbarSubtasks(indexOfTask, task);
    } else {
        document.getElementById(`progressbar${indexOfTask}`).classList.add('d-none')
    }
}

function calcProgressbarSubtasks(indexOfTask, task) {
    const fillerProgressbar = document.getElementById(`fillerProgressbar${indexOfTask}`);
    const subtask = task['subtask'];
    const length = subtask.length;
    let amountProgressBar = 0;

    fillerProgressbar.innerHTML = '';

    for (let i = 0; i < subtask.length; i++) {
        const state = subtask[i].state;
        if (state) {
            amountProgressBar++;
        }
        const percentBar = (amountProgressBar / length) * 100;
        fillerProgressbar.style.width = `${percentBar}%`;
    }

}


function listSubtasks(indexOfTask) {
    const subtask = document.getElementById('formSubtasks');
    subtask.innerHTML = '';

    if (tasks[indexOfTask]['subtask']) {
        for (let i = 0; i < tasks[indexOfTask]['subtask'].length; i++) {
            const element = tasks[indexOfTask]?.['subtask'][i] || '';

            subtask.innerHTML += renderSubTasksBigCars(i, element, indexOfTask)
        }
    } else {
        return false;
    }
}


function checkboxcheck(check) {
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
    saveAsSessionStorage();
    updateTaskTable('to do', 'tableToDo');
    updateTaskTable('in progress', 'tableInProgress');
    updateTaskTable('Await feedback', 'tableAwaitFeedback');
    updateTaskTable('Done', 'tableDone');
    
}


function delteTask(tasksindex) {
    closeTaskOverlay()
    tasks.splice(tasksindex, 1);
    saveAsSessionStorage();
    initBoard();
}

function editTask(tasksindex) {
    const overlay = document.getElementById('overlay');
    const currenttask = tasks[tasksindex];

    overlay.innerHTML = renderEditTasksHtml(tasksindex);
    currenttask['Assigned To'].forEach(element => {assignedToArray.push(element)  
    });  
    renderAssignedContacts()
    changePrio(`${currenttask.prio.toLowerCase()}`); 

    if (currenttask['subtask']) {
        currenttask['subtask'].forEach(element => {subtaskArray.push(element.title)  
        });  
        renderSubTasks()
    }
}

function checkRequiredfieldsEdit(){
    const inputtitle = document.getElementById('inputtitle');
    const date = document.getElementById('inputdate');

    if (inputtitle.value && date.value !== '') {
        document.getElementById('createtask').disabled = false;
      }
  
      markMissingRequiredvalue(inputtitle);
      markMissingRequiredvalue(date)
}

function isChecked(tasksindex, subtaskindex) {
    const subtask = tasks[tasksindex]['subtask'][subtaskindex];

    switch (subtask.state) {
        case true: 
        subtask.state = false;
            break;

        case false: 
        subtask.state = true;
            break;
    
        default:
            break;
    }    
    saveChangedData()
    initBoard()
}

function submitEditTask(index) {
    const currentTask = tasks[index];
    data["title"] = document.getElementById('inputtitle').value;
    data["duedate"] = document.getElementById('inputdate').value;
    data["category"] = currentTask.category;
    data["progress"] = currentTask.progress;
    data["description"] = document.getElementById('textfieldinput').value;    
    data["Assigned To"] = assignedToArray;
    subtaskArray.map((sub) => data["subtask"].push({"state":checkState(sub,currentTask), "title":sub }));
    tasks.splice(index,1,data) 

    saveChangedData() 
    closeTaskOverlay()
    initBoard()
}

function checkState(subtitle,task) {
    
    if (task.subtask) {
        subtaskfilterd = task.subtask.filter(subtask => subtask.title == subtitle);

        if (subtaskfilterd[0] !== undefined) {
            return subtaskfilterd[0].state;
        } else {
            return false
        }        
    } else {
        return false;
    }
}