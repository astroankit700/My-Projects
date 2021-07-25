let direction={
    x:0, y:0
}
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let lastPaintTime=0;
let speed=10;
let score=0;

let snakearr=[
    {x:9,y:9}
]
let food={x:5,y:5};


const main=ctime=>            //current time
{
    requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000<=1/speed)
        return;
    lastPaintTime=ctime;
    // console.log(ctime);
    gamerun();
}

const collides=(sarr)=>{
    console.log(sarr[0].x);

    for (let i = 1; i < sarr.length; i++) {
        if(sarr[0].x==sarr[i].x && sarr[0].y==sarr[i].y) return true;
    }
    if(sarr[0].x>=18 || sarr[0].x<=0 || sarr[0].y>=18 || sarr[0].y<=0) return true;
    return false;
}

const gamerun=()=>{
    const board=document.querySelector('#board');

    //updating snake array and food
    if(collides(snakearr)){
        gameOverSound.play();
        musicSound.pause();
        direction={x:0,y:0};
        alert("Game over");
        snakearr=[{x:9,y:9}];
        musicSound.play();
        score=0;
        document.querySelector("#scoreBox").innerHTML=`Score: ${score}`;
    }

    //if food is eaten by snake
    if(snakearr[0].x===food.x && snakearr[0].y===food.y)
    {
        snakearr.unshift({x:snakearr[0].x+direction.x, y:snakearr[0].y+direction.y});
        let a=2,b=16;
        food={x:a+Math.round(Math.random()*(b-a)), y:a+Math.round(Math.random()*(b-a))}
        score++;
        document.querySelector("#scoreBox").innerHTML=`Score: ${score}`;
        if(score>local) local=score;
        localStorage.setItem("score",local);
        document.querySelector("#hiscoreBox").innerHTML=`HiScore: ${local}`;
    }

    //moving snake
    for (let i = snakearr.length-2; i >=0 ; i--) {
        snakearr[i+1] = {...snakearr[i]};     
    }
    snakearr[0].x+=direction.x;
    snakearr[0].y+=direction.y; 

    // display snake array
    board.innerHTML="";
    snakearr.forEach((e,id)=>{
        let snake=document.createElement("div");
        snake.style.gridRowStart=e.y;
        snake.style.gridColumnStart=e.x;
        snake.classList.add("snake");
        if(id==0){
            snake.classList.add("head")
        }
        board.appendChild(snake);
    })

    let foodele=document.createElement("div");
    foodele.style.gridRowStart=food.y;
    foodele.style.gridColumnStart=food.x;
    foodele.classList.add("food");
    board.appendChild(foodele);
}


var local=0;
if(localStorage.getItem('score')) local=parseInt(localStorage.getItem('score'));
// console.log(local);




requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    direction.y=1; //starting game
    moveSound.play();
    switch(e.key){
        case 'ArrowUp':
            direction={x:0,y:-1}
            break;
        case 'ArrowDown':
            direction={x:0,y:1}
            break;
        case 'ArrowLeft':
            direction={x:-1,y:0}
            break;
        case 'ArrowRight':
            direction={x:1,y:0}
            break;
    }
})