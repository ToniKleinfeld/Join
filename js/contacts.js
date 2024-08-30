let lastInitial = '';
let activeContactIndex = null;

function init() {
    sortContacts();
    renderContactStripes();
}
//RENDERN***************************************************

function renderContactStripes() {
    let contactContainer = document.getElementById('contacts-slider');
    contactContainer.innerHTML = /*Html*/`<div class="button-container"><button class="button-filled-large add-button" onclick="addContact()">Add contact</button></div>`;
    lastInitial = '';
    sortContacts();
    for (let i = 0; i < contacts.length; i++) {
        contactContainer.innerHTML += contactRegisterHtml(i, i === activeContactIndex);
    }
}

function createFontStripeHtml(currentInitial, lastInitial) {
    let html = '';
    if (currentInitial !== lastInitial) {
        html = /*Html*/`
        <div class="font-stripe">${currentInitial}</div>`;
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

//KONTAKTE SORTIEREN***************************************************

function sortContacts() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
}

//KONTAKT AKTIV MARKIEREN***************************************************

function setActiveContact(index) {
    activeContactIndex = index;
    renderContactStripes(); // Rendern der Kontaktliste, um die aktive Markierung zu zeigen
}

//KONTAKT ANSEHEN***************************************************

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

//KONTAKTE HINZUFÜGEN***************************************************

function addContact() {
    let popUp = document.getElementById('add-edit-contact');
    popUp.classList.remove('d-none');
    popUp.classList.remove('hide');
    popUp.innerHTML = addContactHtml();
}

function createContact() {
    let nameInput = document.getElementById('name-input');
    let mailInput = document.getElementById('mail-input');
    let phoneInput = document.getElementById('phone-input');
    let name = nameInput.value;
    let mail = mailInput.value;
    let phonenumber = phoneInput.value;
    contacts.push({
        "mail": mail,
        "name": name,
        "phonenumber": phonenumber,
        "color": getRandomColor() // Farbe zuweisen
    });
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';
    renderContactStripes();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    renderContactStripes();
    clearContactCard();
}

function clearContactCard() {
    let contactCard = document.getElementById('card-of-contact');
    contactCard.innerHTML = '';
}

//KONTAKT EDITIEREN***************************************************

function editContact(index) {
    let popUp = document.getElementById('add-edit-contact');
    popUp.innerHTML = addContactHtml(index);
    let saveButton = document.getElementById('create-save-button');
    saveButton.innerHTML = `Save Contact`;

    popUp.classList.remove('d-none');
    popUp.classList.remove('hide');

    let contact = contacts[index];

    let nameInput = document.getElementById('name-input');
    let mailInput = document.getElementById('mail-input');
    let phoneInput = document.getElementById('phone-input');
    if (nameInput && mailInput && phoneInput) {
        nameInput.value = contact.name;
        mailInput.value = contact.mail;
        phoneInput.value = contact.phonenumber;
        document.querySelector('.create-button').onclick = function () {
            contact.name = nameInput.value;
            contact.mail = mailInput.value;
            contact.phonenumber = phoneInput.value;
            renderContactStripes();
        };
    }
}

//KONTAKT ERSTELLEN/SPEICHERN/LÖSCHEN**************************************************

function closePopUpSlide() {
    let popUp = document.getElementById('add-edit-contact');
    popUp.classList.add('slide-out');
}

function closePopUpFade() {
    let popUp = document.getElementById('add-edit-contact');
    popUp.classList.add('fade-out');
}

function chooseCreateOrSave() {
    let button = document.getElementById('create-save-button');
    let text = button.innerHTML;

    if (text === 'Create Contact') {
        createContact();
    } else if (text === 'Save Contact') { // Sicherstellen, dass die andere Option auch korrekt überprüft wird
        saveContact();
    }
    closePopUpFade();
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
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';
    renderContactStripes(); // Kontakte neu rendern
}

/*BAUSTELLE---------------------------------------------------------------

function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Beim Initialisieren den Kontakten Farben zuweisen
contacts.forEach(contact => {
    contact.color = getRandomColor(); // Füge die Farbe als neue Eigenschaft hinzu
});

--------------------------------------------------------------------------*/

