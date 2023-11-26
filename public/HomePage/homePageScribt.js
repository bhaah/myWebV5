

let email ='';
let password ='';
let userName ='';
let _currAvatar='';
let _ownedAvatars = [];
let _coins = 0;
const CoinsAmount = newAmount => {
    _coins =newAmount;
    document.getElementById('coins_amount_a_number').innerHTML = _coins;
    document.getElementById('coins_amount_b_number').innerHTML = _coins;
}


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
    _coins = data.coins;
    console.log(data);
    console.log(data.currAvatar);
    if(data.currAvatar === '' || data.currAvatar === undefined || data.currAvatar===null){
        avatarImage.src = `../assets/profileAvatars/defultDuck.png`;
        _currAvatar='defultDuck';

    }
    else{
        avatarImage.src = `../assets/profileAvatars/${data.currAvatar}.png`;
        _currAvatar=data.currAvatar;
    }
    CoinsAmount(data.coins);
    _ownedAvatars=data.ownedAvatars;
    console.log(data.ownedAvatars);
    console.log(typeof _ownedAvatars);
    if(_ownedAvatars.indexOf("defultDuck") === -1) _ownedAvatars.push("defultDuck");

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
        case 'boards_btn_id':
            window.location.assign('./boards');
            break;
        case 'calendar_btn_id':
            window.location.assign('./calendar');
            break;    
        default:
            break;
    }

}


function slideBtns(){
    const div = document.getElementById('div_home_btns');
    div.classList.remove('sliding-btns-back');
    div.classList.add('sliding-btns');
}

function slidePanelDown(){
    ownedStoreList=false;
    const duckBtn = document.getElementById('say-something');
    duckBtn.style.display = 'none';
    const panel = document.getElementById('upper_pannel');
    panel.style.animationName = 'panel-slide-down';
    const imgProfile= document.getElementById('avatar-profile-img');
    imgProfile.style.animationName = 'expand-img-profile';
    const userInfDiv = document.getElementById('div_user_inf');
    userInfDiv.style.display = 'none';
    const divImg=document.getElementById('div_img_profile');
    
    setTimeout(()=>{
        const divPageInfo = document.getElementById('profile_page');
        divPageInfo.style.display = 'flex';
        getOwnedAvatars();
        const btns = document.getElementById('control_btns');
        btns.style.display = 'flex';
    },1400);
    loadStore();
}


function closeProfile(){
    const duckBtn = document.getElementById('say-something');
    duckBtn.style.display = 'flex';
    const panel = document.getElementById('upper_pannel');
    panel.style.animationName = 'panel-slide-up';
    const imgProfile= document.getElementById('avatar-profile-img');
    imgProfile.style.animationName = 'menimize-img-profile';
    setTimeout(()=>{
        const userInfDiv = document.getElementById('div_user_inf');
        userInfDiv.style.display = 'block';
        const div = document.getElementById('div_home_btns');
        
        div.classList.remove('sliding-btns');

        div.classList.add('sliding-btns-back');
        
    },2000)
    
    const divPageInfo = document.getElementById('profile_page');
    divPageInfo.style.display = 'none';
}


const addAvatarItem = (avatar,un,p) =>{
    return `<li class="avatar-item" id="li_${avatar}">
        ${p}
        <img src="../assets/profileAvatars/${avatar}.png" class="${un}selected-avatar-img" id="_${avatar}">
    </li>`;
};


const getP = (i,list) =>{
    return ownedStoreList ? `<p style="display: flex; justify-content:center; margin-bottom:0px;">${avatarSales[list[i]]} <img src="../assets/free-coin-icon-794-thumb (1).png" style="height: 24px"></p>` : '' ;
}

let ownedSelected = 0;
function getAvatars(list){
    const ul = restartList();
    let p = getP(0,list);
    ul.innerHTML += addAvatarItem(list[0],'',p);

    for(let i=1;i<list.length;i++){
        p = getP(i,list);
        ul.innerHTML +=addAvatarItem(list[i],'un',p);
    }
}

function replaceStoreOwned(){
    storeSelector = 0;
    ownedSelected = 0;
    const list =document.getElementById('list_avatars');
    list.style.left = '0px';
    if(ownedStoreList) {
        ownedStoreList =false ;
        getOwnedAvatars();
    }
    else{
        ownedStoreList = true;
        getStoreAvatars();
    }
}

function getStoreAvatars(){
    document.getElementById('set_selected_avatar_btn').style.display ='none';
    document.getElementById('buy_selected_avatar_btn').style.display ='flex';
    const tittle = document.getElementById('title_avatars_list');
    tittle.innerHTML = 'Store:';
    const btn = document.getElementById('store_owned_btn');
    btn.innerHTML = `<i class="fa fa-home" aria-hidden="true"></i> Owned`;
    getAvatars(avatarStore);
}
function getOwnedAvatars(){
    const tittle = document.getElementById('title_avatars_list');
    tittle.innerHTML = 'Owned:';
    const btn = document.getElementById('store_owned_btn');
    btn.innerHTML = `<i class="fa-solid fa-store"></i> store`;
    document.getElementById('set_selected_avatar_btn').style.display ='flex';
    document.getElementById('buy_selected_avatar_btn').style.display ='none';
    getAvatars(_ownedAvatars);

}

function restartList(){
    const ul = document.getElementById('list_avatars');
    ul.innerHTML=`<li class="avatar-item">
    <div style="width: 120px;height: 80px;"></div>
</li>`;
return ul;
}

let ownedStoreList = false; // false - owned page , true - store page 
function slideList(rigth){
    if(ownedStoreList) storeSelector=List(rigth,avatarStore,storeSelector);
    else ownedSelected = List(rigth,_ownedAvatars,ownedSelected);
}


function List(Right,listAvatar,selector){
    
    const selectedA = document.getElementById(`_${listAvatar[selector]}`);
    if(Right & listAvatar.length>selector+1){
        selector++;
        changeSelector(selectedA,listAvatar,selector);
    }
    if(!Right & selector>0){
        selector--;
        changeSelector(selectedA,listAvatar,selector);
    }
    return selector;
}

function changeSelector(selectedA,listAvatar,selecor){
    lockBtn('left_list_btn',true);
    lockBtn('right_list_btn',true);
    const nextA = document.getElementById(`_${listAvatar[selecor]}`);
    console.log(selectedA);
    selectedA.classList.remove('selected-avatar-img');
    selectedA.classList.add('unselected-avatar-img');
    selectedA.style.animationName = 'selectorChange';
    nextA.classList.remove('unselected-avatar-img');
    nextA.classList.add('selected-avatar-img');
    nextA.style.animationName = 'selectorChange';
    const list =document.getElementById('list_avatars');
    
    let leftpx = -selecor * 100;
    
    buildAnimationSlide(list.style.left || '0px',leftpx);
    list.style.animationName = 'slideList';
    setTimeout(()=>{
        nextA.style.animationName = '';
        selectedA.style.animationName = '';
        list.style.animationName = '';
        lockBtn('left_list_btn',false);
        lockBtn('right_list_btn',false);
        list.style.left = `${leftpx}px`;
    },190);
}

function buildAnimationSlide(prevLeft,newLeft){
    console.log(prevLeft);
    const styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);

    // Create a new keyframes rule
    const keyframesRule = styleSheet.sheet.insertRule('@keyframes slideList {}', 0);

    // Get the keyframes object
    const keyframes = styleSheet.sheet.cssRules[keyframesRule];

    keyframes.appendRule(`0% {left: ${prevLeft};}`);
    keyframes.appendRule(`100% {left: ${newLeft}px;}`);
}


async function setSelectedAvatar(){
    _currAvatar = _ownedAvatars[ownedSelected];
    const userData=new FormData();
    userData.append('email',email);
    userData.append('password',password);
    userData.append('avatar',_currAvatar);
    const avatarImage = document.getElementById('avatar-profile-img');
    avatarImage.src = `../assets/profileAvatars/${_currAvatar}.png`;
    await fetch('https://api-backend-of-my-app.onrender.com/api/Home/setAvatar',{
        method:'POST', 
        body:userData
    }).then(response=>{
        return response.json();
    }).then(async (result)=>{
        if(result.ErrorOccured) return false;
        else{
            const dataToSend = {
                currAvatar : _currAvatar,
                type: 'currAvatar'
            }
            const jsonData = JSON.stringify(dataToSend);
            
            await fetch('../updateProfile',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:jsonData
            }).then(result=>console.log('saved')).catch(error=>console.log(error));

        }
    }).catch(error=>console.log(error));


    
    
}


let avatarStore = [];
let avatarSales = {};
let storeSelector = 0;
async function loadStore(){
    const dataUser = new FormData();
    dataUser.append('email',email);
    dataUser.append('password',password);
    const fet = await fetch('https://api-backend-of-my-app.onrender.com/api/Home/getStoreAvatars',{
        method:'POST',
        body:dataUser
    }).then(response => {
        return response.json();
    }).then(result=>{
        avatarSales = result.ReturnValue;
        avatarStore = Object.keys(avatarSales);
    }).catch(error=>console.log(error));
    console.log(avatarSales);
    console.log(avatarStore);
}


async function buySelectedAvatar(){
    
    const sale = avatarSales[avatarStore[storeSelector]];
    if(sale>_coins){
        badBuy();
    }
    else{
        const reqData = new FormData();
        reqData.append('email',email);
        reqData.append('password',password);
        reqData.append('avatar',avatarStore[storeSelector]);
        simulateLoading();
        const buyRequestResponse = await fetch('https://api-backend-of-my-app.onrender.com/api/Home/purchase',{
            method:'POST',
            body : reqData
        }).then(response=>{
            return response.json();
        }).then(result=>{
            return result.ReturnValue;
        }).catch(error=>console.log(error));
        if(buyRequestResponse){
            stopLoading();
            document.getElementById(`li_${avatarStore[storeSelector]}`).remove();
            congratulations(avatarStore[storeSelector]);
            _coins -= avatarSales[avatarStore[storeSelector]];
            CoinsAmount(_coins);
            
            delete avatarSales[avatarStore[storeSelector]];
            _ownedAvatars.push(avatarStore[storeSelector]);
            if(document.getElementById(`li_${avatarStore[storeSelector]}`) !== null) document.getElementById(`li_${avatarStore[storeSelector]}`).remove();
            
            avatarStore.splice(storeSelector,1);
            getStoreAvatars();
            
            const toSend = {
                ownedAvatars : _ownedAvatars,
                coins : _coins,
                type : 'purchaseDone'

            }
            const jsonData = JSON.stringify(toSend);
            await fetch('../updateProfile',{
                method : 'POST',
                body : jsonData,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(response=>{
                return response.json();s
            }).catch(error => console.log(error));

        }
        else{
            stopLoading();
            badBuy();
        }
    }
}

function badBuy(){
    const coinsAmount = document.getElementById('coins_amount_b');
    coinsAmount.classList.add('bad-buy-click');
    setTimeout(()=>{
        coinsAmount.classList.remove('bad-buy-click');
    },500);
}

function lockBtn(id,con){
    document.getElementById(id).disabled = con;
}

