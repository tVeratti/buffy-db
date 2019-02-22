import { createContext, useReducer } from 'react';
import reducer from './reducer';

export const Context = createContext();

export const Provider = ({ initial, children }) => {
  const [episodes, dispatch] = useReducer(reducer, initial);
  return (
    <Context.Provider value={{ episodes, dispatch }}>
      {children}
    </Context.Provider>
  );
};
