
let _corners = [];
let _emailCornerPage ='';
let _passwordCornerPage ='';
const _cornerDiv =()=>{return getE('corners_div');}

async function loadCorners(){
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
    }).catch(error=>console.log(error));
    loadCornersList();
}

function loadCornersList(){
    _cornerDiv().innerHTML ='';
    for(let i=0;i<_corners.length;i++){
        _cornerDiv().innerHTML += creatCornerDiv(_corners[i].ID,_corners[i].Name,_corners[i].Description);
        const degs = _corners[i].Progress*2.15
        getE(`${_corners[i].ID}_progress`).style.strokeDashoffset = `${360-degs}`;
        getE(`${_corners[i].ID}_progress`).style.strokeDasharray = `${360}`;
        
    }
}


async function refreshCorners(){
    await fetch(`http://api-backend-of-my-app.onrender.com/api/Home/getCorners?Email=${_emailCornerPage}&Password=${_passwordCornerPage}`).then(response=>{
        return response.json();
    }).then(result=>{
        console,log(result);
        _corners=result.ReturnValue;
    }).catch(error=>console.log(error));
    loadCornersList();
}


function creatCornerDiv(id,name,disc){
    return `<div class="corner-item" id="${id}_corner">
    <div style="width: 70%;">
        <h2 >${name}</h2>
        <p>${disc}</p>
    </div>
    <div style="width:30%;">
        <svg>
            <circle class="bg" cx="45" cy="45" r="35" />
            <circle class="meter-1" cx="45" cy="45" r="35" id="${id}_progress" />
          </svg>
    </div>
</div>`
}

function forTest(){
    console.log('hi');
}