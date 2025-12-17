// src/core/Rules.js

// Acciones principales (usadas para el estilo del mensaje)
export const ACTIONS = {
    DERECHA: 'DERECHA',  // Vecino de la Derecha Bebe
    IZQUIERDA: 'IZQUIERDA', // Vecino de la Izquierda Bebe
    TOMAR: 'TOMAR',      // Jugador Actual Bebe del Centro
    PONER: 'PONER',      // Jugador Actual Pone en el Centro
    MANDAR: 'MANDAR',  // Jugador Actual Manda a Otro Beber
};
// 
// Reglas mapeadas al valor de la carta (Usamos 'T' para 10)
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
    
    // Reglas para Jokers
    'JR': { type: ACTIONS.IZQUIERDA, text: "JOKER ROJO. El jugador de tu izquierda bebe." },
    'JN': { type: ACTIONS.DERECHA, text: "JOKER NEGRO. El jugador de tu derecha bebe." },
};

/**
 * Obtiene la regla completa para una carta dada.
 * @param {Object} card Objeto de carta con value, suit, etc.
 * @returns {Object} Regla (type y text).
 */
export const getCardRule = (card) => {
    // Si no hay carta (null), devolver una regla por defecto
    if (!card) return { type: ACTIONS.MANDAR, text: 'Carta inválida.' };

    // Si es un Joker, mapeamos por el ID del Joker
    if (card.isJoker) {
        return card.color === 'red' ? RULES['JR'] : RULES['JN'];
    }

    // Intentar obtener la clave usando el id (ej. 'AC' -> 'A') o el value directo
    let key = null;
    if (card.id && typeof card.id === 'string') {
        key = card.id[0];
    } else if (card.value) {
        key = (card.value === '10') ? 'T' : card.value;
    }

    if (key && RULES[key]) return RULES[key];

    // Si no encontramos una regla, devolver una por defecto
    return { type: ACTIONS.MANDAR, text: 'Regla no definida para esta carta.' };
};