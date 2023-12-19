import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import Log from "./components/Log/Log";

import { useState } from "react"

function deriveActivePlayer(gameTurns) {

  let currentPlayer = 'X';

  console.log(gameTurns);
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;

}

function App() {

  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {

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
          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} activePlayerSymbol={activePlayer}></GameBoard>


        </div>

        {/* Log Section*/}
        <Log turns={gameTurns}></Log>

      </main>
    </>
  )


}

export default App
