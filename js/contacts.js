let lastInitial = '';
const colors = ['#9327FF', '#6E52FF', '#FC71FF', '#FFBB2B', '#1FD7C1', '#462F8A', '#FF4646'];
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
        contactContainer.innerHTML += contactsHtml(i, i === activeContactIndex);
    }
}

function renderContactCard(index) {
    let contactCard = document.getElementById('card-of-contact');
    contactCard.innerHTML = '';
    if (contacts[index]) {
        contactCard.innerHTML = contactCardHtml(contacts[index], index);
        setActiveContact(index);
    } else {
        console.error(`Kein Kontakt gefunden für Index ${index}`);
    }
}

function sortContacts() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function setActiveContact(index) {
    activeContactIndex = index;
    renderContactStripes();
}

/*FARBZUWEISUNG NOCH ANPASSEN*/

function getRandomColor() {
    let randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}
contacts.forEach(contact => {
    contact.color = getRandomColor();
});

/*__________________________________________________*/

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

function deleteContact(index) {
    contacts.splice(index, 1);
    renderContactStripes();
    clearContactCard();
}

function clearContactCard() {
    let contactCard = document.getElementById('card-of-contact');
    contactCard.innerHTML = '';
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
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';
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
        contacts[index] = {
            "mail": mail,
            "name": name,
            "phonenumber": phonenumber
        };
    } else {
        contacts.push({
            "mail": mail,
            "name": name,
            "phonenumber": phonenumber
        });
    }
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';
    closePopUp();
    renderContactStripes();
}

function closePopUp() {
    let popUp = document.getElementById('add-edit-contact');
    popUp.classList.add('d-none');
    popUp.innerHTML = '';
}

