import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import Log from "./components/Log/Log";

import { useState } from "react"

function App() {


  const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);


  function handleSelectSquare() {

    setActivePlayer((currentPlayer) => currentPlayer === 'X' ? 'O' : 'X')

    setGameTurns([]);

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
          <GameBoard onSelectSquare={handleSelectSquare} activePlayerSymbol={activePlayer}></GameBoard>


        </div>

        {/* Log Section*/}
        <Log></Log>

      </main>
    </>
  )


}

export default App
