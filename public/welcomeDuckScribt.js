let duckMode=0;

function animateDuck(){
    const currDuck = document.getElementById(`welcom-duck-${duckMode+1}`);
    currDuck.style.display='none';


    duckMode++;
    if(duckMode>2) duckMode=0;

    const newDuck = document.getElementById(`welcom-duck-${duckMode+1}`);
    newDuck.style.display='flex';

    let time =0;

    switch(duckMode){
        case 0:
            time = 3000;
            break;
        case 1:
            time= 50;
            break;
        case 2:
            time = 100;
            break;
        default:
            break;
    }

    setTimeout(animateDuck,time);

}