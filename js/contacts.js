let lastInitial = ''; // Globale Variable, um den letzten Initialbuchstaben zu speichern
const colors = ['#9327FF','#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
let activeContactIndex = null;


function init() {
    loadContactsFromLocalStorage();  // Kontakte aus dem Local Storage laden
    sortContacts();                  // Kontakte alphabetisch sortieren
    renderContactStripes();          // Kontakte rendern
}



/*TEMPLATES*/

function contactsHtml(i, isActive = false) {
    if (!contacts[i]) {
        console.error(`Kein Kontakt gefunden für Index ${i}`);
        return '';
    }

    let currentInitial = contacts[i].name.charAt(0).toUpperCase();
    let activeClass = isActive ? 'active-contact' : '';

    let html = '';

    if (currentInitial !== lastInitial) {
        html += /*Html*/`
        <div class="font-stripe">${currentInitial}</div>`;
        lastInitial = currentInitial; // Aktualisiere den letzten Initialbuchstaben
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




function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Beim Initialisieren den Kontakten Farben zuweisen
contacts.forEach(contact => {
    contact.color = getRandomColor(); // Füge die Farbe als neue Eigenschaft hinzu
});



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

function deleteContact(index) {
    contacts.splice(index, 1);

    // Kontakte im Local Storage speichern
    saveContactsToLocalStorage();

    renderContactStripes();
    clearContactCard();
}

function clearContactCard() {
    // Löscht den Inhalt der Kontaktkarte
    let contactCard = document.getElementById('card-of-contact');
    contactCard.innerHTML = '';
}



function editContact(index) {
    let popUp = document.getElementById('add-edit-contact');
    popUp.innerHTML = addContactHtml(index); // Setze das HTML für das Pop-up

    popUp.classList.remove('d-none'); // Pop-up sichtbar machen

    let contact = contacts[index];

    let nameInput = document.getElementById('name-input');
    let mailInput = document.getElementById('mail-input');
    let phoneInput = document.getElementById('phone-input');

    if (nameInput && mailInput && phoneInput) {
        nameInput.value = contact.name;
        mailInput.value = contact.mail;
        phoneInput.value = contact.phonenumber;

        document.querySelector('.create-button').onclick = function() {
            // Werte aktualisieren
            contact.name = nameInput.value;
            contact.mail = mailInput.value;
            contact.phonenumber = phoneInput.value;

            // Kontakte im Local Storage speichern
            saveContactsToLocalStorage();

            // Kontaktliste neu rendern und Pop-up schließen
            renderContactStripes();
            closePopUp();
        };
    } else {
        console.error('Eingabefelder nicht gefunden!');
    }
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

function sortContacts() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
}


/*RENDERN*/

function renderContactStripes() {
    let contactContainer = document.getElementById('contacts-slider');
    contactContainer.innerHTML = ''; // Leert die Kontaktliste
    lastInitial = ''; // Setzt die letzte Initiale zurück

    // Kontakte alphabetisch sortieren
    sortContacts();

    for (let i = 0; i < contacts.length; i++) {
        contactContainer.innerHTML += contactsHtml(i, i === activeContactIndex);
    }
}







function setActiveContact(index) {
    activeContactIndex = index;
    renderContactStripes(); // Rendern der Kontaktliste, um die aktive Markierung zu zeigen
}

function renderContactCard(index) {
    let contactCard = document.getElementById('card-of-contact');
    contactCard.innerHTML = '';

    if (contacts[index]) {
        contactCard.innerHTML = contactCardHtml(contacts[index], index);
        setActiveContact(index); // Setzt den aktiven Kontakt
    } else {
        console.error(`Kein Kontakt gefunden für Index ${index}`);
    }
}

/*KONTAKTE HINZUFÜGEN/BEARBEITEN/LÖSCHEN*/

function addContact() {
    let popUp = document.getElementById('add-edit-contact');

    popUp.classList.remove('d-none');
    popUp.innerHTML = addContactHtml();
}

/*DATEN LADEN/SPEICHERN*/

function createContact() {
    // Werte aus den Input-Feldern auslesen
    let nameInput = document.getElementById('name-input');
    let mailInput = document.getElementById('mail-input');
    let phoneInput = document.getElementById('phone-input');

    let name = nameInput.value;
    let mail = mailInput.value;
    let phonenumber = phoneInput.value;

    // Neuen Kontakt erstellen und dem Array hinzufügen
    contacts.push({
        "mail": mail,
        "name": name,
        "phonenumber": phonenumber,
        "color": getRandomColor() // Farbe zuweisen
    });

    // Kontakte im Local Storage speichern
    saveContactsToLocalStorage();

    // Input-Felder leeren
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';

    // Kontaktliste neu rendern
    renderContactStripes();
}

function closePopUp() {
    let popUp = document.getElementById('add-edit-contact');
    popUp.classList.add('d-none');
    popUp.innerHTML = ''; // Pop-up leeren
}


function saveContact() {
    let index = document.getElementById('contact-index').value;
    let nameInput = document.getElementById('name-input');
    let mailInput = document.getElementById('mail-input');
    let phoneInput = document.getElementById('phone-input');

    let name = nameInput.value;
    let mail = mailInput.value;
    let phonenumber = phoneInput.value;

    if (index) {
        // Update existing contact
        contacts[index] = {
            "mail": mail,
            "name": name,
            "phonenumber": phonenumber
        };
    } else {
        // Create new contact
        contacts.push({
            "mail": mail,
            "name": name,
            "phonenumber": phonenumber
        });
    }

    // Clear input fields
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';

    closePopUp();  // Schließe das Pop-up nach dem Speichern
    renderContactStripes(); // Kontakte neu rendern
}

function saveContactsToLocalStorage() {
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
        contacts = JSON.parse(storedContacts);
    }
}



