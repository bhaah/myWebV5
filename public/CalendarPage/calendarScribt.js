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
    await calendarCallAPI('calendar',{}).then(result=>{
        tasksObjects = result.ReturnValue;
    });
    disableTasks();
}


function disableTasks(){
    
    tasksObjects.forEach(element=>{
        const li = document.createElement('li');
        li.innerHTML =`${element.Task.Name}`;
        getE('task_calendar_ul').appendChild(li);
    })
}