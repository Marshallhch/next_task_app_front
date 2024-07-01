'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import themes from './themes';
import store from '../redux/store';
import { Provider } from 'react-redux';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [tasks, setTasks] = useState([]);
  const theme = themes[selectedTheme];
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Provider store={store}>
      <GlobalContext.Provider
        value={{
          theme,
          tasks,
          openModal,
          closeModal,
          modal,
          collapsed,
          collapseMenu,
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
