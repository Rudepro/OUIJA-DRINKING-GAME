import React from 'react';

const LandingPage = React.memo(({ onStartSetup }) => {

  return (
    <div className="landing-page">
      <header className="header landing-hero" role="banner" aria-label="Landing hero">
        <div className="landing-hero-overlay">
          <h1> Ouija Drink (OD) </h1>
          <h2>La manera de hablar con los muertos en la Fiesta</h2>
          <p className="hero-cta">Un juego justo, aleatorio y perfecto para tomar. Crea una ronda y diviértanse.</p>
        </div>
      </header>

      <section className="purpose">
        <h3>¿Para qué sirve este sistema?</h3>
        <p>
          En lugar de discutir quién debe beber, el mazo se convierte en nuestro <b>Oráculo de la Bebida</b>, decidiendo de forma imparcial (y aleatoria) las órdenes del turno.
        </p>
        <p>
          Este juego es una adaptación digital del popular juego de beber basado en cartas, garantizando que el mazo completo y sus reglas se usen correctamente. <b>No más trampas, solo suerte.</b>
        </p>
      </section>

      <section className="rules-summary">
        <h3>Reglas Clave (En Resumen)</h3>
        <ul>
          <li><b>Derecha (A, 6, Joker N):</b> El jugador de tu derecha bebe.</li>
          <li><b>Izquierda (5, 10, Joker R):</b> El jugador de tu izquierda bebe.</li>
          <li><b>Tomar (2, 7, J):</b> Tú bebes del vaso del centro.</li>
          <li><b>Poner (3, 8, Q):</b> Tú sirves bebida en el vaso del centro.</li>
          <li><b>Mandas (4, 9, K):</b> Tú mandas a otro jugador a beber.</li>
        </ul>
      </section>

      <footer className="footer">
        <button 
          className="btn-primary" 
          onClick={onStartSetup}
        >
          ¡Comenzar Juego!
        </button>
      </footer>
    </div>
  );
});

export default LandingPage;