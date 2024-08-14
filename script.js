let task = [{
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
let user = 'Boban';

/**
 * This function is used to switch beweetn Login screen and Signup Screen.
 */
function switchloginSignupWindow() {
    document.getElementById('loginscreen').classList.toggle('d-none');
    document.getElementById('signupbutton').classList.toggle('d-none');
    document.getElementById('signup').classList.toggle('d-none');
}