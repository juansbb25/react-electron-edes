import * as TYPES from "./types";
import { TDatabaseState, TDatabaseActions } from "./types";

export const initialState = {} as TDatabaseState;
export const AUTH_STATES = {
  DEFAULT: {},
  NOT_EXISTS: null,
};

export const reducer = (
  state: TDatabaseState = initialState,
  action: TDatabaseActions
): TDatabaseState => {
  switch (action.type) {
    case TYPES.SET_EXAMPLE_NAME: {
      return { ...state, name: action.name };
    }
    default:
      return state;
  }
};
