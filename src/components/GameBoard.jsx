// src/components/GameBoard.jsx (VERSIÓN FUNCIONAL)
import React, { useState, useCallback } from 'react';
import { drawCard } from '../core/Dealer';
import { getCardRule, ACTIONS } from '../core/Rules';
import Card from './Card'; // Lo crearemos en breve

// Iconos para la interfaz
const ICONS = {
    DERECHA: '👉',
    IZQUIERDA: '👈',
    TOMAR: '🥂',
    PONER: '💧',
    MANDAR: '✨',
    FIN: '✅',
};

const GameBoard = ({ initialDeck, players, onGameOver, onBackToSetup }) => {
    // Estado del juego
    const [deck, setDeck] = useState(initialDeck);
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
    const [lastDrawnCard, setLastDrawnCard] = useState(null);
    const [actionMessage, setActionMessage] = useState('Pulsa el mazo para empezar.');
    const [targetPlayer, setTargetPlayer] = useState(null); // El jugador afectado por la regla

    // Estados para animación de extracción
    const [isAnimating, setIsAnimating] = useState(false);
    const [animatedSrc, setAnimatedSrc] = useState('/img/placeholder.png');
    const [animatedCard, setAnimatedCard] = useState(null);
    const animationDuration = 900; // ms (ajustable)

    const currentPlayer = players[currentTurnIndex];
    const cardsRemaining = deck.length;

    /**
     * Calcula quién es el jugador afectado (derecha o izquierda)
     */
    const calculateTarget = useCallback((actionType) => {
        const numPlayers = players.length;
        let targetIndex;

        if (actionType === ACTIONS.DERECHA) {
            // (índice actual + 1) Módulo numPlayers. Si es el último, vuelve al 0
            targetIndex = (currentTurnIndex + 1) % numPlayers; 
        } else if (actionType === ACTIONS.IZQUIERDA) {
            // (índice actual - 1 + numPlayers) Módulo numPlayers. Si es el primero (0), va al último.
            targetIndex = (currentTurnIndex - 1 + numPlayers) % numPlayers; 
        } else {
            // Si es TOMAR, PONER o SALVADO, el objetivo es el jugador actual
            return currentPlayer;
        }

        return players[targetIndex];
    }, [currentTurnIndex, players, currentPlayer]);

    // Helper para obtener nombre de imagen de la carta (similar a Card.jsx)
    const getImageName = (card) => {
        if (!card) return '';
        if (card.id) return card.id;
        if (card.isJoker) return card.color === 'red' ? 'JR' : 'JN';
        let value = card.value === '10' ? 'T' : card.value;
        let suit = '';
        if (typeof card.suit === 'string') {
            const s = card.suit.toLowerCase();
            if (s === 'hearts' || s === 'h') suit = 'H';
            else if (s === 'diamonds' || s === 'd') suit = 'D';
            else if (s === 'clubs' || s === 'c') suit = 'C';
            else if (s === 'spades' || s === 's') suit = 'S';
        }
        return `${value}${suit}`;
    };

    /**
     * Lógica principal: Extraer una carta y aplicar la regla.
     */
    const handleDrawCard = () => {
        if (cardsRemaining === 0 || isAnimating) {
            if (cardsRemaining === 0) {
                setActionMessage('Mazo agotado. ¡Fin de la partida!');
                setLastDrawnCard(null);
                setTargetPlayer(null);
            }
            return;
        }

        // 1. Sacar la carta (eliminación lógica inmediata para evitar repeticiones)
        const { card, remainingDeck } = drawCard(deck);
        setDeck(remainingDeck);

        // 2. Preparar animación
        const imageName = getImageName(card);
        const svgPath = `/img/${imageName}.svg`;
        const backPath = '/img/placeholder.png';

        setAnimatedCard(card);
        setAnimatedSrc(backPath);
        setIsAnimating(true);
        setActionMessage('Sacando carta...');

        // 3. A mitad de animación, revelar la carta (cambiar la imagen)
        setTimeout(() => {
            setAnimatedSrc(svgPath);
        }, animationDuration / 2);

        // 4. Al final de la animación, fijar la carta y aplicar reglas
        setTimeout(() => {
            setIsAnimating(false);
            setLastDrawnCard(card);

            const rule = getCardRule(card);
            const target = calculateTarget(rule.type);
            setTargetPlayer(target);

            let message = '';
            let icon = ICONS[rule.type];

            if (rule.type === ACTIONS.TOMAR || rule.type === ACTIONS.PONER) {
                message = `${icon} ${currentPlayer.name}: ${rule.text}`;
            } else if (rule.type === ACTIONS.DERECHA || rule.type === ACTIONS.IZQUIERDA) {
                message = `${icon} ${currentPlayer.name}: ${rule.text}`;
            } else if (rule.type === ACTIONS.MANDAR) {
                message = `${icon} ${currentPlayer.name}: ${rule.text}`;
            }

            setActionMessage(message);

            // Pasar al siguiente turno (solo si quedan cartas)
            if (remainingDeck.length > 0) {
                setCurrentTurnIndex((prevIndex) => (prevIndex + 1) % players.length);
            }
        }, animationDuration + 40);
    };

    // Determina el color de fondo del mensaje
    const getActionClass = () => {
        if (!lastDrawnCard) return 'msg-initial';
        const ruleType = getCardRule(lastDrawnCard).type;
        switch (ruleType) {
            case ACTIONS.TOMAR: return 'msg-danger';
            case ACTIONS.PONER: return 'msg-warning';
            case ACTIONS.DERECHA: return 'msg-info';
            case ACTIONS.IZQUIERDA: return 'msg-info';
            case ACTIONS.MANDAR: return 'msg-info';
        }
    }


    return (
        <div className="game-board-container">
            <header className="game-header">
                <h2>Turno de: 🍻 {currentPlayer.name}</h2>
                <p>Cartas restantes: {cardsRemaining}</p>
            </header>

            {/* Zona de Mensaje y Acción */}
            <div className={`action-message ${getActionClass()}`}>
                <p>{actionMessage}</p>
            </div>

            {/* Visualización de la Última Carta */}
            <div className="card-display">
                {/* Si está en animación, mostramos el elemento animado que simula sacar y voltear la carta */}
                {isAnimating ? (
                    <div className="card-animator">
                        <img src={animatedSrc} alt="Carta en animación" className="card-image animating-draw" />
                    </div>
                ) : (
                    // Si hay carta ya sacada, mostrarla, si no, placeholder
                    lastDrawnCard ? (
                        <Card card={lastDrawnCard} />
                    ) : (
                        <div className="card-placeholder">
                            {cardsRemaining > 0 ? (
                                <img src="/img/placeholder.png" alt="Mazo en espera" className="card-image placeholder" />
                            ) : (
                                <div className="card-empty">Mazo vacío</div>
                            )}
                        </div>
                    )
                )}
            </div>

            {/* Mazo (Botón de Acción) */}
            <button 
                className="deck-button btn-primary"
                onClick={handleDrawCard}
                disabled={cardsRemaining === 0 || isAnimating}
            >
                {cardsRemaining > 0 ? `Sacar Carta (${cardsRemaining})` : `Juego Terminado ${ICONS.FIN}`}
            </button>
            
            {/* Controles de Jugadores y Fin */}
            <footer className="game-footer">
                <div className="player-list-summary">
                    Jugadores: {players.map(p => 
                        <span 
                            key={p.id} 
                            className={`player-tag ${p.id === currentPlayer.id ? 'current' : ''} ${targetPlayer && p.id === targetPlayer.id ? 'target' : ''}`}
                        >
                            {p.name}
                        </span>
                    )}
                </div>
                
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '15px' }}>
                    <button
                        onClick={onBackToSetup}
                        className="btn-secondary"
                        title="Volver a configuración"
                    >
                        ← Volver a Configuración
                    </button>

                    <button 
                        onClick={onGameOver} 
                        className="btn-secondary"
                    >
                        Reiniciar Partida
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default GameBoard;