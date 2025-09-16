# Dynamic Kanban Board (Core JavaScript)

A modular vanilla JS Kanban app with:
- Task creation (title + description) → added to **To Do**
- Three columns: **To Do**, **In Progress**, **Done**
- Drag & drop between columns (HTML5 DnD)
- Persistence via `localStorage` (survives refresh)

## Live Demo
https://zeelpatel0902.github.io/dynamic-kanban-core-js/

## Project Structure
- `index.html` – layout + script includes (no ES modules)
- `style.css` – styling for layout, columns, cards
- `js/`
  - `storage.js` – localStorage wrapper (`saveTasks`, `loadTasks`)
  - `dom.js` – tiny DOM utilities (`qs`, `qsa`, `createEl`)
  - `state.js` – single source of truth (`init`, `add`, `move`, `listBy`, `save`)
  - `render.js` – renders columns/cards from State
  - `dnd.js` – drag & drop handlers + highlighting
  - `events.js` – form submit + keyboard add; rebind DnD after render
  - `main.js` – bootstraps app (init → render → events → dnd)

## Run Locally
Use a local server:
- VS Code → **Live Server** (right-click `index.html` → Open with Live Server)  
- Or: `python -m http.server 8000` → open http://localhost:8000


