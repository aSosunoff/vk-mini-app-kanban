/* type BaseTypeAction<K extends string> = {
  type: K;
  CallAPI?: string;
  methodAPI?: "get" | "post";
  paramsAPI?: Record<string, any>;
}; */

export type Action<K extends string, V = void> = V extends void ? { type: K } : { type: K } & V;

//#region
type HandlerDraftFunc<S, T> = (state: S, action: T) => void | S;

export type Handlers<
  TState,
  TAction extends Record<string, any>,
  TOtherFields extends string = "DEFAULT"
> = {
  [R in keyof TAction]: HandlerDraftFunc<TState, TAction[R]>;
} &
  {
    [RR in TOtherFields]: HandlerDraftFunc<TState, any>;
  } & {
    [key: string]: any;
  };
//#endregion
