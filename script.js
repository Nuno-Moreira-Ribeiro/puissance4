let currentPlayer = "R";
let redWin = false;
let yellowWin = false;
let allLoss = false;
let currentGrid = [
  ["w", "w", "w", "w", "w", "w"],
  ["w", "w", "w", "w", "w", "w"],
  ["w", "w", "w", "w", "w", "w"],
  ["w", "w", "w", "w", "w", "w"],
  ["w", "w", "w", "w", "w", "w"],
  ["w", "w", "w", "w", "w", "w"],
  ["w", "w", "w", "w", "w", "w"],
];

let purposeRow = ["w", "w", "w", `${currentPlayer}`, "w", "w", "w"];

function updateColorPurposeRow() {
  purposeRow = ["w", "w", "w", `${currentPlayer}`, "w", "w", "w"];
}

function movePurposeToRight() {
  found = false;
  if (purposeRow[6] !== currentPlayer) {
    for (i = 0; i < purposeRow.length; i++) {
      if (found == true) {
        purposeRow[i] = currentPlayer;
        break;
      } else if (purposeRow[i] === currentPlayer) {
        found = true;
        purposeRow[i] = "w";
      }
    }
  }
}

function movePurposeToLeft() {
  found = false;
  if (purposeRow[0] !== currentPlayer) {
    for (let i = purposeRow.length - 1; i >= 0; i--) {
      if (found == true) {
        purposeRow[i] = currentPlayer;
        break;
      } else if (purposeRow[i] === currentPlayer) {
        found = true;
        purposeRow[i] = "w";
      }
    }
  }
}

function updatePurposeRow() {
  for (i = 0; i < purposeRow.length; i++) {
    const cell = document
      .querySelector(`#purposeContainer[data-row="${10}"]`)
      .querySelector(`.cellPurpose[data-col="${i}"]`);

    switch (purposeRow[i]) {
      case "w":
        cell.style.backgroundColor = "whitesmoke";
        cell.style.boxShadow = "none";

        break;
      case "R":
        cell.style.backgroundColor = "red";
        cell.style.boxShadow = "0px 0px 5px 5px rgba(0, 0, 0, 0.493)";

        break;
      case "Y":
        cell.style.backgroundColor = "yellow";
        cell.style.boxShadow = "0px 0px 5px 5px rgba(0, 0, 0, 0.493)";
        break;
      default:
        break;
    }
  }
}

function changePlayer() {
  if (currentPlayer === "R") {
    currentPlayer = "Y";
  } else {
    currentPlayer = "R";
  }
}

function getFirstFree(col) {
  if (currentGrid[col]) {
    for (let index = currentGrid[col].length - 1; index >= 0; index--) {
      if (currentGrid[col][index] === "w") {
        return index;
      }
    }
  }
  return -1;
}

function updateGrid() {
  let col;
  for (let index = 0; index < purposeRow.length; index++) {
    if (purposeRow[index] !== "w") {
      col = index;
      break;
    }
  }
  const cellToEdit = getFirstFree(col);
  currentGrid[col][cellToEdit] = currentPlayer;
}

function updateColorGrid() {
  for (let i = 0; i < currentGrid.length; i++) {
    for (let j = 0; j < currentGrid[i].length; j++) {
      const cellRow = document.querySelector(`#grid .row[data-row="${i}"]`);
      const cell = cellRow
        ? cellRow.querySelector(`.cell[data-col="${j}"]`)
        : null;

      if (cell) {
        switch (currentGrid[i][j]) {
          case "w":
            cell.style.backgroundColor = "whitesmoke";
            break;
          case "R":
            cell.style.backgroundColor = "red";
            break;
          case "Y":
            cell.style.backgroundColor = "yellow";
            break;
          default:
            break;
        }
      }
    }
  }
}

function handleKeyPress(event) {
  const key = event.key;

  switch (key) {
    case "ArrowLeft":
      movePurposeToLeft();
      updatePurposeRow();
      break;
    case "ArrowRight":
      movePurposeToRight();
      updatePurposeRow();
      break;
    case "Enter":
      updateGrid();
      updateColorGrid();
      changePlayer();
      updateColorPurposeRow();
      updatePurposeRow();
      break;
    default:
      break;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updatePurposeRow();
});

document.addEventListener("keydown", handleKeyPress);