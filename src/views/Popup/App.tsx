import React from 'react';
import './App.css';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import { PlayingScreen } from './PlayingScreen';
import { StandbyScreen } from './StandbyScreen';

function App() {
  const localStorage = useLocalStorage();

  return <div className='App'>{localStorage.isPlaying ? <PlayingScreen /> : <StandbyScreen />}</div>;
}

export default App;
