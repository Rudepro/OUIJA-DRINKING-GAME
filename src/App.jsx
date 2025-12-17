// src/App.jsx (VERSIÓN FINAL CORREGIDA)
import React, { useState } from 'react';
import { createGameDeck } from './core/DeckFactory'; // Importado de DeckFactory
import { shuffleDeck } from './core/Dealer'; // Importado de Dealer
import LandingPage from './components/LandingPage';
import PlayerSetup from './components/PlayerSetup';
import GameBoard from './components/GameBoard';
import './styles/main.css'; // Asegúrate de que el nombre de archivo sea correcto

// Definimos los estados del juego
const GAME_STATES = {
  HOME: 'HOME',
  SETUP: 'SETUP',
  PLAYING: 'PLAYING',
};

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.HOME);
  const [players, setPlayers] = useState([]);
  const [deck, setDeck] = useState([]);
  const [numDecks, setNumDecks] = useState(1); // Guardar la última selección de barajas

  const startSetup = () => {
    setGameState(GAME_STATES.SETUP);
  };

  // Función que inicia el juego (llamada desde PlayerSetup)
  const startGame = (playerNames, decks) => {
    // Guardamos cuántas barajas eligió el usuario para reutilizar si vuelve a Setup
    setNumDecks(decks);

    let newDeck = createGameDeck(decks); 
    newDeck = shuffleDeck(newDeck);
    setDeck(newDeck);
    
    // Asigna IDs a los jugadores
    setPlayers(playerNames.map((name, index) => ({
      id: index,
      name: name,
    })));
    
    setGameState(GAME_STATES.PLAYING);
  };
  
  // Función para volver al inicio (limpia todo)
  const resetGame = () => {
      setGameState(GAME_STATES.HOME);
      setPlayers([]);
      setDeck([]);
      setNumDecks(1);
  }

  // Volver a la pantalla de configuración sin perder jugadores ni barajas
  const goToSetup = () => {
      setGameState(GAME_STATES.SETUP);
  }

  // Renderizado condicional basado en el estado
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