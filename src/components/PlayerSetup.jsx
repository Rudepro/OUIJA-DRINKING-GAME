// src/components/PlayerSetup.jsx
import React, { useState, useEffect } from 'react';

const MIN_PLAYERS = 2;
const MAX_DECKS = 4;

// Límite de jugadores por baraja
const MAX_PLAYERS_PER_DECK = {
    1: 8,  
    2: 12,
    3: 16,
    4: 20,
};

const PlayerSetup = ({ onStartGame, onBack, initialPlayers = [], initialNumDecks = 1 }) => {
    // Inicializamos con valores posibles desde props (si venimos de juego)
    const [playerNames, setPlayerNames] = useState(() => {
        if (initialPlayers && initialPlayers.length > 0) return initialPlayers;
        return ['Jugador 1', 'Jugador 2'];
    });

    const [numDecks, setNumDecks] = useState(initialNumDecks);

    // Calcular el máximo de jugadores permitido basado en las barajas
    const maxPlayersAllowed = MAX_PLAYERS_PER_DECK[numDecks] || 8;

    // Ajustar la lista de jugadores si el usuario reduce el número de barajas
    // Usamos useEffect ya que realizamos un side-effect (actualizar estado)
    useEffect(() => {
        if (playerNames.length > maxPlayersAllowed) {
            setPlayerNames(playerNames.slice(0, maxPlayersAllowed));
        }
    }, [maxPlayersAllowed, playerNames]);

    const handleNameChange = (index, newName) => {
        const newNames = [...playerNames];
        newNames[index] = newName.trim();
        setPlayerNames(newNames);
    };

    const addPlayer = () => {
        if (playerNames.length < maxPlayersAllowed) {
            setPlayerNames([...playerNames, `Jugador ${playerNames.length + 1}`]);
        }
    };

    const removePlayer = () => {
        if (playerNames.length > MIN_PLAYERS) {
            setPlayerNames(playerNames.slice(0, -1));
        }
    };

    const handleRemoveAt = (index) => {
        if (playerNames.length <= MIN_PLAYERS) return;
        const newList = playerNames.filter((_, i) => i !== index);
        setPlayerNames(newList);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validNames = playerNames.filter(name => name.trim() !== '');
        
        if (validNames.length < MIN_PLAYERS) {
            alert(`Necesitas al menos ${MIN_PLAYERS} jugadores para empezar.`);
            return;
        }

        onStartGame(validNames, numDecks);
    };

    const deckOptions = [];
    for (let i = 1; i <= MAX_DECKS; i++) {
        deckOptions.push({ 
            value: i, 
            label: `${i} Baraja(s) (${i * 54} cartas, Máx. ${MAX_PLAYERS_PER_DECK[i]} Jug.)` 
        });
    }

    return (
        <div className="setup-page">
            <header className="header">
                <h1>Configuración de Partida</h1>
            </header>
            
            <form onSubmit={handleSubmit}>
                
                {/* Cantidad de Barajas */}
                <div className="form-group">
                    <label htmlFor="decks">⚙️ Cantidad de Barajas:</label>
                    <select 
                        id="decks" 
                        value={numDecks} 
                        onChange={(e) => setNumDecks(Number(e.target.value))}
                    >
                        {deckOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista de Jugadores */}
                <div className="players-list">
                    <h3>👥 Jugadores ({playerNames.length}/{maxPlayersAllowed})</h3>
                    {playerNames.map((name, index) => (
                        <div key={index} className="form-group player-input">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                                placeholder={`Nombre del Jugador ${index + 1}`}
                                required
                            />

                            {/* Botón para eliminar jugador individual */}
                            <button
                                type="button"
                                className="icon-btn remove"
                                onClick={() => handleRemoveAt(index)}
                                disabled={playerNames.length <= MIN_PLAYERS}
                                aria-label={`Eliminar jugador ${index + 1}`}
                                title={`Eliminar jugador ${index + 1}`}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>

                {/* Botones para Añadir/Quitar jugadores */}
                <div className="action-buttons">
                    <button 
                        type="button" 
                        onClick={addPlayer} 
                        disabled={playerNames.length >= maxPlayersAllowed}
                        className="icon-btn add"
                        aria-label="Añadir jugador"
                        title="Añadir jugador"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    <button 
                        type="button" 
                        onClick={removePlayer} 
                        disabled={playerNames.length <= MIN_PLAYERS}
                        className="icon-btn remove"
                        aria-label="Quitar último jugador"
                        title="Quitar último jugador"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Botón de Inicio y de Regreso */}
                <div className="footer" style={{ marginTop: '20px' }}>
                    <button type="submit" className="btn-primary">
                        ¡Iniciar la Ouija Drink!
                    </button>
                    <button 
                        type="button" 
                        onClick={onBack} 
                        className="btn-secondary"
                        style={{ marginTop: '10px' }}
                    >
                        ← Volver al Inicio
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PlayerSetup;