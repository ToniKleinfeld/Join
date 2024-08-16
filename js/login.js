/**
 *  This function check if the input value match with the registered user
 */
async function checkValidLogIn(){
    let users = await getData("user")
    let check =  ''; 
    
    checkLoginData(users);
  
    if ( check == !true) {    
      wronguserorpassword()
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
    users.forEach(element => { 
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

      if (element.code == password && element.mail == email) {
        check = true
        user = element.account
        loadTasksandContactsinfos();
      }
    });
}

/**
 * show red boarder and text , when wrong user / password
 */
function wronguserorpassword(){
    document.getElementById('loginform').classList.add('wronglogin');
    document.getElementById('wronglogintext').classList.remove('d-none')
}

function hideShowPassword(){
  const password = document.getElementById('password');
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';

  password.setAttribute('type', type);
}