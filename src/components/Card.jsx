import React, { useState } from 'react';

const getCardImageName = (card) => {
    if (!card) return '';

    if (card.id) return String(card.id).toUpperCase();

    if (card.isJoker) {
        return card.color === 'red' ? 'JR' : 'JN';
    }

    let valueMap = card.value;
    if (card.value === '10') valueMap = 'T';

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
    const [src, setSrc] = useState(svgPath);

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