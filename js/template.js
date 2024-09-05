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

function addContactHtml(contact = null, index = null) {
    let headerText = index !== null ? 'Edit contact' : 'Add contact';

    // Calculate initials and background color if a contact is provided
    let contactInitials = contact ? contact.name.split(' ').map(n => n[0]).join('') : '';
    let contactColor = contact ? contact.color : '#ccc'; // Fallback color

    return /*Html*/`
    <div class="left-container center">
        <img class="logo" src="./assets/icons/capa 1.svg">
        <p class="motto-label">${headerText}</h1>
        <p class="motto-subtext" id="edit-subtext">Tasks are better with a team!</p>
        <div class="seperator seperator--overlay"></div>
    </div>    
    <div class="mid-container center">
        <div class="initials initials--open-contact center" id="edit-initials" style="background-color:${contactColor};">
            ${contactInitials ? `<div>${contactInitials}</div>` : `<img class="person-svg" src="./assets/icons/person.svg">`}
        </div>
    </div>
    <div class="right-container center">
        <div class="close-icon center">
            <img src="./assets/icons/close.svg" onclick="closePopUpSlide()">
        </div>
        <div class="input-button-box center">
        <input class="input input-name" id="name-input" type="text" placeholder="Name" value="${contact ? contact.name : ''}">
        <input class="input input-mail" id="mail-input" type="email" placeholder="Email" value="${contact ? contact.mail : ''}">
        <input class="input input-phone" id="phone-input" type="tel" placeholder="Phone" value="${contact ? contact.phonenumber : ''}">
        <input type="hidden" id="contact-index" value="${index !== null ? index : ''}">
        <div class="button-box center">
            <button class="button-empty-small cancel-button" onclick="closePopUpSlide()">Cancel</button>
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
