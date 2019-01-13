document.addEventListener('DOMContentLoaded', () => {
  const boards = Array.from(document.querySelectorAll('.board'))
  let player = 'X'
  const refresh = document.querySelector('button')
  const turn = document.querySelector('#whos-turn')


  //  create an Array for single square in to the board div and store all winning solution by row/column/diagonal into another Array
  //

  function getSets(cells) {
    return [
      [ cells[0], cells[1], cells[2] ],  // ROW  --->
      [ cells[3], cells[4], cells[5] ],
      [ cells[6], cells[7], cells[8] ],

      [ cells[0], cells[3], cells[6] ],  // COLUMNS  --->
      [ cells[1], cells[4], cells[7] ],
      [ cells[2], cells[5], cells[8] ],

      [ cells[0], cells[4], cells[8] ],  // DIAGONAL
      [ cells[2], cells[4], cells[6] ]
    ]
  }

  //      ------------- starting from the Array to change the value of X and O to 1 and 0 -----------------

  function getMatrix(cells) {
    const sets = getSets(cells)


    //  ----------- Creates a new array with the results of calling a function for every array element ------------

    return sets.map(set => {
      return set.map(cell => {
        if(cell.textContent === 'X') return 1  // giving a value number 1 to X to winning condition
        if(cell.textContent === 'O') return 0  // giving a value number 0 to O to winning condition
        return
      })
    })
  }

  // Check if any player has 3*X or 3*O in a row/column/diagonal ----> win condition

  function checkForWin(cells) {
    const matrix = getMatrix(cells)

    const totals = matrix.map(row => row.reduce((sum, cell) => sum + cell))

    return totals.some(total => total === 0 || total === 3)  // some will check only if there is what we are looking for
  }


  //  ----- assign a -1 value to boardInPlay to start the game will allow the player a free start choice ----------

  let boardInPlay = -1 // let the player the free choice when the game starts (-1 is out of the board) ---> same for every single win

  let currentBoard = -1  // to be used when the all board has been won by X or O. Free choice on next move

  const takenBoardsX = [] // empty array to push all board taken after player X won

  const takenBoardsO = [] // empty array to push all board taken after player O won

  //  ------- xBigWin and oBigWin = false in order to return true any winning combinatio matched ------------

  let xBigWin = false
  let oBigWin = false


  //             --------------- GAME START -----------------

  function play(e) {
    const cell = e.target  // declaring who is playing

    if (cell.innerText === 'X' || cell.innerText === 'O')
      return

    const board = e.target.parentNode  // declaring on which board I'm playing

    const cells = board.children // small board

    const smallDiv = Array.from(e.target.parentNode.children)  // div into the small board

    const index = smallDiv.indexOf(e.target)  // check index value on click


    if (parseInt(board.id) === boardInPlay || boardInPlay === -1) {

      // does the board have a winner? if so, return

      if (board.classList.contains('winner-X')) {   // result from checkForWin
        boardInPlay = -1
        return
      }
      // Assigning to boardInPlay on index Number

      currentBoard = parseInt(board.id) // parsing ID from string to number
      boardInPlay = index

      cell.textContent = player // reverse textContent to X or O to declare the winner board

      if(checkForWin(cells)){
        board.classList.add(`winner-${player}`)
        alert(`${player} win!!!`)
        boardInPlay = -1


        // push into empty array the board already taken and won by X or O
        // takent board is an empty Array to fill-up with winning condition

        if(player === 'X') takenBoardsX.push(currentBoard)
        else takenBoardsO.push(currentBoard)

        console.log(takenBoardsX, takenBoardsO)


        // check if takenBoardsO or takenBoardsX contain any of the winning combinations
        // check if all number in the Array are matching any winning combination

        //  ----------------  COMPARISON POSSIBLY WINNING GAME SOLUTION TAKEN FROM 'takenBoardX' and 'takenBoardO' -------

        //   --------- X win combination from takenBoardX.push -------------

        if ( takenBoardsX.includes(0) && takenBoardsX.includes(1) && takenBoardsX.includes(2) ||
        takenBoardsX.includes(3) && takenBoardsX.includes(4) && takenBoardsX.includes(5) ||
        takenBoardsX.includes(6) && takenBoardsX.includes(7) && takenBoardsX.includes(8) ||
        takenBoardsX.includes(0) && takenBoardsX.includes(4) && takenBoardsX.includes(8) ||
        takenBoardsX.includes(0) && takenBoardsX.includes(3) && takenBoardsX.includes(6) ||
        takenBoardsX.includes(1) && takenBoardsX.includes(4) && takenBoardsX.includes(7) ||
        takenBoardsX.includes(2) && takenBoardsX.includes(5) && takenBoardsX.includes(8) ||
        takenBoardsX.includes(2) && takenBoardsX.includes(4) && takenBoardsX.includes(6)) {
          xBigWin = true
        }

        //    -------  alert on page to take users attention ----> improve with reset button -----------

        if (xBigWin){
          alert('Congratulations, X has won!!!!!!!\n click on PLAY AGAIN for a new challenge')
          console.log('x has won', xBigWin)
        }

        //      ------------- O win combination from takenBoardO.push ----------------

        if ( takenBoardsO.includes(0) && takenBoardsO.includes(1) && takenBoardsO.includes(2) ||
        takenBoardsO.includes(3) && takenBoardsO.includes(4) && takenBoardsO.includes(5) ||
        takenBoardsO.includes(6) && takenBoardsO.includes(7) && takenBoardsO.includes(8) ||
        takenBoardsO.includes(0) && takenBoardsO.includes(4) && takenBoardsO.includes(8) ||
        takenBoardsO.includes(0) && takenBoardsO.includes(3) && takenBoardsO.includes(6) ||
        takenBoardsO.includes(1) && takenBoardsO.includes(4) && takenBoardsO.includes(7) ||
        takenBoardsO.includes(2) && takenBoardsO.includes(5) && takenBoardsO.includes(8) ||
        takenBoardsO.includes(2) && takenBoardsO.includes(4) && takenBoardsO.includes(6)) {
          oBigWin = true
        }

        //    -------  alert on page to take users attention ----> improve with reset button -----------

        if (oBigWin){
          alert('Congratulations, O has won!!!!!!!\n click on PLAY AGAIN for a new challenge')
          console.log('o has won', oBigWin)
        }

      }

      //--------- check if takenBoard includes the boardInPlay ---> player to choose where to play on ------------

      if (takenBoardsX.includes(boardInPlay) || takenBoardsO.includes(boardInPlay)){

        boardInPlay = -1

        // ----------- if player X or O collecting 3 board in a row the game is finished ------------------
        // ----------- Array combination ----> player won the game ---> no move allowed ----------------

      }
      //  -------------- Switching player on screen for every click ----------------

      player = player === 'X' ? 'O' : 'X'
      turn.innerHTML = (player === 'O') ? 'O Turn' : 'X Turn'

    }

  } // end of play(e)

  // ------------------- END OF THE GAME --------------------

  // add event listener for every click (div) on play(e) taking from Array board.children => cell

  boards.forEach(board => {
    const cells = Array.from(board.children)
    // console.log(cells)
    cells.forEach(cell => {
      cell.addEventListener('click', play)
    })
  })

  // create a reset button to play again

  function refreshPage() {
    window.location.reload()
  }
  refresh.addEventListener('click', refreshPage)

  // ---------- alert to show the rules on reload ---> to be improve by start and reset button

  alert('RULES:\n The players take turns picking one of the squares that is not occupied. When one of the players gets three squares in a row, horizontal, vertical, or diagonal, that player wins. Now Ultimate Tic Tac Toe is quite similar, except each square in the field is actually small game of Tic Tac Toe. Only if you win the small game, you get the square of the big game. The goal again is to get three (big) squares in a row. Further rules will be explained below. This game requires quite a bit of strategy because you can influence which of the big squares your opponent has to play in.')
})
