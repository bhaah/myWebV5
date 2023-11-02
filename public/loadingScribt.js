function simulateLoading(){
    const loading = document.getElementById('loading-overlay');
    loading.style.display = 'flex';
    setInterval(threeDots,600);
    duckEyes();
}
function stopLoading(){
    const loading = document.getElementById('loading-overlay');
    loading.style.display = 'none';
}

function threeDots(){
    const textEl = document.getElementById('wait-text');
    textEl.innerHTML ='just wait'+'.'.repeat(dots);

    dots++;
    if(dots>3) dots = 0;
} 

function duckEyes(){
    const currEl = document.getElementById(`loading-img-${currDuck+1}`);
    currEl.style.display = 'none';

    currDuck++;
    if(currDuck>2) {
        currDuck = 0;
        side = !side;
    }
    const newEl = document.getElementById(`loading-img-${currDuck+1}`);
    if(side){
        newEl.style.transform = 'none';
    }
    else{
        newEl.style.transform = 'scaleX(-1)';
    }
    newEl.style.display='flex';

    let timeForNewEl = 0;
    switch (currDuck) {
        case 0 :
            timeForNewEl = 1500;
            break;
        case 1:
            timeForNewEl = 100;
            break;
        case 2:
            timeForNewEl = 300;
            break;
        default:
            break;        
    }
    setTimeout(duckEyes,timeForNewEl);


}

let currDuck = 0;
let dots = 0;
let side = true;