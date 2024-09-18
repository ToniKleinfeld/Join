/**
 *  This function check if the input value match with the registered user
 */
async function checkValidLogIn(){
    let users = await getData("user")
    let check = checkLoginData(users);     
  
    if ( check == !true) {    
      wrongUserOrPassword()
    } else {
      await loadTasksandContactsinfos(); 
      window.location.href = "./summary.html";
    }
  }

  /**
 * This function is used to switch between Login screen and Signup Screen.
 */
function switchLoginSignupWindow() {
    document.getElementById('loginscreen').classList.toggle('d-none');
    document.getElementById('signupbutton').classList.toggle('d-none');
    document.getElementById('signup').classList.toggle('d-none');
}

/**
 * 
 * @param {array} users - userarray from Firebase
 */
function checkLoginData(users){
  let check = false;
    users.forEach(element => { 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;        
        
      if (element.code == password && element.mail == email) {
        userAndPasswordMatch(element, email);
        check = true
      }
    });  
    return check  
}

/**
 * 
 * @param {string} element - string wich pass the if statement
 * @param {*} email - get the current loginmail
 */
function userAndPasswordMatch(element, email){  
  user = element.account;
  rememberMe(email);
  sessionStorage.setItem("user", user);   
}

/**
 * show red boarder and text , when wrong user / password
 */
function wrongUserOrPassword(){
    document.getElementById('loginform').classList.add('wronglogin');
    document.getElementById('wronglogintext').classList.remove('d-none')

    setTimeout(()=> { 
      document.getElementById('loginform').classList.remove('wronglogin');
      document.getElementById('wronglogintext').classList.add('d-none')
      document.getElementById('password').value = '';
    } , 3000);
}

/**
 * Change attribute of inputfield , to Show the value if wanted
 * 
 * @param {string} id  write id in html in the onclick function, to adress the wanted id with 'here id'
 */
function hideShowPassword(id){
  const password = document.getElementById(id);
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';

  password.setAttribute('type', type);
}

/**
 * Change the Icon's , when there is input in the passwordfield 
 * 
 * @param {string} id  write id in html in the onclick function, to adress the wanted id with 'here id'
 */
function addEyeIcons(id){
  const passwordfield = document.getElementById(`${id}`);  
  const icon = document.getElementById(`${id+'icon'}`)

  if (passwordfield.value == '') {
    passwordfield.classList.remove('eye');
    icon.classList.remove('pointer');
  } else {    
    passwordfield.classList.add('eye');
    icon.classList.add('pointer');
  }
}

/**
 * Disable button for signup when passwords not match, show message when wrong.
 */
function checkPasswordMatch() {
  const firstPass = document.getElementById('setpassword').value;
  const confirmPass = document.getElementById('confirmpassword').value;
  const submitButton = document.getElementById('submitsignup');

  if (firstPass === confirmPass ) {
    document.getElementById('confirmpassword').classList.remove('wronglogin');
    document.getElementById('passwordnomatch').classList.add('d-none')
    submitButton.disabled = false
  } else if ( firstPass !== confirmPass ){
    submitButton.disabled = true
    document.getElementById('confirmpassword').classList.add('wronglogin');
    document.getElementById('passwordnomatch').classList.remove('d-none')
  } else {
    submitButton.disabled = true
  }
}

/**
 * This function set the User to guest and loads the Array
 */
async function guestLogIn() {
  sessionStorage.setItem("user", 'Guest')
  await loadTasksandContactsinfos(); 
  window.location.href = "./summary.html";
}

/**
 * check if in localstorage information for remember login 
 */
function remeberMeCheck() {
  const rmCheck = document.getElementById("remember"),
  emailInput = document.getElementById("email");

  if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    emailInput.value = localStorage.username;
  } else {
    rmCheck.removeAttribute("checked");
    emailInput.value = "";
  }
}

/**
 * 
 * @param {string} emailInput -get the value from Emailinput
 */
function rememberMe(emailInput) {
  const rmCheck = document.getElementById("remember");

  if (rmCheck.checked && emailInput !== "") {
    localStorage.username = emailInput;
    localStorage.checkbox = rmCheck.value;
  } else {
    localStorage.username = "";
    localStorage.checkbox = "";
  }
}

/**
 * Give the signup Input Data to the firebase
 */
async function signUp() {
  let username = document.getElementById('signupname').value;
  let emailadress = document.getElementById('signupmail').value;
  let password = document.getElementById('setpassword').value;
  let index = await getData("user");
  let path = "user/"+index.length;

  let data = {
    "account": username,
    "code": password,
    "mail": emailadress
  };

  putData(path,data);
  signUpSuccses()
}

/**
 * show message , when signUp succses , link back to Login
 */
function signUpSuccses() {
  signUpDone = document.getElementById('signupdone').classList.toggle('d-none');

  setTimeout(()=> {signUpDone ; window.location.href = "./index.html"} , 2000);     
}