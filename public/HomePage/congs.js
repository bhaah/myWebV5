function congratulations(){
    const congDiv = document.getElementById('cong_buy_div');
    congDiv.style.display = 'flex';
    getDownDradesh(congDiv);
}
let times = 0;
function getDownDradesh(div){
    times++;
    if(times<20){
    let time = getRandomInt(300,450);
    setTimeout(()=>{
        addDardoshe(div);
        getDownDradesh(div);
    },1000);
    }
    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function addDardoshe(div){
    let leftPos = getRandomInt(0,100);
    div.innerHTML += `<div class="drdoshe drdoshe-down drdoshe-1" style="left:${leftPos}%;"></div>`; 
}