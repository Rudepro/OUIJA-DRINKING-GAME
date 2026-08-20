export const ACTIONS = {
    DERECHA: 'DERECHA',
    IZQUIERDA: 'IZQUIERDA',
    TOMAR: 'TOMAR',
    PONER: 'PONER',
    MANDAR: 'MANDAR',
};

const RULES = {
    'A': { type: ACTIONS.DERECHA, text: "As de Derecha. El jugador a tu derecha bebe." },
    '2': { type: ACTIONS.TOMAR, text: "Dos de Tomar. Debes beber del vaso del centro." },
    '3': { type: ACTIONS.PONER, text: "Tres de Poner. Sirve bebida al vaso central." },
    '4': { type: ACTIONS.MANDAR, text: "Cuatro de Mandar. Elige a un jugador para que beba." },
    '5': { type: ACTIONS.IZQUIERDA, text: "Cinco de Izquierda. El jugador a tu izquierda bebe." },
    '6': { type: ACTIONS.DERECHA, text: "Seis de Derecha. El jugador a tu derecha bebe." },
    '7': { type: ACTIONS.TOMAR, text: "Siete de Tomar. Debes beber del vaso del centro." },
    '8': { type: ACTIONS.PONER, text: "Ocho de Poner. Sirve bebida al vaso central." },
    '9': { type: ACTIONS.MANDAR, text: "Nueve de Mandar. Elige a un jugador para que beba." },
    'T': { type: ACTIONS.IZQUIERDA, text: "Diez de Izquierda. El jugador a tu izquierda bebe." },
    'J': { type: ACTIONS.TOMAR, text: "Jota de Tomar. Debes beber del vaso del centro." },
    'Q': { type: ACTIONS.PONER, text: "Reina de Poner. Sirve bebida al vaso central." },
    'K': { type: ACTIONS.MANDAR, text: "Rey de Mandar. Elige a un jugador para que beba." },
    'JR': { type: ACTIONS.IZQUIERDA, text: "JOKER ROJO. El jugador de tu izquierda bebe." },
    'JN': { type: ACTIONS.DERECHA, text: "JOKER NEGRO. El jugador de tu derecha bebe." },
};

export const getCardRule = (card) => {
    if (!card) return { type: ACTIONS.MANDAR, text: 'Carta inválida.' };

    if (card.isJoker) {
        return card.color === 'red' ? RULES['JR'] : RULES['JN'];
    }

    let key = null;
    if (card.id && typeof card.id === 'string') {
        key = card.id[0];
    } else if (card.value) {
        key = (card.value === '10') ? 'T' : card.value;
    }

    if (key && RULES[key]) return RULES[key];

    return { type: ACTIONS.MANDAR, text: 'Regla no definida para esta carta.' };
};