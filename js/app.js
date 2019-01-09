document.addEventListener('DOMContentLoaded', () => {
  const boards = Array.from(document.querySelectorAll('.board'))
  let player = 'X'
  const refresh = document.querySelector('button')
  const turnDisplay = document.getElementById('whos-turn')

  // const mainMatrix = [
  //   NaN, NaN, NaN,
  //   NaN, NaN, NaN,
  //   NaN, NaN, NaN
  // ]



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
    return sets.map(set => {
      return set.map(cell => {
        if(cell.textContent === 'X') return 1
        if(cell.textContent === 'O') return 0
        return NaN
      })
    })
  }

  function checkForWin(cells) {
    const matrix = getMatrix(cells)
    const totals = matrix.map(row => row.reduce((sum, cell) => sum + cell))

    return totals.some(total => total === 0 || total === 3)
  }

  let boardInPlay

  function play(e) {
    const cell = e.target
    if (cell.innerText === 'X' || cell.innerText === 'O') return
    const board = e.target.parentNode
    // console.log(board)
    const cells = board.children
    const smallDiv = Array.from(e.target.parentNode.children)
    const index = smallDiv.indexOf(e.target)
    if (parseInt(board.id) === boardInPlay) {

      turnDisplay.ClassName = player
      console.log(turnDisplay)
      e.target.innerHTML = player
      // e.target.classList.add('clicked')
    }
    // console.log(board.id)
    if (boardInPlay && parseInt(board.id) !== boardInPlay) {
      return
    }

    boardInPlay = index

    cell.textContent = player

    if(checkForWin(cells)) {
      alert(`${player} win!!!`)
    }

    // update the mainMatrix with 0 or 1 for this game

    player = player === 'X' ? 'O' : 'X'

  }

  boards.forEach(board => {
    const cells = Array.from(board.children)
    cells.forEach(cell => {
      cell.addEventListener('click', play)
    })
  })


  function refreshPage() {
    window.location.reload()
  }
  refresh.addEventListener('click', refreshPage)
})
