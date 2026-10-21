# Photo Gallery Web App — Celebrare Frontend React Internship Assessment

A polished, modern, responsive Photo Gallery web application built with **React**, **Vite**, and **Tailwind CSS**. Fetches 30 photos on load from the Picsum Photos API, provides instant real-time author search filtering, and persists favorited photos across browser sessions using `useReducer` and `localStorage`.

---

## 🛠️ Technology Stack

- **React 18** (Functional components with hooks only)
- **Vite** (Next generation frontend build tooling)
- **Tailwind CSS** (Utility-first CSS for all styling and responsive grid layouts)
- **React Hooks**: `useState`, `useEffect`, `useReducer`, `useCallback`, `useMemo`
- **Native Fetch API** & **Browser `localStorage`**
- **Lucide React** (Minimal, clean SVG icons for search and heart buttons)

---

## 🌐 API Endpoint

```
https://picsum.photos/v2/list?limit=30
```
- Fetches 30 photos on initial component load.
- Images render using `download_url` and author names using `author`.

---

## 🚀 Local Installation & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher)

### Steps to Run Locally

1. **Navigate to the project root:**
   ```bash
   cd <project-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173/` (or the URL shown in terminal).

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Professional header with title and subtitle
│   ├── SearchBar.jsx       # Controlled real-time search input
│   ├── PhotoCard.jsx       # Card displaying photo, author name, & favorite heart toggle
│   └── PhotoGrid.jsx       # 1/2/4 column responsive grid with spinner, error, & empty state
├── hooks/
│   ├── useFetchPhotos.js    # Custom hook fetching 30 photos with AbortController cleanup
│   └── useFavorites.js      # Custom hook managing favorites with useReducer & localStorage sync
├── reducers/
│   └── favoritesReducer.js  # Pure reducer handling TOGGLE_FAVORITE with duplicate prevention
├── App.jsx                 # Top-level container integrating hooks, useCallback, and useMemo
├── main.jsx                # React 18 createRoot mount
└── index.css               # Tailwind CSS directives
```

---

## 📋 Core Assignment Features

1. **Project Setup**:
   - Built with React, Vite, and Tailwind CSS.
   - Zero UI component libraries (no MUI, Bootstrap, or Ant Design).
   - Strict functional components with hooks.

2. **API Data Fetching (`useFetchPhotos`)**:
   - Custom hook returning `{ photos, loading, error, retry }`.
   - Uses `useEffect` with native `fetch`.
   - Displays a loading spinner and skeleton cards while fetching.
   - Graceful error boundary UI with an interactive retry button.
   - Uses `AbortController` to cancel in-flight network requests on unmount.

3. **Responsive Grid Layout**:
   - **Mobile** (`< 768px`): Exactly 1 column (`grid-cols-1`).
   - **Tablet** (`768px – 1023px`): Exactly 2 columns (`md:grid-cols-2`).
   - **Desktop** (`≥ 1024px`): Exactly 4 columns (`lg:grid-cols-4`).

4. **Real-Time Search Filter**:
   - Controlled input filtering already-fetched photos by author name.
   - Case-insensitive search without triggering any network requests or page reloads.
   - Shows a friendly empty state message when no authors match the query.

5. **Favorites State Management (`useReducer` + `localStorage`)**:
   - Managed strictly via `useReducer` in `favoritesReducer.js` (no `useState` for favorites).
   - Uses the stable Picsum photo `id` as identifier.
   - Prevents duplicate IDs on addition/toggle.
   - Restores saved favorites on initial load via lazy initializer.
   - Automatically synchronizes updates to `localStorage` across page refreshes.

6. **Performance Optimization (`useCallback` & `useMemo`)**:
   - `useCallback` on the search input handler (`handleSearchChange`) to preserve reference stability.
   - `useMemo` on `filteredPhotos` to avoid unnecessary array filtering on unrelated component renders.

---

## 💡 Technical Concepts for Evaluation

### 1. `useFetchPhotos`
Encapsulates data fetching logic away from UI components. It returns `photos`, `loading`, and `error`. It leverages `AbortController` so that if the component unmounts while the request is pending, the request is cleanly aborted to prevent memory leaks and state updates on unmounted components.

### 2. `useReducer` & `localStorage`
Centralizes state mutations inside a pure reducer function `favoritesReducer(state, action)`. When toggling a favorite, the reducer checks if the photo ID exists; if so, it filters it out; if not, it returns a new array with the ID appended. This prevents duplicate IDs and enforces immutable updates. On mount, `getInitialFavorites()` reads `localStorage` before the first paint, and a reactive `useEffect` writes to `localStorage` on any state update.

### 3. `useCallback` vs. `useMemo`
- **`useCallback`** memoizes the callback function itself (`handleSearchChange`), ensuring child components don't receive new function instances on re-renders.
- **`useMemo`** memoizes the computed value of the filtered photo list, ensuring the `.filter()` operation only runs when `photos` or `searchQuery` actually changes.

---

## 📄 License
MIT. Built for the Celebrare Frontend Internship Assessment.
