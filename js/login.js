/**
 *  This function check if the input value match with the registered user
 */
async function checkValidLogIn(){
    let users = await getData("user")
    let check = checkLoginData(users);     
  
    if ( check == !true) {    
      wronguserorpassword()
    } else {
      window.location.href = "./summary.html";
    }
  }

  /**
 * This function is used to switch between Login screen and Signup Screen.
 */
function switchloginSignupWindow() {
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
        check = true
        user = element.account
        sessionStorage.setItem("user", user)
        loadTasksandContactsinfos();        
      }
    });  
    return check  
}

/**
 * show red boarder and text , when wrong user / password
 */
function wronguserorpassword(){
    document.getElementById('loginform').classList.add('wronglogin');
    document.getElementById('wronglogintext').classList.remove('d-none')
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
    submitButton.disabled = false
  } else if ( firstPass.length  === confirmPass.length ){
    submitButton.disabled = true
    document.getElementById('setpassword').classList.add('wronglogin');
    document.getElementById('confirmpassword').classList.add('wronglogin');
    document.getElementById('passwordnomatch').classList.remove('d-none')
  } else {
    submitButton.disabled = true
  }
}


/**
 * This function set the User to guest and loads the Array
 */
function guestLogIn() {
  user = 'Guest'
  sessionStorage.setItem("user", user)
  loadTasksandContactsinfos(); 
  window.location.href = "./summary.html";
}