  /**
   *  Save the main Arrays Contacts and taks into SessionStorage, upload to firebase and call the reset of data object
   */
  function saveChangedData() {
    saveAsSessionStorage();
    putData("tasks",tasks);
    dataObjectReset()
}
  /**
   * Check if the Assignedto container is visible and close it when click on other content
   */
  function checkAssignedDropDownWindowOpen() {
    const dropdownmenü = document.getElementById('contact-select');
     
    if (dropdownmenü) {
      const classList = Array.from(dropdownmenü.classList).filter(list => list == 'visible') 
      if (classList == 'visible') {
        showContactslistToAssign()
      }
    }
  }

  /**
 * 
 * @param {event} event -prevent child from closing  , when parent have onclickfunction to close
 */
function doNotClose(event) {
  event.stopPropagation();
}