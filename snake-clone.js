document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const squares = document.getElementsByClassName('gameSquares');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');
    const restartBtn = document.querySelector('.restart');
    const makeArea = document.getElementsByClassName('make-grid')

    const width = 10;                                                                               
    let currentIndex = 0;//first div in grid
    let appleIndex = 0;//first div in grid
    let currentSnake = [2, 1, 0];//the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL), all 1 is body
    let direction = 1; //snake will travel 1 div down the array
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;
    
    grid.style.backgroundColor = "green";

    //make object constructor for the grid
    class playArea{ constructor (width, height, area, score, rowLength) {
        this.width = width;
        this.height = height;
        this.area = area;
        this.score = score;
        this.rowLength = Math.sqrt(this.area);

    }}


    //automate grid divs
    let LevelOne = new playArea('200px', '200px', '100', '0');
    grid.style.width = LevelOne.width;
    grid.style.height = LevelOne.height;
   
    for(let i = 0; i < 5; i++){
    function newLevel(){        
       // restartGame();
       // makeGrid();
        //startGame();
        LevelOne.width + (50 + 'px');
        LevelOne.height + (50 + 'px');
        console.log('you\'re doing great')
    }}
setInterval(newLevel, 2000)
      function makeGrid(){             
        for (let i = 0; i<LevelOne.area; i++){           
            //creating divs
            let gameSquares = document.createElement("div");
            gameSquares.className = "gameSquares";
            grid.appendChild(gameSquares);
            console.log("nice squares");            
        }}
        makeGrid();

       /* TESTING  - confirmed poop.classList == 'poop' > true
       const poop = document.createElement('div');
        poop.classList.add = "poop";
        grid.appendChild(poop);
        console.log(poop.classList)
        console.log(poop.classList == 'poop')*/

    //start and restart game 36
    //9/20/22 10:17AM - the inner divs(squares) have no class
    //" 10:21AM - only shows class when adding the with the .className method 
 
    function restartGame(){
        //clear all div
       if (grid.hasChildNodes)
                {grid.innerHTML = "";
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
        if(score / 2 === 1){
            // restartGame();
            // makeGrid();
             //startGame();
             LevelOne.width + (100 + 'px');
             LevelOne.height + (100 + 'px');
             console.log('you\'re doing great')
         }
    }


    //function that deals with All the move outcomes of the Snake

    function moveOutcomes(){
    //deals with snake hitting the border and self
    if((currentSnake[0] + width >= (width*width) && direction === width)|| //if snake hits bottom
        (currentSnake[0] % width === width -1 && direction === 1)|| //if snake hits right wall
        (currentSnake[0] % width === 0 && direction === -1)|| //if snake hits left wall
        (currentSnake[0] - width < 0 && direction === -width)|| // if snake hits top
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

