import { Action, Handlers } from "./handlers-type";

export const reducer = <
  TState,
  TAction extends Action<any>,
  THandlers extends Handlers<TState, TAction>
>(
  state: TState,
  action: TAction,
  handlers: THandlers
): TState => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
