import { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Context = createContext();

export const Provider = ({ initial, children }) => {
  const [store, dispatch] = useReducer(reducer, initial);
  return (
    <Context.Provider value={{ store, dispatch }}>{children}</Context.Provider>
  );
};
