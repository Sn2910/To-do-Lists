let taskTitle = document.getElementById('task-title')
let taskStatus = document.getElementById('task-status')
let taskDescription = document.getElementById('task-description')
let addtaskbtn = document.getElementById('addtaskbtn')
let dt = new Date()


addtaskbtn.addEventListener("click", function () {

  taskTitleVal = taskTitle.value
  taskStatusVal = taskStatus.value
  taskDescriptionVal = taskDescription.value
  const newObj = { 'title': taskTitleVal, 'status': taskStatusVal, 'decr': taskDescriptionVal }
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

  showContent();
})
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
  let dt = new Date()
  taskObj.forEach((val, index) => {
  

    /* taskStatusVal = taskStatus.value */
      console.log(index) 
    taskArrayElemenet += `<div class="card">
    <div class="card-header"><i class="fa-solid fa-calendar-days"></i><i class="fa-solid fa-arrow-right-arrow-left"></i><i class="fa-solid fa-comment"></i></div>
    <div class="card-body"><h6>${val.title}</h6><p>${val.taskdecr}</p></div>
    <div class="card-footer text-left">
        <button type="button" class="btn btn-success" data-bs-toggle="modal"
            data-bs-target="#editTask">
            <i class="fa-solid fa-pen"></i> Edit
        </button>
        <button type="button" class="btn btn-danger"onclick="showdeleteTask(${index})" id="deleteTaskbtn" data-bs-toggle="modal"
            data-bs-target="#deleteTask">
            <i class="fa-solid fa-calendar-xmark"></i> Delete
        </button>
    </div>
</div>`

  })

  addTaskList.innerHTML = taskArrayElemenet;

}

function edit(ind) {
  console.log(ind)
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  /* console.log(taskObj[ind].title) */
  let edittaskbtn = document.getElementById('editTask')
  let editTitle = document.getElementById('edit-title')
  let editDescription = document.getElementById('edit-description')
  let editStatus = document.getElementById('edit-status')
  let addcomment = document.getElementById('addcomment')
  console.log(taskTitle)
  
  
  let saveindex = document.getElementById('saveindex')
  saveindex.value = ind
  /* console.log(saveindex.value) */
  editTitle.value = taskObj[ind].title
   console.log(editTitle.value) 
  editStatus.value = taskObj[ind].status
  editDescription.value = taskObj[ind].decr
}

let savetaskbtn = document.getElementById('savetask')
/* console.log(savetaskbtn) */
savetaskbtn.addEventListener("click", function () {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  let saveindex = document.getElementById('saveindex').value
  /*  console.log(saveindex) */
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




