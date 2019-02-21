import { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Context = createContext();

export const Provider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
};
