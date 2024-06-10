'use client';

import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const GlobalStyleProvider = ({ children }: Props) => {
  return <GlobalStyles>{children}</GlobalStyles>;
};

const GlobalStyles = styled.div`
  padding: 1.25rem;
  display: flex;
  gap: 1.25rem;
  height: 100%;
`;

export default GlobalStyleProvider;
