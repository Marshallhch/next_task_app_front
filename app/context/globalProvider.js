'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import themes from './themes';
import store from '../redux/store';
import { Provider } from 'react-redux';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const theme = themes[selectedTheme];

  return (
    <Provider store={store}>
      <GlobalContext.Provider
        value={{
          theme,
          tasks,
        }}
      >
        <GlobalUpdateContext.Provider value={{}}>
          {children}
        </GlobalUpdateContext.Provider>
      </GlobalContext.Provider>
    </Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext); // export theme
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
