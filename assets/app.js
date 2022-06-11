let taskTitle = document.getElementById('task-title')
let taskStatus = document.getElementById('task-status')
let taskDescription = document.getElementById('task-description')
let addtaskbtn = document.getElementById('addtaskbtn')
let commentBtn = document.getElementById("comment-btn")
let taskDate = document.getElementById('task-date')
let savetaskbtn = document.getElementById('savetask')
let addTaskModalBody = document.querySelector('#addTask .modal-body')
let editTaskModalBody = document.querySelector('#editTask .modal-body')
let commentModalBody = document.querySelector('#addComment .modal-body')
let popUpMsg = document.querySelector('#alert-msg')


function showPopUp(text){
  popUpMsg.innerHTML = `<h4>Success!</h4>
  <p>You have successfully ${text}</p>`
  
	popUpMsg.style.visibility= 'visible';
}
function ClosePopUp(){
	popUpMsg.style.visibility="hidden";
}




function checkKeyAdd(){
  console.log('test') 
  const errors = [...document.querySelectorAll('#addTask .invalid-feedback')].filter((element)=>{return getComputedStyle(element, null).display ==='block'}).length
  if(errors){
    addtaskbtn.disabled = true;
  } else {
    addtaskbtn.disabled = false;
  }
}
addTaskModalBody.addEventListener('keydown', checkKeyAdd )

function checkKeyEdit(){
  console.log('test') 
  const errors = [...document.querySelectorAll('#editTask .invalid-feedback')].filter((element)=>{return getComputedStyle(element, null).display ==='block'}).length
  if(errors){
    savetaskbtn.disabled = true;
  } else {
    savetaskbtn.disabled = false;
  }
}
editTaskModalBody.addEventListener('keydown', checkKeyEdit )

function checkKeyComment(){
  console.log('test') 
  const errors = [...document.querySelectorAll('#addComment .invalid-feedback')].filter((element)=>{return getComputedStyle(element, null).display ==='block'}).length
  if(errors){
    commentBtn.disabled = true;
  } else {
    commentBtn.disabled = false;
  }
}
commentModalBody.addEventListener('keydown', checkKeyComment )

addtaskbtn.addEventListener("click", function () {

  taskTitleVal = taskTitle.value
  taskStatusVal = taskStatus.value
  taskDescriptionVal = taskDescription.value
  taskDateText = taskDate.value
  taskComment = []
  console.log(taskDateText)
  const newObj = { 'title': taskTitleVal, 'status': taskStatusVal, 'decr': taskDescriptionVal, 'time': taskDateText, 'comment': taskComment }
  if (taskTitleVal.trim() != 0 && taskDateText != '')  {
  
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
  /* swal("Task added successfully"); */
 
  taskTitle.value = ''
  taskDescription.value = ''

  showContent();

  showPopUp('Added a new Task');
  let timeOut = setTimeout(ClosePopUp,3000);
  
  showContent();
})



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
  
  let addTaskList = document.getElementById('addTaskList');
  let inProgress = document.getElementById('con-progress');
  let taskDone = document.getElementById('con-done');
  addTaskList.innerHTML=''
  inProgress.innerHTML =''
  taskDone.innerHTML =''
  taskObj.forEach((val, index) => {
    
    taskArrayElemenet = `<div class="card-task mt-3">
    <div class="card-header"><i class="fa-solid fa-calendar-days"><b>${val.time}</b></i><i class="fa-solid fa-arrow-right-arrow-left"><b>${val.status}</b></i><i class="fa-solid fa-comment"><b>${val.comment.length}</b></i></div>
    <div class="card-body"><b>Title: </b>${val.title}<br><b>Description: </b>${val.decr}</div>
    <div class="card-footer text-end">
        <button type="button" class="btn btn-outline-light id='${index}' " onclick="edit(${index})" data-bs-toggle="modal"
            data-bs-target="#editTask">
            <i class="fa-solid fa-pen"></i> Edit
        </button>
        <button type="button" class="btn btn-delete btn-outline-light" onclick="showdeleteTask(${index})" id="deleteTaskbtn" data-bs-toggle="modal"
            data-bs-target="#deleteTask">
            <i class="fa-solid fa-calendar-xmark"></i> Delete
        </button>
    </div>
</div>`
listmaker(index)

  })
  /* console.log('show status' +taskObj[index].status) */
  /* addTaskList.innerHTML = taskArrayElemenet; */
 
  function listmaker(ind){
   
    console.log('show status' +taskObj[ind].status) 
    if (taskObj[ind].status === 'todo'){
     
      addTaskList.innerHTML += taskArrayElemenet;
      
    }else if (taskObj[ind].status === 'progress'){
      inProgress.innerHTML += taskArrayElemenet;
      
    }else {
      taskDone.innerHTML += taskArrayElemenet;
      
    }
    taskArrayElemenet = ''
    }
/* showContent("all"); */
taskArrayElemenet = ''
}



function buttcom(index){
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  let commentText = document.getElementById('comment-text');
  let taskObjSave = taskObj[index].comment
  /* console.log('i am tsk' +taskObjSave) */
  taskObjSave.push(commentText.value)
  console.log(taskObj.comment)
  console.log(commentText.value)
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  edit(index)
}
function edit(ind) {
  /* console.log(ind) */
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  console.log(taskObj[ind])
  let edittaskbtn = document.getElementById('editTask')
  let editTitle = document.getElementById('edit-title')
  let editDescription = document.getElementById('edit-description')
  let editStatus = document.getElementById('edit-status')
  let addcomment = document.getElementById('addcomment')
  let timeTable = document.getElementById('task-date-edit')
  let commentOutput = document.querySelector('#comment-output')
  /* let saveindex = document.getElementById('saveindex') */
  let taskObjSave = taskObj[ind].comment
  /* saveindex.value = ind */
  
  editTitle.value = taskObj[ind].title
  editStatus.value = taskObj[ind].status
  editDescription.value = taskObj[ind].decr
  timeTable.value = taskObj[ind].time
  commentOutput.innerHTML = ``;
  for (let text of taskObjSave ){
   commentOutput.innerHTML += `<div>>> ${text}</div>`

    } 
  savetaskbtn.onclick= ()=> {
    save(ind)
    showContent();
  }
  commentBtn.onclick = () =>{
    
    buttcom(ind)
    showContent();
  }

  /* commentBtn.addEventListener('click', */
  /* showContent(); */
}
 /* Save Task Buttun start */


/* savetaskbtn.addEventListener("click",  */
function save(ind) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  let saveindex = document.getElementById('saveindex').value;
  let timeTable = document.getElementById('task-date-edit')
  let editTitle = document.getElementById('edit-title')
  let editStatus = document.getElementById('edit-status')
  let editDescription = document.getElementById('edit-description')
  let edittaskbtn = document.getElementById('editTask')
  let commentTxt = taskObj[ind].comment;
  console.log(commentTxt)
  
  taskObj[ind] = { 'title': editTitle.value, 'status': editStatus.value, 'decr': editDescription.value, 'time': timeTable.value, 'comment': commentTxt }
  localStorage.setItem("localtask", JSON.stringify(taskObj));

  

}

showContent()
/* Comment Text */
/* commentBtn.addEventListener('click',function (){
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  console.log(taskObj)
  let commentText = document.getElementById('comment-text');
  let saveindex = document.getElementById('saveindex').value

  let taskObjSave = taskObj[index].comment
  taskObjSave.push(commentText.value)
  console.log(taskObj.comment)
  console.log(commentText.value)


  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showContent()

}) */

function showdeleteTask(index) {
  let deleteTaskbtn = document.getElementById('deleteTaskbtn')
  let cardbody = document.getElementById('cardbody');
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask)
  console.log(index)
  taskTitleVal = console.log("Title: "+taskObj[index].title)
  taskStatusVal = console.log("Status: "+taskObj[index].status)
  taskDescriptionVal =console.log("Description: "+taskObj[index].decr)

  cardbody.innerHTML = `<p><b>Title: </b> ${taskObj[index].title} </p>
<p><b>Status: </b>${taskObj[index].status} </p>
<p><b>Description: </b>${taskObj[index].decr} </p>`

  let modaldetebtn = document.getElementById('modaldetebtn')
  modaldetebtn.addEventListener("click", () => {
    taskObj.splice(index, 1)
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showContent()
  })

  
}




/* const cardContainer = document.querySelector('.card')
const cardTask = document.querySelectorAll('.card-task')
cardTask.addEventListener('dragstart', ()=>{

}) */