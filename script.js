var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var sizeInput = document.getElementById("size");
var changeSize = document.getElementById("change-size");
var scoreLabel = document.getElementById("score");
var score = 0;
var size = 4;
var width = canvas.width / size - 6;
var cells = [];
var fontSize;
var loss = false;
startGame();

changeSize.onclick = function() {
  if (sizeInput.value >= 2 && sizeInput.value <= 20) {
    size = sizeInput.value;
    width = canvas.width / size - 6;
    console.log(sizeInput.value);
    canvasClean();
    startGame();
  }
};

function cell(row, coll) {
  this.value = 0;
  this.x = coll * width + 5 * (coll + 1);
  this.y = row * width + 5 * (row + 1);
}

function createCells() {
  var i, j;
  for (i = 0; i < size; i++) {
    cells[i] = [];
    for (j = 0; j < size; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function drawCell(cell) {
  ctx.beginPath();
  ctx.rect(cell.x, cell.y, width, width);
  switch (cell.value) {
    case 0:
      ctx.fillStyle = "#A9A9A9";
      break;
    case 2:
      ctx.fillStyle = "#D2691E";
      break;
    case 4:
      ctx.fillStyle = "#FF7F50";
      break;
    case 8:
      ctx.fillStyle = "#ffbf00";
      break;
    case 16:
      ctx.fillStyle = "#bfff00";
      break;
    case 32:
      ctx.fillStyle = "#40ff00";
      break;
    case 64:
      ctx.fillStyle = "#00bfff";
      break;
    case 128:
      ctx.fillStyle = "#FF7F0F";
      break;
    case 256:
      ctx.fillStyle = "#0040ff";
      break;
    case 512:
      ctx.fillStyle = "#ff0080";
      break;
    case 1024:
      ctx.fillStyle = "#FF3333";
      break;
    case 2048:
      ctx.fillStyle = "#FF6F6F";
      break;
    case 4096:
      ctx.fillStyle = "#ffbf00";
      break;
    default:
      ctx.fillStyle = "#ff0080";
  }
  ctx.fill();
  if (cell.value) {
    fontSize = width / 2;
    ctx.font = fontSize + "px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(
      cell.value,
      cell.x + width / 2,
      cell.y + width / 2 + width / 7
    );
  }
}

function canvasClean() {
  ctx.clearRect(0, 0, 500, 500);
  score = 0;
  scoreLabel.innerHTML = "Score:" + score;
}

document.onkeydown = function(event) {
  if (!loss) {
    if (event.keyCode === 38 || event.keyCode === 87) {
      moveUp();
    } else if (event.keyCode === 39 || event.keyCode === 68) {
      moveRight();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      moveDown();
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      moveLeft();
    }
    scoreLabel.innerHTML = "Score : " + score;
  }
};

function startGame() {
  createCells();
  drawAllCells();
  pasteNewCell(1);
  pasteNewCell(1);
}

function finishGame() {
  canvas.style.opacity = "0.5";
  loss = true;
}

function drawAllCells() {
  var i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      drawCell(cells[i][j]);
    }
  }
}

function pasteNewCell(flag) {
  var countFree = 0;
  var i, j;
  for (i = 0; i < size; i++) {
    for (j = 0; j < size; j++) {
      if (!cells[i][j].value) {
        countFree++;
      }
    }
  }
  if (!countFree) {
    finishGame();
    return;
  }
  if (flag)
    while (true) {
      var row = Math.floor(Math.random() * size);
      var coll = Math.floor(Math.random() * size);
      if (!cells[row][coll].value) {
        cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
        drawAllCells();
        return;
      }
    }
}

function moveRight() {
  var i, j;
  var coll;
  var flag = 0;
  for (i = 0; i < size; i++) {
    var f = 0;
    for (j = size - 2; j >= 0; j--) {
      if (cells[i][j].value) {
        coll = j;
        if (f != 1) {
          while (coll + 1 < size) {
            if (!cells[i][coll + 1].value) {
              cells[i][coll + 1].value = cells[i][coll].value;
              cells[i][coll].value = 0;
              coll++;
              flag = 1;
            } else if (cells[i][coll].value == cells[i][coll + 1].value) {
              cells[i][coll + 1].value *= 2;
              score += cells[i][coll + 1].value;
              cells[i][coll].value = 0;
              f = 1;
              flag = 1;
              break;
            } else {
              break;
            }
          }
        } else {
          while (coll + 1 < size) {
            if (!cells[i][coll + 1].value) {
              cells[i][coll + 1].value = cells[i][coll].value;
              cells[i][coll].value = 0;
              coll++;
              flag = 1;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  pasteNewCell(flag);
}

function moveLeft() {
  var i, j;
  var coll;
  var flag = 0;
  for (i = 0; i < size; i++) {
    var f = 0;
    for (j = 1; j < size; j++) {
      if (cells[i][j].value) {
        coll = j;
        if (f != 1) {
          while (coll - 1 >= 0) {
            if (!cells[i][coll - 1].value) {
              cells[i][coll - 1].value = cells[i][coll].value;
              cells[i][coll].value = 0;
              coll--;
              flag = 1;
            } else if (cells[i][coll].value == cells[i][coll - 1].value) {
              cells[i][coll - 1].value *= 2;
              score += cells[i][coll - 1].value;
              cells[i][coll].value = 0;
              f = 1;
              flag = 1;
              break;
            } else {
              break;
            }
          }
        } else {
          f = 0;
          while (coll - 1 >= 0) {
            if (!cells[i][coll - 1].value) {
              cells[i][coll - 1].value = cells[i][coll].value;
              cells[i][coll].value = 0;
              coll--;
              flag = 1;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  pasteNewCell(flag);
}

function moveUp() {
  var i, j, row;
  var flag = 0;
  for (j = 0; j < size; j++) {
    var f = 0;
    for (i = 1; i < size; i++) {
      if (cells[i][j].value) {
        row = i;
        if (f != 1) {
          while (row > 0) {
            if (!cells[row - 1][j].value) {
              cells[row - 1][j].value = cells[row][j].value;
              cells[row][j].value = 0;
              row--;
              flag = 1;
            } else if (cells[row][j].value == cells[row - 1][j].value) {
              cells[row - 1][j].value *= 2;
              score += cells[row - 1][j].value;
              cells[row][j].value = 0;
              f = 1;
              flag = 1;
              break;
            } else {
              break;
            }
          }
        } else {
          while (row > 0) {
            if (!cells[row - 1][j].value) {
              cells[row - 1][j].value = cells[row][j].value;
              cells[row][j].value = 0;
              row--;
              flag = 1;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  pasteNewCell(flag);
}

function moveDown() {
  var i, j, row;
  var flag = 0;
  for (j = 0; j < size; j++) {
    var f = 0;
    for (i = size - 2; i >= 0; i--) {
      if (cells[i][j].value) {
        row = i;
        if (f != 1) {
          while (row + 1 < size) {
            if (!cells[row + 1][j].value) {
              cells[row + 1][j].value = cells[row][j].value;
              cells[row][j].value = 0;
              row++;
              flag = 1;
            } else if (cells[row][j].value == cells[row + 1][j].value) {
              cells[row + 1][j].value *= 2;
              score += cells[row + 1][j].value;
              cells[row][j].value = 0;
              f = 1;
              flag = 1;
              break;
            } else {
              break;
            }
          }
        } else {
          while (row + 1 < size) {
            if (!cells[row + 1][j].value) {
              cells[row + 1][j].value = cells[row][j].value;
              cells[row][j].value = 0;
              row++;
              flag = 1;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  pasteNewCell(flag);
}
