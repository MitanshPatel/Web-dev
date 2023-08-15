var randomNum1 = Math.floor(Math.random() * 6) + 1;
var randomDiceImg = "dice"+randomNum1+".png";  //dice1.png to dice6.png
var imgsource = "images/" + randomDiceImg;
var img1 = document.querySelectorAll("img")[0];
img1.setAttribute("src", imgsource);

var randomNum2 = Math.floor(Math.random() * 6) + 1;
var randomDiceImg2 = "dice"+randomNum2+".png";  //dice1.png to dice6.png
var imgsource2 = "images/" + randomDiceImg2;
var img2 = document.querySelectorAll("img")[1];
img2.setAttribute("src", imgsource2);

if(randomNum1 > randomNum2){
    document.querySelector("h1").innerHTML="Player 1 Wins!";
}
else if(randomNum1 === randomNum2){
    document.querySelector("h1").innerHTML="Its a Tie!";
}
else{
    document.querySelector("h1").innerHTML="Player 2 Wins!";
}
