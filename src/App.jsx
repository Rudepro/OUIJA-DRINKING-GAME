import React, { useState } from 'react';
import { createGameDeck } from './core/DeckFactory';
import { shuffleDeck } from './core/Dealer';
import LandingPage from './components/LandingPage';
import PlayerSetup from './components/PlayerSetup';
import GameBoard from './components/GameBoard';
import './styles/main.css';

const GAME_STATES = {
  HOME: 'HOME',
  SETUP: 'SETUP',
  PLAYING: 'PLAYING',
};

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.HOME);
  const [players, setPlayers] = useState([]);
  const [deck, setDeck] = useState([]);
  const [numDecks, setNumDecks] = useState(1);

  const startSetup = () => {
    setGameState(GAME_STATES.SETUP);
  };

  const startGame = (playerNames, decks) => {
    setNumDecks(decks);

    let newDeck = createGameDeck(decks); 
    newDeck = shuffleDeck(newDeck);
    setDeck(newDeck);
    
    setPlayers(playerNames.map((name, index) => ({
      id: index,
      name: name,
    })));
    
    setGameState(GAME_STATES.PLAYING);
  };
  
  const resetGame = () => {
      setGameState(GAME_STATES.HOME);
      setPlayers([]);
      setDeck([]);
      setNumDecks(1);
  }

  const goToSetup = () => {
      setGameState(GAME_STATES.SETUP);
  }

  switch (gameState) {
    case GAME_STATES.HOME:
      return <LandingPage onStartSetup={startSetup} />;
      
    case GAME_STATES.SETUP:
      return <PlayerSetup onStartGame={startGame} onBack={resetGame} initialPlayers={players.map(p => p.name)} initialNumDecks={numDecks} />;
      
    case GAME_STATES.PLAYING:
      return <GameBoard initialDeck={deck} players={players} onGameOver={resetGame} onBackToSetup={goToSetup} />;
      
    default:
      return <LandingPage onStartSetup={startSetup} />;
  }
}

export default App;