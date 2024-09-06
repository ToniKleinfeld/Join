/*CONTACT HTML*/

function createContactStripeHtml(i, isActive) {
    const contact = contacts[i];
    const activeClass = isActive ? 'active-contact' : '';
    return /*Html*/`
    <div class="contact center ${activeClass}" onclick="renderContactCard(${i}); setActiveContact(${i}); toggleClass()">
        <div class="initials center ${activeClass} center" style="background-color:${contact.color};">
            ${contact.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div class="bold-text">
            <p >${contact.name}</p>
            <a class="${activeClass}" type="e-mail" href="mailto:${contact.mail}">${contact.mail}</a>
        </div>
    </div>`;
}

function overlayHtml(contact = null, index = null) {
    let headerText = index !== null ? 'Edit contact' : 'Add contact';

    // Calculate initials and background color if a contact is provided
    let contactInitials = contact ? contact.name.split(' ').map(n => n[0]).join('') : '';
    let contactColor = contact ? contact.color : '#ccc'; // Fallback color

    return /*Html*/`
    <div class="left-container center">
        <img class="logo" src="./assets/icons/capa 1.svg">
        <p class="motto-label">${headerText}</h1>
        <p class="motto-subtext" id="edit-subtext">Tasks are better with a team!</p>
        <div class="seperator-overlay"></div>
    </div>    
    <div class="mid-container center">
        <div class="initials initials--open-contact center" id="edit-initials" style="background-color:${contactColor};">
            ${contactInitials ? `<div>${contactInitials}</div>` : `<img class="person-svg" src="./assets/icons/person.svg">`}
        </div>
    </div>
    <div class="right-container center">
        <div class="close-icon center" onclick="closeOverlaySlide()">
            <img src="./assets/icons/close.svg">
        </div>
        <div class="input-button-box center">
        <input class="input input-name" id="name-input" type="text" placeholder="Name" value="${contact ? contact.name : ''}">
        <input class="input input-mail" id="mail-input" type="email" placeholder="Email" value="${contact ? contact.mail : ''}">
        <input class="input input-phone" id="phone-input" type="tel" placeholder="Phone" value="${contact ? contact.phonenumber : ''}">
        <input type="hidden" id="contact-index" value="${index !== null ? index : ''}">
        <div class="button-box center">
            <button class="button-empty-small cancel-button" onclick="closeOverlaySlide()">Cancel</button>
            <button class="button-filled-large create-button" id="create-save-button" onclick="chooseCreateOrSave()">${index !== null ? 'Save Contact' : 'Create Contact'}</button>
        </div>
        </div>
    </div>
    `;
}

function contactCardHtml(contact, index) {
    let contactColor = contact.color;
    return /*Html*/`
        <div class="open-contact-headline center">
            <div class="initials initials--open-contact center" id="initials-and-color" style="background-color:${contactColor};">
                ${contact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="open-contact-name-and-icons center">
                <p class="center" id="nameedit">${contact.name}</p>
                <div class="icons center">
                    <a class="edit" onclick="editContact(${index})">edit</a>
                    <a class="delete" onclick="deleteContact(${index})">Delete</a>
                </div>
            </div>
            </div>
        <p><b>Contact Information</b></p>
        <div class="phone-and-e-mail-container" id="mailedit">
            <p><b>Email</b></p>
            <a href="mailto:${contact.mail}" class="e-mail-card" id="phonedit">${contact.mail}</a>
        </div>
        <div class="phone-and-e-mail-container">
            <p><b>Phone</b></p>
            <a href="tel:${contact.phonenumber}" style="color: black;">${contact.phonenumber}</a>
    </div>
    `;
}

function createFontStripeHtml(currentInitial, lastInitial) {
    let html = '';
    if (currentInitial !== lastInitial) {
        html = /*Html*/`
        <div class="register-letter bold-text center">${currentInitial}</div>`;
    }
    return html;
}

function contactRegisterHtml(i, isActive = false) {
    const currentInitial = contacts[i].name.charAt(0).toUpperCase();
    const fontStripeHtml = createFontStripeHtml(currentInitial, lastInitial);
    lastInitial = currentInitial;
    const contactStripeHtml = createContactStripeHtml(i, isActive);
    return `${fontStripeHtml}${contactStripeHtml}`;
}

function mobileMenuPopUpHtml() {
    return /*HTML*/`
       <p class="mobile-link edit" onclick="editContact(${index})">Edit</p>
       <p class="mobile-link delete" onclick="deleteContact()">Delete</p>
    `;
}

/* Add Tasks HTML */

function renderAssignedContactshtml(shortname,color) {
    return /*html*/`
       <div class="contacticon center" style="background-color:${color};">${shortname}</div>
    `
  }  

function renderHtmlContactLi(name,shortname,color) {
  return /*html*/`
    <li class="contactslistassign">
      <input type="checkbox" id="${name}" onchange="assignedToTasK('${name}')"/>
      <span class="checkmark"></span>
      <label for="${name}">
        <span class="contacticon center" style="background-color:${color};">${shortname}</span> ${name} 
      </label>
      </li>
  `
}
function renderHtmlContactLiUser(name,shortname) {
  return /*html*/`
    <li class="contactslistassign">
      <input type="checkbox" id="${name}" onchange="assignedToTasK('${name}')"/>
      <span class="checkmark"></span>
      <label for="${name}">
        <span class="contacticon center">${shortname}</span> ${name} (You)
      </label>
      </li>
  `
}
function subTaskHtml(subtask,i) {
  return /*html*/`
    <li>
      <span class="dot" id="dotsub${i}"></span>
      <div class="subtaskslable">                            
          <input class="subtasksli" type="text" disabled value="${subtask}" id="subtask${i}" onkeypress="checkPressEnter(event,'edit',${i})">                             
          <span id="subhover${i}">
              <i class="editbutton" onclick="editSubTask(${i})"></i>
              <i class="deletebutton" onclick="delteSubTask(${i})"></i>
          </span>
          <span class="subtaskediticons d-none" id="subtaskediticons${i}">
              <i class="deletebuton" onclick="renderSubTasks()"></i>
              <i class="addsubtask" onclick="saveEditSubtask(${i})"></i>
          </span>
      </div>
    </li>
  `
}

/**   board HTML   */

function showNoTaskContainerHTML(text) {
  return /*html*/`
      <div class="no-tasks-container">No tasks ${text}</div>
  `;
}

function renderAssignedContactsSmallCard(color,shortname) {
    return /*html*/`
        <span class="circle circle-to-do" style="background-color:${color}">${shortname}</span>
    `
}

function totalSubtaskHTML(amount,totalSubtask) {
    return /*html*/`
        <div>
            ${amount}/${totalSubtask} Subtask
        </div>
    `
}

function renderCardHTML(element, indexOfTask) {
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
                    <div class="progressbar" id="progressbar${indexOfTask}">
                        <div id="fillerProgressbar${indexOfTask}" class="filler"></div>
                    </div>
                    <div id="cardSubtasks${indexOfTask}" class="card-subtasks"></div>
                </div>
                <div class="circle-prio-container">
                    <div class="circle-container" id="assignedusers${indexOfTask}">

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

function renderSubTasksBigCars(i,element,indexOfTask) {
    return /*html*/`
            <div class="checkbox-title-container">
                <input onclick="isChecked(${indexOfTask},${i})" class="checkbox" type="checkbox" ${checkboxcheck(element.state,i)}  id="checkbox${i}" name="checkbox${i}"/>
                <label for="checkbox${i}">${element.title}</label>
            </div>
    `
}

function renderAssignedNamesAndColorsBigCard(name,color,shortname) {
    return /*html*/`
            <div class="assigned-row-overlay">
                <span class="circle circle-in-progress" style="background-color:${color}">${shortname}</span>
                <span>${name}</span>
            </div>
    `
}

function rendertaskOverlayHTML(indexOfTask) {
    return /*html*/`
    <div class="task-overlay-container" onclick="doNotClose(event)">
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
            <div class="subtasks-grid-overlay" id="formSubtasks">
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