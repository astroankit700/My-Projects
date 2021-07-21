console.log('Welcome to Super Dino Game...');
//audio
var music=document.createElement('audio');
music.setAttribute('src','bgmusic.mp3');
music.loop=true;
music.play()

var die=document.createElement('audio');
die.setAttribute('src','died.mp3');
die.loop=false;

// document.onkeydown = e=>{
//     console.log(e.keyCode);
// }



var local=0;
if(localStorage.getItem('score')) local=parseInt(localStorage.getItem('score'));
console.log(local);
// let hiscore=document.querySelector("#hiScore");
// updateHiScore(local);

var start=false;
var score=0;
var flag=true;
var check=true;
var obsDuration

document.addEventListener("keydown", e=>{
    let dino=document.querySelector(".dino");
    let obstacle=document.querySelector(".obstacle");
    // console.log(e.keyCode);
    
    

    let dinoX=parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dinoRX=parseInt(window.getComputedStyle(dino, null).getPropertyValue('right'));
    
    //pressing upArrow
    if((e.keyCode==38 || e.keyCode==87 || e.keyCode==32) && dino.classList.length==1 && start==true)
    // if((e.keyCode==38 || e.keyCode==87 || e.keyCode==32) && dino.classList.length>=1 && start==true)
    {
        // console.log(dino);
        dino.classList.add("jump");
        setTimeout(() => {
            dino.classList.remove("jump");
        }, 1200);
    }
    //pressing left
    else if((e.keyCode==37 || e.keyCode==65) && dinoX>=0)
    {
        dino.style.left=dinoX-30+"px"
    }
    else if((e.keyCode==39 || e.keyCode==68) && dinoRX>=2)
    {
        dino.style.left=dinoX+30+"px"
    }
    else if(e.keyCode==13) window.location.reload();
    else if(e.keyCode==32) {
        console.log('start');
        start=true;
        obstacle.style["animation-name"]='obstacle';
    }

});


//checking collision
setInterval(() => {
    let dino=document.querySelector(".dino");
    let obstacle=document.querySelector(".obstacle");
    let status=document.querySelector(".status")

    // let hiscore=document.querySelector("#hiScore");
    // console.log(hiscore);


    obsDuration=parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));


    let dx=parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'))
    let dy=parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'))

    let ox=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
    let oy=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'))

    let hmin=parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('height'))
    let wmin=parseInt(window.getComputedStyle(dino, null).getPropertyValue('width'))
    // console.log('wmin=',wmin);
    // console.log('dx+ox=',dx+ox);
    updateHiScore();


    if(Math.abs(dx-ox)<=wmin && Math.abs(dy-oy)<=hmin && check==true)
    {
        status.innerHTML='<span class="name2">GAME OVER</span><hr style="width:50%;"><span class="info">Press ENTER to play again...</span>'
        obstacle.style.animation="none";
        obstacle.style.right="50vw";
        // console.log("one ",obsDuration)
        flag=false;
        music.pause();
        die.play();
        check=false;
    }
    else if(flag==true && check==true && Math.abs(dx-ox)<=wmin){
        // console.log("two ",obsDuration)
        score++;
        flag=false;
        document.querySelector("#scoreCount").innerHTML=score;
        setTimeout(() => {
            flag=true;
        }, (obsDuration*250));

        setTimeout(() => {
            obstacle.style["animation-duration"]=(obsDuration-0.01)+'s';   
            // obstacle.style["animation-duration"]=(obsDuration)+'s';   
            // console.log("three ",obsDuration)
            
        }, (obsDuration*50));
    }

}, 1);

function updateHiScore()
{
    let hiscore=document.querySelector("#hiScore");
    // console.log(hiscore);

    local=Math.max(score,local);
    localStorage.setItem('score',local);
    hiscore.innerHTML=local;
}