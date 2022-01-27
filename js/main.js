let taskTitleInput = document.querySelector('.task-title'),
    taskDescriptionInput = document.querySelector('.task-input'),
    taskTime = document.querySelector('.task-time'),
    addTaskButton = document.querySelector('.add-button'),
    tasksDiv = document.querySelector('.tasks'),
    counter = document.querySelector('.counter');

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
  }

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

// Add Task
addTaskButton.onclick = function () {
    if (taskTitleInput.value !== "") {
        counter.innerHTML++;
        addTaskToArray(taskTitleInput.value, taskDescriptionInput.value, taskTime.value, counter.innerHTML);
        taskTitleInput.value = "";   
        taskDescriptionInput.value = "";    
        taskTime.value = "";
    }
  };

  function addTaskToArray(title, description, time, counter) {
    // Task Data
    const task = {
      id: Date.now(),
      title: title,
      description: description,
      time: time,
      counter: counter,
      completed: false,
    };
      // Push Task To Array Of Tasks
  arrayOfTasks.push(task);
    // Add Tasks To Page
    addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}


function addElementsToPageFrom(arrayOfTasks) {
  // Empty Tasks Div
  tasksDiv.innerHTML = "";
  // Looping On Array Of Tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let taskBox = document.createElement("div"),
        taskInfo = document.createElement('div'), // create task information div
        taskActions = document.createElement('div'); // create actions div

    // give class for each div
    taskBox.className = 'task';
    taskInfo.className = 'task-info';
    taskActions.className = 'task-actions';

    // append created task for tasks div
    tasksDiv.prepend(taskBox);

    // append two info and action div to task div
    taskBox.append(taskInfo, taskActions);

    //Create Task information
    let taskTitle = document.createElement('h3'),
        taskDescription = document.createElement('p');

    // give class for each one
    taskTitle.className = 'task-title';
    taskDescription.className = 'task-description';

    taskBox.setAttribute("data-id", task.id);
    //create text node for them from form input
    taskTitle.appendChild(document.createTextNode(task.title));
    taskDescription.appendChild(document.createTextNode(task.description)); 
    
   //append title and description for task info
   taskInfo.append(taskTitle, taskDescription);

    // Check If Task is Done
    if (task.completed) {
        task.className = "task done";
    }

     // Create Button Actions
     let time = document.createElement('span'),
        checkbox = document.createElement('span'),
        editButton = document.createElement('span'),
        deleteButton = document.createElement('span'),
        deleteIcon= document.createElement('i'),
        checkIcon= document.createElement('i');

     // give class for each span
     time.className = 'time';
     checkbox.className = 'checkbox';
     editButton.className = 'edit';
     deleteButton.className = 'delete';
     deleteIcon.className = 'fas fa-trash-alt';
     checkIcon.className = 'fas fa-check';

     // Set Time 
     time.appendChild(document.createTextNode(task.time));

     // append icons for span
     deleteButton.appendChild(deleteIcon)

     //append all spans to actions div
    taskActions.append(time, checkbox, deleteButton);

         // make check when click on checkbox
        checkbox.onclick = function(){
            this.appendChild(checkIcon);
            taskBox.style.backgroundColor = '#00000021';
            taskTitle.style.textDecoration = "line-through";
            toggleStatusTaskWith(taskBox.getAttribute("data-id"));

        }

        //Delete Task
        deleteButton.onclick = function(){
            deleteTaskWith(taskBox.getAttribute("data-id"));
            taskBox.remove();
        }
        
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
  }

  function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
      let tasks = JSON.parse(data);
      addElementsToPageFrom(tasks);
    }
  }

  function deleteTaskWith(taskId) {
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);
  }
  
  function toggleStatusTaskWith(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
      if (arrayOfTasks[i].id == taskId) {
        arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
      }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
  }