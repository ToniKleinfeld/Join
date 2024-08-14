const BASE_URL = "https://remotestorage-fe678-default-rtdb.europe-west1.firebasedatabase.app/";


async function initBoard() {
    console.log(BASE_URL);
    await fetchDataFromFirebase();
}

async function fetchDataFromFirebase() {
    let response = await fetch(BASE_URL + ".json");           // Holt die Daten von der API
    let responseAsJson = await response.json();         // Wandelt die Antwort in ein JSON-Objekt um.
    console.log(responseAsJson);
    
}


function renderMainContent() {
    let content = document.getElementById('Maincontent');
    content.innerHTML = '';
}