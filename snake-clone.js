document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.querySelector(".gameBoard");
    const squares = document.getElementsByClassName('gameSquares');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');
    const restartBtn = document.querySelector('.restart');
    const tenBtn = document.querySelector('.ten')
    const fifteenBtn = document.querySelector('.fifteen');
    const twentyBtn = document.querySelector('.twenty');

                                                                                  
    let currentIndex = 0;//first div in grid
    let appleIndex = 0;//first div in grid
    let currentSnake = [2, 1, 0];//the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL), all 1 is body
    let direction = 1; //snake will travel 1 div down the array
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;
    
    gameBoard.style.backgroundColor = "green";
  
    //make object constructor for the grid
   
    class playArea{ constructor (width, rowLength, score) {         
        this.width = width;
        this.rowLength = rowLength;
        this.score = score;                    
        this.area = this.rowLength * this.rowLength;
        this.totWidth = this.width * this.rowLength + 'px';    
    }}

    
    //automate grid divs

   let LevelOne = new playArea(20, 10, 0);

   tenBtn.addEventListener('click', () =>{ 
       LevelOne = new playArea(20, 10, 0);
       LevelOne.totWidth;
       console.log("10x10")
       gameBoard.style.width = LevelOne.totWidth;
       gameBoard.style.height = LevelOne.totWidth;
       restartGame();makeGrid();
    });
    
     

   fifteenBtn.addEventListener('click', () =>{ 
       LevelOne = new playArea(20, 15, 0);
       LevelOne.totWidth;
       console.log("15x15")
       gameBoard.style.width = LevelOne.totWidth;
       gameBoard.style.height = LevelOne.totWidth;
       restartGame(); makeGrid();
      });


   twentyBtn.addEventListener('click', () =>{
       LevelOne = new playArea(20, 20, 0);
       LevelOne.totWidth;
       console.log("20x20")
       gameBoard.style.width = LevelOne.totWidth;
       gameBoard.style.height = LevelOne.totWidth;
      restartGame(); makeGrid();
       });
   
   
    //trying to make new level
    //trying to make all dimensions into modifiable variables
     
        
        gameBoard.style.width = LevelOne.totWidth;
        gameBoard.style.height = LevelOne.totWidth;
        
     
      function makeGrid(){             
        for (let i = 0; i<LevelOne.area; i++){           
            //creating divs
            let gameSquares = document.createElement("div");
            gameSquares.className = "gameSquares";
            gameBoard.appendChild(gameSquares);
            console.log("nice squares");            
        }}
        makeGrid();

    
    //start and restart game 36
 
    function restartGame(){
        //clear all div
       if (gameBoard.hasChildNodes)
                {gameBoard.innerHTML = "";
        console.log("no more squares");        
       }}
    
    restartBtn.addEventListener("click", restartGame);
    restartBtn.addEventListener("click", makeGrid);

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));//error can't read properties squares is not holding anything in the array
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        randomApple();
        score = LevelOne.score;
        direction = 1;
        scoreDisplay.innertext = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);    
        console.log(squares.parentNode);  
        console.log("starting YES");
        if(currentSnake.length > 4){
            // restartGame();
            // makeGrid();
             //startGame();
           //  LevelOne.width + (100 + 'px');
            // LevelOne.height + (100 + 'px');
             console.log('you\'re doing great')
         }
    }


    //function that deals with All the move outcomes of the Snake

    function moveOutcomes(){
    //deals with snake hitting the border and self
    if((currentSnake[0] + LevelOne.rowLength >= (LevelOne.area) && direction === LevelOne.rowLength)|| //if snake hits bottom
        (currentSnake[0] % LevelOne.rowLength === LevelOne.rowLength -1 && direction === 1)|| //if snake hits right wall
        (currentSnake[0] % LevelOne.rowLength === 0 && direction === -1)|| //if snake hits left wall
        (currentSnake[0] - LevelOne.rowLength < 0 && direction === -LevelOne.rowLength)|| // if snake hits top
        squares[currentSnake[0] + direction].classList.contains('snake')) //if snake goes into itself
        {
            console.log("Good Try Snake Tamer");      
            
            return clearInterval(interval);//clears interval is any of the above happens
        }

        //make snake move forward
        const tail = currentSnake.pop();
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction); 


     //deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple(); //random apple??????? how to make apple spawn?????A
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
            }

            squares[currentSnake[0]].classList.add('snake');
    }

    //assign functions to keycodes .. start
    function control(e){
                
        if(e.keyCode === 39){
            direction = 1; //right arrow will make snake go right one div
        } else if (e.keyCode === 38){
            direction = -LevelOne.rowLength; //up arrow will make snake go 10 divs back, appearing to go up
        }else if(e.keyCode === 37){
            direction = -1  // left arrow will make snake go left one div
        }else if(e.keyCode === 40){
            direction = +LevelOne.rowLength; // down button then snake will go 10 divs ahead
        }
        
    }
 
    
    //generate new apple once apple is eaten
 function randomApple(){
    do{
        appleIndex = Math.floor(Math.random() * squares.length);
    }
    while(squares[appleIndex].classList.contains('snake'));// making sure apples don't appear on snake
    squares[appleIndex].classList.add("apple");
}



document.querySelector(".test").addEventListener("click", () => {console.log(squares[0])});


   document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame); 
 })

