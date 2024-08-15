/**
 *  This function check if the input value match with the registered user
 */
async function checkValidLogIn(){
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let users = await getData("user")
    let check =  ''; 
    
    users.forEach(element => {     
      if (element.code == password && element.mail == email) {
        check = true
        user = element.account
        loadTasksandContactsinfos();
      }
    });
  
    if ( check == !true) {    
      console.error('Wrong password or email!')
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