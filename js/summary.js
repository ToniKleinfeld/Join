function init() {
    countAllTask();
    countTaskTypes("To do",'counttodo');
    countTaskTypes("Done",'countdone');
    countTaskTypes("in progress",'counttaskinprogress');
    countTaskTypes("Await feedback",'countfeedback');
    countUrgent()
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
    let deadline = urgentcount[0].duedate;
    
    console.log();
   
    if (urgentcount.length === 0) {
        document.getElementById('deadline').innerHTML = '';
       return document.getElementById('counturgent').innerHTML = "0" ;
    } else {
        document.getElementById('deadline').innerHTML = str
        return document.getElementById('counturgent').innerHTML = `${urgentcount.length}`;
    }
}


// all id's=  {
//       userlogedin, greeting
// }