const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
      alert("You must write something!");
    } else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
  
      const button = document.createElement("button");
      button.setAttribute("class", "buttons delete-button");
      button.innerHTML = "delete";
      button.addEventListener("click", deleteTask);
  
      const editButton = document.createElement("button");
      editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
      editButton.addEventListener("click", editTask);
      editButton.setAttribute("class", "buttons edit-button");
  
      var buttonsContainer = document.createElement('div');
      buttonsContainer.setAttribute("class", "buttons");
      buttonsContainer.appendChild(button);
      buttonsContainer.appendChild(editButton);
      li.appendChild(buttonsContainer);
  
      listContainer.appendChild(li);
    }
  
    inputBox.value = "";
    saveData();
  }




listContainer.addEventListener("click", function(e){ 
    if(e.target.tagName === "LI")
    { 
        e.target.classList.toggle("checked");
        saveData();
}

else if(e.target.tagName === "BUTTON")
{ 
    e.target.parentElement.remove();
    saveData();

}  
}, false);

function editTask() {
    var li = this.parentNode.parentNode;
    var taskText = li.firstChild;
    var editText = prompt('Edit the task:', taskText.textContent);

    if (editText !== null && editText.trim() !== '') {
        taskText.textContent = editText.trim();
        recreateButtons(li); // Recreate the buttons after updating the task text
        saveData();
    }
}

function recreateButtons(li) {
    // Remove the existing buttons
    var buttonsContainer = li.querySelector('.buttons');
    buttonsContainer.remove();
  
    // Recreate the buttons
    const button = document.createElement("button");
    button.setAttribute("class", "buttons delete-button");
    button.innerHTML = "delete";
    button.addEventListener("click", deleteTask);
  
    const editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa fa-pencil" aria-hidden="true"></i>';
    editButton.addEventListener("click", editTask);
    editButton.setAttribute("class", "buttons edit-button");
  
    buttonsContainer = document.createElement('div');
    buttonsContainer.setAttribute("class", "buttons");
    buttonsContainer.appendChild(button);
    buttonsContainer.appendChild(editButton);
    li.appendChild(buttonsContainer);
    saveData();
  }
  

function deleteTask() {
    this.parentElement.parentElement.remove();
    saveData();
}


function saveData(){
    localStorage.setItem("data_8", listContainer.innerHTML);
}
    
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data_8");
  
    const editButtons = document.getElementsByClassName("edit-button");
    const deleteButtons = document.getElementsByClassName("delete-button");
  
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener("click", editTask);
    }
  
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", deleteTask);
    }
  }
  
  
  showTask();