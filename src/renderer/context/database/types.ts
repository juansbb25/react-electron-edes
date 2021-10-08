import { DB } from "@models/DB";

// redux types
export const SET_EXAMPLE_NAME = "SET_EXAMPLE_NAME";

export type TDatabaseState = DB;

export type TDatabaseActions = { type: typeof SET_EXAMPLE_NAME; name: string };

export type TDatabaseDispatch = React.Dispatch<TDatabaseActions>;
