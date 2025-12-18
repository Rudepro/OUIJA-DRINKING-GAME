// src/components/Card.jsx
import React, { useState } from 'react';

// Función para mapear objeto de carta a nombre de archivo
const getCardImageName = (card) => {
    if (!card) return '';

    // Si el deck ya provee un id (ej. 'AC', '7C', 'JR') usarlo directamente
    if (card.id) return String(card.id).toUpperCase();

    if (card.isJoker) {
        return card.color === 'red' ? 'JR' : 'JN';
    }

    let valueMap = card.value;
    if (card.value === '10') valueMap = 'T'; // La mayoría de sets usan 'T' para 10

    // Permitir tanto nombres completos ('hearts') como letras ('H')
    let suitMap = '';
    if (typeof card.suit === 'string') {
        const s = card.suit.toLowerCase();
        if (s === 'hearts' || s === 'h') suitMap = 'H';
        else if (s === 'diamonds' || s === 'd') suitMap = 'D';
        else if (s === 'clubs' || s === 'c') suitMap = 'C';
        else if (s === 'spades' || s === 's') suitMap = 'S';
    }

    return `${String(valueMap).toUpperCase()}${suitMap}`;
};

const Card = ({ card }) => {
    if (!card) return null;

    const imageName = getCardImageName(card);
    const pngPath = `/img/${imageName}.png`;
    const svgPath = `/img/${imageName}.svg`;
    const fallback = '/img/placeholder.png';
    // Preferir SVG primero (opción elegida)
    const [src, setSrc] = useState(svgPath);

    // Texto alternativo en español para accesibilidad
    const suitNames = { H: 'corazones', D: 'diamantes', C: 'tréboles', S: 'espadas' };
    let altText = '';
    if (card.isJoker) {
        altText = card.color === 'red' ? 'Joker rojo' : 'Joker negro';
    } else {
        const valueText = (card.value === 'T' || imageName.startsWith('T')) ? '10' : (card.value || imageName[0]);
        const suitKey = (card.suit && String(card.suit).toUpperCase()) || imageName[1];
        altText = `${valueText} de ${suitNames[suitKey] || suitKey}`;
    }

    return (
        <div className="card-image-container">
            <img
                src={src}
                alt={altText}
                className="card-image"
                onError={(e) => {
                    // Si falla .svg, intentar .png; si falla .png usar placeholder
                    if (src.endsWith('.svg')) {
                        setSrc(pngPath);
                        e.target.onerror = null;
                    } else {
                        setSrc(fallback);
                        e.target.onerror = null;
                    }
                }}
            />
        </div>
    );
};

export default Card;