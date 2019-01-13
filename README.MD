# General Assembly Project 1 : Simple front-end game

Live Version: https://alessandrolepri.github.io/WDI38--Project-01/

### Timeframe
7 days

# Selection

Choose one game between nine briefs given to us by our Instructor the weekend before starting our "Project week"

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS
* GitHub

## Management Tools

* Trello

## Installation

1. Clone or download the repo
2. Open the `index.html` in your browser of choice, leave your feedback and possibly improvement



# My Game - Ultimate Tic-Tac-Toe

![screenshot of title](https://user-images.githubusercontent.com/42512889/51026149-cca96d00-1585-11e9-8ddc-86f4912ae114.png)

You can find a hosted version here:
[alessandrolepri/WDI38--Project-01]
(https://github.com/alessandrolepri/WDI38--Project-01)

![screenshot initial game](https://user-images.githubusercontent.com/42512889/51026631-daabbd80-1586-11e9-94e2-6927fdd40a0e.png)


## Game overview
Ultimate tic-tac-toe is a board game (2 players in the same screen) composed of nine tic-tac-toe boards arranged in a 3-by-3 grid. Players take turns playing in the smaller tic-tac-toe boards until one of them wins in the larger tic-tac-toe board. Compared to traditional tic-tac-toe, strategy in this game is conceptually more difficult, and has proven more challenging for computers.


### Rules
Each small 3-by-3 tic-tac-toe board is referred to as a local board, and the larger 3-by-3 board is referred to as the global board.

The game starts with X playing wherever they want in any of the 81 empty spots. This move 'sends' their opponent to its relative location. For example, if X played in the top right square of their local board, then O needs to play next in the local board at the top right of the global board. O can then play in any one of the nine available spots in that local board, each move sending X to a different local board.

If a move is played so that it is to win a local board by the rules of normal tic-tac-toe, then the entire local board is marked as a victory for the player in the global board.

![screenshot X win --> board is highlighted in red](https://user-images.githubusercontent.com/42512889/51026377-48a3b500-1586-11e9-913b-ca8dd2e4a3ae.png)

![screenshot player's turn will be display on the right of the screen](https://user-images.githubusercontent.com/42512889/51026734-2199b300-1587-11e9-83f4-0f57d21bb083.png)

![screenshot player's turn will be display on the right of the screen](https://user-images.githubusercontent.com/42512889/51026734-2199b300-1587-11e9-83f4-0f57d21bb083.png)

![screenshot O win --> board is highlighted in blue](https://user-images.githubusercontent.com/42512889/51026486-830d5200-1586-11e9-98e6-60a228fe8a60.png)

Once the outcome of a local board is decided (win or draw), no more moves may be played in that board. If a player is sent to such a board, then that player may play in any other board.

Game play ends when either a player wins the global board or there are no legal moves remaining, in which case the game is a draw.


#### Gameplay

Ultimate tic-tac-toe is significantly more complex than most other variations of tic-tac-toe, as there is no clear strategy to playing. This is because of the complicated game branching in this game. Even though every move must be played in a local board, equivalent to a normal tic-tac-toe board, each move must take into account the global board in several ways:

Anticipating the next move: Each move played in a local board determines where the opponent's next move may be played. This might make moves that may be considered bad in normal tic-tac-toe viable, since the opponent is sent to another local board, and may be unable to immediately respond to them. Therefore, players are forced to consider the larger game board instead of simply focusing on the local board.

Visualising the game tree: Visualising future branches of the game tree is more difficult than single board tic-tac-toe. Each move determines the next move, and therefore reading ahead—predicting future moves—follows a much less linear path. Future board positions are no longer interchangeable, each move leading to starkly different possible future positions. This makes the game tree difficult to visualise, possibly leaving many possible paths overlooked.

Winning the game: Due to the rules of ultimate tic-tac-toe, the global board is never directly affected. It is only governed by actions that occur in local boards. This means that each local move played is not intended to win the local board, but to win the global board. Local wins are not valuable if they cannot be used to win the global board—in fact, it may be strategic to sacrifice a local board to your opponent in order to win a more important local board yourself. This added layer of complexity makes it harder for humans to analyse the relative importance and significance of moves, and consequently harder to play well.

![screenshot X has won the game](https://user-images.githubusercontent.com/42512889/51030143-6d048f00-1590-11e9-93e5-f6c9accdaefb.png)

![screenshot O has won the game](https://user-images.githubusercontent.com/42512889/51030299-e43a2300-1590-11e9-8358-d65ae718f89e.png)



# Process

The modal element on top of the page is responsible for displaying a box to user at the beginning of each game. This way we enable user to choose which figure he or she wants to play.

Next element is .game div. It wraps all of .game .board, that takes part in tic tac toe game.

First thing was to create an Array in an Array of all the cells into the 'small board game' and sorting winning possibly combination returning 8 array with 3 div inside one of each.

```
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
```
![screenshot 9 div of the game](https://user-images.githubusercontent.com/42512889/51031179-a8548d00-1593-11e9-9ab2-39fdfaa1ea9b.png)
![screenshot Array winning combination](https://user-images.githubusercontent.com/42512889/51031184-aab6e700-1593-11e9-8d28-f78ac614824d.png)

Once find the winning logic for the small game board I have assigned an ID to each .board and let the move index matching with the current board game in order to disable the next player move for this board parsing the ID board from string to a number.

```if (parseInt(board.id) === boardInPlay || boardInPlay === -1) {
  if (board.classList.contains('winner-X')) {
    boardInPlay = -1
    return

    currentBoard = parseInt(board.id)
    boardInPlay = index
```

After one of the player won a small board game, this board will be disable from any other future move, so current board will be = -1 and the player have a free to choice to place the next move whenever likes and the same game logic will start again from that move.

```
if(checkForWin(cells)){
  board.classList.add(`winner-${player}`)
  alert(`${player} win!!!`)
  boardInPlay = -1
  ```
The "const takenBoardsX = []" and  "const takenBoardsO = []" will be fill up with board that has been won by the player.
![screenshot 'Inspector'](https://user-images.githubusercontent.com/42512889/51085125-a83bc500-172c-11e9-9b91-ecde04ce7c41.png)

At that stage what I have done to check the final winning game condition was compare any possible winning combination with the value contained into the Array [takenBoardsX], [takenBoardsO] which they are having a 'false' value.
If any of the winning combination will return  value 'true' the game is over that means player1 or player2 has won.

```
f ( takenBoardsX.includes(0) && takenBoardsX.includes(1) && takenBoardsX.includes(2) ||
takenBoardsX.includes(3) && takenBoardsX.includes(4) && takenBoardsX.includes(5) ||
takenBoardsX.includes(6) && takenBoardsX.includes(7) && takenBoardsX.includes(8) ||
takenBoardsX.includes(0) && takenBoardsX.includes(4) && takenBoardsX.includes(8) ||
takenBoardsX.includes(0) && takenBoardsX.includes(3) && takenBoardsX.includes(6) ||
takenBoardsX.includes(1) && takenBoardsX.includes(4) && takenBoardsX.includes(7) ||
takenBoardsX.includes(2) && takenBoardsX.includes(5) && takenBoardsX.includes(8) ||
takenBoardsX.includes(2) && takenBoardsX.includes(4) && takenBoardsX.includes(6)) {
  xBigWin = true
}

if (xBigWin){
  alert('Congratulations, X has won!!!!!!!\n click on PLAY AGAIN for a new challenge')
  console.log('x has won', xBigWin)
}

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

if (oBigWin){
  alert('Congratulations, O has won!!!!!!!\n click on PLAY AGAIN for a new challenge')
  console.log('o has won', oBigWin)
}
```
By the reset button 'Play Again' players will be able to refresh the page and start a new Challenges

```

<footer>
<button type="button" name="button">Play Again</button>
</footer>

const refresh = document.querySelector('button')

function refreshPage() {
  window.location.reload()
}
refresh.addEventListener('click', refreshPage)
```

## Challenges

This game involves quite a lot of logic things going on at the same time. It was a challenge to make sure the gaming mechanics were working correctly in order to follow up the rules.

1) First challenge was have a small game rule active where player can play next.

2) Second challenge was creating a function were once one board has already been taken or no more move allowed, player have the free  choice to place the next mark anywhere wants and and the logic will start again from that move.

3) Once X or O have collected 3 points in a row (column, diagonal or row) the game is over and creating empty Array inside the play(e) function help me to push then the board won into 'takenBoardX' or 'takenBoardO' giving me back a value from 1 to 9 depending which board was taken.


### Wins

Having the code working at the end of the week time assigned was a great goal.

The code is not perfect, in fact, in the final winning condition function is very repetitive and long which I could refactor or find a different way to approach this solution.

At the moment I am happy with it because it is reflect what was my original pseudocode at the beginning of my logic.



# Future features

If I had more time, I would like to try and make the game playable against Computer as well with just one player. Also I would like to remove all the 'alert' and replace instead with "Starting button" where all users can read out game's rules and also "Reset button" where to display which player has won or if the game was draw. By clicking on the button "PLAY AGAIN" the game will start again from the "Starting button" when users can choose the mode game (player1 vs players2  or  player1 vs. Computer)

Sounds effect could be added to the game depending on move and player winning.

I would also like to improve the page style in order to have the game more playable when the "next board move" will be highlighted with the colour of the player's turn.
