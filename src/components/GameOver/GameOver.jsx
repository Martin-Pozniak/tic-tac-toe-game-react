export default function GameOver({ winner, onRematchClicked }) {

  return (
    <>
      <div id="game-over">
        <h2>Game Over!</h2>
        {winner ? <p> {winner} has won the game!</p> : <p>It's a draw!</p>}
        <p>
          <button onClick={onRematchClicked}>Rematch</button>
        </p>
      </div>
    </>
  )

}