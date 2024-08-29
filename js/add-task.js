 let Data = {
    "Assigned To": [
      ""
    ],
    "category": "",
    "description": "",
    "duedate": "",
    "prio": "Medium",
    "subtask": [
      {
        "state": false,
        "title": ""
      }
    ],
    "title": "",
    "progress": "to Do"      
  }

  let assignedToArray = [];

  /**
   * Show and hide the dropdownmenu of Assigned to
   */
  function showContactslistToAssign() {
      document.getElementById('contact-select').classList.toggle('visible');
      document.getElementById('anchorinput').classList.toggle('d-none');
      document.getElementById('anchorButton').classList.toggle('d-none');
      document.getElementById('anchoricon').classList.toggle('d-none');
  }

  /**
   * Inialit all function, needed when start Add-Task side
   */
  function initTasks() {
    renderAndloadContactsToAssign()
  }

  /**
   * render the Contacts to assign to dropdown menü
   */
  function renderAndloadContactsToAssign(){
    const list = document.getElementById('assignlist');
    list.innerHTML = '';
    renderUserAsAssign(list);

    for (let index = 0; index < contacts.length; index++) {
      const name = contacts[index]['name'];
      let shortname = shortNames(name);
      
      list.innerHTML += renderHtmlContactLi(name,shortname)
    }   
  }

  /**
   * render the Contacts to assign to dropdown menü
   * 
   * @param {string} list - where to create the HTMLcode
   */
  function renderUserAsAssign(list) {
      const usershortname = shortNames(user) 

      list.innerHTML += renderHtmlContactLiUser(user,usershortname);
  }

  /**
   * 
   * @param {string} name - from Contacts
   * @returns - First letter of each Word
   */
  function shortNames(name) {
    return  name.match(/\b(\w)/g).join('');
  }

  /**
   * Funktion to put ore delete the contacs to the assignedToArray if not allready in
   * 
   * @param {string} name - ID from chosen Contact
   */
  function assignedToTasK(name) {
    const userchoise = assignedToArray.filter(assignedToArray => assignedToArray == name);
    const checkstatus = document.getElementById(name).checked;    

    if (userchoise.length == 0  && checkstatus === true) {
      assignedToArray.push(name);
      renderAssignedContacts();

    } else if (userchoise == name && checkstatus === false) {
      const assignedToArrayWithoutName = assignedToArray.filter(function (getname) {
         return getname !== name;        
      });
    assignedToArray = assignedToArrayWithoutName;
    renderAssignedContacts()
    }
  }

  /**
   * Where to render the ContactsIcon from assignedToArray
   */
  function renderAssignedContacts() {
    const assignedConntacts = document.getElementById('showassignedcontacts');
    assignedConntacts.innerHTML = '';

    assignedToArray.forEach(name => {
      shortname = shortNames(name);
      assignedConntacts.innerHTML += renderAssignedContactshtml(shortname);
    }); 
  }

  function renderAssignedContactshtml(shortname) {
    return /*html*/`
       <div class="contacticon center">${shortname}</div>
    `
  }

  function renderHtmlContactLi(name,shortname) {
    return /*html*/`
      <li class="contactslistassign">
        <input type="checkbox" id="${name}" onchange="assignedToTasK('${name}')"/>
        <span class="checkmark"></span>
        <label for="${name}">
          <span class="contacticon center">${shortname}</span> ${name} 
        </label>
        </li>
    `
  }

  function renderHtmlContactLiUser(name,shortname) {
    return /*html*/`
      <li class="contactslistassign">
        <input type="checkbox" id="${name}" onchange="assignedToTasK('${name}')"/>
        <span class="checkmark"></span>
        <label for="${name}">
          <span class="contacticon center">${shortname}</span> ${name} (You)
        </label>
        </li>
    `
  }