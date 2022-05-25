

let taskTitle = document.getElementById('task-title')
let taskStatus = document.getElementById('task-status')
let taskDescription = document.getElementById('task-description')
let addtaskbtn = document.getElementById('addtaskbtn')






addtaskbtn.addEventListener("click", function(){
 
  taskTitleVal = taskTitle.value
  taskStatusVal = taskStatus.value
  taskDescriptionVal = taskDescription.value
  const newObj = {'title':taskTitleVal, 'status': taskStatusVal,'decr':taskDescriptionVal}
  if(taskTitleVal.trim()!=0 ){

    let webtask = localStorage.getItem("localtask");
   /*  console.log(webtask) */
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    taskObj.push(newObj);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
   /*  console.log(localStorage) */

  }


  showContent(); 

})
function showContent(){
  
  let webtask = localStorage.getItem("localtask");
  if(webtask == null){
      taskObj = [];
  }
  else{
      taskObj = JSON.parse(webtask);
  }
  let taskArrayElemenet = ''
  let addTaskList = document.getElementById('addTaskList')

  taskObj.forEach((val,index) =>{
    let dt = new Date()

    taskStatusVal = taskStatus.value
/*   console.log(index) */
    taskArrayElemenet += `<div class="card">
    <div class="card-header"><i class="fa-solid fa-calendar-days"></i>${dt}<i class="fa-solid fa-arrow-right-arrow-left"></i>${val.status}<i class="fa-solid fa-comment"></i></div>
    <div class="card-body"><h6>${val.title}</h6>
    <p> ${val.decr}</p></div>
    <div class="card-footer text-left">
        <button type="button"  class="btn btn-success" onclick="edit(${index})" id="edittaskbtn" data-bs-toggle="modal"
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

function edit(ind){
console.log(ind)
let webtask = localStorage.getItem("localtask");

let taskObj = JSON.parse(webtask)
/* console.log(taskObj[ind].title) */

  let edittaskbtn = document.getElementById('editTask')
  let editTitle = document.getElementById('edit-title')
  console.log(taskTitle)
  let editStatus = document.getElementById('edit-status')
let editDescription = document.getElementById('edit-description')
  let saveindex = document.getElementById('saveindex')
  saveindex.value = ind
  console.log(saveindex.value)
editTitle.value = taskObj[ind].title
/* console.log(editTitle.value) */
editStatus.value =taskObj[ind].status
editDescription.value = taskObj[ind].decr
}

let savetaskbtn = document.getElementById('savetask')
console.log(savetaskbtn)
savetaskbtn.addEventListener("click",function(){
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  let saveindex = document.getElementById('saveindex').value
  console.log(saveindex)
  let editTitle = document.getElementById('edit-title')
  let editStatus = document.getElementById('edit-status')
let editDescription = document.getElementById('edit-description')
let edittaskbtn = document.getElementById('editTask')
  taskObj[saveindex] = editTitle.value
  taskObj[saveindex] = editStatus.value
  taskObj[saveindex] = editDescription.value
  localStorage.setItem("localtask", JSON.stringify(taskObj));

})