document.addEventListener('DOMContentLoaded', () => {
  const boards = Array.from(document.querySelectorAll('.board'))
  let player = 'X'
  const refresh = document.querySelector('button')
  const turn = document.querySelector('#whos-turn')


  //  create an Array for single square and store all winning solution by row/column/diagnola into another Array
  //
  // const lines = [
  //   [0,1,2],
  //   [3,4,5],
  //   [6,7,8],
  //   [2,5,8],
  //   [0,3,6],
  //   [1,4,7],
  //   [6,4,2],
  //   [0,4,8]
  // ]
  // const mainGrid = [
  //   NaN, Nan, Nan,
  //   NaN, Nan, Nan,
  //   NaN, Nan, Nan,
  //
  // ]
  //
  // const grid = cells.map(cells => cells.innerHTML)
  // if(checkWin(grid)) {
  //   bigBoard[boardIndex] = 1
  //   console.log(checkWin(cells))
  // }
  //
  // bigBoard = cells.map(cells => cells.innerHTML)
  // if(bigBoard(cells)){
  //   bigBoard[boardIndex] = 0
  // }

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



  function getMatrix(cells) {
    const sets = getSets(cells)
    // console.log('this is getMatrix', getMatrix)
    // console.log(sets)
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
    // console.log(matrix)
    const totals = matrix.map(row => row.reduce((sum, cell) => sum + cell))
    // console.log(totals)
    return totals.some(total => total === 0 || total === 3)  // some will check only if there is what we are looking for
  }


  // assign a -1 value to boardInPlay to start the game allow the player where to start
  let boardInPlay = -1 // let the player the free choice when the game starts (-1 is out of the board) ---> same for every single win

  let currentBoard = -1

  const takenBoardsX = [] // empty array to push all board taken after player X won

  const takenBoardsO = [] // empty array to push all board taken after player O won

  let xBigWin = false
  let oBigWin = false

  function play(e) {
    const cell = e.target  // declaring who is playing
    // console.log(cell)
    if (cell.innerText === 'X' || cell.innerText === 'O') return
    const board = e.target.parentNode  // declaring on which board I'm playing
    // console.log(board)
    const cells = board.children
    const smallDiv = Array.from(e.target.parentNode.children)
    // console.log(smallDiv)
    const index = smallDiv.indexOf(e.target)
    // console.log(index)

    console.log(e.target.parentNode)
    // console.log('board.id ----->',board.id)
    // console.log('boardInPlay ----->', boardInPlay)
    // console.log('index ----->', index)

    if (parseInt(board.id) === boardInPlay || boardInPlay === -1) {
      // console.log('playing')


      // does the board have a winner? if so, return

      if (board.classList.contains('winner-X')) {
        boardInPlay = -1
        return
      }

      // Assigning to boardInPlay on index Number

      currentBoard = parseInt(board.id) // parsing ID from string to number
      boardInPlay = index

      cell.textContent = player

      if(checkForWin(cells)){
        board.classList.add(`winner-${player}`)
        alert(`${player} win!!!`)
        boardInPlay = -1

        // const lines = cells.map(cells => cells.innerHTML


        // push into empty array the board already taken and won by X or O
        // takent board is an empty Array to fill up with winning condition

        if(player === 'X') takenBoardsX.push(currentBoard)
        else takenBoardsO.push(currentBoard)
        // check for theWinner


        // check if takenBoardsO or takenBoardsX contain any of the winning combinations


        if ( takenBoardsX.includes(0) && takenBoardsX.includes(1) && takenBoardsX.includes(2) ||
        takenBoardsX.includes(0) && takenBoardsX.includes(1) && takenBoardsX.includes(2) ||
        takenBoardsX.includes(3) && takenBoardsX.includes(4) && takenBoardsX.includes(5) ||
        takenBoardsX.includes(6) && takenBoardsX.includes(7) && takenBoardsX.includes(8) ||
        takenBoardsX.includes(0) && takenBoardsX.includes(4) && takenBoardsX.includes(8) ||
        takenBoardsX.includes(0) && takenBoardsX.includes(3) && takenBoardsX.includes(6) ||
        takenBoardsX.includes(1) && takenBoardsX.includes(4) && takenBoardsX.includes(7) ||
        takenBoardsX.includes(2) && takenBoardsX.includes(5) && takenBoardsX.includes(8) ||
        takenBoardsX.includes(2) && takenBoardsX.includes(4) && takenBoardsX.includes(6)){
          xBigWin = true
        }

        if (xBigWin){
          alert('Congratulations, X has won!!!!!!!\n click on PLAY AGAIN for a new challenge')
          console.log('x has won', xBigWin)
        }

        if ( takenBoardsO.includes(0) && takenBoardsO.includes(1) && takenBoardsO.includes(2) ||
        takenBoardsO.includes(0) && takenBoardsO.includes(1) && takenBoardsO.includes(2) ||
        takenBoardsO.includes(3) && takenBoardsO.includes(4) && takenBoardsO.includes(5) ||
        takenBoardsO.includes(6) && takenBoardsO.includes(7) && takenBoardsO.includes(8) ||
        takenBoardsO.includes(0) && takenBoardsO.includes(4) && takenBoardsO.includes(8) ||
        takenBoardsO.includes(0) && takenBoardsO.includes(3) && takenBoardsO.includes(6) ||
        takenBoardsO.includes(1) && takenBoardsO.includes(4) && takenBoardsO.includes(7) ||
        takenBoardsO.includes(2) && takenBoardsO.includes(5) && takenBoardsO.includes(8) ||
        takenBoardsO.includes(2) && takenBoardsO.includes(4) && takenBoardsO.includes(6)){
          oBigWin = true
        }

        if (oBigWin){
          alert('Congratulations, O has won!!!!!!!\n click on PLAY AGAIN for a new challenge')
          console.log('o has won', oBigWin)
        }

      }
      console.log(takenBoardsX, takenBoardsO)

      // check if takenBoard includes the boardInPlay ---> player to choose where to play on

      if (takenBoardsX.includes(boardInPlay) || takenBoardsO.includes(boardInPlay)){


        // player have a choice to decide where to play next move if board is already been taken

        boardInPlay = -1

        //  if player X or O collecting 3 board in a row the game is finished
        // Array combination ----> player won the game ---> no move allowed


      }
      // Switching player

      player = player === 'X' ? 'O' : 'X'
      turn.innerHTML = (player === 'O') ? 'O Turn' : 'X Turn'

    }

  } // end of play(e)

  // *************** GAME IS OVER ******************


  // having event listener for every click (div) on play(e)

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
  alert('RULES:\n The players take turns picking one of the squares that is not occupied. When one of the players gets three squares in a row, horizontal, vertical, or diagonal, that player wins. Now Ultimate Tic Tac Toe is quite similar, except each square in the field is actually small game of Tic Tac Toe. Only if you win the small game, you get the square of the big game. The goal again is to get three (big) squares in a row. Further rules will be explained below. This game requires quite a bit of strategy because you can influence which of the big squares your opponent has to play in.')
})
