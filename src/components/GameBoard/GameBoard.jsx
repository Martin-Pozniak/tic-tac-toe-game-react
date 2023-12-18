import { useState } from "react"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {

  const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(selectedRow, selectedCol) {

    setGameBoard((previousGameBoard) => {

      // Required to create a full copy of the previous game board so we aren't updating the state in a muteable way but instead in an immutable way
      const updatedGameBoard = [...previousGameBoard.map(innerArray => [...innerArray])];

      updatedGameBoard[selectedRow][selectedCol] = activePlayerSymbol;

      return updatedGameBoard;

    });

    onSelectSquare();

  }

  return (
    <>
      <ol id="game-board">
        {gameBoard.map((row, rowIndex) =>
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) =>
                <li key={colIndex}>
                  <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                </li>
              )}
            </ol>
          </li>
        )}
      </ol>
    </>
  )

}