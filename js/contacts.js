let lastInitial = '';
let activeContactIndex = null;

function init() {
    sortContacts();
    renderContactStripes();
}

//RENDERN***************************************************

function renderContactStripes() {
    let contactContainer = document.getElementById('contacts-slider');
    contactContainer.innerHTML = /*Html*/`<div class="register-button-container subtext">
        <button class="button-filled-large register-add-button" onclick="showOverlay()">Add new contact</button> </div>`;
    lastInitial = '';
    sortContacts();
    for (let i = 0; i < contacts.length; i++) {
        contactContainer.innerHTML += contactRegisterHtml(i, i === activeContactIndex);
    }
}

function renderContactCard(index) {
    let contactCard = document.getElementById('open-contact');
    contactCard.innerHTML = '';
    if (contacts[index]) {
        contactCard.innerHTML = contactCardHtml(contacts[index], index);
        setActiveContact(index);
    } else {
        console.error(`Kein Kontakt gefunden für Index ${index}`);
    }
}

function showMobileEditMenu() {
    let popUp = document.getElementById('mobile-edit-menu');
    let mobileButtonIcon = document.getElementById('relative-icon');
    let mobileButton = document.getElementById('mobile-button-container');

    // Extrahiere nur den Dateinamen aus der src-Eigenschaft
    let iconSrc = mobileButtonIcon.src.split('/').pop();

    if (iconSrc === 'burger-menu.svg') {
        popUp.classList.remove('d-none');
    } else {
        addContact();
    }

    mobileButton.classList.add('hide');
}

//Show-Hide Overlay/Add Conatct/Edit Contact**************************************************

function showOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    overlay.classList.remove('fade-out');
    overlay.classList.remove('slide-out');
    overlay.classList.remove('hide');
    overlay.innerHTML = showOverlayHtml();
}

function closeOverlaySlide() {
    let overlay = document.getElementById('overlay');
    let mobileButton = document.getElementById('mobile-button-container');
    overlay.classList.add('slide-out');
    setTimeout(function () {
        overlay.classList.add('hide');
        overlay.classList.add('d-none');
    }, 500);
    mobileButton.classList.remove('hide');
}

function closeOverlayFade() {
    let overlay = document.getElementById('overlay');
    let mobileButton = document.getElementById('mobile-button-container');
    overlay.classList.add('fade-out');
    setTimeout(function () {
        overlay.classList.add('d-none');
        overlay.classList.remove('fade-out');
    }, 500);
    mobileButton.classList.remove('hide');
}


function createContact() {
    let nameInput = document.getElementById('name-input');
    let mailInput = document.getElementById('mail-input');
    let phoneInput = document.getElementById('phone-input');
    let name = nameInput.value;
    let mail = mailInput.value;
    let phonenumber = phoneInput.value;

    // Generiere eine zufällige Farbe
    let randomColor = getRandomColor();

    // Generiere Initialen aus dem Namen
    let initials = getInitials(name);

    contacts.push({
        "mail": mail,
        "name": name,
        "phonenumber": phonenumber,
        "color": randomColor, // Die zufällige Farbe wird hier hinzugefügt
        "initials": initials  // Die Initialen werden hier hinzugefügt
    });

    // Felder leeren
    nameInput.value = '';
    mailInput.value = '';
    phoneInput.value = '';

    closeOverlayFade();
    showMessage();
    renderContactStripes();
}




function editContact(index) {
    let contact = contacts[index];

    // Pass the contact and index to addContactHtml
    let popUp = document.getElementById('add-edit-contact');
    popUp.innerHTML = addContactHtml(contact, index);




    let text = document.getElementById('create-save-button');
    text.innerHTML = `Save Contact`;

    let subtext = document.getElementById('edit-subtext');
    subtext.classList.add('d-none');

    popUp.classList.remove('d-none');
    popUp.classList.remove('hide');

    let nameInput = document.getElementById('name-input');
    let mailInput = document.getElementById('mail-input');
    let phoneInput = document.getElementById('phone-input');

    if (nameInput && mailInput && phoneInput) {
        nameInput.value = contact.name;
        mailInput.value = contact.mail;
        phoneInput.value = contact.phonenumber;
    }
}

function toggleClass() {
    if (window.innerWidth <= 825) {
        let register = document.getElementById('contacts-slider');
        let mobileButtonIcon = document.getElementById('relative-icon');

        // Klassen hinzufügen/entfernen
        register.classList.add('d-none');

        // Quelle des mobileButton-Bildes ändern
        mobileButtonIcon.src = './assets/icons/burger-menu.svg';  // Pfad zum neuen Bild einfügen
    }
}

function showMessage() {
    let popUp = document.getElementById('successfull-message');
    popUp.classList.remove('d-none');

    // Aufruf von hideMessage nach 3 Sekunden (3000 Millisekunden)
    setTimeout(hideMessage, 1500);
}

function hideMessage() {
    let popUp = document.getElementById('successfull-message');
    popUp.classList.remove('slide-in'); // Entferne den Slide-In-Effekt, falls vorhanden
    popUp.classList.add('slide-out');

    // Zeit basierend auf der Dauer der slide-out-Animation
    setTimeout(() => {
        popUp.classList.add('d-none'); // Verstecke das Element nach der Animation
        popUp.classList.remove('slide-out'); // Entferne die slide-out-Klasse
    }, 500); // Setze dies auf die Dauer der Animation in Millisekunden
}


function toggleMenu() {
    const menu = document.getElementById('mobile-edit-menu');
    menu.classList.add('slide-out');
}


function goBack() {
    let register = document.getElementById('contacts-slider');
    let mobileButtonIcon = document.getElementById('relative-icon');

    register.classList.remove('d-none');
    mobileButtonIcon.src = './assets/icons/person_add.svg';  // Pfad zum neuen Bild einfügen

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



function clearContactCard() {
    let contactCard = document.getElementById('open-contact');
    contactCard.innerHTML = '';
}



// Funktion zur Generierung einer zufälligen Farbe
function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Funktion zur Generierung der Initialen aus einem Namen
function getInitials(name) {
    let nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
        return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
    } else if (nameParts.length === 1) {
        return nameParts[0][0].toUpperCase();
    }
    return ''; // Fallback, falls der Name leer ist oder aus unerwarteten Gründen keine Initialen gefunden werden können
}

//KONTAKT ERSTELLEN/SPEICHERN/LÖSCHEN**************************************************

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
    closeOverlayFade();
    renderContactStripes(); // Kontakte neu rendern
}

function chooseCreateOrSave() {
    let button = document.getElementById('create-save-button');
    let text = button.innerHTML;

    if (text === 'Create Contact') {
        createContact();
    } else if (text === 'Save Contact') { // Sicherstellen, dass die andere Option auch korrekt überprüft wird
        saveContact();
    }
}

function deleteContact(index) {
    contacts.splice(index, 1);
    renderContactStripes();
    clearContactCard();
}


/*EXPERIMENTELL

function shortNames(name) {
    return  name.match(/\b(\w)/g).join('');
  }

  function getColorOfContact(name){
    const filtercontacs = contacts.filter(contact => contact.name == name
    );
    return filtercontacs[0].color
  }
*/