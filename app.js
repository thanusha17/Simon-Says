let gameSeq=[];
let userSeq=[];
let level=0;
let body=document.querySelector("body");
let h2=document.querySelector("h2");
let started=false;
let colors=["red","green","blue","yellow"];
let highestScore=0;
let span=document.querySelector("span");
let allBtns=document.querySelectorAll(".btn");
body.addEventListener("keypress",function(){
        if(started==false){
            started=true;
            levelUp();
        }
})

function flashBtn(btn){
    // console.log(btn);
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelUp(){
    level++;
    userSeq=[];
    h2.innerText=`Level ${level}`;
    let randIdx=Math.floor(Math.random()*4);
    let randCol=colors[randIdx];
    let randBtn=document.querySelector(`#${randCol}`);
    flashBtn(randBtn);
    gameSeq.push(randCol);
    // console.log(gameSeq);
}

function check(size){
    if(gameSeq[size]!=userSeq[size]){
         restartGame();
    }else if(size==((gameSeq.length)-1)){
        levelUp();
    }
}

for(let btn of allBtns){
    btn.addEventListener("click",function(){
        userFlash(btn);
        let choose=btn.getAttribute("id");
        userSeq.push(choose);
        check((userSeq.length)-1);
    });
}

function restartGame(){
    if(level>highestScore){
       highestScore=level;
       span.innerText=`${highestScore}`;
    }
    h2.innerHTML=`Game over! Your score is ${level}.<br>Press any key to restart`;
    body.style.backgroundColor="red";
    setTimeout(function(){
        body.style.backgroundColor="white";
    },250);
    gameSeq=[];
    userSeq=[];
    level=0;
    started=false;
}