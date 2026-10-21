# Photo Gallery Web App — Celebrare Frontend Internship Assignment

A modern, responsive, high-performance Photo Gallery built with **React**, **Vite**, and **Tailwind CSS**. Fetches 30 photos from the Picsum Photos API, provides instant real-time author filtering, and persists favorited photos to `localStorage` using `useReducer`.

---

## 🚀 Live Demo & Local Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm or yarn

### Quick Start
1. **Clone or navigate to the repository:**
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:5173/](http://localhost:5173/).

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🛠️ Architecture & Project Structure

```
src/
├── components/
│   ├── Header.jsx       # Header title, subtitle, live photo & favorites counters
│   ├── SearchBar.jsx    # Controlled real-time search input with clear button
│   ├── PhotoCard.jsx    # Photo presentation, lazy loading, and favorite heart toggle
│   └── PhotoGrid.jsx    # Responsive grid (1/2/4 cols), loading skeleton, error, & empty state
├── hooks/
│   ├── useFetchPhotos.js # Custom hook fetching 30 photos with AbortController cleanup
│   └── useFavorites.js   # Custom hook managing favorites with useReducer & localStorage sync
├── reducers/
│   └── favoritesReducer.js # Pure reducer handling TOGGLE_FAVORITE with duplicate prevention
├── App.jsx              # Main container combining hooks, useCallback, and useMemo
├── main.jsx             # React 18 createRoot entry point
└── index.css            # Tailwind CSS directives
```

---

## 📋 Features Implemented

1. **Remote API Integration (`useFetchPhotos`)**:
   - Fetches exactly 30 photos on application mount from `https://picsum.photos/v2/list?limit=30`.
   - Returns `{ photos, loading, error, retry }`.
   - Built-in `AbortController` handles unmount cleanup and avoids memory leaks.
   - Graceful error boundary UI with an interactive retry button.

2. **Responsive Tailwind Grid**:
   - **Mobile**: 1 column (`grid-cols-1`)
   - **Tablet**: 2 columns (`md:grid-cols-2`)
   - **Desktop**: 4 columns (`lg:grid-cols-4`)

3. **Real-Time Client-Side Search Filter**:
   - Filter photos by author name instantly without additional network requests.
   - Case-insensitive search using `useMemo` for high performance.
   - Search handler memoized with `useCallback` to prevent unnecessary re-renders.
   - Clean empty state when no authors match the query.

4. **Favorites State Management (`useReducer` + `localStorage`)**:
   - Strict `useReducer` implementation (no `useState` for favorites).
   - Stable Picsum photo IDs prevent duplicates.
   - Restores existing favorites on initial mount via lazy reducer initialization.
   - Persists state changes across browser refreshes via `localStorage`.

---

## 📝 Technical Concepts & Interview Explanation

### 1. `useFetchPhotos` Custom Hook
- **What it returns**: `photos` (array of 30 photo objects), `loading` (boolean), `error` (null or error message string), and `retry` (function).
- **Cleanup**: Uses `AbortController` inside `useEffect` so in-flight HTTP requests are aborted if the component unmounts.
- **Failure handling**: Catches non-200 HTTP responses and network errors, sets the error message, and presents a user-friendly error card with a retry button.

### 2. `useReducer` for Favorites
- **Why `useReducer` over `useState`**: Reducers centralize and decouple state update logic from UI components. It ensures deterministic, immutable state transitions (`TOGGLE_FAVORITE`, `ADD_FAVORITE`, `REMOVE_FAVORITE`) and prevents duplicate IDs.
- **Persistence**: Initialized lazily via `getInitialFavorites()` from `localStorage.getItem('celebrare_favorite_photos')`, and automatically synced to `localStorage` via a reactive `useEffect`.

### 3. `useCallback` & `useMemo` Performance Hooks
- **`useCallback` on `handleSearchChange`**: Prevents the search handler function reference from being recreated on every parent re-render, ensuring downstream child components (`SearchBar`) don't unnecessarily re-render.
- **`useMemo` on `filteredPhotos`**: Prevents expensive array filtering from running on unrelated state changes (such as toggling favorites or ticking timers). It recalculates the filtered list **only** when `photos` or `searchQuery` changes.

---

## 📄 License
MIT. Created for Celebrare Frontend Internship Assessment.
