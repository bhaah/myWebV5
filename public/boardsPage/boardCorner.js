// ============================funs that will help===========================================
let corIsOpend = {};
let _col = 0;
let panelNewCornerIsOpened = false;
let _corners = [];
let _emailCornerPage ='';
let _passwordCornerPage ='';
const _cornerDiv =()=>{return getE('corners_div');}
let _colTasks ={}; //id of corner : {4 arrays for each column that conatains data of tasks} 
// corId : {
//      col_a:{
//          [ TASK1,TASK2 ...]
//      }
//      col_b:{ [...] }

let _boardId= 0 ;
function setBoardId(id) {
    _boardId=id;
}
let _boardName = '';
function setBoardName(boardName){
    _boardName = boardName;
    getE('the_name_of_curr_board').innerHTML = _boardName;
}
//form data contain email and password
formDataBase = ()=>{
    const formData = new FormData();
    formData.append('email',_emailCornerPage);
    formData.append('password',_passwordCornerPage);
    return formData;
}

formDataBuilder =(map) =>{
    const formData =new FormData();
    formData.append('email',_emailCornerPage);
    formData.append('password',_passwordCornerPage);
    Object.keys(map).forEach(key=>formData.append(key,map[key]))
    return formData;
}

// API REQUEST
async function callAPI(reqName,map){
    const formData = formDataBuilder(map);
    return await fetch(`https://api-backend-of-my-app.onrender.com/api/Home/${reqName}`,{
        method:'POST',body :formData
    }).then(response=>{
        return response.json();
    }).catch(error=>console.log(error));
}
// form data contain the updates rquest params
formDataUpdate = (toUpadteKey,toUpdateValue,corId,placeOnArray)=>{
    console.log(`${corId}`);
    const formData = formDataBase();
    formData.append('corId',corId);
    formData.append('taskId',_colTasks[corId][_col][placeOnArray].Id);
    formData.append('status',_col);
    formData.append(toUpadteKey,toUpdateValue);
    return formData;
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// =================================NOTES=========================================
//close note window
function closeNotes(){
    getE('notes_container').style.display= 'none';
}

//to match the input height
function updateNoteHieght(id){
    getE(id).style.height = `${getE(id).scrollHeight}px`
    getE(id+'_save_btn').style.display='block';
}

async function saveNoteChanges(id){
    const newContent = getE(id).value;
    const noteId=getE(id).noteId;
    const map = {
        'noteId':noteId,'noteToChange' : newContent
    };


    simulateLoading();
    await callAPI('editNote',map).then(result=>{
        stopLoading();
        getE(id+'_save_btn').style.display='none';
    })
}
//add note to the list
function addNote(note){
    console.log(note);
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('corner-item');
    noteDiv.style.color = "white";
    noteDiv.id = note.Id + '_note_div';
    noteDiv.innerHTML = `
    <textarea onclick="addListenerToDelete(${note.Id})" type="text" style="color:white;width: 90%;background-color: transparent;border: 0;" oninput="updateNoteHieght(id)" id="${note.Id}_note"></textarea>
    <button onclick="saveNoteChanges('${note.Id}_note')" class="note-btn" id="${note.Id}_note_save_btn" style="display: none;">save</button>`;
    getE('notes_list').appendChild(noteDiv);
    getE(`${note.Id}_note`).addEventListener('select',()=>{
        addListenerToDelete(note.Id);
    })
    getE(`${note.Id}_note`).value = note.Content;
    getE(`${note.Id}_note`).noteId = note.Id;
    getE(`${note.Id}_note`).style.height = `${getE(`${note.Id}_note`).scrollHeight}px`;
}
//select not to delete
function addListenerToDelete(id){
    console.log('the text area is selected '+id);
    getE('delete_note_btn').addEventListener('click',()=>{
        deleteNote(id);
    })
}
//delete selected note 
async function deleteNote(id){
    const map = {'noteId':id};
    simulateLoading();
    await callAPI('deleteNote',map).then(result=>{
        stopLoading();
        if(!result.ErrorOccured){
            getE(`${id}_note_div`).remove();
        }
    })
}
//add note button
async function addNoteBtn(){
    const map = {
        'content':'_','id':0
    };
    simulateLoading();
    await callAPI('addNote',map).then(result=>{
        stopLoading();
        addNote(result.ReturnValue);
    });
}
//open notes window
async function openNotes(){
    simulateLoading();
    await callAPI('getNotesOfBoard',{}).then(result=>{
        stopLoading();
        getE('notes_container').style.display = 'block';
        getE('notes_list').innerHTML ='';
        result.ReturnValue.forEach(note=>addNote(note));
    })
}


//^^^^^^^^^^^^^^^^^^^^^^^^^^NOTES^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//==========================CORNERS============================================================
//Main load page function
async function loadCorners(){
    simulateLoading();
    console.log('hi');
    await fetch('../getCorners',{
        method:'POST',
        headers :{
            'Content-Type' : 'application/json'
        }
    }).then(response =>{
        return response.json();

    }).then(result=>{
        _corners = result.corners;
        _emailCornerPage=result.email;
        _passwordCornerPage=result.password;
        setBoardId(result.boardId);
        setBoardName(result.boardName);
    }).catch(error=>console.log(error));
    
    loadCornersList();
    loadTasks();
    stopLoading();
    setTimeout(reloadBoardCornersPageInBackground,60000);
}

async function reloadBoardCornersPageInBackground(){
    const map = {'BoardId':_boardId};
    await callAPI('getInBoard',map).then(result=>{
        _corners=result.ReturnValue;
    });
    loadTasks();
    setTimeout(reloadBoardCornersPageInBackground,60000);
}


//creat div for each _corner element , and animate the progress circle 
function loadCornersList(){
    _cornerDiv().innerHTML ='';
    for(let i=0;i<_corners.length;i++){
        corIsOpend[_corners[i].ID]=false;
        _cornerDiv().innerHTML += creatCornerDiv(_corners[i].ID,_corners[i].Name,_corners[i].Description);
        
        //145 is for 0% of the circle - 360 is 100% of the circle
        const degs = _corners[i].Progress*2.15;
        getE(`${_corners[i].ID}_progress`).style.strokeDasharray = `${360}`;


        getE(`${_corners[i].ID}_progress`).style.setProperty('--progress',`${360-degs}`);
        getE(`${_corners[i].ID}_progress`).classList.add('animate-progress-c');
    }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^CORNERS^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//===============================TASKS====================================================
async function loadTasks(){
    
    for(let i=0;i<_corners.length;i++){
        let corTasks ={
            "0":[],
            "1":[],
            "2":[],
            "3":[]
        };
        const formData = new FormData();
        formData.append('email',_emailCornerPage);
        formData.append('password',_passwordCornerPage);
        formData.append('id',_corners[i].ID);

        await fetch('https://api-backend-of-my-app.onrender.com/api/Home/getTasksInCorner',{
            method:'POST',body:formData
        }).then(response=>{
            return response.json();
        }).then(result=>{
            console.log(result);
            let allTasks=result.ReturnValue;
            if(allTasks!==null){
                for(let x=0 ; x<allTasks.length;x++){
                    corTasks[`${allTasks[x].Status}`].push(allTasks[x]);
                    
                }
                console.log(corTasks);
                _colTasks[_corners[i].ID] = corTasks;
            }
            
        })
    }
   
}




let _styleSheet ;
const styleSheet = ()=>{
    if(_styleSheet===null)_styleSheet=document.createElement('style');
    return _styleSheet;
};

function animateProgress(degs,id,idE){
    const keyframe=`
    @keyframes animate-progress-${id}
    {
        0%{stroke-dashoffset: 360;}
        100%{stroke-dashoffset: ${360-degs};}
    }
    `;
    getE(idE).appendChild(styleSheet());
    const style = styleSheet().sheet;
    style.insertRule(keyframe,style.cssRule.length);
    getE(idE).style.animation = `animate-progress-${id} 1s forwards`;

}

function setCol(col){
    Object.keys(corIsOpend).forEach(key=>corIsOpend[key]=false);
    cleanTasksLists();
    getE(`col_${_col}`).style.backgroundColor ='';
    getE(`col_${_col}`).style.borderBottom = '0';

    _col=col;

    getE(`col_${col}`).style.backgroundColor ='#016b6b';
    getE(`col_${col}`).style.borderBottom = 'solid 2px darkcyan';
}


async function refreshCorners(){
    const formData = new FormData();
    formData.append('email',_emailCornerPage);
    formData.append('password',_passwordCornerPage);
    simulateLoading();
    await fetch(`https://api-backend-of-my-app.onrender.com/api/Home/getCorners`,{
        method:'POST',
        body:formData
    }).then(response=>{
        stopLoading();
        return response.json();
    }).then(result=>{
        console.log(result);
        _corners=result.ReturnValue;
    }).catch(error=>console.log(error));
    loadCornersList();
}

function cleanTasksLists(){
    for(let i=0;i<_corners.length;i++){
        getE(`${_corners[i].ID}_cor_tasks`).innerHTML='';
    }
}


//disable the edit of task info 
function openEditTaskSelector(){
    let  display = getE('edit_tittle').style.display === 'none' ? 'inline' : 'none';
    getE('edit_tittle').style.display = display;
    getE('edit_desc').style.display = display;
    getE('edit_deadline').style.display = display;
    getE('edit_start_time').style.display=display;
}

function editTask(type){
    prepareTaskEditor(type);
    getE('submit_editing').typeOfEditing = type; 

}



//to disable the update info input (OPEN)
function prepareTaskEditor(type){
    getE('editing_task_info_div').style.display='flex';
    inputType = (type === 'Name' || type==='Desc')? 'text':'datetime-local';
    switch(type){
        case 'Name':
            tittle = 'tittle';
            break;
        case 'Desc':
            tittle= 'descreption';
            break;
        case 'Deadline':
            tittle = 'deadline' ;
            break;
        case 'StartTime':
            tittle = 'time to start';
            break;
        default:
            break;
    }

    adjustEditingInfoDiv(tittle,inputType);
}


//close the update info (CLOSE)
function closeEditor(){
    getE('editing_task_info_div').style.display='none';
}


//set the label of type of update
adjustEditingInfoDiv=(tittle,inputType) =>{
    let id= '_of_editing';
    getE("label"+id).innerHTML ='new '+ tittle;
    getE('input'+id).type = inputType;
} 



//this function is called when clicking in the corner 
function openTasks(corId){
    if(corIsOpend[corId]){
        getE(`${corId}_cor_tasks`).innerHTML='';
        corIsOpend[corId] = false;
    }
    else{
        if(_col===0)getE(`${corId}_cor_tasks`).innerHTML += `
        <div class="task" onclick="creatTask(${corId})" style="justify-content: center;">
            <h2>Creat new task</h2>
            <button class="move-task-btn">
                <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
        </div>
        `
        tasksOfCor = _colTasks[corId][`${_col}`];
        for(let i=0;i<tasksOfCor.length;i++){
            console.log(tasksOfCor[i]);
            const newTask = addTask(tasksOfCor[i].Id,tasksOfCor[i].Name,i,corId);
            getE(`${corId}_cor_tasks`).innerHTML += newTask;
        }
        corIsOpend[corId]=true;
    }
    
}

//to open creat task window
function creatTask(id){
    getE('creat_new_task_window').style.display= 'block';
    _currCorId = id;
}
//to close creat task window
function closeCreatTaskWindow(){
    getE('creat_new_task_window').style.display= 'none';
}
let _currCorId = 0;
async function submitCreatingTask(){
    const name = getE('creat_new_task_tittle').value;
    const desc = getE('creat_new_task_descreption').value;
    const deadline = getE('creat_new_task_deadline').value;
    if(name !== " ".repeat(name.length) && deadline!==''){
        const formData = new FormData();
        formData.append('email',_emailCornerPage);
        formData.append('password',_passwordCornerPage);
        formData.append('corId',_currCorId);
        formData.append('taskName',name);
        formData.append('desc',desc);
        formData.append('dateTime',deadline);
        simulateLoading();
        await fetch('https://api-backend-of-my-app.onrender.com/api/Home/creatTask',{
            method:'POST',
            body:formData
        }).then(response => {
            stopLoading();
            return response.json();
        }).then(result=>{
            _colTasks[_currCorId]["0"].push(result.ReturnValue);
            openTasks(_currCorId);
            refreshCorners();
        }).catch(error=>console.log(error));

    }
    getE('creat_new_task_tittle').value='';
    getE('creat_new_task_descreption').value='';
    getE('creat_new_task_deadline').value='';
}



async function moveTask(corId,placeOnArray){
    if(_col===0 && _colTasks[corId][_col][placeOnArray]['TaskStart']==='0001-01-01T00:00:00'){
        alert('you must set time for start to move your task');
    }
    else{
        const dataToSend = {
            'corId':corId,'taskId':_colTasks[corId][_col][placeOnArray].Id
        }
        callAPI('moveTask',dataToSend).then(result=>{
            if(!result.ErrorOccured){
                const task = _colTasks[corId][_col][placeOnArray];
                _colTasks[corId][_col+1].push(task);
                _colTasks[corId][_col].splice(placeOnArray,1);
                openTasks(corId);
                refreshCorners();
            }
        })
    }
}

// sending the editing request to the api 
async function submitEditing(){
    let type = getE('submit_editing').typeOfEditing;
    let corId = getE('submit_editing').corId;
    let placeOnArray = getE('submit_editing').placeOnArray;
    
    
    const input = getE('input_of_editing').value;
    if(input!==null){
        getE('input_of_editing').value='';
        const formData = formDataUpdate(type,input,corId,placeOnArray);
        simulateLoading();
        await fetch(`https://api-backend-of-my-app.onrender.com/api/Home/Update${type}`,{
            method:'POST',body:formData
        }).then(response=>{
            stopLoading();
            return response.json();
        }).then(result=>{
            if(!result.ErrorOccured){
                let toChange = '';
                switch(type){
                    case 'Name':
                        toChange='Name';
                        break;
                    case 'Desc':
                        toChange = 'Descreption';break;
                    case 'StartTime':
                        toChange = 'TaskStart';break;
                    case 'Deadline':
                        toChange = 'TaskFor';break;
                    default:
                        break;
                }
                _colTasks[corId][_col][placeOnArray][toChange]= input;
                getE(toChange+'_task_info_span').innerHTML =input; 
                openTasks(corId);
            }
        }).catch(error=>console.log(error));
    }
}





async function deleteTask(){
    const corId=getE('delete_task_btn').corId;
    const placeOnArray = getE('delete_task_btn').placeOnArray;
    const map = {
        'email':_emailCornerPage,'password':_passwordCornerPage,'boardId':_boardId,'corId':corId,'taskId':_colTasks[corId][_col][placeOnArray].Id
    };
    simulateLoading();
    await callAPI('deleteTask',map).then(result=>{
        
        
        if(!result.ErrorOccured){
            _colTasks[corId][_col].splice(placeOnArray,1);
            refreshCorners();//to refresh progress
            openTasks(corId); //to refresh task list
            openTaskInfo(); //to close the window of the deleted task
        }
        stopLoading();
        console.log(result);
    });
}

function openTaskInfo(corId,placeOnArray){
    console.log('hi from open task info function');
    getE('task_info_container').style.display=(getE('task_info_container').style.display==='none')? 'block':'none';
    if(corId!==null) {
        buidTaskInfo(_colTasks[corId][_col][placeOnArray]);
        getE('submit_editing').corId = corId;
        getE('submit_editing').placeOnArray = placeOnArray;
        getE('delete_task_btn').corId=corId;
        getE('delete_task_btn').placeOnArray=placeOnArray;
    }
}
function buidTaskInfo(task){
    
    Object.keys(task).forEach(key=>{
        let id= key+'_task_info_span';
        if(getE(id)!==null){
            console.log(task);
            getE(id).innerHTML=task[key];
        }
    })
}

function addTask(id,name,placeOnArray,corId){
    return `
    
    <div class="task" id="${id}_task_${placeOnArray}">
        <h3 onclick="openTaskInfo(${corId},${placeOnArray})">${name}</h3>
        <button class="move-task-btn" onclick="moveTask(${corId},${placeOnArray})">
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
        </button>
    </div>
`;
}

function creatCornerDiv(id,name,disc){
    return `
<div onclick="openTasks(${id})" class="corner-item" id="${id}_corner">
    <div style="width: 70%;">
        <h2 style="word-wrap: break-word;"><i onclick="deleteCorner(${id})" class="fa fa-trash" aria-hidden="true"></i>
        ${name}</h2>
        <p style="word-wrap: break-word;">${disc}</p>
    </div>
    <div style="width:30%;">
        <svg>
            <circle class="bg" cx="45" cy="45" r="35" />
            <circle class="meter-1" cx="45" cy="45" r="35" id="${id}_progress" />
          </svg>
    </div>
</div>
<div id="${id}_cor_tasks"></div>
`
}

function forTest(){
    console.log('hi');
}

async function deleteCorner(id){
    const map = {
        'corId':id
    };
    simulateLoading();
    await callAPI('deleteCorner',map).then(result=>{
        refreshCorners();
        stopLoading();
    })
}


function openNewCornerPanelInput(){
    const btn = () => {return getE('open_add_corner_btn');};
    const panel = () =>{return getE('creat_cor_panel');}
    if(panelNewCornerIsOpened ){
        //close
        panelNewCornerIsOpened=false;
        replaceAnimation(btn,'rotate-btn-c',false);
        replaceAnimation(panel,'slide-creat-corner-panel-c',false);
        disableInputs(true)
    }
    else{
        //open
        panelNewCornerIsOpened=true;
        replaceAnimation(btn,'rotate-btn-c',true);
        replaceAnimation(panel,'slide-creat-corner-panel-c',true);
        setTimeout(()=>{
            disableInputs(false);
        },800)
    }
}


function disableInputs(toDis){
    let display = toDis ? 'none' : 'block';
    let displayBtn = toDis?'none':'flex';
    getE('panel_inputs').style.display = display;
    getE('creat_btn_in_panel').style.display=displayBtn;
}


async function creatCor(){
    const name = getE('name_new_cor_input').value;
    const desc = getE('description_new_cor_input').value;


    let emptyString = " ".repeat(name.length);
    if(emptyString !== name){
        const formData = new FormData();
        formData.append('email',_emailCornerPage);
        formData.append('password',_passwordCornerPage);
        formData.append('name',getE('name_new_cor_input').value);
        formData.append('desc',getE('description_new_cor_input').value);
        simulateLoading();
        await fetch('https://api-backend-of-my-app.onrender.com/api/Home/creatCorner',{
            method:'POST',
            body:formData
        }).then(response=>{
            stopLoading();
            return response.json();
        }).then(result=>{
            refreshCorners();
        }).catch(error=>console.log(error));
    }
    
    getE('description_new_cor_input').value='';
    getE('name_new_cor_input').value='';
}   