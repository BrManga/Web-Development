// Selecting Cannon Ball
var ball = document.getElementById("ball");

//select FIRE button
var btnStrt = document.getElementById("start");
btnStrt.addEventListener("click", startInterval);
//select RESET button
var btnreset = document.getElementById("reset");
btnreset.addEventListener("click", reset);

// Variables
var newx = 0;
var newy = 0;
var xStart = 50;
var yStart = 50;
var firstSpeed = 100;
var time = 0;
var go;
var angle = 45;
var radangle = 0;

//Start the game
function startInterval() {
  firstSpeed = document.getElementById("firstSpeed").value;
  angle = document.getElementById("angle").value;
  firstSpeed = Number(firstSpeed);
  go = setInterval(startGame, 100);
}

function startGame() {
  radangle = angle * (Math.PI / 180);
  newx = xStart + firstSpeed * time * Math.cos(radangle);
  newy =
    yStart +
    firstSpeed * time * Math.sin(radangle) -
    time * 9.81 * Math.pow(time, 2);
  changePos();
  time = time + 0.1;
}

// Changing position of the Cannon Ball
function changePos() {
  ball.style.left = `${newx}px`;
  ball.style.bottom = `${newy}px`;
  var stopIt = +newy;
  if (stopIt < 0) {
    clearInterval(go);
    console.log(newx, newy);
  }
}
function reset() {
  ball.style.left = `50px`;
  ball.style.bottom = "50px";
  clearInterval(go);
  newx = 0;
  newy = 0;
  time = 0;
}
