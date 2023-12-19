//================= calendar page functions ============================

let _username_calendar;
let _email_calendar;
let _password_calendar;

let tasksObjects = [];


formDataBuilderCalendar =(map) =>{
    const formData =new FormData();
    formData.append('email',_email_calendar);
    formData.append('password',_password_calendar);
    Object.keys(map).forEach(key=>formData.append(key,map[key]))
    return formData;
}

// API REQUEST
async function calendarCallAPI(reqName,map){
    const formData = formDataBuilderCalendar(map);
    return await fetch(`https://api-backend-of-my-app.onrender.com/api/Home/${reqName}`,{
        method:'POST',body :formData
    }).then(response=>{
        return response.json();
    }).catch(error=>console.log(error));
}

async function callServer(reqName,body){
    const json = JSON.stringify(body);
    return await fetch(`../${reqName}`,{
        method:'POST',
        headers :{
            'Content-Type' : 'application/json'
        }
        ,body:json
    }).then(response=>{
        return response.json();
    }).catch(error=>console.log(error));
}


// --------------------------- Load page -------------------------------------------
async function loadCalendarPage(){
    
    await callServer('getlogedinuser',{}).then(result=>{
        _email_calendar=result.email;
        _password_calendar=result.password;
        _username_calendar=result.password;
    });
    //await calendarCallAPI('refreshTasks',{});
    await calendarCallAPI('calendar',{}).then(result=>{
        tasksObjects = result.ReturnValue;
    });
    disableTasks();
    setTimeout(refresh,10000);
}
async function refresh(){
    await calendarCallAPI('refreshTasks',{});
   
    await calendarCallAPI('calendar',{}).then(result=>{
        tasksObjects = result.ReturnValue;
    });
    disableTasks();
    setTimeout(refresh,60000);
}

function disableTasks(){
    getE('task_calendar_ul').innerHTML='';
    tasksObjects.forEach(element=>{
        const li = document.createElement('div');
        li.classList.add('calendar-task-item');
        li.id = `${element.Task.Id}_task_calendar`;
        li.taskId = element.Task.Id;
        li.boardId = element.BoardId;
        li.corId = element.CorId;
        li.innerHTML =getTaskCalendarElement(element);
        getE('task_calendar_ul').appendChild(li);
    })
}


function getTaskCalendarElement(task){
    const btn = (task.Task.Status===0) ? {color:'white',txt:'Set',fun:`setTimeToStart(${task.Task.Id})`}:{color : 'green',txt:'Done',fun:`taskDone(${task.Task.Id})`};

    return `
    <h1>${task.Task.Name}</h1>
    <h4 style="margin: 10px;">${task.Task.Description}</h4>
    <div style="position:relative;height:100px;width:100%;">
        <p style="position:absolute;left:10px;bottom:0;">Task for : ${fixDateTimeTask(task.Task).TaskFor}</p>
        <button style="position: absolute;right: 10px;bottom: 10px;border: 0;border-radius: 5px;background-color: ${btn.color};" onclick="${btn.fun}">${btn.txt}</button>
    </div>
   
    
`
}


function taskDone(id){
    const idE=id+'_task_calendar';
    calendarCallAPI('moveTaskFromCalendar',{'boardId':getE(idE).boardId,'corId':getE(idE).corId,'taskId':id}).then(result=>{
        if(!result.ErrorOccured){
            
            tasksObjects = tasksObjects.filter(element=>{
                return id!==element.Task.Id;
            });
            getE(id+'_task_calendar').remove();
        }
    });
    
}


let _taskId=0;
function setTimeToStart(id){
    openCalendarStartTime();
    
    _taskId = id;
    
}
function editStartTime(){
    const ide = _taskId+'_task_calendar';
    const time = (getE('new_start_time_calendar').value);
    if(time){
        const map = {
            'boardId':getE(ide).boardId,
            'corId':getE(ide).corId,
            'taskId':_taskId,
            'time':time,
            'status':0
        };
        calendarCallAPI('UpdateStartTimeFromCalendar',map).then(result=>{
            if(!result.ErorrOccured){
                tasksObjects = tasksObjects.filter(element=>{
                    return _taskId!==element.Task.Id;
                });
                getE(ide).remove();
                closeCalendarStartTime();
            }
        })
    }
}

function openCalendarStartTime(){
    getE('set_time_to_start_container').style.display='flex';
}

function closeCalendarStartTime(){
    getE('set_time_to_start_container').style.display='none';
}



function backToHome(){
    window.location.replace('../');
}