// src/core/Dealer.js

/**
 * Baraja un array de cartas usando el algoritmo Fisher-Yates.
 * @param {Array<Object>} deck El mazo a barajar.
 * @returns {Array<Object>} El mazo barajado.
 */
export const shuffleDeck = (deck) => {
    // Crear una copia para no mutar el mazo original
    let shuffledDeck = [...deck];
    let currentIndex = shuffledDeck.length;
    let randomIndex;

    // Mientras queden elementos por barajar
    while (currentIndex !== 0) {
        // Elegir un elemento restante
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // E intercambiarlo con el elemento actual
        [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
            shuffledDeck[randomIndex], shuffledDeck[currentIndex]
        ];
    }

    return shuffledDeck;
};

/**
 * Saca la primera carta del mazo.
 * @param {Array<Object>} deck El mazo actual.
 * @returns {{ card: Object | null, remainingDeck: Array<Object> }}
 */
export const drawCard = (deck) => {
    if (deck.length === 0) {
        return { card: null, remainingDeck: [] };
    }
    
    // Extrae la primera carta (Draw from the top)
    const card = deck[0];
    const remainingDeck = deck.slice(1); // El resto del mazo
    
    return { card, remainingDeck };
};