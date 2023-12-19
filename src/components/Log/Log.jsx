export default function Log({ turns }) {
  return (
    <>
      <ol id="log">
        {turns.map((turn, turnIndex) => <li key={`${turn.square.row}${turn.square.col}`}> Move #{turns.length - turnIndex}: Player {turn.player} selected row {turn.square.row} column {turn.square.col}</li>)}
      </ol>
    </>
  )
}