export interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export const createHistory = <T,>(initialState: T): HistoryState<T> => ({
  past: [],
  present: initialState,
  future: [],
});

export const pushToHistory = <T,>(state: HistoryState<T>, newState: T): HistoryState<T> => {
  if (JSON.stringify(state.present) === JSON.stringify(newState)) {
    return state;
  }
  return {
    past: [...state.past, state.present].slice(-20), // Limit history to 20 steps
    present: newState,
    future: [],
  };
};

export const undo = <T,>(state: HistoryState<T>): HistoryState<T> => {
  if (state.past.length === 0) {
    return state;
  }
  const previous = state.past[state.past.length - 1];
  const newPast = state.past.slice(0, state.past.length - 1);
  return {
    past: newPast,
    present: previous,
    future: [state.present, ...state.future],
  };
};

export const redo = <T,>(state: HistoryState<T>): HistoryState<T> => {
  if (state.future.length === 0) {
    return state;
  }
  const next = state.future[0];
  const newFuture = state.future.slice(1);
  return {
    past: [...state.past, state.present],
    present: next,
    future: newFuture,
  };
};
