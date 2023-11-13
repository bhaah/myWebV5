//variables that i will use a lot :
const _creatBoardBtn =()=>{ return getE('creat_board_btn');}

const _divCreatingPanel = ()=>{return getE('panel_of_creating_board_div');}
const _inputName =()=> {return getE('input_name');}
const _submitBtn =()=> {return getE('submit_btn');}
let panelIsOpened = false;
const getE = (id) =>{
    return document.getElementById(id);
}

// =========================================================

function backToHome(){
    window.location.replace('./homePage');
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