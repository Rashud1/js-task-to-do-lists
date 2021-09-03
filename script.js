const taskList = [];
const badTaskList = [];
const hrWeek = 168

let taskListHrs = 0;
let badTaskListHrs = 0;

const handleOnSubmit = e => {
    // console.log(e);
    const formData = new FormData(e);
    const task = formData.get("task");
    const hr = +formData.get("hr");
    const newTask = {
        task,
        hr,
    };

    taskListHrs = taskList.reduce((subttl, item) =>  subttl =+ +item.hr , 0);
    // console.log(taskListHrs);


    if( taskListHrs + hr > hrWeek ){
        return alert("Sorry you do not have enough time left to allocate this task");
    }





    document.getElementById("totalHrs").innerText = taskListHrs + hr;
 

    // push list in the global array
    taskList.push(newTask)
    console.log(taskList);
    displayTaskList();

    
};
// dispplaying the task list
const displayTaskList = () =>{
    let task = ""
    console.log(taskList);
    taskList.map((item, i) => {
        console.log(item.task);
        task += `<li>
        <div class="items">
        <span class="item"><input type="checkbox"><label for="">${item.task}</label></span>

          <span class="hrs">${item.hr}hrs/week</span>
          <button onclick="markAsNotToDoTask(${i})">Mark Not To Do</button>
          <button onclick="deleteItem(${i})">Delete</button>
    
    
  </div>  
</li>`;
        // console.log(item, i);

    });
  
    
    document.getElementById("to-do-list").innerHTML = task;
    totalTaskHours();
};

// dispplaying the bad task list
const displayBadTaskList = () =>{
    let task = ""
    console.log(badTaskList);
    badTaskList.map((item, i) => {
        task += `<li>
        <div class="items">
        <span class="item"><input type="checkbox"><label for="">${item.task}</label></span>
          <span class="hrs">${item.hr}hrs/week</span>
          <button onclick="markAsToDoTask(${i})">Mark as To Do</button>
    
    
  </div>  
</li>`;
        // console.log(item, i);

    });
  
    document.getElementById("bad-task-list").innerHTML = task;
    totalBadHours();
};
// marks the task not to do list 

const markAsNotToDoTask = i => {
    // 1.find out which item is clicked
    console.log(taskList[i]);

    // 2.remove that item from the array and put it in the variable
    const item = taskList.splice(i, 1)[0];
   
    badTaskList.push(item);

   
    // 3.we need to have that variable to store not to do items and 
    // 4.item in the second point which took out from the task list array now put that task inside the new array and 
// 5. loop through the array and display in the bad task list 



displayTaskList();
displayBadTaskList();
};

const markAsToDoTask = i => {
    // 1.find out which item is clicked
    

    // 2.remove that item from the array and put it in the variable
    const item = badTaskList.splice(i, 1)[0];
    taskList.push(item);
    // 3.we need to have that variable to store not to do items and 
    // 4.item in the second point which took out from the task list array now put that task inside the new array and 
// 5. loop through the array and display in the bad task list 



displayTaskList();
displayBadTaskList();
};

// delete item
const deleteItem = i => {
taskList.splice(i,1);
displayTaskList();
totalTaskHours();

};
// calculate bad hours
const totalBadHours = () => {
    const total = badTaskList.reduce((subttl, item) => (subttl += item.hr)
    , 0);
    document.getElementById("totalBadHrs").innerText = total;
};
// calculate bad hours
const totalTaskHours = () => {
    const total = taskList.reduce((subttl, item) => (subttl += item.hr)
    , 0);
    console.log(total, "???");
    document.getElementById("totalHrs").innerText = total;
};