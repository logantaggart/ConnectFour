const WIDTH = 7
const HEIGHT = 6

let currentPlayer = 1
let board = []


function makeBoard() {
  for (let c = 0; c < HEIGHT; c++) {
    board.push([])
      for (let r = 0; r < WIDTH; r++) {
        board[c].push(null)}}}


function makeHtmlBoard() {
  const board = document.querySelector('#board')

  const top = document.createElement("tr")
  top.setAttribute("id", "column-top")
  top.addEventListener("click", handleClick)

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td")
    headCell.setAttribute("id", x)
    top.append(headCell)}
  board.append(top)

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr")
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td")
      cell.setAttribute("id", `${y}-${x}`)
      row.append(cell)}
    board.append(row)}}


function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y}}
  return null}


function placeInTable(y, x) {
  const chip = document.createElement('div')
  chip.classList.add('piece')
  chip.classList.add(`player${currentPlayer}`)
  const posit = document.getElementById(`${y}-${x}`)
  posit.append(chip)}


function endGame(win) {
  alert(win)}


function handleClick(evt) {
  const x = +evt.target.id

  const y = findSpotForCol(x)
  if (y === null) {
    return}

  board[y][x] = currentPlayer
  placeInTable(y, x)

  if (checkForWin()) {
    return endGame(`Congratulations! Player ${currentPlayer} has won the game!`)
  }

  if (board.every(row => row.every(cell => cell))) {
    return endGame('Please try again! Player 1 and Player 2 have tied!')}
  
  currentPlayer = currentPlayer === 1 ? 2 : 1}


function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currentPlayer)}

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]

    if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true}}}}


makeBoard()
makeHtmlBoard()
