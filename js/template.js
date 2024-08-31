/*CONTACT TEMPLATES*/

function createContactStripeHtml(i, isActive) {
    const contact = contacts[i];
    const activeClass = isActive ? 'active-contact' : '';
    return /*Html*/`
    <div class="contact-stripe ${activeClass}" onclick="renderContactCard(${i}); setActiveContact(${i})">
        <div class="initials ${activeClass} center" style="background-color:${contact.color};">
            ${contact.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div class="name-mail-container">
            <p class="contact-name">${contact.name}</p>
            <a class="contact-e-mail ${activeClass}"" type="e-mail" href="mailto:${contact.mail}">${contact.mail}</a>
        </div>
    </div>`;
}

function addContactHtml(contact = null, index = null) {
    let headerText = index !== null ? 'Edit Contact' : 'Add Contact';

    // Calculate initials and background color if a contact is provided
    let contactInitials = contact ? contact.name.split(' ').map(n => n[0]).join('') : '';
    let contactColor = contact ? contact.color : '#ccc'; // Fallback color

    return /*Html*/`
    <div class="left-container center">
        <img class="logo-sign" src="./assets/icons/capa 1.svg">
        <p class="headliner">${headerText}</p>
        <p class="sub-text">Tasks are better with a team!</p>
        <div class="seperator-3"></div>
    </div>    
    <div class="mid-container center">
        <div class="person-container center" id="edit-initials" style="background-color:${contactColor};">
            ${contactInitials ? `<div class="contact-card-initials center">${contactInitials}</div>` : `<img class="person" src="./assets/icons/person.svg">`}
        </div>
    </div>
    <div class="input-box">
        <div class="close-icon center">
            <img src="./assets/icons/close.svg" onclick="closePopUpSlide()">
        </div>
        <input class="input input-name" id="name-input" type="text" placeholder="Name" value="${contact ? contact.name : ''}">
        <input class="input input-mail" id="mail-input" type="email" placeholder="Email" value="${contact ? contact.mail : ''}">
        <input class="input input-phone" id="phone-input" type="tel" placeholder="Phone" value="${contact ? contact.phonenumber : ''}">
        <input type="hidden" id="contact-index" value="${index !== null ? index : ''}">
        <div class="button-box">
            <button class="button-empty-small cancel-button" onclick="closePopUpSlide()">Cancel</button>
            <button class="button-filled-large create-button" id="create-save-button" onclick="chooseCreateOrSave()">${index !== null ? 'Save Contact' : 'Create Contact'}</button>
        </div>
    </div>
    `;
}


function contactCardHtml(contact, index) {
    let contactColor = contact.color;
    return /*Html*/`
    <div class="contact-container center">
        <div class="contact-headline">
            <div class="contact-card-initials center" id="initials-and-color" style="background-color:${contactColor};">
                ${contact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div class="big-contact-name">
                <p class="name" id="nameedit">${contact.name}</p>
                <div class="icons">
                    <a class="edit" onclick="editContact(${index})">edit</a>
                    <a class="delete" onclick="deleteContact(${index})">Delete</a>
                </div>
            </div>
        </div>
        <p>Contact Information</p>
        <div class="phone-and-e-mail-container" id="mailedit">
            <p><b>Email</b></p>
            <a href="mailto:${contact.mail}" class="e-mail-card" id="phonedit">${contact.mail}</a>
        </div>
        <div class="phone-and-e-mail-container">
            <p><b>Phone</b></p>
            <a href="tel:${contact.phonenumber}">${contact.phonenumber}</a>
        </div>
    </div>
    `;
}
