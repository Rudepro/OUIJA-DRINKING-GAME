export const shuffleDeck = (deck) => {
    let shuffledDeck = [...deck];
    let currentIndex = shuffledDeck.length;
    let randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [shuffledDeck[currentIndex], shuffledDeck[randomIndex]] = [
            shuffledDeck[randomIndex], shuffledDeck[currentIndex]
        ];
    }

    return shuffledDeck;
};

export const drawCard = (deck) => {
    if (deck.length === 0) {
        return { card: null, remainingDeck: [] };
    }
    
    const card = deck[0];
    const remainingDeck = deck.slice(1);
    
    return { card, remainingDeck };
};