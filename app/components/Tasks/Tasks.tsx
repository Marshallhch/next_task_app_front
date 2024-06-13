'use client';

import { useGlobalState } from '@/app/context/globalProvider';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../redux/slices/apiSlice';

import { Dispatch } from 'redux';
import { useAuth } from '@clerk/nextjs';
// import CreateContent from '../Modals/CreateContent';

const Tasks = () => {
  const { theme } = useGlobalState();
  const dispatch: Dispatch<any> = useDispatch(); // Explicitly type the dispatch function with 'Dispatch<any>'
  const taskData = useSelector((item: any) => item.apis.getTasksData);

  const { userId } = useAuth();

  useEffect(() => {
    // @ts-ignore
    dispatch(getTasks(userId));
  }, [dispatch]);

  // console.log(taskData);

  return <TaskStyled theme={theme}>{/* <CreateContent /> */}</TaskStyled>;
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
