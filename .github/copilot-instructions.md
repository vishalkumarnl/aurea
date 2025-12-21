# Copilot Instructions — Aurea (React + Redux)

## Quick context
- This is a Create React App project (see root `README.md`). Run with `npm start`, build with `npm run build`, and run tests with `npm test`.
- Frontend expects a backend on `http://localhost:8080` and **cookies-based auth** (see `/auth/*`). Many behaviors assume the backend sets cookies correctly (SameSite, secure in prod).

## Big-picture architecture (what to know first)
- UI: React (v19) + CSS files and occasional CSS modules (`*.module.css`). Uses MUI + styled-components for components.
- State: Redux + slices. `src/store/store.js` enables `redux-persist` (session storage) and attaches custom middleware.
- API: Two patterns:
  - Centralized: `apiCallMiddleware` (src/store/middleware/apicall.middleware.js) maps action types to network calls via `src/redux/apiConfig.js`.
  - Direct calls: `src/api/axios.js` exported `api` instance used in components (e.g., `src/app/index.js` requests sizes/colors).
- Auth: `src/api/axios.js` sets `withCredentials: true` and implements a refresh flow that hits `POST /auth/refresh` on 401/403.
- Cart: Local cart kept in `localStorage` under key `my_items` and synced across tabs using BroadcastChannel (see `src/context/itemsContext.js`). On login, local cart may be merged via `addLocalToRemoteCart`.
- Imports: `jsconfig.json` sets `baseUrl: "src"` so code uses absolute imports like `api/axios` and `screens/checkout`.

## Project-specific developer patterns (how to change things here)
- Add a new API-backed action:
  1. Add action type in `src/redux/actionTypes.js`.
  2. Add an action creator in `src/redux/actionCreators.js` using `createAction`.
  3. Add an entry in `src/redux/apiConfig.js` with `buildRequest`, `successHandler`, `failureHandler`.
  4. Dispatch the action (component or effect) — `apiCallMiddleware` will handle the HTTP call.

- Prefer `apiCallMiddleware` when you want shared behavior (success handlers, consistent flow). Direct `api.get/post` is used for one-off simple requests (e.g., fetching sizes/colors in `src/app/index.js`). Both patterns exist — keep consistency within a feature.

- Auth flow specifics:
  - `src/api/axios.js` uses cookie auth + an interceptor that attempts `POST /auth/refresh` on 401/403.
  - `AuthProvider` dispatches `getUserData()` on app mount (src/context/authContext.js). Keep this in mind when changing login/logout behavior.

- Cart synchronization:
  - The local key is `my_items` and sync uses `BroadcastChannel` name `shared_items_channel`.
  - On login, `addLocalToRemoteCart` (triggered by login flow) will call server to merge carts.

## Debugging & local dev notes 🔧
- Backend required to exercise auth & cart flows: run backend at `http://localhost:8080`.
- Token refresh logic is implemented in `src/api/axios.js` — to reproduce multi-tab refresh race cases, open multiple tabs or simulate 401 responses.
- Redux persistence: `redux-persist` uses sessionStorage; logged-in state and product slice survive reloads. When debugging state restore, check `src/store/store.js`.
- Network calls in `apiCallMiddleware` currently build full URL using `rootUrl = "http://localhost:8080"` directly; you may want to prefer the single axios baseURL in `src/api/axios.js` if centralizing the base URL.

## Codebase conventions & quick rules ✅
- Use absolute imports rooted at `src/` (e.g., `import api from "api/axios"`).
- For shared logic touching global state, prefer Redux actions + `apiConfig` handlers so side-effects and follow-up actions are explicit.
- Persist only small, safe slices (current project whitelists `userData` and `product`) — follow `src/store/store.js` for guidelines.

## Files to inspect for context (quick links)
- API + auth: `src/api/axios.js`
- API mapping: `src/redux/apiConfig.js`
- Action types/creators: `src/redux/actionTypes.js`, `src/redux/actionCreators.js`
- Middleware: `src/store/middleware/apicall.middleware.js`, `logger.middleware.js`
- Cart & sync: `src/context/itemsContext.js`
- Auth flow & login hooks: `src/context/authContext.js`
- App entry and routes: `src/app/index.js`

---
If anything above is unclear or you'd like me to expand specific examples (e.g., a short recipe for adding an endpoint or a small refactor to centralize base URL), I can iterate on this file.