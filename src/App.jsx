import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import Log from "./components/Log/Log";

import { WINNING_COMBINATIONS } from "./assets/winning-combinations";

import { useState } from "react"

/***********************************************************
* GLOBAL CONSTANTS
/***********************************************************/
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

/***********************************************************
* GLOBAL FUNCTION: deriveActivePlayer
/***********************************************************/
function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X';

  console.log(gameTurns);
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

/***********************************************************
* Function: App
/***********************************************************/
function App() {

  /***********************************************************
  * Member Variables
  /***********************************************************/
  // State Variables
  const [gameTurns, setGameTurns] = useState([]);

  // Derived State Members
  const activePlayer = deriveActivePlayer(gameTurns);

  let winner = undefined;
  let gameBoard = initialGameBoard;

  // Derive the gameboard based on turns
  for (const turn of gameTurns) {

    // Destructure a turn
    const { square, player } = turn;

    // Destructure row and col from a square
    const { row, col } = square;

    gameBoard[row][col] = player;

  }

  // Derive if there is a winner
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
      // We have a winner
      winner = firstSquareSymbol;
    }


  }

  /***********************************************************
  * Function: handleSelectSquare
  /***********************************************************/
  function handleSelectSquare(rowIndex, colIndex) {

    // This function must be inside the app component because it leverages a state variable.

    setGameTurns((prevTurns) => {

      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer
        },
        ...prevTurns];


      return updatedTurns;

    });

  }

  /***********************************************************
  * Function: MAIN JSX
  /***********************************************************/
  return (
    <>
      <main>
        <div id="game-container">

          {/* Players Section */}
          <ol id="players" className="highlight-player">
            <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'}></Player>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'}></Player>
          </ol>

          {/* Game Board Section */}
          {winner ? <h1>You win {winner}!</h1> : undefined}
          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} activePlayerSymbol={activePlayer} board={gameBoard}></GameBoard>


        </div>

        {/* Log Section*/}
        <Log turns={gameTurns}></Log>

      </main>
    </>
  )

}

export default App
