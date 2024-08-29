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

  function showContactslistToAssign() {
      document.getElementById('contact-select').classList.toggle('visible');
      document.getElementById('anchorinput').classList.toggle('d-none');
      document.getElementById('anchorButton').classList.toggle('d-none');
      document.getElementById('anchoricon').classList.toggle('d-none');
  }

  function initTasks() {
    renderAndloadContactsToAssign()
  }

  function renderAndloadContactsToAssign(){
    const list = document.getElementById('assignlist');
    list.innerHTML = '';
    
    for (let index = 0; index < contacts.length; index++) {
      const name = contacts[index]['name'];
      let shortname = name.match(/\b(\w)/g).join('');
      
      list.innerHTML += renderHtmlContactLi(name,shortname)
    }    
  }

  function renderHtmlContactLi(name,shortname) {
    return /*html*/`
      <li class="contactslistassign">
        <input type="checkbox" id="${name}" onchange="assignedToTasK('${name}')"/>
        <span class="checkmark"></span>
        <label for="${name}">
          <span class="contacticon">${shortname}</span> ${name} 
        </label>
        </li>
    `
  }

  function assignedToTasK(name) {
    const userchoise = assignedToArray.filter(assignedToArray => assignedToArray == name);
    const checkstatus = document.getElementById(name).checked;

    if (userchoise.length == 0  && checkstatus === true) {
      console.log('if');
      assignedToArray.push(name);
    } else if (userchoise == name && checkstatus === false) {
      
      console.log('if else');
      /**hier splice des names aus der obrigen array */
    }
  }