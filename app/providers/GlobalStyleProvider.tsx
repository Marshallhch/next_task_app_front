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

  @media screen and (max-width: 1020px) {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
`;

export default GlobalStyleProvider;
