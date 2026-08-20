const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K'];
const SUITS = ['H', 'D', 'C', 'S'];

export const createSingleDeck = () => {
    const deck = [];

    for (const suit of SUITS) {
        for (const value of VALUES) {
            deck.push({
                value: value,
                suit: suit,
                color: (suit === 'H' || suit === 'D') ? 'red' : 'black',
                isJoker: false,
                id: `${value}${suit}`
            });
        }
    }

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