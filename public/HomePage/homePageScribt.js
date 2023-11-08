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
    setArticle();
    
}


function duckSaySomething(){
    console.log(email+' from homePageScribt');
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
        const dataToSend = new FormData();
        dataToSend.append('email',email);
        dataToSend.append('password',password);
        //const json = JSON.stringify()
        const dataRec= await fetch('https://api-backend-of-my-app.onrender.com/api/Home/getRandomMessage',{
            method:'POST',
            body : dataToSend,
        
        }).then(response=>{
            console.log(response);
            return response.json();
        }).then(result=>{
            console.log(result.ReturnValue.Content);
            const content = result.ReturnValue.Content;
            
            speech.innerHTML = content;
        }).catch(error=>console.log(error));
        
        
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

let articleNumber = 0;

const a = 'Welcome';
const b = 'stay organized to be productive';
const c = 'effortlessly manage your tasks';
const d = 'set deadlines';
const e = 'Divide difficult tasks into easy ones';
const f = 'with this website/App.';

function setArticle(){
    const pArticle = document.getElementById('article_txt_id');
    
    
    
    pArticle.style.overflow = 'hidden';
    pArticle.style.width ='0%';
    let timeDelay = 0;
    switch(articleNumber){
        case 0:
            setArticleAnimation('0.5s',a,'25px');
            timeDelay=2000;
            break;
        case 1:
            setArticleAnimation('1s',b,'20px');
            timeDelay=1700;
            break;
        case 2:
            setArticleAnimation('1s',c,'20px');
            timeDelay=1700;
            break;
        case 3:
            setArticleAnimation('0.5s',d,'20px');
            timeDelay=1500;
            break;
        case 4:
            setArticleAnimation('1s',e,'19px');
            timeDelay=1700;
            break;
        case 5:
            setArticleAnimation('1s',f,'20px');
            timeDelay=2000;
            break;
        default:
            break;    
    }
    articleNumber++;
    articleNumber = (articleNumber > 5) ? 0 : articleNumber;
    

    setTimeout(setArticle,timeDelay);

    



}

function setArticleAnimation(dur,innerHTML,font){
    const pArticle = document.getElementById('article_txt_id');
    
    pArticle.style.fontSize = font;
    pArticle.style.animationDuration = dur;
    pArticle.classList.remove('home-article-p');
    void pArticle.offsetWidth;
    
    pArticle.innerHTML=innerHTML;
    pArticle.classList.add('home-article-p');
}


function animateBtn(id){
    const btn = document.getElementById(id);
    btn.classList.add('animate-btn');
    setTimeout(()=>{
        btn.classList.remove('animate-btn');
    },200);

    switch(id){
        case 'profile_btn_id':
            slideBtns();
            setTimeout(slidePanelDown,200);
            break;
        default:
            break;
    }

}


function slideBtns(){
    const div = document.getElementById('div_home_btns');
    div.classList.add('sliding-btns');
}

function slidePanelDown(){
    const panel = document.getElementById('upper_pannel');
    panel.style.animationName = 'panel-slide-down';
    const imgProfile= document.getElementById('avatar-profile-img');
    imgProfile.style.animationName = 'expand-img-profile';
    const userInfDiv = document.getElementById('div_user_inf');
    userInfDiv.style.display = 'none';
    const divImg=document.getElementById('div_img_profile');
    const divPageInfo = document.getElementById('profile_page');
    divPageInfo.style.display = 'flex';
    //divImg.style.animationName = 'expand-img-profile';
}