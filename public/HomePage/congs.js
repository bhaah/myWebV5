function congratulations(imgAvatar){
    const congDiv = document.getElementById('cong_buy_div');
    congDiv.style.display = 'flex';
    congDiv.innerHTML = `<img src="../assets/profileAvatars/${imgAvatar}.png" style="position: fixed;
    align-content: center;
    justify-content: center;
    display: flex;
    width: auto;
    height: 40%;
    flex-wrap: wrap;
    align-items: baseline;
    align-items: center;
    flex-direction: row;
    top: 20%;
    left: 8%;">`;
    getDownDradesh(congDiv);
    setTimeout(()=>{
        congDiv.innerHTML = `<img src="../assets/profileAvatars/${imgAvatar}.png" style="position: fixed;
    align-content: center;
    justify-content: center;
    display: flex;
    width: auto;
    height: 40%;
    flex-wrap: wrap;
    align-items: baseline;
    align-items: center;
    flex-direction: row;
    top: 20%;
    left: 8%;">
    <button style="    align-content: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: absolute;
    bottom: 20%;
    left: 49%;
    font-size: xxx-large;
    background-color: transparent;
    border: 0;
    color: darkmagenta;" onclick="Close()">
        close
    </button>`;
    },7000);
}
let times = 0;
function getDownDradesh(div){
    times++;
    if(times<100){
    let time = getRandomInt(20,100);
    setTimeout(()=>{
        addDardoshe(div);
        getDownDradesh(div);
    },time);
    }
    
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function addDardoshe(div){
    console.log('we are here in addDardoshe first line of function');
    let leftPos = getRandomInt(0,100);
    const newDardoshe = document.createElement('div');
    newDardoshe.classList.add('drdoshe');
    const dardosheStyle = getRandomInt(1,3)
    newDardoshe.classList.add(`dardoshe-${dardosheStyle}`);
    newDardoshe.style.left = `${leftPos}%`;
    div.appendChild(newDardoshe);
    
}


function Close(){
    const congDiv = document.getElementById('cong_buy_div');
    congDiv.style.display = 'none';
    getStoreAvatars();
}