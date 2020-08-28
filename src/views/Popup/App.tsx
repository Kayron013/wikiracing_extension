import React from 'react';
import './App.css';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { startGame, endGame } from 'utils/chrome/events';

function App() {
  const [localStorage] = useLocalStorage();

  const handleClick = (isStarting: boolean) => {
    isStarting ? startGame() : endGame();
  };

  return (
    <div className='App'>
      <h2>Wiki Race</h2>
      {localStorage.isPlaying ? (
        <button onClick={() => handleClick(false)}>Stop</button>
      ) : (
        <button onClick={() => handleClick(true)}>Start</button>
      )}
    </div>
  );
}

export default App;
