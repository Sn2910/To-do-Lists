let taskTitle = document.getElementById('task-title')
let taskStatus = document.getElementById('task-status')
let taskDescription = document.getElementById('task-description')
let addtaskbtn = document.getElementById('addtaskbtn')

let taskDate= document.getElementById('task-date')

/* console.log(taskDateText)
let taskDate = new Date(taskDateText); */

function showContent() {

  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    taskObj = [];
  }
  else {
    taskObj = JSON.parse(webtask);
  }
  let taskArrayElemenet = ''
  let addTaskList = document.getElementById('addTaskList')
  /*  let dt = new Date() */
  taskObj.forEach((val, index) => {


    /* taskStatusVal = taskStatus.value */
    console.log(index)
    taskArrayElemenet += `<div class="card mt-3">
    <div class="card-header"><i class="fa-solid fa-calendar-days">${val.time}</i><i class="fa-solid fa-arrow-right-arrow-left"></i>${val.status}<i class="fa-solid fa-comment"></i></div>
    <div class="card-body"><h6>${val.title}</h6><p>${val.decr}</p></div>
    <div class="card-footer text-center">
        <button type="button" class="btn btn-outline-light  " onclick="edit(${index})" data-bs-toggle="modal"
            data-bs-target="#editTask">
            <i class="fa-solid fa-pen"></i> Edit
        </button>
        <button type="button" class="btn btn-delete btn-outline-light" onclick="showdeleteTask(${index})" id="deleteTaskbtn" data-bs-toggle="modal"
            data-bs-target="#deleteTask">
            <i class="fa-solid fa-calendar-xmark"></i> Delete
        </button>
    </div>
</div>`

  })


  addTaskList.innerHTML = taskArrayElemenet;

}

showContent("all");


addtaskbtn.addEventListener("click", function () {

  taskTitleVal = taskTitle.value
  taskStatusVal = taskStatus.value
  taskDescriptionVal = taskDescription.value
  taskDateText = taskDate.value
  console.log(taskDateText)
  const newObj = { 'title': taskTitleVal, 'status': taskStatusVal, 'decr': taskDescriptionVal, 'time': taskDateText }
  if (taskTitleVal.trim() != 0) {

    let webtask = localStorage.getItem("localtask");
    /*  console.log(webtask) */
    if (webtask == null) {
      taskObj = [];
    }
    else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push(newObj);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    /*  console.log(localStorage) */
  }
  taskTitle.value = ''

  taskDescription.value = ''

  showContent();
})

/* edit part start */
function edit(ind) {
  /* console.log(ind) */
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  /* console.log(taskObj[ind]) */
  let edittaskbtn = document.getElementById('editTask')
  let editTitle = document.getElementById('edit-title')
  let editDescription = document.getElementById('edit-description')
  let editStatus = document.getElementById('edit-status')
  let addcomment = document.getElementById('addcomment')
  

  let saveindex = document.getElementById('saveindex')
  saveindex.value = ind
  /* console.log(saveindex.value) */
  taskObj[ind].title = editTitle.value 
  
  taskObj[ind].status= editStatus.value 
  taskObj[ind].decr = editDescription.value 
}

let savetaskbtn = document.getElementById('savetask')

savetaskbtn.addEventListener("click", function () {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  let saveindex = document.getElementById('saveindex').value
 
  let editTitle = document.getElementById('edit-title')
  let editStatus = document.getElementById('edit-status')
  let editDescription = document.getElementById('edit-description')
  let edittaskbtn = document.getElementById('editTask')
  taskObj[saveindex] = { 'title': editTitle.value, 'status': editStatus.value, 'decr': editDescription.value }
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showContent()

})

function showdeleteTask(index) {
  let deleteTaskbtn = document.getElementById('deleteTaskbtn')
  let cardbody = document.getElementById('cardbody');
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  console.log(index)
  /* taskTitleVal = console.log("Title: "+taskObj[index].title)
  taskStatusVal = console.log("Status: "+taskObj[index].status)
  taskDescriptionVal =console.log("Description: "+taskObj[index].decr) */

  cardbody.innerHTML = `<p> Title: ${taskObj[index].title} </p>
<p> Status: ${taskObj[index].status} </p>
<p> Description:${taskObj[index].decr} </p>`

  let modaldetebtn = document.getElementById('modaldetebtn')
  modaldetebtn.addEventListener("click", () => {
    taskObj.splice(index, 1)
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showContent()
  })


}




