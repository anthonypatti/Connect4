/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
let gameIsLive = true;
const WIDTH = 7;
const HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
let board = []; 
// array of rows, each row is array of cells  (board[y][x])
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for(y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }))
  }
}
/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // TODO: add comment for this code
  //creates the top row of the gameboard that's outside the playable area
  //this row is what handles the click event to drop our piece in that column
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.classList.add("top");
  top.addEventListener("click", handleClick);

  for (x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);
  // TODO: add comment for this code
  //creates the actual squares on the board and sets their id to be their position
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
      // console.log(row);
    }
    htmlBoard.append(row);
  }
}
/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let y = HEIGHT -1; y >= 0; y--) {
    if(!board[y][x]) {
      return y;
    }
  }
  return null;
}
/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
  const piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
  // TODO: make a div and insert into correct table cell
}
/** endGame: announce game end */
function endGame(msg) {
  let winner = document.getElementById("winner");
  winner.innerText = msg;
  gameIsLive = false;
  // TODO: pop up alert message
}
/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  if (!gameIsLive){
    return
  }
  // get x from ID of clicked cell
  const x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);
  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} wins!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))){
    return endGame("It's a Tie!");
  }
  currPlayer = currPlayer === 1 ? 2 : 1;
}
/** checkForWin: check board cell-by-cell for "does a win start here?" */
function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  // TODO: read and understand this code. Add comments to help you.
  //these get looped through cells.every to check if every cell is inside the params of the game
  //and if every cell in any of the _win are all curr player, if so win, else move on.
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //checks if any of the below are true, will run a min of once and max of 4 times
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();