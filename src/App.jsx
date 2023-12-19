import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import Log from "./components/Log/Log";

import { WINNING_COMBINATIONS } from "./assets/winning-combinations";

import { useState } from "react"
import GameOver from "./components/GameOver/GameOver";

/***********************************************************
* GLOBAL CONSTANTS
/***********************************************************/
const INITIAL_PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
}

const INITIAL_GAME_BOARD = [
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
* GLOBAL FUNCTION: deriveWinner
/***********************************************************/
function deriveWinner(gameBoard, playerNames) {

  let winner = undefined;

  // Derive if there is a winner
  for (const combination of WINNING_COMBINATIONS) {

    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
      // We have a winner
      winner = playerNames[firstSquareSymbol];
    }

  }

  return winner;

}

/***********************************************************
* GLOBAL FUNCTION: deriveGameBoard
/***********************************************************/
function deriveGameBoard(gameTurns) {

  // Need to create a copy of the initial game board so we aren't editing by reference but instead by value
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  // Derive the gameboard based on turns
  for (const turn of gameTurns) {

    // Destructure a turn
    const { square, player } = turn;

    // Destructure row and col from a square
    const { row, col } = square;

    gameBoard[row][col] = player;

  }

  return gameBoard;

}

/***********************************************************
* Function: App
/***********************************************************/
function App() {

  /***********************************************************
  * Member Variables
  /***********************************************************/
  // State Variables
  const [playerNames, setPlayers] = useState(INITIAL_PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  // Derived State Members
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  let winner = deriveWinner(gameBoard, playerNames);

  const gameIsDraw = !winner && gameTurns.length === 9


  /***********************************************************
  * Function: handleSelectSquare
  /***********************************************************/
  function handlePlayerNameChange(symbol, newName) {

    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })

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
  * Function: handleRematch
  /***********************************************************/
  function handleRematch() {
    setGameTurns([]);
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
            <Player initialName={INITIAL_PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onPlayerNameChanged={handlePlayerNameChange}></Player>
            <Player initialName={INITIAL_PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onPlayerNameChanged={handlePlayerNameChange}></Player>
          </ol>

          {/* Game Board Section */}
          {winner || gameIsDraw ? <GameOver winner={winner} onRematchClicked={handleRematch} /> : undefined}
          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} activePlayerSymbol={activePlayer} board={gameBoard} />

        </div>

        {/* Log Section*/}
        <Log turns={gameTurns}></Log>

      </main>
    </>
  )

}

export default App
