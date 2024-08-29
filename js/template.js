/*CONTACT-JS*/

function contactsHtml(i, isActive = false) {
    let currentInitial = contacts[i].name.charAt(0).toUpperCase();
    let activeClass = isActive ? 'active-contact' : '';
    let html = '';
    if (currentInitial !== lastInitial) {
        html += /*Html*/`
        <div class="font-stripe">${currentInitial}</div>`;
        lastInitial = currentInitial; 
    }

    html += /*Html*/`
    <div class="contact-stripe ${activeClass}" onclick="renderContactCard(${i}); setActiveContact(${i})">
        <div class="initials center" style="background-color:${contacts[i].color};">
            ${contacts[i].name.split(' ').map(n => n[0]).join('')}
        </div>
        <div class="name-mail-container">
            <p class="contact-name">${contacts[i].name}</p>
            <a class="contact-e-mail" type="e-mail" href="mailto:${contacts[i].mail}">${contacts[i].mail}</a>
        </div>
    </div>
    `;

    return html;
}

function contactCardHtml(contact, index) {
    let contactColor = contact.color;
    return /*Html*/`
    <div class="contact-container center">
        <div class="contact-headline">
            <div class="contact-card-initials center" style="background-color:${contactColor};">
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

function addContactHtml(index = null) { 
    let headerText = index !== null ? 'Edit Contact' : 'Add Contact';
    return /*Html*/`
    <div class="left-container center">
        <img class="logo-sign" src="./assets/icons/capa 1.svg">
        <p class="headliner">${headerText}</p>
        <p class="sub-text">Tasks are better with a team!</p>
        <div class="seperator-3"></div>
    </div>    
    <div class="mid-container center">
        <div class="person-container center">
            <img class="person" src="./assets/icons/person.svg">
        </div>
    </div>
    <div class="input-box">
        <div class="close-icon center">
            <img src="./assets/icons/close.svg" onclick="closePopUp()">
        </div>
        <input class="input input-name" id="name-input" type="text" placeholder="Name">
        <input class="input input-mail" id="mail-input" type="email" placeholder="Email">
        <input class="input input-phone" id="phone-input" type="tel" placeholder="Phone">
        <input type="hidden" id="contact-index"> <!-- Verstecktes Feld für den Index -->
        <div class="button-box">
            <button class="button-empty-small cancel-button" onclick="closePopUp()">Cancel</button>
            <button class="button-filled-large create-button" onclick="saveContact()">Save Contact</button>
        </div>
    </div>
    `;
}