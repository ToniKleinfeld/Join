 let data = {
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
      document.getElementById("anchorinput").value = '';
      filterContacts()
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
      let color = contacts[index]['color']
      
      list.innerHTML += renderHtmlContactLi(name,shortname,color)      
    }  
    checkboxChecked() 
  }

  /**
   * render the Username to dropdown menü assigned to
   * 
   * @param {string} list - where to create the HTMLcode
   */
  function renderUserAsAssign(list) {
      const usershortname = shortNames(user) 

      list.innerHTML += renderHtmlContactLiUser(user,usershortname);
  }

  /**
   * 
   * @param {string} name - from Contacts or User
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
      
      if (name == user) {
        color = 'lightcoral';
      } else {
        color = getColorOfContact(name);
      }
      assignedConntacts.innerHTML += renderAssignedContactshtml(shortname,color);
    }); 
  }

  /**
   * Search function for Contacts -->
   */
  function filterContacts(){
    let search = document.getElementById("anchorinput").value.toLowerCase(); 
    let list = document.getElementById("assignlist");

  if (search.length >= 1) {
    list.innerHTML = '';    
    searchfor(list,search);
    } else {
      renderAndloadContactsToAssign();
    }
  }

  /**
   * 
   * @param {string} list - area where the seachresults shown
   * @param {string} search - inputvalue 
   */
  function searchfor(list,search){
    for (let index = 0; index < contacts.length; index++) {
      const name = contacts[index]['name'];
      const shortname = shortNames(name)
      color = getColorOfContact(name);

        if(name.toLowerCase().includes(search)) {          
          list.innerHTML += renderHtmlContactLi(name,shortname,color);     
        }                
      }
      checkboxChecked();
  }

  /**
   *  Check if name already in array and check ist when true
   */
  function checkboxChecked() {
    assignedToArray.forEach(id => {
      let nameid = document.getElementById(id);
      if (nameid !== null) {
        nameid.checked = true;
      }      
    });
  }

  /**
   * filter contacts array for colorinformation
   * 
   * @param {string} name - get the current name from foreach 
   * @returns - the colorcode
   */
  function getColorOfContact(name){
    const filtercontacs = contacts.filter(contact => contact.name == name
    );
    return filtercontacs[0].color
  }

  /**
   * 
   * @param {string} id -get the id from html
   */
  function changePrio(id) {
    const  urgentprio = document.getElementById('urgent').classList;
    const  mediumprio = document.getElementById('medium').classList;
    const  lowprio = document.getElementById('low').classList;

    resetPrio(urgentprio,mediumprio,lowprio);
    switchPrio(urgentprio,mediumprio,lowprio,id);
  }

  /**
   * 
   * @param {string} urgentprio - get the information which field change in html
   * @param {string} mediumprio - get the information which field change in html
   * @param {string} lowprio - get the information which field change in html
   */
  function resetPrio(urgentprio,mediumprio,lowprio) {
    urgentprio.remove('urgentprioaktive');
    mediumprio.remove('mediumprioaktive');
    lowprio.remove('lowprioaktive'); 
  }

  /**
   * 
   * @param {string} urgentprio - get the information which field to change
   * @param {string} mediumprio - get the information which field to change
   * @param {string} lowprio - get the information which field to change
   * @param {string} id - get the information which field's id change to active
   */
  function switchPrio(urgentprio,mediumprio,lowprio,id) {
    switch (id) {
      case 'urgent':
        urgentprio.add('urgentprioaktive');
        data["prio"] = "Urgent";
        break;
      case 'medium':
        mediumprio.add('mediumprioaktive');
        data["prio"] = "Medium";
        break;
      case 'low':
        lowprio.add('lowprioaktive');
        data["prio"] = "Low";
        break;    
      default:
        break;
    }
  }
  
  /**
   *  Show and hide the subtasks Icons
   */
  function changeIconsSubtask() {
    const inputfield = document.getElementById('subtaskinputfield').value
    const subtasksicons = document.getElementById('subtasksicons').classList;

    if (inputfield !== '') {
      subtasksicons.remove('d-none')
    } else {
      subtasksicons.add('d-none')
    }
  }

  /**
   *  reset the Value from addsubtasks Input
   */
  function resetsubtasksinput(){
    const inputfield = document.getElementById('subtaskinputfield');

    inputfield.value = '';
    changeIconsSubtask();
  }
    // data["Assigned To"] = assignedToArray  für später zum erstellen des Task mit data