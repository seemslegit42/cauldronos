import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

/**
 * Creates a Zustand store with Immer middleware for easier state updates
 * @param initialState Initial state of the store
 * @param actions Actions to update the store state
 * @param options Options for the store (persistence, etc.)
 * @returns A Zustand store
 */
export function createStore<State, Actions>(
  initialState: State,
  actions: (set: any, get: any) => Actions,
  options?: {
    name?: string;
    partialize?: (state: State) => Partial<State>;
  }
) {
  // If a name is provided, use persist middleware
  if (options?.name) {
    return create<State & Actions>()(
      immer(
        persist(
          (set, get) => ({
            ...initialState,
            ...actions(set, get),
          }),
          {
            name: options.name,
            partialize: options.partialize || ((state) => state),
          }
        )
      )
    );
  }

  // Otherwise, just use immer middleware
  return create<State & Actions>()(
    immer((set, get) => ({
      ...initialState,
      ...actions(set, get),
    }))
  );
}
