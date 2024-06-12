'use client';

import React from 'react';
import { GlobalProvider } from '@/app/context/globalProvider';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  return (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  );
};

interface Props {
  children: React.ReactNode;
}

export default ContextProvider;
