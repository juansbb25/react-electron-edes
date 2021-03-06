import React, { createContext, useContext, useReducer } from "react";

import { initialState, reducer } from "./reducer";
import { TDatabaseDispatch, TDatabaseState } from "./types";

export const DatabaseState = createContext<TDatabaseState>(
  {} as TDatabaseState
);
export const DatabaseDispatches = createContext<TDatabaseDispatch>(() => ({}));

export default function DatabaseProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [databaseState, dispatch] = useReducer(reducer, initialState);

  return (
    <DatabaseState.Provider value={{ ...databaseState }}>
      <DatabaseDispatches.Provider value={dispatch}>
        {children}
      </DatabaseDispatches.Provider>
    </DatabaseState.Provider>
  );
}

export const useDatabase = (): [TDatabaseState, TDatabaseDispatch] => {
  const state = useContext(DatabaseState);
  const dispatch = useContext(DatabaseDispatches);
  return [state, dispatch];
};
