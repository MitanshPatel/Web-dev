var numofDrums= document.querySelectorAll(".drum").length;

for(var i=0; i< numofDrums; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", voice);     //if click is done on attributes containing .drum then voice function will run
}

document.addEventListener("keydown", keyboard);      //if keyboard is pressed, then keyboard function runs

function voice(){
    var buttonInnerHtml= this.innerHTML;      //variable will contain the details of which button wasa clicked due to this keyword {w,a,s,d,j,k,l}
    makeSound(buttonInnerHtml);
    buttonAnimation(buttonInnerHtml);
}

function keyboard(e){
    makeSound(e.key);    //e.key is what key was pressed in keyboard.
    buttonAnimation(e.key);
}

function makeSound(key){
    switch (key) {
        case "w":
            var audio=new Audio("sounds/tom-1.mp3");
            audio.play();
        break;
        
        case "a":
            var audio=new Audio("sounds/tom-2.mp3");
            audio.play();
        break;

        case "s":
            var audio=new Audio("sounds/tom-3.mp3");
            audio.play();
        break;

        case "d":
            var audio=new Audio("sounds/tom-4.mp3");
            audio.play();
        break;

        case "j":
            var audio=new Audio("sounds/snare.mp3");
            audio.play();
        break;

        case "k":
            var audio=new Audio("sounds/crash.mp3");
            audio.play();
        break;

        case "l":
            var audio=new Audio("sounds/kick-bass.mp3");
            audio.play();
        break;

        default:
            break;
    }
}

function buttonAnimation(key){
    var activeButton= document.querySelector("."+key);
    activeButton.classList.add("pressed");       //pressed has some css styles mentioned in styles.css pressed class is added to other classes of the html attribute

    setTimeout(function (){ activeButton.classList.remove("pressed");}, 100);   //after 100ms time has passed, the function will run and remove pressed class
}
