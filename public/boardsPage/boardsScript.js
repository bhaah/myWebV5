
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


function getNewBoard(name,id){
    return `<li onclick="getInBoard('${id}')" id="${id}_board" class="list-group-item board-item" style="    display: flex;
    background-color: rgb(11 34 254 / 80%);
    color: white;
    border: 0;
    font-size: xx-large;
    border-radius: 40px;">${name}</li>`
}


function loadBoardList(){
    const list = getE('list_boards_ul');
    list.innerHTML = '';
    for(let x =0 ; x<_boards.length;x++){
        const boardData = _boards[x];
        
        list.innerHTML += getNewBoard(boardData.Name,boardData.ID);

    }
}

async function getInBoard(id){
    simulateLoading();
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
            corners : result.ReturnValue
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