document.addEventListener('DOMContentLoaded', () => {
  const boards = Array.from(document.querySelectorAll('.board'))
  let player = 'X'
  const refresh = document.querySelector('button')





  function getSets(cells) {
    return [
      [ cells[0], cells[1], cells[2] ],
      [ cells[3], cells[4], cells[5] ],
      [ cells[6], cells[7], cells[8] ],

      [ cells[0], cells[3], cells[6] ],
      [ cells[1], cells[4], cells[7] ],
      [ cells[2], cells[5], cells[8] ],

      [ cells[0], cells[4], cells[8] ],
      [ cells[2], cells[4], cells[6] ]
    ]
  }


  function getMatrix(cells) {
    const sets = getSets(cells)
    // console.log('this is getMatrix', getMatrix)
    // console.log(sets)
    return sets.map(set => {
      return set.map(cell => {
        if(cell.textContent === 'X') return 1
        if(cell.textContent === 'O') return 0
        return
      })
    })
  }

  function checkForWin(cells) {
    const matrix = getMatrix(cells)
    // console.log(matrix)
    const totals = matrix.map(row => row.reduce((sum, cell) => sum + cell))
    // console.log(totals)
    return totals.some(total => total === 0 || total === 3)
  }

  let boardInPlay = -1
  const takenBoards = []

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


    console.log('board.id ----->',board.id)
    console.log('boardInPlay ----->', boardInPlay)
    console.log('index ----->', index)

    if (parseInt(board.id) === boardInPlay || boardInPlay === -1) {
      console.log('playing')

      // if (boardInPlay && parseInt(board.id) !== boardInPlay) {
      //   return
      //
      // }

      // does the board have a winner? if so, return
      if (board.classList.contains('winner-X')) {
        boardInPlay = -1
        return
      }

      boardInPlay = index

      cell.textContent = player

      if(checkForWin(cells)){
        board.classList.add(`winner-${player}`)
        alert(`${player} win the game!!!`)

        takenBoards.push(boardInPlay)

      }

      if (takenBoards.includes(index)){
        boardInPlay = -1
      }
      // if (boardInPlay.classList.contains('winner-X')){
      //   boardInPlay = -1
      //   console.log('that board is already taken, play anywhere')
      // }
      // update the mainMatrix with 0 or 1 for this game

      player = player === 'X' ? 'O' : 'X'
    }

  } // end of play(e)

  boards.forEach(board => {
    const cells = Array.from(board.children)
    // console.log(cells)
    cells.forEach(cell => {
      cell.addEventListener('click', play)
    })
  })


  function refreshPage() {
    window.location.reload()
  }
  refresh.addEventListener('click', refreshPage)
})
