/**
 * Action types for favorites management
 */
export const FAVORITES_ACTIONS = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
};

/**
 * Pure reducer function to manage favorited photo IDs.
 * Uses immutable state updates and prevents duplicate IDs.
 *
 * @param {Array<string|number>} state - Array of favorite photo IDs
 * @param {Object} action - Dispatched action with type and payload
 * @returns {Array<string|number>} New state array
 */
export function favoritesReducer(state, action) {
  switch (action.type) {
    case FAVORITES_ACTIONS.TOGGLE_FAVORITE: {
      const id = action.payload;
      // If the ID is already present, remove it; otherwise append it
      if (state.includes(id)) {
        return state.filter((favId) => favId !== id);
      }
      return [...state, id];
    }

    case FAVORITES_ACTIONS.ADD_FAVORITE: {
      const id = action.payload;
      // Prevent duplicates
      if (state.includes(id)) {
        return state;
      }
      return [...state, id];
    }

    case FAVORITES_ACTIONS.REMOVE_FAVORITE: {
      const id = action.payload;
      return state.filter((favId) => favId !== id);
    }

    default:
      return state;
  }
}
