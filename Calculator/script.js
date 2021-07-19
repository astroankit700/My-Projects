let screen=document.querySelector("input");
let buttons=document.querySelectorAll("button");

Array.from(buttons).forEach(btn=>{btn.addEventListener("click",(e)=>{
    let text=e.target.innerText;
    console.log(text);

    if(text=='C')
    {
        screen.value="";
    }
    else if(text=="") {
        screen.value=screen.value.substr(0,screen.value.length-1);
    }
    else if(text=='=') screen.value=eval(screen.value);
    else screen.value+=text;

})})