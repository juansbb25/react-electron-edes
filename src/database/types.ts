export interface ServerResponse<T> {
  state: boolean;
  message?: string;
  values?: T;
}
