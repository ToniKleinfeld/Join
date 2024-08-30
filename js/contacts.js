let lastInitial = '';
let activeContactIndex = null;

function init() {
    sortContacts();
    renderContactStripes();
}

function renderContactStripes() {
    let contactContainer = document.getElementById('contacts-slider');
    contactContainer.innerHTML = '';
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

function deleteContact(index) {
    contacts.splice(index, 1);
    renderContactStripes();
    clearContactCard();
}

function clearContactCard() {
    let contactCard = document.getElementById('card-of-contact');
    contactCard.innerHTML = '';
}

function editContact(index) {
    let popUp = document.getElementById('add-edit-contact');
    popUp.innerHTML = addContactHtml(index);

    popUp.classList.remove('d-none');

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
            closePopUp();
        };
    } 
}

function sortContacts() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
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

function addContact() {
    let popUp = document.getElementById('add-edit-contact');
    popUp.classList.remove('d-none');
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
    saveContactsToLocalStorage();
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';
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

