'use client';

import { useGlobalState } from '@/app/context/globalProvider';
import React from 'react';
import styled from 'styled-components';

const Tasks = () => {
  const { theme } = useGlobalState();

  return <TaskStyled theme={theme}>Tasks</TaskStyled>;
};

const TaskStyled = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 1px solid ${(props) => props.theme.borderColor2};
  border-radius: 0.25rem;
  overflow-y: auto;
  padding: 1.25rem;
  height: 100%;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
`;

export default Tasks;
