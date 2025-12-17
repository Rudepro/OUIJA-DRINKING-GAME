# Ouija — Drinking Game 🪄🥃

¡Bienvenido! Este repositorio contiene una versión de un juego de beber basado en cartas ("Ouija Drinking Game") implementado en **React** y empaquetado con **Vite**.

## 🔎 Descripción

- Juego de cartas para beber donde puedes configurar el número de jugadores y barajas (54 cartas por baraja).
- Reglas por carta, reparto aleatorio sin repeticiones y animación de extracción.
- Interfaz modular: componentes React en `src/components` y lógica de juego en `src/core`.

> Nota: Este repositorio está marcado como privado en `package.json`. Si deseas publicar una licencia, añade un archivo `LICENSE` en la raíz.

---

## 🚀 Demo / Capturas

![Landing](/public/img/landingpage.png)

---

## 🧰 Requisitos

- Node.js 18+ (recomendado)
- npm (o pnpm/yarn según prefieras)

## ⚙️ Instalación y desarrollo

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

3. Generar build de producción:

```bash
npm run build
```

4. Probar build (preview):

```bash
npm run preview
```

5. Linting:

```bash
npm run lint
```

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

## Contribuir 🛠️

Si quieres colaborar:

1. Haz fork del repositorio y crea una rama feature: `git checkout -b feature/nombre-feature`.
2. Asegúrate de que los cambios pasen el linter (`npm run lint`).
3. Abre un pull request contra `main` o `develop` (según flujo que usemos).

Para cambios grandes, abre un issue primero para discutir el diseño.

---

## ✅ Buenas prácticas y TODOs

- Añadir tests unitarios para `DeckFactory`, `Dealer` y `Rules`.
- Añadir workflows de CI en `.github/workflows` (por ejemplo, ejecutar `npm ci` y `npm run build`).
- Añadir un `LICENSE` si decides publicar el proyecto públicamente.

---

## 📦 Despliegue (GitHub Pages)

Este repositorio incluye un workflow que construye y despliega automáticamente a la rama `gh-pages` cuando se hace push a `develop`.

Pasos y notas:

1. La configuración de Vite tiene `base: '/ouija-drinking-game/'`, lo que asegura que los assets se resuelvan correctamente en la URL del sitio de proyecto: `https://rudepro.github.io/ouija-drinking-game/`.

2. El workflow se ejecuta en pushes a `develop` y publica la carpeta `dist/` en la rama `gh-pages`.

3. En la configuración del repositorio (Settings → Pages), selecciona la rama `gh-pages` y la carpeta `/ (root)` como origen del sitio.

4. Tras la primera ejecución del workflow, el sitio estará disponible en `https://rudepro.github.io/ouija-drinking-game/`.

Si prefieres desplegar en otra rama o usar otra estrategia (por ejemplo `docs/` en `main`), puedo ajustarlo.

---

## 📬 Contacto

Si tienes preguntas o sugerencias, abre un issue o contacta al owner: **Rudepro** (GitHub).

---

Gracias por contribuir y divertirte con el proyecto. ¡Salud! 🥂
