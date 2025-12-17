// src/core/DeckFactory.js

// Usamos las iniciales de valor y pinta para mapear directamente a las imágenes
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']; // 'T' para 10
const SUITS = ['H', 'D', 'C', 'S']; // H=Hearts, D=Diamonds, C=Clubs, S=Spades

/**
 * Crea una baraja estándar de 54 cartas (incluye 2 jokers).
 * @param {number} numDecks Número de barajas a crear (ej: 1, 2, 4)
 * @returns {Array<Object>} Un array de objetos de carta.
 */
export const createSingleDeck = () => {
    const deck = [];

    // 1. Cartas Normales (52)
    for (const suit of SUITS) {
        for (const value of VALUES) {
            deck.push({
                value: value,
                suit: suit,
                color: (suit === 'H' || suit === 'D') ? 'red' : 'black',
                isJoker: false,
                id: `${value}${suit}` // ID único para el mapeo de imágenes
            });
        }
    }

    // 2. Jokers (2)
    deck.push({ value: 'JOKER', color: 'red', isJoker: true, id: 'JR' });
    deck.push({ value: 'JOKER', color: 'black', isJoker: true, id: 'JN' });

    return deck;
};


export const createGameDeck = (numDecks = 1) => {
    let finalDeck = [];
    for (let i = 0; i < numDecks; i++) {
        finalDeck = finalDeck.concat(createSingleDeck());
    }
    return finalDeck;
};