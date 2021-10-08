import { TDatabaseDispatch } from "./types";
import * as TYPES from "./types";

export const setName = (dispatch: TDatabaseDispatch, name: string): void => {
  dispatch({ type: TYPES.SET_EXAMPLE_NAME, name });
};
