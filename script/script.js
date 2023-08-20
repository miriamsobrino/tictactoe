const gameboard = document.getElementById('gameboard');
const statusInfo = document.getElementById('status');
const restart = document.getElementById('restart-btn');
const startCells = ["","","","","","","","",""];
const canvas = document.getElementById('confetti');

const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];



let gameEnded= false;
let currentPlayer= "X";
let secondPlayer="O";
let xturn = true;
let count = 0;
let roundWon= false;

function createBoard(){
    startCells.forEach(function (cell, index) {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.id = index;
        cellElement.addEventListener('click', cellClicked, /*{once: true}*/);
        gameboard.append(cellElement);
        statusInfo.innerText=`${currentPlayer} goes first! 🚀`;
        
    });


};

createBoard();

function cellClicked(e){
    const turn = document.createElement('div');
    turn.innerText="";  
    turn.classList.add('players');
    if (!gameEnded && turn.innerText === "") {
    e.target.append(turn);
    e.target.removeEventListener('click', cellClicked);
    
    if (xturn) {
        xturn =false;
        turn.innerText="X";
        currentPlayer= "O";
        secondPlayer="X";
        statusInfo.innerText=`${currentPlayer}'s turn`;
    } else{
        xturn = true;
        turn.innerText="O";
        currentPlayer= "X";
        secondPlayer="0";
        statusInfo.innerText=`${currentPlayer}'s turn`;
    }
   
    count +=1;

    if (count >= 9){
        statusInfo.innerText="Oh...It's a draw!😕";
    }
}

    restart.addEventListener('click', function(){
        count=0;
        turn.innerText="";
        e.target.addEventListener('click', cellClicked)
        let currentPlayer= "X";
        statusInfo.innerText=`${currentPlayer} goes first! 🚀`;
        xturn=true;
        gameEnded=false;
        
        

    });

    checkWin();
}


function checkWin(){

    
   const allCells = document.querySelectorAll('.cell');
   
        winningCombos.forEach(cell =>{
            let [element1,element2,element3] = [
                allCells[cell[0]].innerText,
                allCells[cell[1]].innerText,
                allCells[cell[2]].innerText,

            ];
              
                console.log(element1+element2+element3);


                
        if (element1 != "" && element2 != "" && element3 !=""){
            if (element1 === element2 && element2 === element3){
                statusInfo.innerText=`${secondPlayer} wins! 👏`;
                allCells[cell[0]].classList.add("fondo");
                allCells[cell[1]].classList.add("fondo");
                allCells[cell[2]].classList.add("fondo");
                gameEnded= true;
                const jsConfetti = new JSConfetti();
                jsConfetti.addConfetti({
                    confettiRadius:3,
                    
                });
              
                
        };

        };
        
        restart.addEventListener('click', function(){
            allCells[cell[0]].classList.remove("fondo");
            allCells[cell[1]].classList.remove("fondo");
            allCells[cell[2]].classList.remove("fondo");
            
            
        });
       

    });



}

