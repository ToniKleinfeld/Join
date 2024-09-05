let lastInitial = '';
let activeContactIndex = null;
let index = 1;

function init() {
    sortContacts();
    renderContactStripes();
}

//RENDERN***************************************************

function renderContactStripes() {
    let contactContainer = document.getElementById('contacts-register');
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
        console.error(`No contact found for index ${index}`);
    }
}

//Show-Hide Overlay/Add Conatct/Edit Contact**************************************************

function showOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.classList.remove('d-none');
    overlay.classList.remove('fade-out');
    overlay.classList.remove('slide-out');
    overlay.classList.remove('hide');
    overlay.innerHTML = overlayHtml();
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
    let isMobile = window.matchMedia("(max-width: 825px)").matches;
    overlay.classList.add('fade-out');
    if (isMobile) {
        overlay.addEventListener('animationend', function handler() {
            overlay.classList.add('d-none');
            overlay.removeEventListener('animationend', handler);
        });
    } else {
        setTimeout(function () {
            overlay.classList.add('d-none');
            overlay.classList.remove('fade-out');
        }, 500);
    }
    mobileButton.classList.remove('hide');
}


function createContact() {
    let [nameInput, mailInput, phoneInput] = ['name-input', 'mail-input', 'phone-input'].map(id => document.getElementById(id));
    let [name, mail, phonenumber] = [nameInput.value, mailInput.value, phoneInput.value];
    contacts.push({
        mail, name, phonenumber,
        color: getRandomColor(),
        initials: getInitials(name)
    });
    nameInput.value = mailInput.value = phoneInput.value = '';
    closeOverlayFade();
    showMessage();
    renderContactStripes();
}

function editContact(index) {
    let contact = contacts[index];
    let overlay = document.getElementById('overlay');
    overlay.innerHTML = overlayHtml(contact, index);
    overlay.classList.remove('d-none', 'hide');
    setTimeout(() => {
        document.getElementById('create-save-button').innerHTML = 'Save Contact';
        document.getElementById('edit-subtext').classList.add('d-none');
        document.getElementById('name-input').value = contact.name;
        document.getElementById('mail-input').value = contact.mail;
        document.getElementById('phone-input').value = contact.phonenumber;
    }, 0);
}

//Add-Edit-Delete Conatct**************************************************

function chooseCreateOrSave() {
    let button = document.getElementById('create-save-button');
    let text = button.innerHTML;
    if (text === 'Create Contact') {
        createContact();
    } else if (text === 'Save Contact') {
        saveContact();
    }
}

function saveContact() {
    let index = document.getElementById('contact-index').value;
    let [nameInput, mailInput, phoneInput] = ['name-input', 'mail-input', 'phone-input'].map(id => document.getElementById(id));
    let [name, mail, phonenumber] = [nameInput.value, mailInput.value, phoneInput.value];
    let contactData = { mail, name, phonenumber };
    if (index) {
        contacts[index] = contactData;
    } else {
        contacts.push(contactData);
    }
    nameInput.value = mailInput.value = phoneInput.value = '';
    closeOverlayFade();
    renderContactStripes();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    renderContactStripes();
    clearContactCard();
}

//Dynamic Adjustments (Mobile)**************************************************

function toggleClass() {
    if (window.innerWidth <= 825) {
        let register = document.getElementById('contacts-register');
        let mobileButtonIcon = document.getElementById('relative-icon');
        register.classList.add('d-none');
        mobileButtonIcon.src = './assets/icons/burger-menu.svg';
    }
}

function showMobileEditMenu() {
    let popUp = document.getElementById('mobile-edit-menu');
    let mobileButtonIcon = document.getElementById('relative-icon');
    let mobileButton = document.getElementById('mobile-button-container');
    if (popUp && mobileButtonIcon && mobileButton) {
        let iconSrc = mobileButtonIcon.src.split('/').pop();
        if (iconSrc === 'burger-menu.svg') {
            popUp.classList.remove('d-none');
            popUp.innerHTML = mobileMenuPopUpHtml();
        } else {
            showOverlay();
        }
        mobileButton.classList.add('hide');
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
    let register = document.getElementById('contacts-register');
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