let tasks = [{
    "Assigned To": [
      "Emmanuel Mauer",
      "Marcel Bauer",
      "Anton Mayer"
    ],
    "category": "User story",
    "description": "Build start page with recipe recommendation.",
    "duedate": "10/05/2023",
    "prio": "Medium",
    "subtask": [
      {
        "state": true,
        "title": "Implement Recipe Recommendation"
      },
      {
        "state": false,
        "title": "Start Page Layout"
      }
    ],
    "title": "Kochwelt Page & Recipe Recommender",
    "progress": "in progress"      
  },
  {
    "Assigned To": [
      "Sofia Müller (You)",
      "Benedikt Ziegler"
    ],
    "category": "Technical Task",
    "description": "Define CSS naming conventions and structure.",
    "duedate": "02/09/2023",
    "prio": "Urgent",
    "subtask": [
      {
        "state": true,
        "title": "Establish CSS Methodology"
      },
      {
        "state": true,
        "title": "Setup Base Styles"
      }
    ],
    "title": "CSS Architecture Planning",
    "progress": "Done"      
  },
  {
    "Assigned To": [
      "David Eisenberg",
      "Benedikt Ziegler",
      "Anja Schulz"
    ],
    "category": "Technical Task",
    "description": "Create reuseable HTML base templates",
    "duedate": "15/05/2023",
    "prio": "Low",
    "subtask": [
    ],
    "title": "HTML Base Template Creation",
    "progress": "Await feedback"      
  },
  {
    "Assigned To": [
      "Eva Fischer",
      "Anja Schulz",
      "Tatjana Wolf"
    ],
    "category": "User story",
    "description": "Implement daily recipe and portion calculator",
    "duedate": "12/05/2023",
    "prio": "Medium",
    "subtask": [
    ],
    "title": "Daily Kochwelt Recipe",
    "progress": "Await feedback"      
  }];
let contacts = [{
    "mail": "anton@gmx.com",
    "name": "Anton Mayer",
    "phonenumber": "+49 173 867654653"
  },
  {
    "mail": "schulz@gmail.com",
    "name": "Anja Schulz",
    "phonenumber": "+49 174 987674765"
  },
  {
    "mail": "benedikt@googlemail.com",
    "name": "Benedit Ziegler",
    "phonenumber": "+49 174 987674765"
  },
  {
    "mail": "davidberg@hotmail.de",
    "name": "David Eisenberg",
    "phonenumber": "+49 176 983474765"
  },
  {
    "mail": "eva@gmx.com",
    "name": "Eva Fischer",
    "phonenumber": "+49 174 9876723765"
  },
  {
    "mail": "emmalnuelma@live.com",
    "name": "Emmanuel Mauer",
    "phonenumber": "+49 174 987674765"
  },
  {
    "mail": "bauer@gmail.com",
    "name": "Marcel Bauer",
    "phonenumber": "+49 172 932674765"
  },
  {
    "mail": "wolfi@gmx.com",
    "name": "Tatjana Wolf",
    "phonenumber": "+49 176 127674765"
  }]  
let user = '';
 user = getDataFromStorage();

/**
 * this function load the wantet Array from firebase
 * 
 * @param {string} path - This set the path which data should be loaded  
 */
async function getData(path) {
  const BASE_URL = "https://remotestorage-fe678-default-rtdb.europe-west1.firebasedatabase.app/";
  
  try {    
    let response = await fetch(BASE_URL + path + ".json");
    let responseAsJson = await response.json();
   return (responseAsJson)
   } catch(error){
    console.error("Sorry something went wrong.");
    return false
   }
}

/**
 * Load the tasks an contacts from Firebase
 */
async function loadTasksandContactsinfos(){
 tasks = await getData("tasks");
 contacts = await getData("contacts");

await saveAsSessionStorage();
}

/**
 * load Arrays into SessionStorage
 */
function saveAsSessionStorage(){
  let taskssAsText = JSON.stringify(tasks);
 sessionStorage.setItem('tasks', taskssAsText);

 let contactsAsText = JSON.stringify(contacts);
 sessionStorage.setItem('contacts', contactsAsText); 
}

/**
 * disbale navmenu and Userfield, when no user or Guest logged in.
 */
function checkIfUserlogin() {
  if (user == '') {
 document.getElementById('navlinks').classList.add('d-none');
 document.getElementById('showuser').classList.add('d-none');
 } else {
  setHeaderUserName()
 }
}

/**
 * 
 * @returns Empty user and Arrays data from localseasonstorage when no User in SessionStorage
 */
 function getDataFromStorage() {   
  if (sessionStorage.getItem("user") == undefined) {
    // tasks = [];
    // contacts = [];
    return user = ''
  } else {
    tasks = JSON.parse(sessionStorage.getItem("tasks"));
    contacts = JSON.parse(sessionStorage.getItem("contacts"));
    return user = sessionStorage.getItem("user");
  }
}

/**
 * Split the Username into first Lesters and use it for Usericon in Header
 */
function setHeaderUserName(){
  let userIcon = user.match(/\b(\w)/g);
  document.getElementById('showuser').innerHTML = userIcon.join('');
}


/**
 * Display the Usermenu under the Usericon
 */
function showUserMenue(){
  document.getElementById('usermenue').classList.toggle('d-none');
}

/**
 * Clear the seassionStorage
 */
function logOut() {
  sessionStorage.clear()
}

async function putData(path="", data={}) {  
  const BASE_URL = "https://remotestorage-fe678-default-rtdb.europe-west1.firebasedatabase.app/"; 
  let response = await fetch(BASE_URL + path + ".json",{
     method: "PUT",
     header: {
           "Content-Type": "application/json",
     },
     body: JSON.stringify(data)
  });
  return responsetoJson = await response.json();
}