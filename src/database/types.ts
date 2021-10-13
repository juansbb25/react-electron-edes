export type ServerResponse<T> = {
  state: boolean;
  message?: string;
} & (T extends undefined ? { values?: T } : { values: T });
