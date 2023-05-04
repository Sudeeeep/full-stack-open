import { createContext, useReducer } from "react";

const anecdoteReducer = (state, action) => {
  switch (action.type) {
    case "VOTE": {
      return `Anecdote "${action.payload.content}" voted`;
    }
    case "CREATE": {
      return `Anecdote "${action.payload}" created`;
    }
    case "ERROR": {
      return action.payload;
    }

    case "RESET": {
      return null;
    }
    default:
      return null;
  }
};

const AnecdoteContext = createContext();

export const AnecdoteContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    anecdoteReducer,
    null
  );

  return (
    <AnecdoteContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </AnecdoteContext.Provider>
  );
};

export default AnecdoteContext;
