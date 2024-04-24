import { useRef, useState } from "react";

export default function Player() {
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);
  const playerName = useRef(null);

  const handlePlayerName = () => {
    setEnteredPlayerName(playerName.current.value);
  }
  return (
    <section id="player">
      <h2>Welcome  {enteredPlayerName ?? 'unknown entity'} </h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handlePlayerName}>Set Name</button>
      </p>
    </section>
  );
}
