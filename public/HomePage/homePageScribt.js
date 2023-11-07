let email ='';
let password ='';
let userName ='';
async function onLoad(){
    const avatarImage = document.getElementById('avatar-profile-img');
    
    const data =await fetch('../userAvatar',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(response=>{
        console.log(response);
        return response.json();
    }).catch(error=>console.log(error));
    console.log(data);
    console.log(data.currAvatar);
    if(data.currAvatar === '' || data.currAvatar === undefined || data.currAvatar===null){
        avatarImage.src = `../assets/profileAvatars/defultDuck.png`;
    }
    else{
        avatarImage.src = `../assets/profileAvatars/${data.currAvatar}.png`;
    }


    const userData =await fetch('../getlogedinuser',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response =>{
        return response.json();
    }).catch(error=>console.log(error));
    email=userData.email;
    password=userData.password;
    userName = userData.username;
    
}


function duckSaySomething(){
    const btn = document.getElementById('say-something');
    btn.style.animationDirection = 'reverse';
    btn.style.animationName = 'example';
    setTimeout(stopAnimation=()=>{
        btn.style.animationName = '';
        btn.style.display='none';
        popDuck();
        
    },400);
    
    
}

function popSpeech(){
    
    setTimeout(async ()=>{
        const speech = document.getElementById('SpeechBubble');
        speech.style.animationName = 'expand-bounce';
        speech.style.animationDuration = '1s';
        const res=await fetch('../getRandomMessage',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response=>{
            return response.json();
        }).catch(error=>console.log(error));
        
        
        speech.innerHTML = res.Content;
        setTimeout(()=>{
            const closeBtn = document.getElementById('closing_duck');
            closeBtn.style.display = 'inline';
        },8000);
    },1000);
    

}

function popDuck(){
    const duck = document.getElementById('speaking_duck');
    duck.style.display = 'block';
    pop();
    setTimeout(()=>{
        
        popSpeech();
    },500);
}

function pop(){
    const duck = document.getElementById('speaking_duck');
    duck.style.animationDirection = 'reverse';
    duck.style.animationName = 'duck-pop';
    setTimeout(()=>{
        duck.style.animationName = '';
    },1000);
}


function closeDuck(){
    const closeBtn = document.getElementById('closing_duck');
    closeBtn.style.display = 'none';
    const duck = document.getElementById('speaking_duck');
    const speech = document.getElementById('SpeechBubble');
    const btn = document.getElementById('say-something');
    speech.style.animationName = 'shrink';
    speech.style.animationDuration = '0.5s';
    setTimeout(()=>{
        duck.style.animationDirection = 'normal';
        duck.style.animationName = 'duck-pop';
        setTimeout(()=>{
            duck.style.display = 'none';
            btn.style.display='inline';
            btn.style.animationDirection = 'normal';
            btn.style.animationName = 'example';
            setTimeout(()=>{
                btn.style.animationName = '';
                speech.innerHTML = 'let me cook ...';

            },400);
        },1000);
    },500);
    
}
