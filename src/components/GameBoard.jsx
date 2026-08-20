import React, { useState, useCallback } from 'react';
import { drawCard } from '../core/Dealer';
import { getCardRule, ACTIONS } from '../core/Rules';
import Card from './Card';

const ICONS = {
    DERECHA: '👉',
    IZQUIERDA: '👈',
    TOMAR: '🥂',
    PONER: '💧',
    MANDAR: '✨',
    FIN: '✅',
};

const GameBoard = ({ initialDeck, players, onGameOver, onBackToSetup }) => {
    const [deck, setDeck] = useState(initialDeck);
    const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
    const [lastDrawnCard, setLastDrawnCard] = useState(null);
    const [actionMessage, setActionMessage] = useState('Pulsa el mazo para empezar.');
    const [targetPlayer, setTargetPlayer] = useState(null);

    const [isAnimating, setIsAnimating] = useState(false);
    const basePath = import.meta.env.BASE_URL;
    const [animatedSrc, setAnimatedSrc] = useState(`${basePath}img/placeholder.png`);
    const [animatedCard, setAnimatedCard] = useState(null);
    const animationDuration = 900;

    const currentPlayer = players[currentTurnIndex];
    const cardsRemaining = deck.length;

    const calculateTarget = useCallback((actionType) => {
        const numPlayers = players.length;
        let targetIndex;

        if (actionType === ACTIONS.DERECHA) {
            targetIndex = (currentTurnIndex + 1) % numPlayers;
        } else if (actionType === ACTIONS.IZQUIERDA) {
            targetIndex = (currentTurnIndex - 1 + numPlayers) % numPlayers;
        } else {
            return currentPlayer;
        }

        return players[targetIndex];
    }, [currentTurnIndex, players, currentPlayer]);

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

    const handleDrawCard = () => {
        if (cardsRemaining === 0 || isAnimating) {
            if (cardsRemaining === 0) {
                setActionMessage('Mazo agotado. ¡Fin de la partida!');
                setLastDrawnCard(null);
                setTargetPlayer(null);
            }
            return;
        }

        const { card, remainingDeck } = drawCard(deck);
        setDeck(remainingDeck);

        const imageName = getImageName(card);
        const svgPath = `${basePath}img/${imageName}.svg`;
        const backPath = `${basePath}img/placeholder.png`;

        setAnimatedCard(card);
        setAnimatedSrc(backPath);
        setIsAnimating(true);
        setActionMessage('Sacando carta...');

        setTimeout(() => {
            setAnimatedSrc(svgPath);
        }, animationDuration / 2);

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

            if (remainingDeck.length > 0) {
                setCurrentTurnIndex((prevIndex) => (prevIndex + 1) % players.length);
            }
        }, animationDuration + 40);
    };

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

            <div className={`action-message ${getActionClass()}`}>
                <p>{actionMessage}</p>
            </div>

            <div className="card-display">
                {isAnimating ? (
                    <div className="card-animator">
                        <img src={animatedSrc} alt="Carta en animación" className="card-image animating-draw" />
                    </div>
                ) : (
                    lastDrawnCard ? (
                        <Card card={lastDrawnCard} />
                    ) : (
                        <div className="card-placeholder">
                            {cardsRemaining > 0 ? (
                                <img src={`${basePath}img/placeholder.png`} alt="Mazo en espera" className="card-image placeholder" />
                            ) : (
                                <div className="card-empty">Mazo vacío</div>
                            )}
                        </div>
                    )
                )}
            </div>

            <button 
                className="deck-button btn-primary"
                onClick={handleDrawCard}
                disabled={cardsRemaining === 0 || isAnimating}
            >
                {cardsRemaining > 0 ? `Sacar Carta (${cardsRemaining})` : `Juego Terminado ${ICONS.FIN}`}
            </button>
            
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