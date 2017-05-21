var numCircles = 8;
var colors = [];
var pickedColor;
var circles = document.querySelectorAll(".circle");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var gameModeButtons = document.querySelectorAll(".gameMode");
var hexMode = false;
var hexDigits = new Array
        ("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");

init();

function init(){ 
	setupMode();
	setupCircles();
	reset();
}

function setupMode(){
	for(var i = 0; i < gameModeButtons.length; i++){
		gameModeButtons[i].addEventListener("click", function(){
			gameModeButtons[0].classList.remove("selected");
			gameModeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			switch(this.textContent) {
			    case "HEX":
			        hexMode = true;
			        break;
			    default:
			        hexMode = false;
			}
			reset();
		});
	}
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			modeButtons[2].classList.remove("selected");
			this.classList.add("selected");
			switch(this.textContent) {
			    case "Easy":
			        numCircles = 4;
			        break;
			    case "Hard":
			        numCircles = 8;
			        break;
			    default:
			        numCircles = 16;
			}
			reset();
		});
	}
}


function setupCircles(){
	for(var i = 0; i < circles.length; i++){
	//add click listeners to circles
		circles[i].addEventListener("click", function(){
			//grab color of clicked circle
			var clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				messageDisplay.style.color = clickedColor;
				resetButton.textContent = "Play Again"
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again"
				messageDisplay.style.color = "#232323";
			}
		});
	}
}

resetButton.addEventListener("click", function(){
	reset();
})


function reset(){
	colors = generateRandomColors(numCircles);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked Color
	if (hexMode) {
		colorDisplay.textContent = rgbTohex(pickedColor);
	} else {
		colorDisplay.textContent = pickedColor;
	}
	resetButton.textContent = "New Colors"
	messageDisplay.textContent = "";
	//change colors of circles
	for(var i = 0; i < circles.length; i++){
		if(colors[i]){
			circles[i].style.display = "block"
			circles[i].style.backgroundColor = colors[i];
		} else {
			circles[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "#232323";
}


function changeColors(color){
	for (var i = 0; i < circles.length; i++) {
		circles[i].style.backgroudColor = color;
	}
}

function pickColor(){
	var randomNum = Math.floor(Math.random() * colors.length);
	return colors[randomNum];
}

function generateRandomColors(num){
	var colors = [];

	for (var i = 0; i < num; i++) {
		colors.push(randomRGB());
	}
	return colors;
}

function randomRGB(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function rgbTohex(rgb) {
 rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
 return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
  return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
}
