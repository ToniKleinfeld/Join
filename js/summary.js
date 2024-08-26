function init() {
    countAllTask();
    countTaskTypes("To do",'counttodo');
    countTaskTypes("Done",'countdone');
    countTaskTypes("in progress",'counttaskinprogress');
    countTaskTypes("Await feedback",'countfeedback');
    countUrgent()
    greetingUser()
    greetMobile()
}

/**
 * 
 * @param {string} type wich type of progress is searched for
 * @param {*} id the id where to add the countet 
 * @returns return zero or the filtert count
 */
function countTaskTypes(type,id) {
    const taskstype = tasks.filter(tasks => tasks.progress === type)

    if (taskstype.length === 0) {
        return document.getElementById(id).innerHTML = "0" ;
    } else {
        return document.getElementById(id).innerHTML = `${taskstype.length}`;
    }
}

/**
 * 
 * @returns Countet Tasks from Array
 */
function countAllTask() {
    if (tasks.length === 0) {
        return document.getElementById('countalltask').innerHTML = "0"; 
    } else {
        return document.getElementById('countalltask').innerHTML = `${tasks.length}`; 
    }     
}

/**
 * 
 * @returns countet Urgent Tasks and the Upcoming Date
 */
function countUrgent() {    
    const urgentcount = tasks.filter(tasks => tasks.prio === "Urgent");
    let date =  new Date(urgentcount[0].duedate).toLocaleDateString('en-us', {month:"long", day:"numeric", year:"numeric"});
       
    if (urgentcount.length === 0) {
        document.getElementById('deadline').innerHTML = '';
       return document.getElementById('counturgent').innerHTML = "0" ;
    } else {
        document.getElementById('deadline').innerHTML = date;
        return document.getElementById('counturgent').innerHTML = `${urgentcount.length}`;
    }
}

/**
 * Greet massage for the loged user or guest
 */
function greetingUser() {
    greeting = document.getElementById('greeting');
    userName = document.getElementById('userlogedin');

    if (user === 'Guest') {
        greeting.innerHTML = 'Good morning!'
    } else {
        greeting.innerHTML = 'Good morning, ';
        userName.innerHTML = `${user}`;
    }
}

/**
 * Show the welcome screen once in mobile
 */
function greetMobile() {
    if (window.innerWidth <= 1150 && sessionStorage.getItem("greet") == undefined ) {
        document.getElementById('greeting_user').classList.toggle('mobiled-none');
        sessionStorage.setItem('greet', true);

        setTimeout(()=> {document.getElementById('greeting_user').classList.toggle('mobiled-none');}, 2000);  
    }    
  }