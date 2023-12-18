import { useState } from 'react'

export default function Player({ initialName, symbol, isActive }) {

  // Member Variables
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEditClicked() {

    // In react you should not do it like this
    // setIsEditing(!isEditing);

    // Instead you are supposed to send a function to the state editing function
    setIsEditing((editing) => !editing)

  }

  function updatePlayerName(event) {
    setPlayerName(event.target.value);
  }

  return (
    <>
      <li className={isActive ? 'active' : undefined}>
        <span className="player">

          {!isEditing ? (<span className="player-name">{playerName}</span>) : (<input required value={playerName} onChange={updatePlayerName} type="text" />)}
          <span className="player-symbol">{symbol}</span>

        </span>
        <button onClick={() => handleEditClicked()}>{isEditing ? 'Save' : 'Edit'}</button>
      </li>
    </>
  )

}