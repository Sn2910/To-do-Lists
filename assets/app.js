let taskTitle = document.getElementById('task-title')
let taskStatus = document.getElementById('task-status')
let taskDescription = document.getElementById('task-description')
let addtaskbtn = document.getElementById('addtaskbtn')
let dt = new Date()

console.log(dt)


addtaskbtn.addEventListener("click", function(){
  taskTitleVal = taskTitle.value
  taskStatusVal = taskStatus.value
  taskDescriptionVal = taskDescription.value
  const newObj = {'title':taskTitleVal, 'task-status': taskStatusVal,'task-decr':taskDescriptionVal}
      let webtask = localStorage.getItem("localtask");
      if(webtask == null){
         let taskObj = [];
      }
      else{
          taskObj = JSON.parse(webtask);
      }
      taskObj.push(newObj);
      localStorage.setItem("localtask", JSON.stringify(taskObj));
      console.log(localStorage)
      showContent();
 

})
function showContent(){
  
  let webtask = localStorage.getItem("localtask");
  if(webtask == null){
     let taskObj = [];
  }
  else{
      taskObj = JSON.parse(webtask);
  }
  let taskArrayElemenet = ''
  let addTaskList = document.getElementById('addTaskList')

  taskObj.forEach((val) =>{
    taskArrayElemenet += `<div class="card">
    <div class="card-header"><i class="fa-solid fa-calendar-days"></i><i class="fa-solid fa-arrow-right-arrow-left"></i><i class="fa-solid fa-comment"></i></div>
    <div class="card-body"><h6>${val}</h6></div>
    <div class="card-footer text-left">
        <button type="button" class="btn btn-success" data-bs-toggle="modal"
            data-bs-target="#editTask">
            <i class="fa-solid fa-pen"></i> Edit
        </button>
        <button type="button" class="btn btn-danger" data-bs-toggle="modal"
            data-bs-target="#deleteTask">
            <i class="fa-solid fa-calendar-xmark"></i> Delete
        </button>
    </div>
</div>`

  })
 

addTaskList.innerHTML = taskArrayElemenet;
}
