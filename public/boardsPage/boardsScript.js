
//variables that i will use a lot :
const _creatBoardBtn =()=>{ return getE('creat_board_btn');}

const _divCreatingPanel = ()=>{return getE('panel_of_creating_board_div');}
const _inputName =()=> {return getE('input_name');}
const _submitBtn =()=> {return getE('submit_btn');}
let _email ='';
let _password = '';
let panelIsOpened = false;
let _boards = [];
const getE = (id) =>{
    return document.getElementById(id);
}

// =========================================================


function stam(){
    console.log('stam');
}


function backToHome(){
    window.location.replace('./homePage');
}

async function load(){
    
    await fetch('../getlogedinuser',{
        method:'POST',
        headers:{
            
            'Content-Type': 'application/json',
            
        }
    }).then(response=>{
        //console.log(response.json());
        return response.json();
    }).then(result=>{
        console.log(result);
        _email=result.email;
        _password = result.password;
        
    }).catch(error=>console.log(error));
    const dataToSend = new FormData();
    dataToSend.append('email',_email);
    dataToSend.append('password',_password);


    const boards = await fetch('https://api-backend-of-my-app.onrender.com/api/Home/Boards',{
        method:'POST', 
        body: dataToSend
    }).then(response=>{
        return response.json();

    }).then(result=>{
        _boards = result.ReturnValue;
    }).catch(error=>console.log(error));
    console.log(_boards);
    loadBoardList();
    reloadBoardsPageInBackground();

}

async function abcd(){
const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:8080/chatHub")
    .build();

connection.on("ReceiveMessage", (user, message) => {
    // Handle the received message
    console.log(`${user}: ${message}`);
});

connection.start()
    .then(() => console.log("Connection established"))
    .catch(err => console.error(err));
}

async function reloadBoardsPageInBackground(){
    await fetch('../getlogedinuser',{
        method:'POST',
        headers:{
            
            'Content-Type': 'application/json',
            
        }
    }).then(response=>{
        //console.log(response.json());
        return response.json();
    }).then(result=>{
        console.log(result);
        _email=result.email;
        _password = result.password;
        
    }).catch(error=>console.log(error));
    const dataToSend = new FormData();
    dataToSend.append('email',_email);
    dataToSend.append('password',_password);


    const boards = await fetch('https://api-backend-of-my-app.onrender.com/api/Home/Boards',{
        method:'POST', 
        body: dataToSend
    }).then(response=>{
        return response.json();

    }).then(result=>{
        _boards = result.ReturnValue;
    }).catch(error=>console.log(error));
    console.log(_boards);
    setTimeout(reloadBoardsPageInBackground,60000);
}


function changeCreatBoardMode(){
    if(panelIsOpened){
        _inputName().style.display='none'; 
        _submitBtn().style.display='none'; 
        replaceAnimation(_divCreatingPanel,'slide-creation-board-panel-c',false);
        replaceAnimation(_creatBoardBtn,'rotate-btn-c',false);
        panelIsOpened=false;
    }
    else{
        replaceAnimation(_divCreatingPanel,'slide-creation-board-panel-c',true);
        replaceAnimation(_creatBoardBtn,'rotate-btn-c',true);
        setTimeout(()=>{
            _inputName().style.display='inline-flex'; 
            _submitBtn().style.display = 'flex';  
        },500);
        panelIsOpened=true;
    }
    
}

function replaceAnimation(element,classOfAnimation,toRemoveReverse){
    let classToRemove = toRemoveReverse? classOfAnimation+'-r':classOfAnimation;
    let classToAdd=toRemoveReverse? classOfAnimation : classOfAnimation + '-r';
    element().classList.remove(classToRemove);
    element().classList.add(classToAdd);
}


async function submit(){
    const newBoardName = getE('input_el').value;
    if(newBoardName !=='') {
        console.log(newBoardName);
        getE('input_el').value='';
        const formData = new FormData();
        formData.append('email',_email);
        formData.append('password',_password);
        formData.append('nameOfBoard',newBoardName);

    await fetch('https://api-backend-of-my-app.onrender.com/api/Home/creatBoard',{
        method:'POST',
        body:formData
    }).then(response=>{
        return (response.json());
    }).then(result=>{
        _boards.push(result.ReturnValue);
    }).catch(error=>console.log(error));
    loadBoardList();
    }
    


}


async function deleteBoard(id){
    if(confirmDelete('board')){
        const formData = new FormData();
        formData.append('email',_email);
        formData.append('passowd',_password);
        formData.append('boardId',id);
        simulateLoading();
        await fetch('https://api-backend-of-my-app.onrender.com/api/Home/deleteBoard',{
            method:'POST',body:formData
        }).then(response=>{
            return response.json();
        }).then(result=>{
            console.log(result);
            stopLoading();
            let newBoards = [];
            _boards.forEach(element =>{
                if(element.ID!==id) newBoards.push(element);
            })
            
            _boards= newBoards;
            loadBoardList();
        }).catch(error=>console.log(error));
    }
    
}

function getNewBoard(name,id){
    return `<li  id="${id}_board" class="list-group-item board-item" style="    display: flex;
    background-color: rgb(11 34 254 / 80%);
    color: white;
    border: 0;
    font-size: xx-large;
    border-radius: 40px;"><i onclick="deleteBoard(${id})" style="margin:10px; position:absolute;left:0;" class="fa fa-trash" aria-hidden="true"></i><p onclick="getInBoard('${id}','${name}')"> ${name}</p></li>`
}


function loadBoardList(){
    const list = getE('list_boards_ul');
    list.innerHTML = '';
    for(let x =0 ; x<_boards.length;x++){
        const boardData = _boards[x];
        
        list.innerHTML += getNewBoard(boardData.Name,boardData.ID);

    }
}

async function getInBoard(id,name){
    simulateLoading();
    setBoardId(id);
    const formData = new FormData();
        formData.append('email',_email);
        formData.append('password',_password);
        formData.append('BoardId',id);

    await fetch('https://api-backend-of-my-app.onrender.com/api/Home/getInBoard',{
        method:'POST',
        body:formData
    }).then( response=>  {
        return (response.json());
    }).then(async result=>{
        console.log(result);
        const data = {
            corners : result.ReturnValue,
            boardId:id,
            boardName:name
        };
        const jsonData = JSON.stringify(data);
        await fetch('../setCornersBoard',{
            method: 'POST',
            headers :{
                'Content-Type': 'application/json',
            },
            body:jsonData
        }).then(res=>{
            console.log('hi fromseting corners');
            return res;}).catch(error=>console.log(error));
    }).catch(error=>console.log(error));
    
    stopLoading();
    window.location.assign('./board');
}