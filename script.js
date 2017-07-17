
document.addEventListener('DOMContentLoaded', function() {
  var pickedColor;
  var colors = [];
  var numSquares = 6;
  var squares = document.querySelectorAll(".square");
  var colorDisplay = document.getElementById("colorDisplay");
  var feedback = document.getElementById('feedback');
  var h1 = document.querySelector('h1');
  var modeButtons = document.querySelectorAll('.mode');
  var resetButton = document.getElementById('btnReset');

  init();

  function init(){
    //mode button event listeners
    for(var i = 0; i < modeButtons.length; i++){
      modeButtons[i].addEventListener('click', function(){
        modeButtons[0].classList.remove('selected');
        modeButtons[1].classList.remove('selected');
        this.classList.add('selected');
        this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
        resetColors();
      });
    };
    //reset button listeners
    resetButton.addEventListener('click', function(){
      resetColors();
    });
    //square button listeners
    for(var i = 0; i < squares.length; i++){
      //add click listeners to squares
      squares[i].addEventListener('click', function(){
        //compare color to winning color
        var clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedColor){
          feedback.textContent = "Correct!";
          resetButton.textContent = "Play Again?";
          changeColors(pickedColor);
          h1.style.backgroundColor = pickedColor;
        }else{
          this.style.backgroundColor = '#232323';
          feedback.textContent = "Try Again";
        };
      });
    };
    //reset colors
    resetColors();
  };

  function changeColors(color){
    //change all squares to winning color
    for(var i = 0; i < squares.length; i++){
      squares[i].style.backgroundColor = color;
    };
  };

  function pickColor() {
    var random = Math.floor(Math.random()*colors.length);
    return colors[random];
  };

  function resetColors(){
    //generate new colors
    colors = generateColors(numSquares);
    //pick new winning color
    pickedColor = pickColor();
    //update colorDisplay
    colorDisplay.textContent = pickedColor.toUpperCase();
    h1.style.backgroundColor = 'steelblue';
    resetButton.textContent = "New Colors";
    feedback.textContent = '';
    for(var i = 0; i < squares.length; i++){
      //add colors to squares
      if(colors[i]){
        squares[i].style.display = 'block';
        squares[i].style.backgroundColor = colors[i];
      }else{
        squares[i].style.display = 'none';
      };
    }
  };

  function generateColors(num){
    //make an array of num random colors
    var arr = [];
      for(var i = 0; i < num; i++){
        arr.push(generateRandomColor());
      };
    return arr;
  };

  function generateRandomColor(){
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
  };

});
