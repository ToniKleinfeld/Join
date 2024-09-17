let lastInitial = '';
let activeContactIndex = null;
let index = 1;
let lastviewcontact = '';

/**
 * Loading all needed functions onload from side
 */
function init() {
    sortContacts();
    renderContactStripes();
}



/**
 * function to create the small contact fields
 */
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

/**
 * 
 * @param {string} index - the indexnumber , to get the contactsarray number * 
 */
function renderContactCard(index) {
    let contactCard = document.getElementById('open-contact');
    contactCard.innerHTML = '';
    if (contacts[index]) {
        contactCard.innerHTML = contactCardHtml(contacts[index], index);
        setActiveContact(index);
        return lastviewcontact = index;
    } else {
        console.error(`No contact found for index ${index}`);
    }
}

/**
 * 
 * @param {string} index -current index of contact
 * @returns - give the container display none if contact -> user
 */
function checkIfContactisActualUser(index) {
    const contact = contacts[index].name;
    if (contact == user) {
        return /*html*/`style="display:none"`
    } 
}

/**
 * 
 * @param {string} inputvalue - inputvalue from edit namefield
 * @param {string} index - indexnumber of contact
 * @returns 
 */
function dontRenameUser(inputvalue,index) {
    const contact = contacts[index].name
    if (contact == user) {
        return user
    } else {
        return inputvalue
    }    
}

/**
 * add vissible to the create / edit overlay and add the fade-in / out effects 
 */
function showOverlay() {
    let overlay = document.getElementById('overlay');
    const overlaycontainer = document.getElementById('overlaycontainer');
    overlaycontainer.classList.remove('d-none');
    overlay.classList.remove('d-none');
    overlay.classList.remove('fade-out');
    overlay.classList.remove('slide-out');
    overlay.classList.remove('hide');
    overlay.innerHTML = overlayHtml();
}

/**
 * Close the overlay and make them insible again
 */
function closeOverlaySlide() {
    let overlay = document.getElementById('overlay');
    const overlaycontainer = document.getElementById('overlaycontainer');
    
    let mobileButton = document.getElementById('mobile-button-container');
    overlay.classList.add('slide-out');
    setTimeout(function () {
        overlaycontainer.classList.add('d-none');
        overlay.classList.add('d-none');
    }, 500);
    mobileButton.classList.remove('hide');
}

/**
 * Add fadeout effect to the overlaymenüsmall
 * 
 * @param {string} overlay - path to overlayid
 * @param {string} isMobile -check if mobile is aktive
 */
function fadeOutOverlay(overlay, isMobile) {
    overlay.classList.add('fade-out');
    if (isMobile) {
        overlay.addEventListener('animationend', function handler() {
            overlay.classList.add('d-none');
            overlay.removeEventListener('animationend', handler);
        });
    } else {
        setTimeout(() => {
            overlay.classList.add('d-none');
            overlay.classList.remove('fade-out');
        }, 500);
    }
}

/**
 * close the small overlaymenü and remove fade effect
 */
function closeOverlayFade() {
    let overlay = document.getElementById('overlay');
    let mobileButton = document.getElementById('mobile-button-container');
    let isMobile = window.matchMedia("(max-width: 825px)").matches;
    const overlaycontainer = document.getElementById('overlaycontainer');
    overlay.classList.add('fade-out');
    if (isMobile) {
        handleMobileOverlay(overlay);
        goBack()
    } else {
        
        handleDesktopOverlay(overlay);
    }
    mobileButton.classList.remove('hide');
    setTimeout(() => {
        overlaycontainer.classList.add('d-none');
    }, 1000);   
}

/**
 *  * 
 * @param {string} overlay -dom path to overlay(id)
 */
function handleMobileOverlay(overlay) {
    overlay.addEventListener('animationend', function handler() {
        overlay.classList.add('d-none');
        overlay.removeEventListener('animationend', handler);
    });
}

/**
 * 
 * @param {*} overlay -dom path to overlay(id)
 */
function handleDesktopOverlay(overlay) {
    setTimeout(() => {
        overlay.classList.add('d-none');
        overlay.classList.remove('fade-out');
    }, 500);
}

/**
 * Create new contact
 */
function createContact() {
    let [nameInput, mailInput, phoneInput] = ['name-input', 'mail-input', 'phone-input'].map(id => document.getElementById(id));
    let [name, mail, phonenumber] = [nameInput.value, mailInput.value, phoneInput.value];
    contacts.push({
        mail, name, phonenumber,
        color: getRandomColor(),
        initials: getInitials(name)
    });
    nameInput.value = mailInput.value = phoneInput.value = '';
    saveChangedDataContacts()
    closeOverlayFade();
    showMessage();
    renderContactStripes();
}

/**
 * Get the Information to edit the choosen Contact
 * 
 * @param {string} index ciurrent position id in contactarray
 */
function editContact(index) {
    let contact = contacts[index];
    let overlay = document.getElementById('overlay');
    overlay.innerHTML = overlayHtml(contact, index);
    overlay.classList.remove('d-none', 'hide');
    setTimeout(() => {
        document.getElementById('create-save-button').innerHTML = 'Save';
        document.getElementById('edit-subtext').classList.add('d-none');
        document.getElementById('name-input').value = contact.name;
        document.getElementById('mail-input').value = contact.mail;
        document.getElementById('phone-input').value = contact.phonenumber;
    }, 0);
}


/**
 * Check if the opened Window is create contact or Edit contact and choose createt buttons
 */
function chooseCreateOrSave() {
    let button = document.getElementById('create-save-button');
    let text = button.innerHTML;
    if (text === 'Create Contact') {
        createContact();
    } else if (text === 'Save') {
        saveContact();     
        renderContactCard(lastviewcontact);
        closeMobileEditMenu()
        goBack()
    }
}

/**
 * Save the Value from edited Contact informations in contact array
 */
function saveContact() {
    let index = document.getElementById('contact-index').value;
    const color = document.getElementById('contact-color').value
    let [nameInput, mailInput, phoneInput] = ['name-input', 'mail-input', 'phone-input'].map(id => document.getElementById(id));
    let [name, mail, phonenumber] = [ dontRenameUser(nameInput.value,index), mailInput.value, phoneInput.value];
    let contactData = { mail, name, phonenumber, color };
    if (index) {
        contacts[index] = contactData;
        saveChangedDataContacts()
    } else {
        contacts.push(contactData);
        saveChangedDataContacts()
    }
    nameInput.value = mailInput.value = phoneInput.value = '';
    closeOverlayFade();
    renderContactStripes();
}

/**
 * Delete the choosen contact from array
 * 
 * @param {string} index - Choosen Contact id for contact array
 */
function deleteContact(index) {
    ereaseContactFromArrayAssigned(index)
    contacts.splice(index, 1);    
    saveChangedDataContacts()
    setTimeout(()=> {window.location.href = "./contacts.html"} , 500);
}

/**
 * Give the smallMenü  the slide-out effect
 */
function toggleMenu() {
    const menu = document.getElementById('mobile-edit-menu');
    menu.classList.add('slide-out');
}

/**
 * Switch the register button at with 825 to the round buttons 
 */
function toggleClass() {
    if (window.innerWidth <= 825) {
        let register = document.getElementById('contacts-register');
        let mobileButtonIcon = document.getElementById('relative-icon');
        register.classList.add('d-none');
        mobileButtonIcon.src = './assets/icons/burger-menu.svg';
    }
}

/**
 * Show the Small edit menü when in mobile 
 */
function showMobileEditMenu() {
    let popUp = document.getElementById('mobile-edit-menu');
    let mobileButtonIcon = document.getElementById('relative-icon');
    let mobileButton = document.getElementById('mobile-button-container');
    if (popUp && mobileButtonIcon && mobileButton) {
        let iconSrc = mobileButtonIcon.src.split('/').pop();
        if (iconSrc === 'burger-menu.svg') {
            popUp.classList.remove('slide-out');
            popUp.classList.add('slide-in');
            popUp.classList.remove('d-none');
            popUp.innerHTML = mobileMenuPopUpHtml(lastviewcontact);
        } else {
            showOverlay();
        }
    }
}

/**
 * Close the mobile edit menü
 */
function closeMobileEditMenu() {
    let popUp = document.getElementById('mobile-edit-menu');
        popUp.classList.add('slide-out');
        setTimeout(() => {
            popUp.classList.add('d-none');
        }, 100);

}

/**
 * show the sucess massage
 */
function showMessage() {
    let popUp = document.getElementById('successfull-message');
    popUp.classList.remove('d-none');
    setTimeout(hideMessage, 1500);
}

/**
 *  Hide the sucsess message again
 */
function hideMessage() {
    let popUp = document.getElementById('successfull-message');
    popUp.classList.remove('slide-in');
    popUp.classList.add('slide-out');
    setTimeout(() => {
        popUp.classList.add('d-none');
        popUp.classList.remove('slide-out');
    }, 500);
}

/**
 * change the mobile button back to create contact
 */
function goBack() {
    let register = document.getElementById('contacts-register');
    let mobileButtonIcon = document.getElementById('relative-icon');
    register.classList.remove('d-none');
    mobileButtonIcon.src = './assets/icons/person_add.svg';
}

/**
 * Sort the contact array
 */
function sortContacts() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * render the Big contact infos from aktive choosen contact
 * 
 * @param {string} index - id from aktive contact
 */
function setActiveContact(index) {
    activeContactIndex = index;
    renderContactStripes();
}


/**
 * Clear the Big contact card
 */
function clearContactCard() {
    let contactCard = document.getElementById('open-contact');
    contactCard.innerHTML = '';
}

/**
 * 
 * @param {string} name - Name from Contact
 * @returns the First letter / letters of the full name
 */
function getInitials(name) {
    let nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
        return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
    } else if (nameParts.length === 1) {
        return nameParts[0][0].toUpperCase();
    }
    return '';
}

/**
 * 
 * @param {string} i - index of choosen contact
 * @param {string} isActive - state from isActive 
 * @returns 
 */
function contactRegisterHtml(i, isActive = false) {
    const currentInitial = contacts[i].name.charAt(0).toUpperCase();
    const fontStripeHtml = createFontStripeHtml(currentInitial, lastInitial);
    lastInitial = currentInitial;
    const contactStripeHtml = createContactStripeHtml(i, isActive);
    return `${fontStripeHtml}${contactStripeHtml}`;
}

/**
 * filter the tasks for deleted Contact , and erease it from assigned array
 * 
 * @param {string} index - from current contact
 */
function ereaseContactFromArrayAssigned(index) {
    const name = contacts[index].name;

    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];

        if (task['Assigned To'].filter(names => names == name) == name ) {
            let newassign = task['Assigned To'].filter(function(getname){return getname !== name} )
            if (newassign) {
                task['Assigned To'] = newassign;
            } else {
                task['Assigned To'] = [];
            }            
        } 
    }   
}