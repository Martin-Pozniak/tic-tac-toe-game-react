import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import Log from "./components/Log/Log";

import { useState } from "react"

function App() {


  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);


  function handleSelectSquare(rowIndex, colIndex) {

    setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X')

    setGameTurns((prevTurns) => {

      // Need to set this current player variable instead of using activePlayer in order to not intersect states.
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

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
