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