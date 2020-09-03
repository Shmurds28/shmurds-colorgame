var numSquares = 3;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("ColorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var easybtn = document.querySelector("#easybtn");
var hardbtn = document.querySelector("#hardbtn");
var modebuttons =  document.querySelectorAll(".mode");

init();

function init(){
    //mode buttons event listeners
    setupModeButtons(); 
    setupSquares()   
    reset();
}

function setupModeButtons(){
    for (var i = 0; i < modebuttons.length; i++){
        modebuttons[i].addEventListener("click", function(){
            modebuttons[0].classList.remove("selected");
            modebuttons[1].classList.remove("selected");
            modebuttons[2].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent === "Easy"){
                numSquares = 3;
            }else if(this.textContent === "Medium"){
                numSquares = 6;
            }else{
                numSquares = 9;
            }
    
            reset();  
        });
    }
}

function setupSquares(){
    for (var i = 0; i < squares.length; i++){
        //add click listener to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct! ";
                messageDisplay.style.color = "darkgreen";
                ChangeColors(clickedColor);
                h1.style.backgroundColor = clickedColor; 
                resetButton.textContent = "Play Again?"
            }else{
                this.style.backgroundColor = "#232323"; 
                messageDisplay.textContent = "Incorrect!, Choose Again";
                messageDisplay.style.color = "red";
            }
        });
    }
}



function reset(){
    //Generate all new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //Chage colorDisplay to match picked color
    colorDisplay.textContent = pickedColor; 
    resetButton.textContent = "new colors";
    //change colors of squares
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
        squares[i].style.backgroundColor = colors[i];
    }

    h1.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function(){
    reset();
});

function ChangeColors(color){
    //loop through all squares
    for (var i = 0; i < colors.length; i++){
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
    
}

function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    //make an array
    var arr = [];
    //add num random colors to an array
    for(var i = 1; i <= num; i++){
        //get random color and push into array
        arr.push(randomColor());
    }
    //return array
    return arr;
}

function randomColor(){
    //pich a red from 0 to 255
    var r = Math.floor(Math.random() * 256);
    //pich a green from 0 to 255
    var g = Math.floor(Math.random() * 256);
    //pich a blue from 0 to 255
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

//HELP FUNCTIONS

var helpbtn = document.querySelector(".help");
var modal = document.querySelector(".modal");
var closebtn = document.querySelector(".close");

helpbtn.addEventListener("click",function(){
    modal.style.display = "block";
});

closebtn.addEventListener("click", function(){
    modal.style.display = "none";
});

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }