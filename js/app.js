document.addEventListener('DOMContentLoaded', () => {
  const boards = Array.from(document.querySelectorAll('.board'))
  let player = 'X'
  const refresh = document.querySelector('button')
  const turn = document.querySelector('#whos-turn')



  function theWinner(square) {
    return [
      [ 0,1,2 ],  // ROW
      [ 3,4,5 ],
      [ 6,7,8 ],

      [ 0,3,6 ],  // COLUMN
      [ 1,4,7 ],
      [ 2,5,8 ],

      [ 0,4,8 ],  // DIAGONAL
      [ 2,4,6 ]
    ]
  }


  //  create an Array for single square and store all winning solution by row/column/diagnola into another Array

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
        if(cell.textContent === 'X') return 1  // giving a value number to both player to return winning condition
        if(cell.textContent === 'O') return 0
        return
      })
    })
  }

  function getBoard(square) {
    const box = theWinner(square)
    return box.map(set => {
      return set.map(square => {
        if(square.textContent === 'X') return 1
        if(square.textContent === 'O') return 0
        return
      })
    })
  }

  // Check if any player has 3*X or 3*O in a row/column/diagonal ----> win condition

  function checkForWin(cells) {
    const matrix = getMatrix(cells)
    // console.log(matrix)
    const totals = matrix.map(row => row.reduce((sum, cell) => sum + cell))
    console.log(totals)
    return totals.some(total => total === 0 || total === 3)  // some will check only if there is what we are looking for
  }

  function finalWin(sqaure) {
    const result = getBoard(board)
    const final = matrix.map(row.reduce((sum, square) => sum + square))
    return final.some(final => final === 0 || total === 3)
  }


  let boardInPlay = -1 // let the player the random choice when the game starts (-1 is out of the board)
  let currentBoard = -1
  const takenBoardsX = [] // empty array to push all board taken after player X won
  const takenBoardsO = [] // empty array to push all board taken after player O won

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
      currentBoard = parseInt(board.id)
      boardInPlay = index

      cell.textContent = player

      if(checkForWin(cells)){
        board.classList.add(`winner-${player}`)
        alert(`${player} win!!!`)
        boardInPlay = -1

        // push into empty array the board already taken and won by X or O
        if(player === 'X') takenBoardsX.push(currentBoard)
        else takenBoardsO.push(currentBoard)
// check for theWinner
      }
      console.log(takenBoardsX, takenBoardsO)
      // teling to check if the board has already the index ---> player to choose where to play on

      if (takenBoardsX.includes(boardInPlay) || takenBoardsO.includes(boardInPlay)){
        boardInPlay = -1

        //  if player X or O collecting 3 board in a row the game is finished
        // [123] [456] [789] [147] [258] [369] [159] [357] ----> player won the game ---> no move allowed





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
  alert('Welcome to The Ultimate Tic-Tac-Toe game.\n Good Luck!!!\n RULES:\n You probably know the original Tic Tac Toe game. If not: it is a simple game where one player is the X and the other player is the O, playing on a field of 3x3 squares. The players take turns picking one of the squares that is not occupied. When one of the players gets three squares in a row, horizontal, vertical, or diagonal, that player wins. Now Ultimate Tic Tac Toe is quite similar, except each square in the field is actually small game of Tic Tac Toe. Only if you win the small game, you get the square of the big game. The goal again is to get three (big) squares in a row. Further rules will be explained below. This game requires quite a bit of strategy because you can influence which of the big squares your opponent has to play in.')
})
