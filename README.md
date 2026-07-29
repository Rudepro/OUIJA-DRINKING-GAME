# Ouija — Drinking Game 🪄🥃
¡Bienvenido! Este repositorio contiene una versión de un juego de beber basado en cartas ("Ouija Drinking Game") implementado en **React** y empaquetado con **Vite**.

![Landing](/public/img/landingpage.png)

---



## 🔎 Descripción

- Juego de cartas para beber donde puedes configurar el número de jugadores y barajas (54 cartas por baraja).
- Reglas por carta, reparto aleatorio sin repeticiones y animación de extracción.
- Interfaz modular: componentes React en `src/components` y lógica de juego en `src/core`.

> Nota: Este repositorio está marcado como privado en `package.json`. Si deseas publicar una licencia, añade un archivo `LICENSE` en la raíz.

---

## 🎮 Cómo jugar (resumen rápido)

1. En la pantalla de configuración (`Player Setup`) añade los nombres de los jugadores.
2. Selecciona la cantidad de barajas (cada baraja = 54 cartas).
3. Pulsa **Iniciar partida**. Se muestra el mazo (placeholder) y al sacar se anima la carta real.
4. La aplicación aplica la regla correspondiente a la carta sacada (según `src/core/Rules.js`).

---

## 🧩 Estructura del proyecto

- `src/`
  - `components/` — componentes React (LandingPage, PlayerSetup, GameBoard, Card, ...)
  - `core/` — lógica del juego (Dealer, DeckFactory, Rules)
  - `styles/` — CSS modular
  - `main.jsx`, `App.jsx`
- `public/img/` — imágenes del juego (placeholders de cartas, landing page)
- `package.json` — scripts y dependencias

---

## 📦 Despliegue (GitHub Pages)

Este repositorio incluye un workflow que construye y despliega automáticamente a la rama `gh-pages` cuando se hace push a `develop`.

Pasos y notas:

1. La configuración de Vite tiene `base: '/OUIJA-DRINKING-GAME/'`, lo que asegura que los assets se resuelvan correctamente en la URL del sitio de proyecto: `https://rudepro.github.io/OUIJA-DRINKING-GAME/`.

2. El workflow se ejecuta en pushes a `develop` y publica la carpeta `dist/` en la rama `gh-pages`.

3. En la configuración del repositorio (Settings → Pages), selecciona la rama `gh-pages` y la carpeta `/ (root)` como origen del sitio.

4. Tras la primera ejecución del workflow, el sitio estará disponible en `https://rudepro.github.io/OUIJA-DRINKING-GAME/`.

Si prefieres desplegar en otra rama o usar otra estrategia (por ejemplo `docs/` en `main`), puedo ajustarlo.

---

Gracias por contribuir y divertirte con el proyecto. ¡Salud! 🥂
